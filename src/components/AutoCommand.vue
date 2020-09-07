<template>
    <div class="container-fluid">
        <div class="row">
            <label for="addCommand">Add Command</label>

            <select name="addCommand" id="addCommand" v-model="command_to_add">
                <option value="start">Start</option>
                <option value="brake">Brake</option>
                <option value="load">Load</option>
                <option value="free">Free</option>
                
            </select> 

            <input id="time_interval" size="5" v-model="time_to_add">
            <button id="addButton" @click="addCommand">Add</button>
            <button id="deleteButton" @click="deletePreviousCommand">Delete</button>

        </div>

        <div class="row" v-for="command in commands" :key="command.id">     <!--command structure command = {id=0, com:"start", time: 5} -->
            <p>{{command.com}}</p>
            <p>{{command.time}}</p>
        </div>

        <div class="row">
            <button id="startCommands" @click="runCommands">Start</button>
            <button id="stopCommands" @click="stopCommands">Stop</button>
        </div>


     </div>   
</template>

<script>
//import { store } from "../store.js";
import { eventBus } from "../main.js";

export default {

  name: 'AutoCommand',
  data () {
    return {
      commands: [],
      command_to_add: "",
      time_to_add: 0,
      timeout_ids: [],
      
    }
  },
  components: {
    
  },
  computed:{

  },
  mounted(){

  },
  methods: {
     addCommand(){
         let id = this.commands.length;
         let new_command = {id: id, com:this.command_to_add, time:this.time_to_add};
         this.commands.push(new_command);
     },
     async runCommands(){
         let time = 0;
         let eventName = "";
            for(let i=0; i<this.commands.length; i++){
                time += parseFloat(this.commands[i].time);
                eventName = this.commands[i].com + "command";
        
                await new Promise((resolve) => {
                    this.timeout_ids.push(setTimeout(() => resolve(eventBus.$emit(eventName)), time*1000));
                });
            }
             
                

     },
     stopCommands(){
         for(let i=0; i<this.timeout_ids;i++){
             clearTimeout(this.timeout_ids[i]);
         }
     },
     deletePreviousCommand(){
         let index = this.commands.length - 1;
         this.commands.splice(index, 1);
     },
  }
}
</script>

<style scoped>
    
</style>