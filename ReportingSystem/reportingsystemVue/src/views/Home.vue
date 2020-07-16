<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>
    <router-view />
    <div class="container my-4">
      <div class="row">
        <div>Aangemeld als {{tokenData.username}}</div>
        <div v-if="tokenData.accessRights == 0">(Administrator)</div>
        <div v-else-if="tokenData.accessRights == 1">(Supervisor)</div>
        <div v-else-if="tokenData.accessRights == 2">(Secretariaat)</div>
        <button type="submit" class="btn btn-primary logout" @click.prevent="logOut">Afmelden</button>
      </div>

      <!-- Search form -->
      <form>
        <div v-if="tokenData.seeReports" class="form-row align-items-center">
          <div class="col my-1">
            <!-- Keyword input -->
            <input
              @click="toggleInvisible"
              type="text"
              class="form-control"
              id="inlineFormInputName"
              v-model="keyword"
              placeholder="Trefwoord"
            />
          </div>
          <div class="col my-1">
            <div class="input-group">
              <div class="autocomplete">
                <!-- Pl number input -->
                <input
                  autocomplete="off"
                  v-model="plNumber"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="PL-nummer"
                  @keyup="getOptions(plNumber)"
                  @click="toggleVisible"
                />
                <div class="popover" v-show="visible">
                  <div class="options">
                    <ul>
                      <li
                        v-for="event in events"
                        :key="event.id"
                        v-on:click="getPlNumber(event.plNumber)"
                      >{{event.plNumber}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-auto my-1">
            <!--  Search button -->
            <button
              @click="toggleInvisible"
              type="submit"
              class="btn btn-secondary btn-block"
              @click.prevent="searchReports"
            >Zoek</button>
          </div>
        </div>
      </form>
      <div class="container">
        <router-link
          v-if="tokenData.makeReports"
          to="/AddReport"
          tag="button"
          class="btn btn-primary btn-lg btn-block"
        >+ Nieuwe gebeurtenis</router-link>

        <div class="container">
          <div class="row">
            <div class="col-sm" v-if="tokenData.seeReports">
              <router-link
                to="/Reports"
                tag="button"
                class="btn btn-secondary btn-lg btn-block"
              >Verslagen</router-link>
            </div>

            <div class="col-sm" v-if="tokenData.seeNotifications">
              <router-link
                to="/Notifications"
                tag="button"
                class="btn btn-secondary btn-lg btn-block"
              >Meldingen</router-link>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm" v-if="tokenData.seePreviousShift">
              <button
                @click="goToLastReport()"
                tag="button"
                class="btn btn-secondary btn-lg btn-block"
              >Overzicht vorige shift</button>
            </div>

            <div class="col-sm" v-if="(tokenData.seeStatistics)">
              <router-link
                to="/Statistics"
                tag="button"
                class="btn btn-secondary btn-lg btn-block"
              >Statistieken</router-link>
            </div>
          </div>
        </div>
        <div v-if="tokenData.admin" class="Container">
          <div class="Container">
            <div class="row">
              <div class="col-sm">
                <router-link
                  to="/admin"
                  tag="button"
                  class="btn btn-secondary btn-lg btn-block"
                >Administrator functies</router-link>
              </div>
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
  data: function() {
    return {
      keyword: "",
      plNumber: "",
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
      },
      lastShift: {
        id: 1
      }
    };
  },

  methods: {
    async getOptions(plNumber: string) {
      const sign = "%";
      plNumber = sign.concat(plNumber);
      plNumber = plNumber.concat(sign);
      const response = await ReportingService.autoCompleteOperationalEvent({
        plNumber: plNumber
      });
      this.events = response;
    },
    toggleVisible() {
      this.visible = !this.visible;
    },
    getPlNumber(plNumber: string) {
      this.plNumber = plNumber;
      this.toggleVisible();
      this.getOptions(plNumber);
    },
    logOut() {
      window.location.href = "/login";
      ReportingService.logoutUser({
        username: this.tokenData.username
      });
    },

    searchReports: function() {
      if (this.keyword == "" && this.plNumber == "") {
        this.$router.push({
          path: "reports"
        });
      } else {
        let newKeyword = String(this.keyword);
        // newKeyword = escape(newKeyword);
        // newKeyword = encodeURI(newKeyword);
        newKeyword = encodeURIComponent(newKeyword);
        // newKeyword = newKeyword.replace(/[^a-z0-9 ,.?!]/ig, '');
        newKeyword = newKeyword.replace(/[[\]{}()*+?,^$|#\s]/g, "\\$&");
        newKeyword = newKeyword.split("-").join("--");
        newKeyword = newKeyword.split("%").join("%25");
        newKeyword = newKeyword.split("\\").join("%5C%5C");
        newKeyword = newKeyword.split("!").join("%21");
        newKeyword = newKeyword.split("_").join("%5F");

        /* If the string contains only the '.'-character, a space is added. This is to prevent the url contains only '.'-characters, which gives problems. */
        let match = newKeyword.match(/[.]/g);
        if (newKeyword !== null) {
          if (match !== null) {
            if (match.length === newKeyword.length)
              newKeyword = newKeyword.concat("%20");
          }
        }
        newKeyword = newKeyword.split(".").join("%2E");

        this.$router.push({
          path: "reportssearch",
          query: {
            keyword: newKeyword,
            plNumber: String(this.plNumber)
          }
        });
      }
    },
    toggleInvisible: function() {
      if (this.visible) {
        this.visible = !this.visible;
      }
    },

    goToLastReport: function() {
      this.$router.push("/reportView?reportId=" + this.lastShift.id);
    },

    loadShiftId: async function() {
      await ReportingService.getAllReports("/api/reports/lastShift").then(
        res => (this.lastShift = res)
      );
    }
  },
  mounted() {
    this.loadShiftId();
    this.getOptions("");
    if (
      window.localStorage.getItem("token") === null ||
      window.localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      const decodedToken: any = jwt.decode(
        window.localStorage.getItem("token")!
      );
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

      if (decodedToken === undefined) {
        window.location.href = "/login";
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

.btn-block {
  width: -webkit-fill-available;
}

.form-control {
  border: 1px solid black;
}

.form-row {
  padding-left: 10px;
}

.autocomplete {
  width: 100%;
  position: relative;
}

.inputPL {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: 2px solid lightgray;
  box-shadow: 0 0 10px #eceaea;
  cursor: text;
}

.popover {
  width: 100%;
  min-height: 50px;
  border: 2px solid lightgray;
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 3px;
  text-align: center;
  max-width: 100%;
}

.popover input {
  width: 100%;
  margin-top: 5px;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid lightgray;
  padding-left: 8px;
}

.options {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
}

.options ul {
  list-style: none;
  text-align: left;
  padding-left: 0;
}

.options ul li {
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
  background: #f1f1f1;
}

.options ul li:hover {
  background: steelblue;
  color: black;
}

.logout {
  margin-left: 60%;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 10px;
}
</style>
