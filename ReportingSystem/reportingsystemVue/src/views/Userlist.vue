<template>

    <div v-if="users">
    <h1>Gebruikers</h1>
    <div class="container my-2" v-for="user in users" :key="user.id">
      <div class="col card h-100">
        <h3 class="card-header bg-primary text-white">
            {{user.username}}
        </h3>
        <div class="card-body">
            <p class="card-text">{{user.email}}</p>
            <p v-if="user.accessRights == 0" class="card-text">Administrator</p>
            <p v-if="user.accessRights == 1" class="card-text">Supervisor</p>
            <p v-if="user.accessRights == 2" class="card-text">Secretariaat</p>
            <label><input name="Subscription" type="checkbox" @change="changeSubscription(user)" v-model="user.subscription">Toegevoegd aan maillijst</label>
            <button type="button" class="btn btn-danger btn-block" @click="deleteUser(user)">Gebruiker verwijderen</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportingService from "../services/ReportingService";
export default Vue.extend({
    data () {
        return {
            users: [],
        };
    },
    
    mounted() {
        this.loadUsers();
    },

    methods: {
        loadUsers: function() {
            ReportingService.getAllUsers('/api/users/all').then(
                (res) => (this.users = res)
            );
        },
        changeSubscription: function(user: any) {
            ReportingService.changeSubscription({
                id: user.id,
                subscription: !user.subscription,
            });
        },
        deleteUser: function(user: any) {
            ReportingService.deleteUser({
                id: user.id,
            });
        }
    }
})
</script>