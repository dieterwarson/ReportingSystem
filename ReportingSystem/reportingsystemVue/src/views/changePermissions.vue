<template>
<div class="container pt-5 pb-5">
    <h1>Rechten van gebruikersrollen wijzigen</h1>
        <div class="input-group-vertical" mt-2>
            <table class="table">
                <thead>
                    <th scope="col">Gebruikersrollen</th>
                    <th scope="col">Toevoegen gebeurtenis</th>
                    <th scope="col">Verslagen bekijken</th>
                    <th scope="col">Meldingen bekijken</th>
                    <th scope="col">Vorige shift bekijken</th>
                    <th scope="col">Statistieken bekijken</th>
                </thead>
                <tbody>
                    <tr v-for="roles in userRoles" :key="roles.id">
                        <th scope="row">{{roles.name}}</th>
                        <td><input v-model="roles.makeReports"  name="SupervisorAddEvent" type="checkbox" id="checkbox"></td>
                        <td><input v-model="roles.seeReports" name="SupervisorReports" type="checkbox" id="checkbox"></td>
                        <td><input v-model="roles.seeNotifications"  name="SupervisorNotifications" type="checkbox" id="checkbox"></td>
                        <td><input v-model="roles.seePreviousShift"  name="SupervisorPrevShift" type="checkbox" id="checkbox"></td>
                        <td><input v-model="roles.seeStatistics"  name="SupervisorStats" type="checkbox" id="checkbox"></td>
                    </tr>

                </tbody>
            </table>
        </div>
        <button type="button" class="btn btn-success btn-block" @click.prevent="updatePermissions">Wijzigingen opslaan</button>
</div>

        
</template>

<script lang="ts">
import Vue from 'vue'
import ReportingService from '../services/ReportingService';
export default Vue.extend({
    data: function() {
    return {
        userRoles: {},
      
    };
  },
  mounted: function(){
      this.getPermissions();
  },
  methods: {
      getPermissions: function() {
          ReportingService.getAccessRoleData().then( 
                res => (this.userRoles = res)
          );
      },
      updatePermissions: function() {
          ReportingService.updateAccessRoleData({
              roles: this.userRoles
          });
      }
  }
})
</script>