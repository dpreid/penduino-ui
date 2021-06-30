<template>
  <div id="app" class='container-fluid-sm m-0'>
       <navigation-bar />

        <div v-if="isWorkspaceOn">
          <workspace />
        </div>

        <streams id='streams' />

  <div class='row' id='component-grid'>

      <div class='col-lg-6 col-sm-12' id='left-screen'>
        <div class='col drop-area' id='drop_0_0' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><webcam-stream id='webcam-stream' /></div>
        <div class='col drop-area' id='drop_1_0' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-stream id='data-stream' /></div>
        <div class='col drop-area' id='drop_2_0' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><table-output v-if='isTableOn' id='table' /></div>
        <div class='col drop-area' id='drop_3_0' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent></div>
        <div class='col drop-area' id='drop_4_0' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent></div>
      </div>

      <div class='col-lg-6 col-sm-12' id='right-screen'>
        <div class='col drop-area' id='drop_0_1' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-recorder id='data-recorder' /></div>
        <div class='col drop-area' id='drop_1_1' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><stopwatch v-if='isStopwatchOn' id='stopwatch'/></div>
        <div class='col drop-area' id='drop_2_1' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><graph-output v-if='isGraphOn' id='graph' type="graph" /></div>
        <div class='col drop-area' id='drop_3_1' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><auto-command v-if='isAutoCommandOn' id='auto-command' /></div>
        <div class='col drop-area' id='drop_4_1' draggable='true' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent></div>
      </div>

  </div>
  <!-- <div class="row"> -->
    <!-- LEFT HAND COLUMN -->
    <!-- <div class="col-sm-6">
      <streams />

      <div v-if="isTableOn">
            <table-output />
        </div>

    </div> -->
    
    <!-- RIGHT HAND COLUMN -->
    <!-- <div class="col-sm-6">
     <div class='row'>
            <div class='col-sm-6'><data-recorder /></div> 
            <div class='col-sm-6' v-if='isStopwatchOn'><stopwatch /></div>
      </div>
    <div v-if="isGraphOn">
        <graph-output type="graph" id="0" />
      </div>
      <div v-if="isAutoCommandOn">
            <auto-command />
        </div>
    </div> -->

<!-- </div> -->

   

     
   
  </div>
</template>

<script>


import GraphOutput from "./components/GraphOutput.vue";
import TableOutput from "./components/TableOutput.vue";
import Stopwatch from "./components/Stopwatch.vue";
import Workspace from "./components/Workspace.vue";
import WebcamStream from "./components/WebcamStream.vue";
import DataStream from "./components/DataStream.vue";
import DataRecorder from "./components/DataRecorder.vue";
import AutoCommand from "./components/AutoCommand.vue";
import NavigationBar from "./components/NavigationBar.vue";
import Streams from "./components/Streams.vue";

import { eventBus } from "./main.js";

export default {
  name: 'App',
  components: {
    Streams,
    WebcamStream,
    DataStream,
    GraphOutput,
    TableOutput,
    Stopwatch,
    Workspace,
    DataRecorder,
    AutoCommand,
    NavigationBar,

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
    dragComponent(event){
        event.dataTransfer.effectAllowed = 'move';
         console.log("Dragged id: " + event.target.id);
         let element = event.target;
         if(element.classList.contains('drop-area')){
           console.log(element.id);
            event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
            console.log(element.childNodes[0]);
         } else{
           while(element.parentNode){
              element = element.parentNode;
              console.log(element.id);
              if(element.classList.contains('drop-area')){
                event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
                console.log(element.childNodes[0]);
                break;
              }
            }
         }
    },
    dropComponent(event){
      event.preventDefault();
      event.stopPropagation();
      let dropData = event.dataTransfer.getData('text/html');
      let dropItems = dropData.split("|");
      let draggedZone = document.getElementById(dropItems[0]);
      let droppedElement = document.getElementById(event.target.id);
      let draggedID = dropItems[1];
      
      if(droppedElement != null && droppedElement.classList.contains('drop-area')){
        if(event.target.childNodes.length > 0){
          draggedZone.appendChild(event.target.childNodes[0]);
        }
        console.log(draggedID);
        droppedElement.appendChild(document.getElementById(draggedID));
      } 
      else if(droppedElement){
        let element = droppedElement;
        while(element.parentNode){
          element = element.parentNode;
          if(element.classList.contains('drop-area')){
            console.log(element.childNodes[0]);
            draggedZone.appendChild(element.childNodes[0]);
            element.appendChild(document.getElementById(draggedID));
            
            break;
          }
        }
      }
      return false;
    },
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

.drop-area {
    background-color: auto;
    margin: 5px;
    padding: 20px;
    border-style: dashed;
    border-radius:12px;
    border-width: 2px;
    border-color: rgba(0, 0, 255, 0.4);
  }


#left-screen{
  overflow: scroll;
  max-height: 100vh;
}

#right-screen{
  overflow: scroll;
  max-height: 100vh;
}

</style>
