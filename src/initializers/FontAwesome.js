import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faUser,
    faUsers,
    faCalendar,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';


library.add(
    faUser,
    faUsers,
    faCalendar,
    faSignOutAlt,
);
Vue.component('faw-icon', FontAwesomeIcon);
