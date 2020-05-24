<template>
<div class="home">
  <div class="container my-4">
    <!-- Search form -->
    <form>
<div v-if="tokenData.seeReports" class="form-row align-items-center">        
  <div class="col my-1">
          <input type="text" class="form-control" id="inlineFormInputName" v-model="keyword" placeholder="Trefwoord" />
        </div>
        <div class="col my-1">
          <div class="input-group">
            <input type="text" class="form-control" id="inlineFormInputGroupUsername" v-model="plNumber" placeholder="PL-nummer" />
          </div>
        </div>

        <div class="col-auto my-1">
          <button type="submit" class="btn btn-secondary btn-block" @click.prevent="searchReports">Zoek</button>
        </div>
      </div>
    </form>
    <router-link v-if="tokenData.makeReports" to="/AddReport" tag="button" class="btn btn-primary btn-lg btn-block">+ Nieuwe gebeurtenis</router-link>

    <div class="container">
      <div class="row">
        <div class="col-sm" v-if="tokenData.seeReports">
          <router-link to="/Reports" tag="button" class="btn btn-secondary btn-lg btn-block">Verslagen</router-link>
        </div>

        <div class="col-sm" v-if="tokenData.seeNotifications">
          <router-link to="/Notifications" tag="button" class="btn btn-secondary btn-lg btn-block">Meldingen</router-link>
        </div>
      </div>
    </div>

      <div class="container">
        <div class="row">
          <div class="col-sm" v-if="tokenData.seePreviousShift">
            <router-link
              to="/reportView?reportId=1"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Overzicht vorige shift</router-link
            >
          </div>

          <div class="col-sm" v-if="(tokenData.seeStatistics)" >
          
          
            <router-link
              to="/Statistics"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Statistieken</router-link
            >
          </div>
          
        </div>
      </div>
      <div  v-if="tokenData.admin" class="Container">
        <div class="Container">
        <div class="row">
          <div class="col-sm">
            <router-link
              to="/admin"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Administrator functies</router-link
            >
          </div>      
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import jwt from "jsonwebtoken";
export default Vue.extend({
  data: function () {
    return {
      plForm: "",
      keyword: "",
      visible: false,
      events: null,
      tokenData: {
        accessRights: -1,
        makeReports: false,
        seeReports: false,
        seePreviousShift: false,
        seeStatistics: false,
        seeNotifications: false,
        admin: false,
        username: null
      }
    }
  },
  
  methods: {
    async getOptions(plNumber: string) 
    {
      plNumber = plNumber.concat('%');
      const response = await ReportingService.autoCompleteOperationalEvent({
        plNumber: plNumber});
        this.events = response;
  },
  toggleVisible(){
    this.visible = !this.visible;
  },
  getPlNumber(plNumber : string) {
    this.plForm = plNumber;
    this.toggleVisible();
    this.getOptions(plNumber);
  },
  logOut() {
    window.location.href = "/login"
    ReportingService.logoutUser({
      username: this.tokenData.username,
    });
  },
  
    searchReports: function () {
      this.$router.push({
        path: "reports",
        query: {
          keyword: String(this.keyword),
          plNumber: String(this.plNumber)
        }
      })
    }
  },
  mounted() {
    
    this.getOptions('');
    if (window.localStorage.getItem("token") === null || window.localStorage.getItem("token") === undefined  ) {
     window.location.href = "/login";
    } else {
      const decodedToken: any= jwt.decode(window.localStorage.getItem("token")!);
      if (decodedToken.rights < 0 || decodedToken.rights > 2) {
          window.location.href = "/login";
      }
      this.tokenData.username = decodedToken.username;
      this.tokenData.accessRights = decodedToken.rights;
      if (this.tokenData.accessRights === 0) {
        this.tokenData.admin = true;
      } else {
        this.tokenData.admin = false;
      }

        this.tokenData.seeReports = decodedToken.seeReports;
        this.tokenData.seePreviousShift = decodedToken.seePreviousShift;
        this.tokenData.seeNotifications = decodedToken.seeNotifications;
        this.tokenData.seeStatistics = decodedToken.seeStatistics;
        this.tokenData.makeReports = decodedToken.makeReports;

    if (decodedToken === undefined){
        window.location.href = "/login"
      }
    }
  }
});
</script>

<style scoped>
.btn {
  margin: 0.5rem;
}

.btn-primary {
  margin-top: 5rem;
}

.form-control {
  border: 1px solid black;
}
</style>
