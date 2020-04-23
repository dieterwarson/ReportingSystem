<template>
  <div class="statistics">
    <h1>Statistieken</h1>

    <div class="container my-4">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div class="text-left">
              <div>
                <input
                  type="checkbox"
                  value="helikopter ingezet: 5"
                  id="checkbox-helicopter"
                  v-model="categories"
                />
                <label for="checkbox">helikopter ingezet</label>
                <br />
                <input
                  type="checkbox"
                  value="grensoverschrijdende achtervolging: 9"
                  id="checkbox-crossed-border"
                  v-model="categories"
                />
                <label for="checkbox">grensoverschrijdende achtervolging</label>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div class="text-left">
              <div>
                <ul>
                  <li v-for="category in this.categories" :key="category.id">
                    {{ category }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-4">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div class="text-left">
              <div>
                <input
                  type="checkbox"
                  value="helikopter ingezet: 5 in 2018"
                  id="2018"
                  v-model="categories"
                />
                <label for="checkbox">2018</label>
                <br />
                <input
                  type="checkbox"
                  value="grensoverschrijdende achtervolging: 9 in 2019"
                  id="2019"
                  v-model="categories"
                />
                <label for="checkbox">2019</label>
              </div>
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
      helicopterCount:5,
      crossedBorderCount:9,
      categories: []
    };
  }
};
</script>
