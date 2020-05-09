<template>
  <!-- script has to be implemented again to achieve the seperate forms -->
  <div class="container pt-5 pb-5">
    <h1>Voeg gebeurtenis toe</h1>
    <form id="addReport">
      <div class="btn-group d-flex" role="group" aria-label="Justified button group">
        <button
          id="operationalButton"
          type="button"
          class="btn btn-info"
          @click.prevent="getOperational"
        >Operationeel</button>
        <button
          id="workForceButton"
          type="button"
          class="btn btn-primary"
          @click.prevent="getWorkforce"
        >Personeel</button>
        <button
          id="technicalButton"
          type="button"
          class="btn btn-primary"
          @click.prevent="getTechnical"
        >Technisch</button>
      </div>

      <section v-if="step == 'Operational'">
        <h3>Operationeel</h3>
        <!-- <div class="row">
                    <div class="checkbox-container text-sm-left col-lg-3" >
                    <div class="text-sm-left">
                        <div class="text-sm-left">
                            <input class="text-sm-left" type="checkbox" name="cross-border pursuit" v-model="form.crossBorderPursuit"><label >Grensoverschrijdende achtervolging</label>
                        </div>
                        <div class="text-sm-left">
                            <input class="text-sm-left" type="checkbox" name="Specific Event" v-model="form.specificEvent"><label >Specifieke Gebeurtenis</label>
                        </div>
                        <div class="text-sm-left">
                            <input class="text-sm-left" type="checkbox" name="Proclamation BIN-alarm" v-model="form.BIN"><label >Afkondiging BIN-alarm</label>
                        </div>
                        <div class="text-sm-left">
                            <input class="text-sm-left" type="checkbox" name="Telecom operator" v-model="form.telecomOperator"><label >Bevraging gsm-operatoren</label>
                        </div>
                        <div class="text-sm-left">
                            <label class="text-sm-left">Signaleringen:</label>
                            <div class="text-sm-left">
                                <div class="text-sm-left">
                                    <input class="text-sm-left" type="checkbox" name="Signaling Person" v-model="form.signalingPerson"><label >Personen</label>
                                </div >
                                <div class="text-sm-left">
                                    <input type="checkbox" name="Signaling Vehicle" v-model="form.signalingVehicle"><label >Voertuig</label>
                                </div>
                                <div class="text-sm-left">
                                    <input class="text-sm-left" type="checkbox" name="Signaling Object" v-model="form.signalingObject"><label >Voorwerp</label>
                                </div>
                            </div>
                        </div>
                        <div class="text-sm-left">
                            <label class="text-sm-left">Verwittiging schouwarts:</label>
                            <div class="text-sm-left">
                                <div class="text-sm-left">
                                    <input class="text-sm-left" type="checkbox" name="Collocation" v-model="form.collocation"><label >Collocatie:</label>
                                    <div class="text-sm-left">
                                        <div class="text-sm-left">
                                        <input class="text-sm-left" type="checkbox" name="First Schouwarts" v-model="form.firstSchouwarts"><label >Martijn Martens</label>
                                        </div>
                                        <div class="text-sm-left">
                                            <input class="text-sm-left" type="checkbox" name="Second Schouwarts" v-model="form.secondSchouwarts"><label >Dirk Stegen</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-sm-left">
                                    <input class="text-sm-left" type="checkbox" name="Set Sexual Agression" v-model="form.sexualAgression"><label >Sexuele agressie:</label>
                                    <div class="text-sm-left">
                                        <div class="text-sm-left">
                                            <input class="text-sm-left" type="checkbox" name="First SA Schouwarts" v-model="form.firstSASchouwarts"><label >Ruben Boelen</label>
                                        </div>
                                        <div class="text-sm-left">
                                            <input class="text-sm-left" type="checkbox" name="Second SA Schouwarts" v-model="form.secondSASchouwarts"><label >Vincent Potargent</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
        </div>-->
        <!-- <div class="input-group col-lg-8"> -->
        <div class="input-group">
          <div class="input-group" style="height: 20%;">
            <input
              name="plNumber"
              v-model="form.plNumber"
              type="text"
              placeholder="PL-nummer"
              class="form-control form-control-lg"
            />
          </div>
          <div class="input-group" style="height: 20%;">
            <button
              class="btn btn-block btn-success"
              type="button"
              @click.prevent="getFile"
            >Zoek fiche</button>
          </div>
          <div class="input-group" style="height: 20%;">
            <input
              name="location"
              v-model="form.location"
              type="text"
              placeholder="Adres"
              class="form-control form-control-lg"
            />
            <input
              name="date"
              v-model="form.operationalDate"
              type="text"
              placeholder="Datum"
              class="form-control form-control-lg"
            />
            <input
              name="unit"
              v-model="form.unit"
              type="text"
              placeholder="Unit"
              class="form-control form-control-lg"
            />
          </div>
          <div class="input-group" style="height: 39%;">
            <input
              v-model="form.operationalMessage"
              type="text"
              placeholder="Extra info"
              class="form-control form-control-lg"
            />
          </div>
        </div>

        <!-- </div> -->

        <button
          class="btn btn-large btn-block btn-success"
          type="button"
          @click.prevent="addReport"
        >Opslaan</button>
        <small v-if="form.operationalFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
        <small v-if="form.operationalSucceeded">Het verslag is toegevoegd</small>
      </section>
      <section v-if="step == 'Workforce'">
        <h3>Personeel</h3>

        <!-- <div class="row">
                <div class="checkbox-container text-sm-left col-lg-3" >
                <div class="text-sm-left">
                    <div class="text-sm-left">
                        <input class="text-sm-left" type="checkbox" name="Signaling Person" v-model="form.signalingPerson"><label >Personeel</label>
                        <div class="text-sm-left">
                            <div class="text-sm-left">
                                <input class="text-sm-left" type="checkbox" name="Signaling Person" v-model="form.signalingPerson"><label >Ziektemelding</label>
                            </div >
                            <div class="text-sm-left">
                                <input type="checkbox" name="Signaling Vehicle" v-model="form.signalingVehicle"><label >Arbeidsongeval</label>
                            </div>
                            <div class="text-sm-left">
                                <input class="text-sm-left" type="checkbox" name="Signaling Object" v-model="form.signalingObject"><label >Voorval tijdens dienst</label>
                            </div>
                        </div>
                    </div>
                    <input class="text-sm-left" type="checkbox" name="Signaling Person" v-model="form.signalingPerson"><label >Melding secretariaat</label>
                    </div>
        </div>-->

        <!-- <div class="input-group col-lg-8"> -->
        <div class="input-group">
          <div class="input-group">
            <input
              name="Name absentee"
              v-model="form.absentee"
              type="text"
              placeholder="Naam afwezige"
              class="form-control form-control-lg"
            />
            <input
              name="Naam"
              v-model="form.replacement"
              type="text"
              placeholder="Naam vervanger"
              class="form-control form-control-lg"
            />
          </div>
        </div>

        <input
          name="Message"
          v-model="form.workforceMessage"
          type="text"
          placeholder="Extra info"
          class="form-control form-control-lg"
        />
        <button
          class="btn btn-large btn-block btn-success"
          type="button"
          @click.prevent="addWorkForceEvent"
        >Opslaan</button>
        <small v-if="form.workForceFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
        <small v-if="form.WorkForceSucceeded">Het verslag is toegevoegd</small>
      </section>

      <section v-if="step == 'Technical'">
        <h3>Technisch</h3>
        <div class="row">
          <div class="checkbox-container text-sm-left col-lg-3">
            <div class="text-sm-left">
              <div class="text-sm-left">
                <input class="text-sm-left" type="checkbox" name="Technisch WKS" />
                <label>Technisch WKS</label>
                <div class="text-sm-left">
                  <div class="text-sm-left">
                    <input class="text-sm-left" type="checkbox" name="Voorwerp" />
                    <label>Voorwerp</label>
                  </div>
                  <div class="text-sm-left">
                    <input type="checkbox" name="Verwittiging ASC" />
                    <label>Verwittiging ASC</label>
                  </div>
                  <div class="text-sm-left">
                    <input class="text-sm-left" type="checkbox" name="Verwittiging anderen" />
                    <label>Verwittiging anderen</label>
                  </div>
                </div>
              </div>
              <div class="text-sm-left">
                <input class="text-sm-left" type="checkbox" name="Logistiek" />
                <label>Logistiek</label>
                <div class="text-sm-left">
                  <div class="text-sm-left">
                    <input class="text-sm-left" type="checkbox" name="Defect" />
                    <label>Defect</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-group">
              <input
                name="Message"
                v-model="form.technicalMessage"
                type="text"
                placeholder="Info over defect"
                class="form-control form-control-lg"
              />
            </div>
          </div>
          <button
            class="btn btn-large btn-block btn-success"
            type="button"
            @click.prevent="addTechnicalEvent"
          >Opslaan</button>
        </div>
        <small v-if="form.technicalFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
        <small v-if="form.technicalSucceeded">Het verslag is toegevoegd</small>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data() {
    return {
      step: "Operational",
      form: {
        //OPERATIONAL OBJECTS
        plNumber: "",
        location: "",
        operationalDate: "",
        operationalMessage: "",
        crossBorderPursuit: false,
        specificEvent: false,
        BIN: false,
        telecomOperator: false,
        signalingPerson: false,
        signalingVehicle: false,
        signalingObject: false,
        collocation: false,
        firstSchouwarts: false,
        secondSchouwarts: false,
        sexualAgression: false,
        firstSASchouwarts: false,
        secondSASchouwarts: false,
        operationalFailed: false,
        operationalSucceeded: false,
        unit: "",
        //WORKFORCE OBJECTS
        absent: "",
        replacement: "",
        workforceMessage: "",
        secretNotifications: null,
        workplaceEvent: null,
        workforceDescription: null,
        monitoring: null,
        workforceDate: null,
        shift: null,
        absentee: "",
        substitute: null,
        employee: null,
        workplaceEventType: null,
        workForceFailed: false,
        workForceSucceeded: false,
        //TECHNICAL OBJECTS
        technicalMessage: "",
        technicalProblems: null,
        technicalDescription: null,
        duration: null,
        problemType: null,
        technicalFailed: false,
        technicalSucceeded: false
      }
    };
  },
  methods: {
    getOperational: function() {
      if (this.step != "Operational") {
        this.step = "Operational";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-primary", "btn-info");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    getWorkforce: function() {
      if (this.step != "Workforce") {
        this.step = "Workforce";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-primary", "btn-info");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    getTechnical: function() {
      if (this.step != "Technical") {
        this.step = "Technical";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-primary", "btn-info");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    saveButton: function() {
      alert("send to db");
    },
    async getFile() {
      const response = await ReportingService.getFile({
        plNumber: this.form.plNumber
      });
      this.form.operationalDate = new Date(response.date)
        .toLocaleString("en-BE")
        .replace(",", "");
      this.form.operationalMessage = response.actions;
      this.form.location = response.location;
      this.form.unit = response.unit;
    },
    async addWorkForceEvent() {
      const response = await ReportingService.addWorkForceEvent({
        absentee: this.form.absentee,
        replacement: this.form.replacement,
        extra: this.form.workforceMessage
      });
      this.form.workForceSucceeded = true;
      if (response.bool) {
        this.form.absentee = "";
        this.form.replacement = "";
        this.form.workforceMessage = "";
      }
    },
    async addTechnicalEvent() {
      const response = await ReportingService.addTechnicalEvent({
        description: this.form.technicalMessage
      });
      this.form.technicalSucceeded = true;
      if (response.bool) {
        this.form.technicalMessage = "";
      }
    },
    async addReport() {
      const response = await ReportingService.addReport({
        plNumber: this.form.plNumber,
        location: this.form.location,
        date: this.form.operationalDate,
        message: this.form.operationalMessage,
        unit: this.form.unit
      });
      this.form.operationalSucceeded = true;
      if (response.bool) {
        this.form.plNumber = "";
        this.form.location = "";
        this.form.operationalDate = "";
        this.form.operationalMessage = "";
        this.form.crossBorderPursuit = false;
        this.form.specificEvent = false;
        this.form.BIN = false;
        this.form.telecomOperator = false;
        this.form.signalingPerson = false;
        this.form.signalingVehicle = false;
        this.form.signalingObject = false;
        this.form.collocation = false;
        this.form.firstSchouwarts = false;
        this.form.secondSchouwarts = false;
        this.form.sexualAgression = false;
        this.form.firstSASchouwarts = false;
        this.form.secondSASchouwarts = false;
      }
    }
  }
});
</script>
