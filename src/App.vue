<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <canvas id="video-canvas"></canvas>
      </div>
      
      <div class="row">
        <div class="col-6">
          <user-input />
          <graph-output type="graph" id="0" />
          <table-output />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserInput from "./components/UserInput.vue";
import GraphOutput from "./components/GraphOutput.vue";
import TableOutput from "./components/TableOutput.vue";

export default {
  name: 'App',
  components: {
    UserInput,
    GraphOutput,
    TableOutput
  },
  methods:{
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
