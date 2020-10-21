<template>
  <div id="app">
     <div class='container-fluid-sm m-0' >
       <navigation-bar />
      <!-- <div class="row" id="optionsMenu">
        <label id="menuLabel" for="graphcheck">Add graph</label>
        <input type="checkbox" id="graphcheck" name="graphcheck" v-model="isGraphOn">
        <label id="menuLabel" for="tablecheck">Add table</label>
        <input type="checkbox" id="tablecheck" name="tablecheck" v-model="isTableOn">
        <label id="menuLabel" for="stopwatchcheck">Add stopwatch</label>
        <input type="checkbox" id="stopwatchcheck" name="stopwatchcheck" v-model="isStopwatchOn">
        <label id="menuLabel" for="workspacecheck">Add workspace</label>
        <input type="checkbox" id="workspacecheck" name="workspacecheck" v-model="isWorkspaceOn">
        <label id="menuLabel" for="autocommandcheck">Add AutoCommands</label>
        <input type="checkbox" id="autocommandcheck" name="autocommandcheck" v-model="isAutoCommandOn">
        
        <label id="menuLabel"><popup-menu id="help" active_height='40px' active_width='40px'>
          Hotkeys:<br>
          Press s to start pendulum<br>
          Press f to enter free mode<br>
          Press b to brake.<br>
          On workspace hold r and drag object to rotate.<br>
          On workspace press w to allow objects to be interactable.<br>
          </popup-menu>
          
          Help</label>
        
      </div> -->

  <div class="row">
    <!-- LEFT HAND COLUMN -->
    <div class="col-6">
      <webcam-stream />
      <control-panel />

      <div v-if="isTableOn">
            <table-output />
        </div>

    </div>
    
    <!-- RIGHT HAND COLUMN -->
    <div class="col-6">
      <div class='row'>
      <data-recorder />
          <div v-if="isStopwatchOn">
                <stopwatch />
          </div>
      </div>
    <div v-if="isGraphOn">
        <graph-output type="graph" id="0" />
      </div>
      <div v-if="isAutoCommandOn">
            <auto-command />
        </div>
    </div>

</div>

    <div v-if="isWorkspaceOn">
      <workspace />
    </div>

<!-- LOWER ROW -->
<!-- LEFT HAND COLUMN -->
      <div class="row">
        <!-- RIGHT HAND COLUMN -->
        

      </div>
    </div>
  </div>
</template>

<script>

//import UserInput from "./components/UserInput.vue";
import GraphOutput from "./components/GraphOutput.vue";
import TableOutput from "./components/TableOutput.vue";
import Stopwatch from "./components/Stopwatch.vue";
import Workspace from "./components/Workspace.vue";
import WebcamStream from "./components/WebcamStream.vue";
import ControlPanel from "./components/ControlPanel.vue";
import DataRecorder from "./components/DataRecorder.vue";
import AutoCommand from "./components/AutoCommand.vue";
import NavigationBar from "./components/NavigationBar.vue";
//import PopupMenu from "./components/PopupMenu.vue";
import { eventBus } from "./main.js";

export default {
  name: 'App',
  components: {
    //UserInput,
    GraphOutput,
    TableOutput,
    Stopwatch,
    Workspace,
    WebcamStream,
    ControlPanel,
    DataRecorder,
    AutoCommand,
    NavigationBar,
    //PopupMenu,
  },
  mounted(){
    eventBus.$on('togglegraph', this.toggleGraph);
    eventBus.$on('toggleworkspace', this.toggleWorkspace);
    eventBus.$on('toggletable', this.toggleTable);
    eventBus.$on('togglestopwatch', this.toggleStopwatch);
    eventBus.$on('toggleautocommands', this.toggleAutoCommands);
    eventBus.$on('clearworkspace', this.clearWorkspace);
  },
  data() {
    return {
      isTableOn: false,
      isGraphOn: false,
      isStopwatchOn: false,
      isWorkspaceOn: false,
      isAutoCommandOn: false,
    }
  },
  methods:{
    toggleGraph(){
      this.isGraphOn = !this.isGraphOn;
    },
    toggleWorkspace(){
      this.isWorkspaceOn = !this.isWorkspaceOn;
    },
    toggleTable(){
      this.isTableOn = !this.isTableOn;
    },
    toggleStopwatch(){
      this.isStopwatchOn = !this.isStopwatchOn;
    },
    toggleAutoCommands(){
      this.isAutoCommandOn = !this.isAutoCommandOn;
    },
    clearWorkspace(){
      this.isWorkspaceOn = false;
    }
  },
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
  background-color: rgba(161, 161, 161, 0.39);
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

#menuLabel{
  padding: 15px 15px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	outline: none;
	color: #fff;

	border: none;
	border-radius: 15px;
}

#menuLabel:active{
  background-color: #3e8e41;
}

input[type=checkbox] {
  position: left;
  cursor: pointer;
}

.border{
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.637);
}

</style>
