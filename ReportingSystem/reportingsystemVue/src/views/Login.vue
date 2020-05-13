<template>
  <div class="LoginPage">
    <h1>This is the login page</h1>
    <form class="form-inline·d-flex·justify-content-center·md-form·form-sm·mt-0">
        <input  type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
        <br>
        <input type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
        <br>
        <button class="btn btn-lg btn-primary" type="button" v-on:click="login()" >Aanmelden</button>
        <input type="text" name="resp" v-model="output.response" class="form-control form-control-lf">
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import router from "../router/index"
import ReportingService from '../services/ReportingService';
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
                errors: {},
                response: ""
            }
        }
    },
    methods: { 
        async login() {
            const response = await ReportingService.loginUser({
                username: this.input.username,
                password: this.input.password
            });
            this.input.username = "";
            this.input.password = "";
        }

    } 
})
</script>
