import BaseService from './base.service';

class UsersService extends BaseService{
    constructor () {
        super();
        this.path = '/users';
    }

    async LogIn(data) {
        try {
            const res = await this.http.post(`${this.path}/login`, data);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async ListUsers(limit=10,skip=0) {
        try {
            const res = await this.http.get(`${this.path}/list?limit=${limit}$skip=${skip}`);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async CreateUser(data) {
        try {
            const res = await this.http.post(`${this.path}/create`,data);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async UpdateUser(data) {
        try {
            const res = await this.http.put(`${this.path}/update`,data);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async Remove(_id) {
        try {
            const res = await this.http.delete(`${this.path}/remove/${_id}`);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }
}

export default UsersService;