<template>
  <div id="app" class='container-fluid-sm m-0 background-grey'>
       <navigation-bar @togglesnapshot="toggleSnapshot" @togglegraph="toggleGraph" @toggleautocommands="toggleAutoCommands" @togglestopwatch="toggleStopwatch" @toggletable="toggleTable" @toggleworkspace="addWorkspace" @clearworkspace="clearWorkspace" @addruler="rulerAdded = true" @addprotractor="protractorAdded = true"/>

        <div v-if="isWorkspaceOn">
          <workspace :protractorAdded="protractorAdded" :rulerAdded="rulerAdded"/>
        </div>

        <streams id='streams' />

  <div class='row' id='component-grid'>

      <div class='col-lg-6 col-sm-12' id='left-screen'>
        <div class='col drop-area' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><webcam-stream id='webcam-stream' /></div>
        <div class='col drop-area' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-stream id='data-stream' /></div>
        <div class='col drop-area' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><table-output v-if='isTableOn' id='table' :selected_point="selected_graph_point"/></div>
        <div class='col drop-area' id='drop_3_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent></div>
        <div class='col drop-area' id='drop_4_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent></div>
      </div>

      <div class='col-lg-6 col-sm-12' id='right-screen'>
        <div class='col drop-area' id='drop_0_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-recorder id='data-recorder' /></div>
        <div class='col drop-area' id='drop_1_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><snapshot v-if='isSnapshotOn' id='snapshot' :headings="['Time/s', 'Angle/rad', 'Ang. Vel./rad/s']"/></div>
        <div class='col drop-area' id='drop_2_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><graph-output v-if='isGraphOn' id='graph' type="graph" @newselectedobject="selectedGraphPoint"/></div>
        <div class='col drop-area' id='drop_3_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><auto-command v-if='isAutoCommandOn' id='auto-command' /></div>
        <div class='col drop-area' id='drop_4_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><stopwatch v-if='isStopwatchOn' id='stopwatch'/></div>
      </div>

  </div>
     
   
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
import Snapshot from "./components/Snapshot.vue"

import { mapGetters } from 'vuex'

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
    Snapshot,

  },
  mounted(){
    
  },
  data() {
    return {
      isTableOn: false,
      isGraphOn: false,
      isStopwatchOn: false,
      isWorkspaceOn: false,
      isAutoCommandOn: false,
      isSnapshotOn: false,
      selected_graph_point: null,
      protractorAdded: false,
      rulerAdded: false
    }
  },
  computed:{
    ...mapGetters([
      'getDraggable'
    ])
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
    selectedGraphPoint(point){
      this.selected_graph_point = point;
    },
    toggleGraph(){
      this.isGraphOn = !this.isGraphOn;
    },
    addWorkspace(){
        this.isWorkspaceOn = true;
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
    toggleSnapshot(){
      this.isSnapshotOn = !this.isSnapshotOn;
    },
    clearWorkspace(){
      this.isWorkspaceOn = false;
      this.protractorAdded = false;
      this.rulerAdded = false;
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
  margin-top:50px;
}

html, body {
	background-color: #fff;
	text-align: center;
	font-family: Avenir, Helvetica, Arial, sans-serif;
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
    border-color: rgba(20, 51, 186, 0.2) /* Persian Blue */
    
  }


#left-screen{
  overflow: scroll;
  max-height: 100vh;
}

#right-screen{
  overflow: scroll;
  max-height: 100vh;
}

.background-primary{
    background-color: #1433BA; /* Persian Blue */
}

.background-secondary{
    background-color: #5FA8AB; /* Cadet Blue */
}

.background-tertiary{
    background-color: #47D4D9; /* Dark Turquoise */
}

.background-warning{
    background-color: #F5A031; /* Orange Peel */
}

.background-danger{
    background-color: #E00000; /* Rosso Corsa*/
}

.background-white{
    background-color: #ffffff; /* White */
}

.background-grey{
    background-color: rgba(159, 159, 159, 0.75); /* Grey */
}

