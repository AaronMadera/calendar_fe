<template>
    <div >
        <b-card
        :img-src="bgImgLg"
        overlay
        text-variant="dark"
        subtitle="Welcome, friend!">
        <b-card-text>
            <b-form @submit.prevent="sendCreds" class="login-form-lg text-secondary" width="50%">
                <h1 class="text-info my-5"><b>Login</b></h1>
                <b-form-group
                label="Email:">
                    <b-form-input
                    v-model="email"
                    type="email"
                    placeholder="Type your email"
                    required />
                </b-form-group>

                <b-form-group
                class="mt-3"
                label="Password:">
                    <b-form-input
                    v-model="pass"
                    type="password"
                    placeholder="Type your Password"
                    required />
                </b-form-group>
                
                <b-button type="submit" block variant="info" class="mt-5">Ok</b-button>
            </b-form>
        </b-card-text>        
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                pass: '',
                bgImgLg: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-1.2.1&auto=format&fit=crop&h=700&q=80',
            };
        },
        methods: {
            sendCreds() {
                alert(`email: ${this.email}, pass: ${this.pass}`);
            }
        }
    }
</script>
<style>
.login-form-lg {
    width: 50%;
    margin-left: 30%;
    font-size: 2em;
}
img {
    max-height: 650px;
}
</style>