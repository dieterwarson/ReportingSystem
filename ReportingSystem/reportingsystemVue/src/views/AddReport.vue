<template>
 <!-- script has to be implemented again to achieve the seperate forms -->
 <div class="container pt-5 pb-5">
   <h1>Voeg gebeurtenis toe</h1>
   <form id="addReport">

     <div class="btn-group d-flex" role="group" aria-label="Justified button group">
       <button id="operationalButton" type="button" class="btn btn-info" @click.prevent="getOperational">Operationeel</button>
       <button id="workForceButton" type="button" class="btn btn-primary" @click.prevent="getWorkforce">Personeel</button>
       <button id="technicalButton" type="button" class="btn btn-primary" @click.prevent="getTechnical">Technisch</button>
     </div>

     <section v-if="step == 'Operational'">
       <h3>Operationeel</h3>
       <div v-if="(Object.keys(reportTypes).length === 0)">
         <p>Er zijn nog geen types</p>
       </div>
       <form v-else id="typeSelector">
         <div class="text-sm-left">
           <div class="checkbox-container text-sm-left col-sm-4">
             <!-- Types -->
             <div v-for="type in reportTypes.operationalTypes" :key="type.id">
               <div class="typecontainer text-lg-left" id="operational">
                 <input type="checkbox" :id="type.typeName" :value="type.typeName" v-model="operationalTypeSelected.selectedTypes" />
                 <label>{{ type.typeName }}</label>
               </div>
               <!-- Subtypes -->
               <div v-for="subtype in reportTypes.operationalSubtypes" :key="subtype.id">
                 <div v-if="subtype.operationalTypeId == type.id">
                   <div class="subtypecontainer text-lg-left" id="operational">
                     <input type="checkbox" :id="type.typeName" :value="subtype.typeName" v-model="operationalTypeSelected.selectedSubtypes" @change="selectOperationalParent(subtype.operationalTypeId)" />
                     <label>{{ subtype.typeName }}</label>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <!-- Deselect all button -->
           <button @click.prevent="uncheckAllOperational(false)" class="btn btn-danger extraMargin">Deselecteer alles</button>
         </div>
       </form>
       <div class="input-group" style="height: 20%;">
         <input name="plNumber" v-model="form.plNumber" type="text" placeholder="PL-nummer" class="form-control form-control-lg" />
       </div>
       <div class="input-group" style="height: 20%;">
         <button class="btn btn-block btn-success" type="button" @click.prevent="getFile">Zoek fiche</button>
       </div>
       <div class="input-group" style="height: 20%;">
         <input name="location" v-model="form.location" type="text" placeholder="Adres" class="form-control form-control-lg" />
         <input name="date" v-model="form.operationalDate" type="text" placeholder="Datum" class="form-control form-control-lg" />
         <input name="unit" v-model="form.unit" type="text" placeholder="Unit" class="form-control form-control-lg" />
       </div>
       <div class="input-group" style="height: 39%;">
         <input v-model="form.operationalMessage" type="text" placeholder="Extra info" class="form-control form-control-lg" />
       </div>
       <label><input type="checkbox" v-model="form.operationalMonitoring">Opvolging nodig</label>
       <label><input type="checkbox" v-model="form.operationalPrio">Prioriteit</label>

       <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addOperationalEvent">Opslaan</button>
       <small v-if="form.operationalFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
       <small v-if="form.operationalSucceeded">Het verslag is toegevoegd</small>
     </section>
     <section v-if="step == 'Workforce'">
       <h3>Personeel</h3>
       <div class="input-group">
         <label>
           <h5>Voorval tijdens de dienst</h5>
         </label>
         <div class="checkbox-container text-sm-left col-sm-4">
           <!-- Types -->
           <div v-for="type in reportTypes.workplaceTypes" :key="type.id">
             <div class="typecontainer text-lg-left" id="workplace">
               <input type="radio" :id="type.typeName" :value="type.typeName" v-model="typeSelected.typeName" @change="deselectSubtype(); switchWorkForceOption()" />
               <label>{{ type.typeName }}</label>
             </div>
             <!-- Subtypess -->
             <div v-for="subtype in reportTypes.workplaceSubtypes" :key="subtype.id">
               <div v-if="subtype.workplaceTypeId == type.id">
                 <div class="subtypecontainer text-lg-left" id="workplace">
                   <input type="radio" :id="type.typeName" :value="subtype.typeName" v-model="typeSelected.subtypeName" @change="selectParent(subtype.workplaceTypeId, 'Workplace'); switchWorkForceOption()" />
                   <label>{{ subtype.typeName }}</label>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="input-group">
           <label><input @click='changeToSecretary();' type="checkbox" v-model="secretary">Melding aan secretariaat</label>
           <div class="input-group" v-if="!secretary">
             <div class="input-group">
               <input name="Name absentee" v-model="form.absentee" type="text" placeholder="Naam afwezige" class="form-control form-control-lg" />
               <input name="Naam" v-model="form.replacement" type="text" placeholder="Naam vervanger" class="form-control form-control-lg" />
             </div>

             <input name="Message" v-model="form.workforceMessage" type="text" placeholder="Extra info" class="form-control form-control-lg" />
             <label><input type="checkbox" v-model="form.workPlaceMonitoring">Opvolging</label>
             <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addWorkForceEvent">Opslaan</button>
           </div>
           <div class="input-group" v-else>
             <input name="Message" v-model="form.secretNotification" type="text" placeholder="Informatie voor het secretariaat" class="form-control form-control-lg" />
             <br /><br /><label><input type="checkbox" v-model="form.secretMonitoring">Opvolging nodig</label><br /><br />
             <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addSecretaryNotification">Opslaan</button>

           </div>
           <small v-if="form.workForceFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
           <small v-if="form.WorkForceSucceeded">Het verslag is toegevoegd</small>
         </div>
       </div>
     </section>

     <section v-if="step == 'Technical'">
       <h3>Technisch</h3>

       <div class="row">

         <label>
           <h5>Logistiek</h5>
         </label>
         <br />
         <br />
         <div class="checkbox-container text-sm-left col-sm-4">
           <!-- Types -->
           <div v-for="type in reportTypes.defectTypes" :key="type.id">
             <div class="typecontainer text-lg-left" id="defect">
               <input @click="deselectMalfunction" type="radio" :id="type.typeName" :value="type.typeName" v-model="defectTypeSelected.typeName" @change="deselectSubtype" />
               <label>{{ type.typeName }}</label>
             </div>
             <!-- Subtypes -->
             <div v-for="subtype in reportTypes.defectSubtypes" :key="subtype.id">
               <div v-if="subtype.defectTypeId == type.id">
                 <div class="subtypecontainer text-lg-left" id="defect">
                   <input @click="deselectMalfunction" type="radio" :id="type.typeName" :value="subtype.typeName" v-model="defectTypeSelected.subTypeName" @change="selectParent(subtype.defectTypeId, 'Defect')" />
                   <label>{{ subtype.typeName }}</label>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <label>
           <h5>Technisch</h5>
         </label>
         <br />
         <br />
         <div class="checkbox-container text-sm-left col-sm-4">
           <!-- Types -->
           <div v-for="type in reportTypes.malfunctionTypes" :key="type.id">
             <div @click="deselectDefect" class="typecontainer text-lg-left" id="malfunction">
               <input type="radio" :id="type.typeName" :value="type.typeName" v-model="malfunctionTypeSelected.typeName" @change="deselectSubtype" />
               <label>{{ type.typeName }}</label>
             </div>
             <!-- Subtypes -->
             <div v-for="subtype in reportTypes.malfunctionSubtypes" :key="subtype.id">
               <div v-if="subtype.malfunctionTypeId == type.id">
                 <div class="subtypecontainer text-lg-left" id="malfunction">
                   <input @click="deselectDefect" type="radio" :id="type.typeName" :value="subtype.typeName" v-model="malfunctionTypeSelected.subTypeName" @change="selectParent(subtype.malfunctionTypeId, 'Malfunction')" />
                   <label>{{ subtype.typeName }}</label>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="container" v-if="defect">
           <div class="input-group">
             <div class="input-group">
               <input name="Message" v-model="form.defectDescription" type="text" placeholder="Info over defect" class="form-control form-control-lg" />
               <label><input type="checkbox" v-model="form.defectMonitoring">Opvolging</label>
             </div>
           </div>
           <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addDefect">Opslaan</button>
         </div>
         <div class='container' v-else>
           <div class="input-group">
             <div class="input-group">
               <input name="Message" v-model="form.malfunctionDescription" type="text" placeholder="Info over probleem" class="form-control form-control-lg" />
               <input name="duration" v-model="form.malfunctionDuration" type="text" placeholder="Sinds wanneer is dit probleem er" class="form-control form-control-lg">
               <label><input type="checkbox" v-model="form.malfunctionMonitoring">Opvolging</label>
             </div>
           </div>
           <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addMalfunction">Opslaan</button>

           <small v-if="form.technicalFailed">Er is iets misgegaan bij het toevoegen aan de database</small>
           <small v-if="form.technicalSucceeded">Het verslag is toegevoegd</small>
         </div>
       </div>
     </section>
   </form>
   <div>{{typeSelected}}</div>
   <div>
     {{operationalTypeSelected}}
   </div>
   <div>
     {{malfunctionTypeSelected}}
   </div>
   <div>
     {{defectTypeSelected}}
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
      test: true,
      secretary: true,
      defect: true,
      step: "Operational",
      form: {
        //OPERATIONAL OBJECTS
        plNumber: "",
        location: "",
        operationalDate: "",
        operationalMessage: "",
        operationalMonitoring: false,
        operationalFailed: false,
        operationalSucceeded: false,
        operationalPrio: false,
        unit: "",
        //WORKFORCE OBJECTS
        absent: "",
        replacement: "",
        workforceMessage: "",
        secretNotification: "",
        secretMonitoring: false,
        workplaceEvent: null,
        workPlaceMonitoring: false,
        workforceDate: null,
        absentee: "",
        substitute: null,
        employee: null,
        workplaceEventType: null,
        workForceFailed: false,
        workForceSucceeded: false,
        //TECHNICAL OBJECTS
        defectDescription: "",
        defectMonitoring: false,

        malfunctionDescription: "",
        malfunctionDuration: "",
        malfunctionMonitoring: false,

        technicalMessage: "",
        technicalProblems: null,
        technicalDescription: null,
        technicalFailed: false,
        technicalSucceeded: false
      },
      tokenData: {
        authorId: 0
      },
      reportTypes: {
        operationalTypes: [],
        operationalSubtypes: [],
        workplaceTypes: {},
        workplaceSubtypes: {},
        defectTypes: {},
        defectSubtypes: {},
        malfunctionTypes: {},
        malfunctionSubtypes: {}
      },
      operationalTypeSelected: {
        selectedTypes: [] as string[],
        selectedSubtypes: [] as string[]
      },
      typeSelected: {
        typeName: "",
        subtypeName: ""
      },
      malfunctionTypeSelected: {
        typeName: "",
        subTypeName: ""
      },
      defectTypeSelected: {
        typeName: "Schade aan voertuig",
        subTypeName: ""
      }
    }
  },
  mounted() {
    this.loadData();
    if (window.localStorage.getItem("token") === null || window.localStorage.getItem("token") === undefined) {
      window.location.href = "/login";
    } else {
      const decodedToken: any = jwt.decode(window.localStorage.getItem("token") !);
      if (decodedToken.rights < 0 || decodedToken.rights > 1) {
        window.location.href = "/login";
      }

      if (decodedToken === undefined) {
        window.location.href = "/login"
      }
      this.tokenData.authorId = decodedToken.id;
    }
  },
  methods: {
    getOperational: function () {
      if (this.step != "Operational") {
        this.step = "Operational";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-primary", "btn-info");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },

    deselectMalfunction: function () {
      if (this.malfunctionTypeSelected.typeName !== '') {
        this.defect = true;
        this.malfunctionTypeSelected.typeName = '';
        this.malfunctionTypeSelected.subTypeName = '';

      }
    },
    deselectDefect: function () {
      if (this.defectTypeSelected.typeName !== '') {
        this.defect = false;
        this.defectTypeSelected.typeName = '';
        this.defectTypeSelected.subTypeName = '';
      }
    },
    switchWorkForceOption: function () {
      if (this.secretary)
        this.secretary = !this.secretary;
    },
    getWorkforce: function () {
      if (this.step != "Workforce") {
        this.step = "Workforce";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-primary", "btn-info");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    getTechnical: function () {
      if (this.step != "Technical") {
        this.step = "Technical";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-primary", "btn-info");
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    changeToSecretary: function () {
      if (!this.secretary) {
        this.typeSelected.typeName = "",
          this.typeSelected.subtypeName = ""
      }
    },
    async getFile() {
      const response = await ReportingService.getFile({
        plNumber: this.form.plNumber
      });
      this.form.operationalDate = new Date(response.date)
        .toLocaleString("nl-BE");
      this.form.operationalMessage = response.actions;
      this.form.location = response.location;
      this.form.unit = response.unit;
    },
    async addDefect() {
      const response = await ReportingService.addDefect({
        id: this.tokenData.authorId,
        description: this.form.defectDescription,
        monitoring: this.form.defectMonitoring,
        type: this.defectTypeSelected.typeName,
        subtype: this.defectTypeSelected.subTypeName
      })
    },
    async addMalfunction() {
      const response = await ReportingService.addMalfunction({
        id: this.tokenData.authorId,
        description: this.form.malfunctionDescription,
        monitoring: this.form.malfunctionMonitoring,
        type: this.malfunctionTypeSelected.typeName,
        subtype: this.malfunctionTypeSelected.subTypeName,
        duration: this.form.malfunctionDuration
      })
    },
    async addSecretaryNotification() {
      const response = await ReportingService.addSecretaryNotification({
        id: this.tokenData.authorId,
        description: this.form.secretNotification,
        monitoring: this.form.secretMonitoring,
      });
      if (response.bool) {
        this.form.secretNotification = "",
          this.form.secretMonitoring = false
      }

    },
    async addWorkForceEvent() {
      const response = await ReportingService.addWorkForceEvent({
        absentee: this.form.absentee,
        substitute: this.form.replacement,
        message: this.form.workforceMessage,
        id: this.tokenData.authorId,
        monitoring: this.form.workPlaceMonitoring,
        type: this.typeSelected.typeName,
        subtype: this.typeSelected.subtypeName,
      });
      if (response.bool) {
        this.form.workForceSucceeded = true;
        this.form.absentee = "";
        this.form.replacement = "";
        this.form.workforceMessage = "";
      }
    },
    async addOperationalEvent() {
      const response = await ReportingService.addOperationalEvent({
        plNumber: this.form.plNumber,
        location: this.form.location,
        date: this.form.operationalDate,
        message: this.form.operationalMessage,
        unit: this.form.unit,
        id: this.tokenData.authorId,
        types: this.operationalTypeSelected.selectedTypes,
        subtypes: this.operationalTypeSelected.selectedSubtypes,
        monitoring: this.form.operationalMonitoring,
        priority: this.form.operationalPrio
      });
      this.uncheckAllOperational(false);
      this.form.operationalMonitoring = false;
      this.form.operationalSucceeded = true;
      if (response.bool) {
        this.form.plNumber = "";
        this.form.location = "";
        this.form.operationalDate = "";
        this.form.operationalMessage = "";

      }
    },
    loadData: function () {
      ReportingService.getAllReports("/api/reports/operationalTypes").then(
        res => (this.reportTypes.operationalTypes = res.operationalTypes,
          this.reportTypes.operationalSubtypes = res.operationalSubtypes)
      );
      ReportingService.getAllReports("/api/reports/workplaceTypes").then(
        res => (this.reportTypes.workplaceTypes = res.workplaceTypes, this.reportTypes.workplaceSubtypes)
      );

      ReportingService.getAllReports("/api/reports/defectTypes").then(
        res => (this.reportTypes.defectTypes = res.defectTypes, this.reportTypes.defectSubtypes = res.defectSubtypes)
      );

      ReportingService.getAllReports("/api/reports/malfunctionTypes").then(
        res => (this.reportTypes.malfunctionTypes = res.malfunctionTypes, this.reportTypes.malfunctionSubtypes = res.malfunctionSubtypes)
      );
    },
    uncheckAll: function () {
      this.typeSelected.typeName = "";
      this.deselectSubtype();
    },

    /**
     * Unchecks all subtypes of Administrative and Technical.
     */
    deselectSubtype: function () {
      this.typeSelected.subtypeName = "";
      this.defectTypeSelected.subTypeName = "";
      this.malfunctionTypeSelected.subTypeName = "";
    },

    /**
     * Unchecks all types and subtypes of Operational.
     */
    uncheckAllOperational: function (status: boolean) {
      this.operationalTypeSelected.selectedTypes = [];
      this.operationalTypeSelected.selectedSubtypes = [];
    },

    /**
     * Handles what happens when the 'Operationeel' checkbox is clicked.
     * If not every box is selected, then select all boxes.
     * If all boxes are selected, then deselect all boxes.
     */

    /**
     * When a checkbox of a subtype is clicked, select its parent type also.
     */
    selectParent: function (parentId: number, parent: string) {
      let parentTypes: any;

      if (parent == "Workplace") {
        parentTypes = this.reportTypes.workplaceTypes;
      } else if (parent == "Defect") {
        parentTypes = this.reportTypes.defectTypes;
      } else if (parent == "Malfunction") {
        parentTypes = this.reportTypes.malfunctionTypes;
      }

      for (let i = 0; i < parentTypes.length; i++) {
        const element = parentTypes[i];
        if (parentId == element.id) {
          if (parent == "Workplace") {
            this.typeSelected.typeName = element.typeName;
          } else if (parent == "Defect") {
            this.defectTypeSelected.typeName = element.typeName;
          } else if (parent == "Malfunction") {
            this.malfunctionTypeSelected.typeName = element.typeName;
          }

        }
      }
    },

    /**
     * If a subtype is selected, its parent type needs to be selected as well.
     */
    selectOperationalParent: function (parentId: number) {
      const parentTypes: any = this.reportTypes.operationalTypes;

      for (let i = 0; i < parentTypes.length; i++) {
        const parentType = parentTypes[i];
        if (parentType.id == parentId) {
          if (
            !this.operationalTypeSelected.selectedTypes.includes(
              parentType.typeName
            )
          ) {
            this.operationalTypeSelected.selectedTypes.push(
              parentType.typeName
            );
          }
        }
      }
    },

    /**
     * If a type is deselected, its subtypes need to be deselected as well.
     */

  }
});
</script>
