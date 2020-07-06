import HttpClient from '../helpers/http.client';
import config from '../config';

class BaseService { 
    constructor () {
        this.baseUrl = config.apiBaseUrl;
        this.http = this.http = new HttpClient({ baseURL: this.baseUrl, validateStatus:status=> status>=200 && status<=500});
        this.path = '';
    }
}


export default BaseService;
