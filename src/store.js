//import Vue from 'vue';

export const store = {
  state: {
     current_angle: 0,
     current_time: 0,
     start_time: 0,
     isCaliperSet: false,
     data: [],
     num_graphs: 0
     },
     clearAllData(){
      this.state.data = [];
     },
     getNumData(){
         return this.state.data.length;
     },
     addData(object){
        this.state.data.push(object);
     },
     deleteData (dataId) {
        this.state.data.splice(dataId, 1);
      },
      getTime(){
         console.log("start time = " + this.state.start_time);
         return (this.state.current_time - this.state.start_time)/1000;    //in seconds
      },
      getMaxTime(){
         let time_max = -Infinity;
         this.state.data.forEach(d => {
            if(d.t > time_max){
               time_max = d.t;
            }
         });

         return time_max;
      },
      getMinTime(){
         let time_min = Infinity;
         this.state.data.forEach(d => {
            if(d.t < time_min){
               time_min = d.t;
            }
         });

         return time_min;
      }

}
    
//data object structure
// {
//     id: 1,
//      t: 0,
//       theta: 0,
//       omega: 0,
//     x: 1,
//     y: 1,
//     vx: 1,
//      vy: 1,
//       ax: 1,
//       ay: 1
//   },