.button{
    background-color: #1433BA; /* Persian Blue */
    border: none;
    border-radius: 4px;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 8px 4px;
    transition-duration: 0.2s;
    cursor: pointer;
}

.button-sm{
    background-color: #1433BA; /* Persian Blue */
    border: none;
    border-radius: 4px;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 8px 4px;
    transition-duration: 0.2s;
    cursor: pointer;
}

.button-lg{
    background-color: #1433BA; /* Persian Blue */
    border: none;
    border-radius: 8px;
    color: white;
    padding: 8px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 8px 4px;
    transition-duration: 0.2s;
    cursor: pointer;
}

.button-toolbar{
    background-color: #1433BA; /* Persian Blue */
    border: none;
    border-radius: 4px;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 0px 0px;
    transition-duration: 0.2s;
    cursor: pointer;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    max-height: 40px;
    max-width: 40px;
    padding: 0px 0px;
}

.button-primary{
    background-color: #1433BA; /* Persian Blue */
    color: white; 
    border: 2px solid #1433BA; /* Persian Blue */
}

.button-primary:hover{
    background-color: white; 
    color: black; 
}

.button-secondary{
    background-color: #5FA8AB; /* Cadet Blue */
    color: white; 
    border: 2px solid #5FA8AB; /* Cadet Blue */
}

.button-secondary:hover{
    background-color: white; 
    color: black; 
}

.button-tertiary{
    background-color: #47D4D9; /* Dark Turquoise */
    color: white; 
    border: 2px solid #47D4D9; /* Dark Turquoise */
}

.button-tertiary:hover{
    background-color: white; 
    color: black; 
}

.button-warning{
    background-color: #F5A031; /* Orange Peel */
    color: white; 
    border: 2px solid #F5A031; /* Orange Peel */
}

.button-warning:hover{
    background-color: white; 
    color: black; 
}

.button-danger{
    background-color: #E00000; /* Rosso Corsa*/
    color: white; 
    border: 2px solid #E00000; /* Rosso Corsa*/
}

.button-danger:hover{
    background-color: white; 
    color: black; 
}

.button-white{
    background-color: white; 
    color: black; 
    border: 2px solid black;
}

.button-white:hover{
    background-color: white; 
    color: black; 
}

.button-grey{
    background-color: rgba(159, 159, 159, 0.75); /* Grey */
    color: white; 
    border: 2px solid #9F9F9F;
}

.button-grey:hover{
    background-color: white; 
    color: black; 
}

.txt-primary{
    color: #1433BA; /* Persian Blue */
}

.txt-secondary{
    color: #5FA8AB; /* Cadet Blue */
}

.txt-tertiary{
    color: #47D4D9; /* Dark Turquoise */
}

.txt-warning{
    color: #F5A031; /* Orange Peel */
}

.txt-danger{
    color: #E00000; /* Rosso Corsa*/
}

.txt-grey{
    color: #9F9F9F;
}

.input{
    border: 1px solid rgba(20, 51, 186, 0.25);
    border-radius: 4px;
    background-color: white; 
    background-clip: padding-box;
    text-align: center;
    transition: border-color .25s ease-in-out,box-shadow .15s ease-in-out;
}

.input:focus{
    /* color: #212529; */
    background-color: white;
    border-color: #1433BA; 
    outline: 0;
    box-shadow: 0 0 0 .25rem rgba(71, 212, 217,.25);
    border-radius: 4px;
    text-align: center;
}

.input-disabled{
    border: 1px solid rgba(20, 51, 186, 0.25);
    border-radius: 4px;
    background-color: rgba(159, 159, 159, 0.5); /* Grey */
    background-clip: padding-box;
    text-align: center;
    transition: border-color .25s ease-in-out,box-shadow .15s ease-in-out;
}

.h-divider{
 margin-top:5px;
 margin-bottom:5px;
 height:1px;
 width:100%;
 border-top:1px solid #1433BA; /* Persian Blue */
}

</style>
