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
            this.newUser = this.emptyUser();
            this.Load();
        },
        async submitUser() {
            try {
                const { error } = this.user2Edit ? await this.service.UpdateUser({ userId: this.newUser._id, isAdmin: this.newUser.isAdmin, name: this.newUser.name })  :
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
                await this.service.UpdateUser({
                    userId: item._id,
                    isAdmin: !item.isAdmin,
                    name:item.name
                });
            } catch (e) {
                console.log(e);
            }
            this.Load();
        },
        async Edit(item) {
            this.user2Edit = item._id;
            Object.assign(this.newUser, item);
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
