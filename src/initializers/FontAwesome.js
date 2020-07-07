import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faUser,
    faUsers,
    faCalendar,
    faSignOutAlt,
    faPlus,
    faExchangeAlt,
    faEdit,
    faTrashAlt,
    faCheckCircle,
    faTimesCircle,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';


library.add(
    faUser,
    faUsers,
    faCalendar,
    faSignOutAlt,
    faPlus,
    faExchangeAlt,
    faEdit,
    faTrashAlt,
    faCheckCircle,
    faTimesCircle,
    faUserEdit,
);
Vue.component('faw-icon', FontAwesomeIcon);
