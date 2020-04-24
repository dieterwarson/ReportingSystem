<template>
  <div class="home">
    <div class="container my-4">
      <!-- Search form -->
      <form>
        <div class="form-row align-items-center">
          <div class="col my-1">
            <input
              type="text"
              class="form-control"
              id="inlineFormInputName"
              placeholder="Trefwoord"
            />
          </div>
          <div class="col my-1">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="PL-nummer"
              />
            </div>
          </div>

          <div class="col-auto my-1">
            <button type="submit" class="btn btn-secondary btn-block">
              Zoek
            </button>
          </div>
        </div>
      </form>

      <router-link
        to="/AddReport"
        tag="button"
        class="btn btn-primary btn-lg btn-block"
        >+ Nieuwe gebeurtenis</router-link
      >

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <router-link
              to="/Reports"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Verslagen</router-link
            >
          </div>

          <div class="col-sm">
            <router-link
              to="/Notifications"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Meldingen</router-link
            >
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <router-link
              to="/reportView?reportId=1"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Overzicht vorige shift</router-link
            >
          </div>

          <div class="col-sm">
            <router-link
              to="/Statistics"
              tag="button"
              class="btn btn-secondary btn-lg btn-block"
              >Statistieken</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
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
