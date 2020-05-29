<template>
<div class="userlist">
<div id="nav">
    <router-link to="/">Startscherm</router-link>
        <b>/</b>

    <router-link to="/admin">Administrator</router-link>
  </div>
<div v-if="users">
  <h1>Gebruikers</h1>
  <div class="row d-flex justify-content-center">
    <div class="  card h-100 col-sm-5" v-for="user in users" :key="user.id">
      <h3 class="card-header bg-primary text-white">{{ user.username }}</h3>
      <div class="card-body">
        <p class="card-text">{{user.email}}</p>
        <p v-if="user.accessRights == 0" class="card-text">Administrator</p>
        <p v-if="user.accessRights == 1" class="card-text">Supervisor</p>
        <p v-if="user.accessRights == 2" class="card-text">Secretariaat</p>
        <label><input name="Subscription" type="checkbox" @change="changeSubscription(user)" v-model="user.subscription">Toegevoegd aan maillijst</label>
        <!-- <button type="button" class="btn btn-danger btn-block" @click="deleteUser(user)">Gebruiker verwijderen</button> -->
    </div>
  </div>
</div>
</div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import jwt from "jsonwebtoken";

export default Vue.extend({
  data() {
    return {
      users: []
    };
  },

  mounted() {
    this.loadUsers();
  },

  methods: {
    loadUsers: function () {
      ReportingService.getAllUsers('/api/users/all').then(
        (res) => (this.users = res)
      );
    },
    changeSubscription: function (user: any) {
      
      ReportingService.changeSubscription({
        id: user.id,
        subscription: user.subscription,
      });
    },
    deleteUser: function (user: any) {
      const decodedToken: any = jwt.decode(window.localStorage.getItem("token") !);
     
      ReportingService.deleteUser({
        id: decodedToken.id,
        deleteid: user.id,
      });
    }
  }
})
</script>

<style>
.card {
display: inline-block;  width: 35%;
padding: 0px;
}
</style>