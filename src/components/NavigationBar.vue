//NAVIGATION BAR COMPONENT: Includes menu items for adding UI components; tools menu for adding UI tools like ruler and protractor

//TODO: Include user login alerts and profile data.


<template>

    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Remote Lab: {{labName}}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Menu
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#" @click='toggleComponent("graph")'>Graph</a></li>
                    <li><a class="dropdown-item" href="#" @click='toggleComponent("stopwatch")'>Stopwatch</a></li>
                    <li><a class="dropdown-item" href="#" @click='toggleComponent("table")'>Table</a></li>
                    <li><a class="dropdown-item" href="#" @click='toggleComponent("autocommands")'>Auto Commands</a></li>
                    <li><a class="dropdown-item" href="#" @click='toggleComponent("workspace")'>Measuring Tools</a></li>
                  </ul>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href="#" tabindex="-1" @click='clearWorkspace'>Clear Workspace</a>
              </li>
          </ul>

          <div class='d-flex'>
              <clock />
          </div>

      </div>
    </div>
  </nav>

</template>

<script>
//import { store } from "../store.js";
import { eventBus } from "../main.js";
import Clock from "./Clock.vue";
export default {

  name: 'NavigationBar',
  data () {
    return {
        
    }
  },
  components: {
    Clock,
  },
  computed:{
      
  },
  methods: {
      addTool(tool){
          this.toggleComponent('workspace');
          setTimeout(function(){
              eventBus.$emit('add' + tool), 100});  //give the workspace time to initialise and then send tool event
          
      },
      toggleComponent(component){
          eventBus.$emit('toggle' + component);
      },
      clearWorkspace(){
          eventBus.$emit('clearworkspace');
      }
  }
}
</script>

<style scoped>


</style>