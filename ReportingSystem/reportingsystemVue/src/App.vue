<template>
<div id="app">
  <img id="logo" src="./assets/FedPol.jpg">
  <div id="nav">
    <router-link to="/">Startscherm</router-link>
  </div>
  <router-view />
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #24348c;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #24348c;
}

#nav a.router-link-exact-active {
  color: #4d59a2;
}

#logo {
  width: 12%;
  margin-top: 30px;
}
</style>
