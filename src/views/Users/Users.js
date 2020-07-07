import UsersService from '../../services/users.service';

export default {
    name: 'Users',
    data() {
        return {
            totalUsers: 0,
            users: [],
            newUser: this.emptyUser(),
            service: new UsersService(),
            isBusy: true,
            notCreatedError: false,
            tableFields: [
                { key: 'email', label: 'Email' },
                { key: 'name', label: 'Name' },
                { key: 'isAdmin', label: 'Admin perm.' },
                { key: 'actions', label: 'Actions' }
            ],
            user2Edit: null,
        };
    },
    mounted() {
        this.Load();
    },
    methods: {
        async Load() {
            this.isBusy = true;
            try {
                const { error, data } = await this.service.ListUsers();
                if (!error && data) {
                    this.users = data.users;
                    this.totalUsers = data.total;
                } else throw new Error('Error while listing users');
            } catch (e) {
                this.users=[];
                this.totalUsers=0;
            }
            this.isBusy = false;
        },
        emptyUser() {
            return {
                name: '',
                email:'',
                password:'',
                confirmPassword:'',
                isAdmin:false
            };
        },
        showCreateModal() {
            this.$refs[ "formModal" ].show();
        },
        handlerHideModal() {
            this.$refs[ "formModal" ].hide();
            this.notCreatedError = false;
            this.user2Edit = null;
            this.Load();
        },
        async submitUser() {
            try {
                const { error } = this.user2Edit ? {}/*  await this.service.Update(this.user2Edit,this.newUser) */ :
                    await this.service.CreateUser(this.newUser);
                if (error) {
                    this.notCreatedError = true;
                    throw new Error(error);
                } else this.handlerHideModal();
            } catch (e) {
                console.log(e);
            }
        },
        async ChangeAdminPerm(item) {
            try {
                console.log(item);
                // await this.service.ChangeStatus(item._id, { completed: !item.completed });
            } catch (e) {
                console.log(e);
            }
            this.Load();
        },
        async Edit(item) {
            console.log(item);

            // this.resetEvents2Send();
            // this.event2Edit = item._id;

            // const startDate = new Date(item.startsAt);
            // const endDate = new Date(item.endsAt);
            // item.startsAt = {
            //     date: `${startDate.getFullYear()}-${startDate.getMonth() < 9 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)}-${startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()}`,
            //     time: `${startDate.getHours() < 10 ? '0' + startDate.getHours() : startDate.getHours()}:${startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}:${startDate.getSeconds() < 10 ? '0' + startDate.getSeconds() : startDate.getSeconds()}`
            // }
            // item.endsAt = {
            //     date: `${endDate.getFullYear()}-${endDate.getMonth() < 9 ? '0' + (endDate.getMonth() + 1) : (endDate.getMonth() + 1)}-${endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate()}`,
            //     time: `${endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours()}:${endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes()}:${endDate.getSeconds() < 10 ? '0' + endDate.getSeconds() : endDate.getSeconds()}`
            // }
            // Object.assign(this.events2Send[ 0 ], item);
            // this.showCreateModal();
        },

        async Delete(item) {
            try {
                console.log(item);
                // await this.service.Remove(item._id);
            } catch (e) {
                console.log(e);
            }
            // this.Load();
        },
    }
};
