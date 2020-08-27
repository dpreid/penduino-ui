<template>
  <div id="app">
     <div class="container-fluid" >
      <div class="row" id="optionsMenu">
        <label for="graphcheck">Add graph</label>
        <input type="checkbox" id="graphcheck" name="graphcheck" v-model="isGraphOn">
        <label for="tablecheck">Add table</label>
        <input type="checkbox" id="tablecheck" name="tablecheck" v-model="isTableOn">
        <label for="stopwatchcheck">Add stopwatch</label><br>
        <input type="checkbox" id="stopwatchcheck" name="stopwatchcheck" v-model="isStopwatchOn">
        <label for="workspacecheck">Add workspace</label><br>
        <input type="checkbox" id="workspacecheck" name="workspacecheck" v-model="isWorkspaceOn">
      </div>


  <div>
    <webcam-stream />
  </div>
  <div>
    <control-panel />
</div>

    <div v-if="isWorkspaceOn">
      <workspace />
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
import ControlPanel from "./components/ControlPanel.vue";

export default {
  name: 'App',
  components: {
    UserInput,
    GraphOutput,
    TableOutput,
    Stopwatch,
    Workspace,
    WebcamStream,
    ControlPanel,
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
  margin-top: 0px;
}

html, body {
	background-color: #fff;
	text-align: center;
	font-family: 'Comfortaa', cursive;
}

#optionsMenu{
  justify-content:space-evenly;
  align-items: center;
  background-color: #333;
  color: red;
  align-content: center;
  margin: auto;
  width: 100%;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

label{
  padding: 15px 15px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	outline: none;
	color: #fff;

	border: none;
	border-radius: 15px;
}

label:active{
  background-color: #3e8e41;
}

input[type=checkbox] {
  position: left;
  cursor: pointer;
}

</style>
