<template>
  <div class="LoginPage">
    <h1>Aanmelden</h1>
    <form class="form-inline·d-flex·justify-content-center·md-form·form-sm·mt-0">
        <input  type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
        <br>
        <input type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
        <br>
        <small v-if="output.failed" name="response">Verkeerde gebruikersnaam of wachtwoord</small>
        <br>
        <button class="btn btn-lg btn-primary" type="button" v-on:click="login()" >Aanmelden</button>
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
                failed: false
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
            if (response.failed) {
                this.output.failed = true;
            } else {
                this.output.failed = false;
            }
        }

    } 
})
</script>
