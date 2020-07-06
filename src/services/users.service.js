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
}

export default UsersService;