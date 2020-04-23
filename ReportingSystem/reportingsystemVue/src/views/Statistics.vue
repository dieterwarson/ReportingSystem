<template>
  <div class="statistics">
    <h1>Statistieken</h1>

    <div class="container my-4">
      <h3>2020</h3>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Helikopter ingezet</h5>
              <p class="card-text">15 keer</p>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Grensoverschrijdende achtervolging</h5>
              <p class="card-text">23 keer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      helicopterCount: 5,
      crossedBorderCount: 9,
      categories: [],
    };
  },
};
</script>
