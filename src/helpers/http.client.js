import axios from 'axios';

class HttpClient{
    constructor (options = {}) {
        this.client = axios.create(options);
    }

    async get(url, headers = {}) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return this.client.get(url, { headers });
    }

    async post(url,params={}, headers = {}) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return this.client.post(url, params, { headers });
    }

    async put(url, params={}, headers = {}) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return this.client.put(url, params, { headers });
    }
    async patch(url, params={}, headers = {}) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return this.client.patch(url, params, { headers });
    }


    async delete(url, headers = {}) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return this.client.get(url, { headers });
    }
}

export default HttpClient;
