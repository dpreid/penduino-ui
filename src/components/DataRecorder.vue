<template>
    <div class='m-2 p-2 bg-white border rounded'>
       <div class="col pb-2 d-grid gap-2 d-md-block">
        <button class="btn btn-default btn-xs m-1" v-if="!getIsRecording" id="recordButton" @click="record">Record</button>
        <button class="btn btn-default btn-xs m-1" v-if="getIsRecording" id="stopButton" @click="stopRecording">Stop</button>
        <button class="btn btn-default btn-xs m-1" id="clearButton" @click="clearGraph">Reset</button>
        <button class="btn btn-default btn-xs m-1" v-if="hasData" id="outputButton" @click="outputToCSV">Download CSV</button>
    </div>
    <div class='row m-2 justify-content-center'>
      <div v-if='getIsRecording' class='col-2'>
        <img id='red-light' src='../../public/images/red-light.png' width='20' height='20' :hidden='!showRedLight'>
      </div>
      <div class='col-10'>  
        <p class='m-1'>Recorded: {{getNumData}}/{{max_data_points}} data points</p>
      </div>
    </div>
  
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

  name: 'DataRecorder',
  data () {
    return {
        time_interval: 0.5,
        interval_id: 0,
        data_points_count: 0,
        hasPlotted: false,
        max_data_points: 5000,
        max_reached: false,
    }
  },
  components: {
    
  },
  created(){
		
	},
  computed:{
    ...mapGetters([
      'getIsRecording',
      'getNumData',
      'getCurrentAngle',
      'getCurrentAngularVelocity',
      'getTime',
      'getCurrentTime'
    ]),
      hasData(){
          return this.getNumData !== 0;
      },
      newTime(){
        return this.$store.getters.getCurrentTime;
      },
      showRedLight(){
        return this.getNumData % 20 > 10 ? true : false;
      }
  },
  watch:{
      newTime(){
        if(this.getIsRecording && this.getNumData < this.max_data_points){
            this.plot();
        } else if(this.getNumData == this.max_data_points && !this.max_reached){
            this.stopRecording();
            this.max_reached = true;
        }
    },
  },
  methods: {
    ...mapActions([
      'setIsRecording',
      'addData',
      'clearAllData',
    ]),
      record(){
          //this.$store.dispatch('setStartTime', new Date().getTime());
          this.$store.dispatch('setStartTime', this.getCurrentTime);
          console.log('start time');
          console.log(this.getCurrentTime);
          this.data_points_count = 0;
          console.log('recording');
          this.setIsRecording(true);
          // this.interval_id = setInterval(() => {
          //       this.plot()
          //   }, parseFloat(this.time_interval)*1000);
      },
      stopRecording(){
          this.setIsRecording(false);
      },
      plot(){
          this.data_points_count++;
          let angle = this.getCurrentAngle
          let time = this.getTime;
          let ang_vel = this.getCurrentAngularVelocity;
          
          let data_object = {id: this.getNumData, t: parseFloat(time), theta: parseFloat(angle), omega: ang_vel};
          this.addData(data_object);
          this.hasPlotted = true;
          

      },
      clearGraph(){
          this.clearAllData();
          this.max_reached = false;
          this.hasPlotted = false;
      },
      outputToCSV(){
          let csv = 'Time/s,Angle/rad,AngVel/rad/s\n';
          let data = this.$store.getters.getData;
          data.forEach(function(d){
              csv += d.t.toString();
              csv += ",";
              csv += d.theta.toString();
              csv += ',';
              csv += d.omega.toString();
              csv += "\n";
          });
          //console.log(csv);
          let hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'pendulum.csv';
          hiddenElement.click();
      },
      
  }
}
</script>

<style scoped>
#recordButton       {background-color: #4CAF50FF;}
#recordButton:hover {background-color: #3e8e41} 

#stopButton       {background-color: #e13131ff;}
#stopButton:hover {background-color: #cc1e1eff;}

#clearButton  {background-color: #e17a31ff;}
#clearButton:hover  {background-color: #cc661eff;}

#outputButton        {background-color: #e1b131ff;}
#outputButton:hover  {background-color: #cc9d1eff;}

label {
    font-size:20px;
    color: #0501f7;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    padding-top: 20px;
    /* float: left; */
}

</style>