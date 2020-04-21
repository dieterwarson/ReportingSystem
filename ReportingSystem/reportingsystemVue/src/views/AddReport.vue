<template>

<!-- script has to be implemented again to achieve the seperate forms -->
  <div class="container pt-5 pb-5">
    <h1>Voeg verslag toe</h1>
            <form id="addReport">
                <div class="btn-group d-flex" role="group" aria-label="Justified button group" >
                    <button type="button" class="btn btn-primary" @click.prevent="getOperational">Operationeel</button>
                    <button type="button" class="btn btn-primary" @click.prevent="getWorkforce">Personeel</button>
                    <button type="button" class="btn btn-primary" @click.prevent="getTechnical">Technisch</button>
                </div>

                <section v-if="step == 'Operational'">
                    <h3>Operationeel</h3>
                    <div class="input-group">
                            <input name ="plNumber" v-model="form.plNumber" type="text" placeholder="PL-nummer" class="form-control form-control-lg">
                            <button class="btn btn-large btn-block btn-success" type="button" @click="operationalReport">Zoek fiche</button>
                        <input name="location" v-model="form.location" type="text" placeholder="Adres" class="form-control form-control-lg">
                        <input name="date" v-model="form.operationalDate" type="text" placeholder="Datum" class="form-control form-control-lg">
                    </div>
                    
<!-- CODE FOR LOADING CHECKBOXES BY VALUES IN TS

                    <checkbox-group>
                        <checkbox-component v-for="(option, index) in operationalOptions" v-model="formData[option.label]" :key="option.id" :label="option.label" :name="name">
                        </checkbox-component>
                    </checkbox-group>
-->

                    <input v-model="form.operationalMessage" type="text" placeholder="Data" class="form-control form-control-lg">
                    <button class="btn btn-large btn-block btn-success" type="button" @click="operationalReport">Opslaan</button>

                </section>


                <section v-if="step == 'Workforce'">
                    <h3>Personeel</h3>
                    <textarea v-model="form.workforceMessage" placeholder="Type your message" class="form-control form-control-lg"></textarea>
                    <button class="btn btn-large btn-block btn-primary" type="button" @click.prevent="saveButton">Opslaan</button>
                </section>

                <section v-if="step == 'Technical'">
                    <h3>Technisch</h3>
                    <textarea v-model="form.technicalMessage" placeholder="Type your message" class="form-control form-control-lg"></textarea>
                    <button class="btn btn-large btn-block btn-primary" type="button" @click.prevent="saveButton">Opslaan</button>
                </section>     

            </form>         
        </div>

        
</template>

<script lang="ts">
import Vue from 'vue'
import ReportingService from "../services/ReportingService"
export default Vue.extend({
    data() {
        return {
        step: "Operational",
        form: {
            //OPERATIONAL OBJECTS
            plNumber: null,
            location: null,
            operationalDate: null,
            operationalMessage: null,
            checkedOperationalBoxes: null,

            //WORKFORCE OBJECTS
            absent: null,
            workforceMessage: null,
            secretNotifications: null,
            workplaceEvent: null,
            workforceDescription: null,
            monitoring: null,
            workforceDate: null,
            shift: null,
            absentee: null,
            substitute: null,
            employee: null,
            workplaceEventType: null,


            //TECHNICAL OBJECTS
            technicalMessage: null,
            technicalProblems: null,
            technicalDescription: null,
            duration: null,
            problemType: null
        }
    }
    },

    methods: {
        getOperational : function() {
            if (this.step != 'Operational')
                this.step = 'Operational'
        },
        getWorkforce : function() {
            if (this.step != 'Workforce')
                this.step = 'Workforce'
        },
        getTechnical : function() {
            if (this.step != 'Technical')
                this.step = 'Technical'
        },

        saveButton : function() {
            alert('send to db');
        },
        async operationalReport() {
            const response = await ReportingService.addReport({
                plNumber: this.form.plNumber
                })
                this.form.plNumber = response.plNumber;
                this.form.operationalDate = response.date.toString();
                this.form.operationalMessage = response.actions;
                this.form.location = response.location;
        }
    }
    


})
</script>
