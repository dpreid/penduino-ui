<template>
<div class="container">
    
    <button class='btn btn-primary' @click="snapshot">Manual Data</button>
  
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'Snapshot',
  data () {
    return {
      
      
    }
  },
  components: {
    
  },
  computed:{
      ...mapGetters([
          'getTime',
          'getCurrentAngle',
          'getCurrentAngularVelocity',
      ])
  },
  methods: {
      ...mapActions([
        'addData',
    ]),
      snapshot(){
          let angle = this.getCurrentAngle
          let time = this.getTime;
          console.log(this.$store.getters.getCurrentTime)
          let ang_vel = this.getCurrentAngularVelocity;
          
          let data_object = {id: this.getNumData, t: parseFloat(time), theta: parseFloat(angle), omega: ang_vel};
          this.addData(data_object);
          

      },
  }
}
</script>

<style scoped>
    
</style>