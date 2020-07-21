<template>
    <div class="img-gradient fullscreen-size">
        <div class="container-fluid card-login">
            <b-form @submit.prevent="sendCreds" class="login-form-lg" width="50%">
                <h1 class="text-login my-5"><b>Login</b></h1>
                <b-form-group
                label="Email:">
                    <b-form-input
                    v-model="email"
                    type="email"
                    placeholder="Type your email"
                    class="my-2"
                    required />
                </b-form-group>

                <b-form-group
                class="mt-3"
                label="Password:">
                    <b-form-input
                    v-model="pass"
                    type="password"
                    placeholder="Type your Password"
                     class="my-2"
                    required />
                </b-form-group>
                
                <b-button type="submit" block class="mt-5 button-login">Ok</b-button>
            </b-form> 
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import UserService from '../services/users.service';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                pass: '',
                bgImgLg: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-1.2.1&auto=format&fit=crop&h=1080&q=80',
                service: new UserService()
            };
        },
        methods: {
            ...mapActions([ 'setUser' ]),
            async sendCreds() {
                try {
                    const { error, data } = await this.service.LogIn({ email: this.email, password: this.pass });
                    if (!error && data) {
                        this.setUser(data);
                        this.$router.push({ name: 'events' });
                    } else throw new Error('Error while trying to log in');
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>
<style>
.login-form-lg {
    width: 50%;
    min-width: 300px;
    max-width: 95vh;
    font-size: 2em;
}

.img-gradient {
    background-image: linear-gradient(
            to bottom,
            rgba(207, 221, 203, 0.52),
            rgba(180, 141, 171, 0.73)
        ),
        url("https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80");
    background-size: cover;
    height: 100vh;
}
.img-back{
    background-image:url("https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80");
}

.fullscreen-size {
    max-width: 100%;
    height: 100vh;
    width: auto;
    margin: auto;
    min-height: 550px;
}

.card-login {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10;
    justify-content: center;
    padding-top: 3%;
}

.text-login{
    color: #393d42 ;
}

.button-login{
    background: #393d42 ;
}
.button-login:hover{
    background: #5a5c5e ;
}
</style>