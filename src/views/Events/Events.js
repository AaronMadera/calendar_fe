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
            ],
            event2Edit:null,
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
            this.event2Edit = null;
            this.Load();
        },
        async submitEvents() {
            try {
                this.events2Send.forEach(event => {
                    event.startsAt = new Date(`${event.startsAt.date} ${event.startsAt.time}`).getTime();
                    event.endsAt = new Date(`${event.endsAt.date} ${event.endsAt.time}`).getTime();
                });
                const { error, data } = this.event2Edit ? await this.service.Update(this.event2Edit, this.events2Send[ 0 ]) :
                    await this.service.CreateEvents({ events: this.events2Send });
                if (data && data.notCreated && data.notCreated.length) {
                    this.events2Send = [];
                    this.notCreatedError = true;
                    data.notCreated.forEach(nc => {
                        nc.content.startsAt = { date: '', time: '' };
                        nc.content.endsAt = { date: '', time: '' };
                        this.events2Send.push(nc.content);
                    });
                } else if (error && this.event2Edit) {
                    this.events2Send[ 0 ].startsAt = { date: '', time: '' };
                    this.events2Send[ 0 ].endsAt = { date: '', time: '' };
                    this.notCreatedError = true;
                }
                else if (error) throw new Error(error);
                else this.handlerHideModal();
            } catch (e) {
                console.log(e);
            }
        },
        async ChangeStatus(item) {
            try {
                await this.service.ChangeStatus(item._id, { completed: !item.completed });
            } catch (e) {
                console.log(e);
            }
            this.Load();
        },
        async Edit(item) {
            this.resetEvents2Send();
            this.event2Edit = item._id;

            const startDate = new Date(item.startsAt);
            const endDate = new Date(item.endsAt);
            item.startsAt = {
                date: `${startDate.getFullYear()}-${startDate.getMonth() < 9 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)}-${startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()}`,
                time: `${startDate.getHours() < 10 ? '0' + startDate.getHours() : startDate.getHours()}:${startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}:${startDate.getSeconds() < 10 ? '0' + startDate.getSeconds() : startDate.getSeconds()}`
            }
            item.endsAt = {
                date: `${endDate.getFullYear()}-${endDate.getMonth() < 9 ? '0' + (endDate.getMonth() + 1) : (endDate.getMonth() + 1)}-${endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate()}`,
                time: `${endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours()}:${endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes()}:${endDate.getSeconds() < 10 ? '0' + endDate.getSeconds() : endDate.getSeconds()}`
            }
            Object.assign(this.events2Send[ 0 ], item);
            this.showCreateModal();
        },
        async Delete(item) {
            try {
                await this.service.Remove(item._id);
            } catch (e) {
                console.log(e);
            }
            this.Load();
        },
    }
};
