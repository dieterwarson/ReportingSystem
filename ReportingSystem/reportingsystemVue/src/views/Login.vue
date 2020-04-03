<template>
  <div class="LoginPage">
    <h1>This is the login page</h1>
    <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <input  type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
        <br>
        <input type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
        <br>
        <button class="btn btn-lg btn-primary" type="button" v-on:click="login()" >Aanmelden</button>

    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if(this.input.username != "" && this.input.password != ""){
                console.log("check");
            } else {
                console.log("Enter a username or password")
            }
        }
    }
})
</script>
