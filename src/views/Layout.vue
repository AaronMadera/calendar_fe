<template>
    <div>
        <b-sidebar id="sidebar-menu" title="Menu" :visible="true" bg-variant="dark" text-variant="info" shadow>
            <b-nav vertical class="text-center">
                 <b-nav-item>
                    <router-link :to="{name:'events'}" class="mx-auto text-warning">
                        <faw-icon icon="calendar" size="lg"/>
                        <span class="ml-3 h5"> Events</span>
                    </router-link>
                </b-nav-item>
                <b-nav-item v-if="user.isAdmin">
                    <router-link :to="{name:'users'}" class="mx-auto text-warning">
                        <faw-icon icon="users" size="lg"/>
                        <span class="ml-3 h5"> Users</span>
                    </router-link>
                </b-nav-item>
                <b-nav-item class="mx-auto mt-5 text-warning">
                    <b-button variant="outline-warning" @click="logout">
                        <faw-icon icon="sign-out-alt"/> Log out
                    </b-button>
                </b-nav-item>
            </b-nav>
        </b-sidebar>

        <b-navbar type="dark" variant="info">
            <b-navbar-brand v-b-toggle.sidebar-menu>Menu</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <span class="my-auto mr-3 text-light" :title="'welcome, '+user.name + '!!'" style="cursor: default">
                    <faw-icon icon="user"/> {{user.email}}
                </span>
                <b-button variant="outline-dark" @click="logout">
                    <faw-icon icon="sign-out-alt"/> Log out
                </b-button>
            </b-navbar-nav>
        </b-navbar>

        <router-view></router-view>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Layout',
        data() {
            return {

            };
        },
        computed: {
            user: {
                get() {
                    return this.getUser();
                }
            }
        },
        methods: {
            ...mapGetters([ 'getUser' ]),
            ...mapActions([ 'logout' ]),
        }

    }
</script>

<style>
body {
    background-image: url("https://images.unsplash.com/photo-1593541810974-13608ce9bed7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80");
}
</style>