<template>
<div class="LoginPage container">
  <h1>Aanmelden</h1>
<<<<<<< HEAD
  <div class="container pt-5 pb-5">
  <form class="input-group">
    <div class="input-group">
      <input type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
    </div>
    <div class="input-group">
      <input type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
    </div>
    <div class="input-group">
    <small v-if="output.failed" name="response">Verkeerde gebruikersnaam of wachtwoord</small>

    </div>
    <button class="btn btn-block btn-lg btn-primary" type="button" v-on:click="login()">Aanmelden</button>
=======
  <form class="form-inline·d-flex·justify-content-center·md-form·form-sm·mt-0">
    <input id="username" type="text" name="username" v-model="input.username" placeholder="Gebruikersnaam" class="form-control form-control-lg">
    <br>
    <input id="password" type="password" name="password" v-model="input.password" placeholder="Wachtwoord" class="form-control form-control-lg">
    <br>
    <small v-if="output.failed" name="response">Verkeerde gebruikersnaam of wachtwoord</small>
    <br>
    <button id="login" class="btn btn-lg btn-primary" type="button" v-on:click="login()">Aanmelden</button>
>>>>>>> 31b301acaf48e8f4ea589a624476408295bfc2e9
  </form>
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportingService from '../services/ReportingService';
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
