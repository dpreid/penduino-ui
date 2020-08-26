<template>
  <div id="app">
  <div>
    <webcam-stream />
  </div>
    <div v-if="isWorkspaceOn">
      <workspace />
    </div>

    <div class="container-fluid">
      <div class="row">
        <label for="graphcheck">Add graph</label><br>
        <input type="checkbox" id="graphcheck" name="graphcheck" v-model="isGraphOn">
        <label for="tablecheck">Add table</label><br>
        <input type="checkbox" id="tablecheck" name="tablecheck" v-model="isTableOn">
        <label for="stopwatchcheck">Add stopwatch</label><br>
        <input type="checkbox" id="stopwatchcheck" name="stopwatchcheck" v-model="isStopwatchOn">
        <label for="workspacecheck">Add workspace</label><br>
        <input type="checkbox" id="workspacecheck" name="workspacecheck" v-model="isWorkspaceOn">
      </div>


      <div class="row">
        <div class="col-6">
          <user-input />
          <div v-if="isTableOn">
            <table-output />
          </div>
          <div v-if="isStopwatchOn">
            <stopwatch />
          </div>
        </div>
        <div class="col-6">
          <div v-if="isGraphOn">
            <graph-output type="graph" id="0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserInput from "./components/UserInput.vue";
import GraphOutput from "./components/GraphOutput.vue";
import TableOutput from "./components/TableOutput.vue";
import Stopwatch from "./components/Stopwatch.vue";
import Workspace from "./components/Workspace.vue";
import WebcamStream from "./components/WebcamStream.vue";

export default {
  name: 'App',
  components: {
    UserInput,
    GraphOutput,
    TableOutput,
    Stopwatch,
    Workspace,
    WebcamStream
  },
  methods:{
    
  },
  data() {
    return {
      isTableOn: false,
      isGraphOn: false,
      isStopwatchOn: false,
      isWorkspaceOn: false,
    }
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
