import BaseService from './base.service';

class EventsService extends BaseService {
    constructor () {
        super();
        this.path = '/events';
    }

    async List(limit=10,skip=0, gtedate, ltedate) {
        try {
            const res = gtedate ?
            await this.http.get(`${this.path}/list?limit=${limit}&skip=${skip}&gtedate=${gtedate}&ltedate=${ltedate}`):
            await this.http.get(`${this.path}/list?limit=${limit}&skip=${skip}`);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async CreateEvents(data) {
        try {
            const res = await this.http.post(`${this.path}/create`, data);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }

    async ChangeStatus(_id,data) {
        try {
            const res = await this.http.patch(`${this.path}/status/${_id}`, data);
            return res.data;
        } catch (e) {
            return { error: true, e };
        }
    }
    
        async Update(_id,data) {
            try {
                const res = await this.http.put(`${this.path}/update/${_id}`,data);
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

export default EventsService;