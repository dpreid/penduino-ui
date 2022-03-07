<template>
    <div class="m-2 p-4 bg-white border rounded">
        <div class="col pb-2 d-grid gap-2 d-md-block">
            <label class='m-1' for="addCommand">Command</label>

            <select name="addCommand" id="addCommand" v-model="command_to_add" @change="checkCommandParameter">
                <option value="start">Start</option>
                <option value="updateDrive">Drive Param</option>
                <option value="brake">Brake</option>
                <option value="updateBrake">Brake Param</option>
                <option value="load">Load</option>
                <option value="free">Free</option>
                
            </select> 

            <label class='m-1' for="command_parameter" v-if="command_to_add == 'updateDrive' || command_to_add == 'updateBrake'">Value</label>
            <input v-if="command_to_add == 'updateDrive' || command_to_add == 'updateBrake'" id="command_parameter" size="5" v-model="command_parameter">
            <label class='m-1' for="time_interval">After</label>
            <input id="time_interval" size="5" v-model="time_to_add">
            <label class='m-1' for="time_interval">seconds</label>
            <button class="btn btn-default btn-xs mr-1" id="addButton" @click="addCommand">Add</button>
            <button class="btn btn-default btn-xs" id="deleteButton" @click="deletePreviousCommand">Delete</button>

        </div>

        <div class="row justify-content-center" v-for="command in commands" :key="command.id">     <!--command structure command = {id=0, com:"start", time: 5, parameter: 0} -->
            <h3>{{command.com}} after {{command.time}} seconds &nbsp;</h3>
            <h3 v-if="command.parameter != null">: parameter value {{command.parameter}}</h3>

        </div>

        <div class="row justify-content-center">
            <button v-if='commands.length > 0' class="btn btn-default btn-xs mr-1" id="startCommands" @click="runCommands">Start</button>
            <button v-if='commands.length > 0' class="btn btn-default btn-xs mr-1" id="stopCommands" @click="stopCommands">Stop</button>
            <button v-if='commands.length > 0' class="btn btn-default btn-xs" id="clearCommands" @click="clearCommands">Clear</button>
        </div>


     </div>   
</template>

<script>

export default {

  name: 'AutoCommand',
  data () {
    return {
      commands: [],
      command_to_add: "",
      time_to_add: 0,
      command_parameter: null,
      //timeout_ids: [],
      stopping: false,
      
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
         let new_command = {id: id, com:this.command_to_add, time:this.time_to_add, parameter:this.command_parameter};
         this.commands.push(new_command);
     },
     async runCommands(){
         this.stopping = false;
         let time = 0;
         let eventName = "";
            for(let i=0; i<this.commands.length; i++){
                time = parseFloat(this.commands[i].time);
                eventName = this.commands[i].com;

                if(this.stopping){
                    return;
                }

                await new Promise((resolve) => {
                    console.log("command param = " + this.commands[i].parameter);
                    setTimeout(() => resolve(this.$store.dispatch(eventName, this.commands[i].parameter)), time*1000);
                });
            }
             
     },
     stopCommands(){
         this.stopping = true;

        //  for(let i=0; i<this.timeout_ids;i++){
        //      clearTimeout(this.timeout_ids[i]);
        //  }
     },
     deletePreviousCommand(){
         let index = this.commands.length - 1;
         this.commands.splice(index, 1);
     },
     clearCommands(){
         this.commands = [];
     },
     checkCommandParameter(){
         if(this.command_to_add != "updateDrive" && this.command_to_add != "updateBrake"){
             this.command_parameter = null;
         }
     },
  }
}
</script>

<style scoped>
/* .row{
    border-style: solid;
    border-width: thin;
    border-color: green;
} */



#addButton       {background-color: #4CAF50FF;}
#addButton:hover {background-color: #3e8e41} 

#deleteButton       {background-color: #e13131ff;}
#deleteButton:hover {background-color: #cc1e1eff;}

#startCommands  {background-color: #4CAF50FF;}
#startCommands:hover  {background-color: #3e8e41;}

#stopCommands        {background-color: #e1b131ff;}
#stopCommands:hover  {background-color: #cc9d1eff;}

#clearCommands        {background-color: #e13131ff;}
#clearCommands:hover  {background-color: #cc1e1eff;}

label {
    font-size:20px;
    color: #0501f7;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    /* float: left; */
}
</style>