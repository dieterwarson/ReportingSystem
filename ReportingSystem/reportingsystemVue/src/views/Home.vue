<template>
  <div class="home">
    <div class="container my-4">
      <!-- Search form -->
      <form
        class="form-inline d-flex justify-content-center md-form form-sm mt-0"
      >
        <i class="fas fa-search" aria-hidden="true"></i>
        <input
          class="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="PL-nummer"
          aria-label="Search"
        />
      </form>

      <router-link
        to="/AddReport"
        tag="button"
        class="btn btn-primary btn-lg btn-block"
        >+ Nieuw verslag</router-link
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
              to="/OverviewShift"
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
  name: "Home",
  components: {}
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
