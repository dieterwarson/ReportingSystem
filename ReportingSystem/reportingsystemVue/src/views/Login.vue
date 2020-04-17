<template>
  <div class="LoginPage">
    <h1>This is the login page</h1>
    <form class="form-inline·d-flex·justify-content-center·md-form·form-sm·mt-0">
        <input  type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
        <br>
        <input type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
        <br>
        <button class="btn btn-lg btn-primary" type="button" v-on:click="login(input.username, input.password)" >Aanmelden</button>

    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import router from "../router/index"
//import service from "../axios/service";
export default Vue.extend({
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
            output: {
                errors: {}
            }
        }
    }
    /*,
    methods: { 
        login:(e) => {
            e.preventDefault();
            email : String;
            password : String;
            let login = () => {
                let data = {
                    email: this.input.email,
                    password: this.input.password
                }
                axios.post("", data)
                .then((response) => {
                    console.log("Logged in");
                    router.push("/Home");
                })
                .catch((errors) => {
                    console.log("Cannot log in");
                })
            } 
            login();
        }
    } */
})
</script>
