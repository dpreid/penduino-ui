<template>
<div class="container">
    <h1> Data Input </h1>
    <div class="row input-group mb-1 justify-content-center">
        <div class="col-2">
            <span class="input-group-text" id="basic-addon1">Time</span>
            <input type="text" class="form-control" v-model="timeToAdd" placeholder="" aria-label="time" aria-describedby="basic-addon1">
        </div>
        <div class="col-2">
            <span class="input-group-text" id="basic-addon1">Position</span>
            <input type="text" class="form-control" v-model="xPosToAdd" placeholder="x" required />
            <input type="text" class="form-control" v-model="yPosToAdd" placeholder="y" required />
        </div>
        <div class="col-2">
            <span class="input-group-text" id="basic-addon1">Velocity</span>
            <input type="text" class="form-control" v-model="xVelToAdd" placeholder="x" required />
            <input type="text" class="form-control" v-model="yVelToAdd" placeholder="y" required />
        </div>
        <div class="col-2">
            <span class="input-group-text" id="basic-addon1">Accel.</span>
            <input type="text" class="form-control" v-model="xAccToAdd" placeholder="x" required />
            <input type="text" class="form-control" v-model="yAccToAdd" placeholder="y" required />
        </div>
    </div>
    
    <div class="row justify-content-center">
        <div class="col-3">
            <button type="button" class="btn btn-block btn-primary" @click="addDataToStore">Add Data</button>
        </div>
    </div>
    
    
    
    <p style="color: red; font-size: 13px" v-if="error">
      You must type something first!
    </p>
  
  </div>
</template>

<script>
import { store } from "../store.js";
import { eventBus } from "../main.js";

export default {

  name: 'UserInput',
  data () {
    return {
      error: false,
      timeToAdd:'',
      xPosToAdd: '',
      yPosToAdd: '',
      xVelToAdd: '',
      yVelToAdd: '',
      xAccToAdd: '',
      yAccToAdd: '',
      
    }
  },
  components: {
    
  },
  computed:{

  },
  methods: {
      addDataToStore(){
        let data_object = {id: store.state.data.length, t: parseFloat(this.timeToAdd), x: parseFloat(this.xPosToAdd), y:parseFloat(this.yPosToAdd), vx: parseFloat(this.xVelToAdd), vy: parseFloat(this.yVelToAdd), ax: parseFloat(this.xAccToAdd), ay: parseFloat(this.yAccToAdd)};
        store.addData(data_object);

        eventBus.$emit('updateGraph');
        this.timeToAdd = '';
        this.xPosToAdd = '';
        this.yPosToAdd = '';
        this.xVelToAdd = '';
        this.yVelToAdd = '';
        this.xAccToAdd = '';
        this.yAccToAdd = '';
      }
  }
}
</script>

<style scoped>
    
</style>