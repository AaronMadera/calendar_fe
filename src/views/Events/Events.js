import EventsService from '../../services/events.service';

export default {
    name: 'Events',
    data() {
        return {
            totalEvents:0,
            events: [],
            events2Send:[],
            service: new EventsService(),
            isBusy: true,
            notCreatedError:false,
            tableFields: [
                {key:'title', label:'Title'},
                {key:'description', label:'Description'},
                { key: 'startsAt', label: 'Start', formatter: (start) => new Date(start).toLocaleString()},
                { key: 'endsAt', label: 'End', formatter: (end) => new Date(end).toLocaleString()},
                {key:'completed', label:'Status'},
                {key:'actions', label:'Actions'}
            ]
        };
    },
    mounted() {
        this.Load();
        this.resetEvents2Send();
    },
    methods: {
        async Load() {
            try {
                const { error, data } = await this.service.List();
                if (!error&&data) {
                    this.totalEvents = data.total;
                    this.events = data.events;
                 }else throw new Error('Error in Loading');
            } catch (e) {
                this.events = [];
                this.totalEvents = 0;
            }
            this.isBusy = false;
        },
        newEvent() {
            return {
                title: '',
                description: '',
                startsAt: {
                    date: '',
                    time:''
                },
                endsAt: {
                    date: '',
                    time: ''
                }
            };
        },
        resetEvents2Send() {
            this.events2Send = [this.newEvent()];
        },
        addNewEvent() {
            this.events2Send.push(this.newEvent());
        },
        popEvent() {
            this.events2Send.pop();
        },
        showCreateModal() {
            this.$refs[ "formModal" ].show();
        },
        handlerHideModal() {
            this.$refs[ "formModal" ].hide();
            this.resetEvents2Send();
            this.notCreatedError = false;
        },
        async submitEvents() {
            try {
                this.events2Send.forEach(event => {
                    event.startsAt = new Date(`${event.startsAt.date} ${event.startsAt.time}`).getTime();
                    event.endsAt = new Date(`${event.endsAt.date} ${event.endsAt.time}`).getTime();
                });
                const { error, data } = await this.service.CreateEvents({ events: this.events2Send });
                if ( data&&data.notCreated.length) {
                    this.events2Send = [];
                    this.notCreatedError = true;
                    data.notCreated.forEach(nc => {
                        nc.content.startsAt = { date: '', time: '' };
                        nc.content.endsAt = { date: '', time: '' };
                        this.events2Send.push(nc.content);
                    });
                } else if (error) throw new Error(error);
                else this.handlerHideModal();
            } catch (e) {
                console.log(e);
            }
            this.Load();
        },
        async ChangeStatus(item) {console.log(item) },
        async Edit(item) {console.log(item) },
        async Delete(item) { console.log(item)},
    }
};
