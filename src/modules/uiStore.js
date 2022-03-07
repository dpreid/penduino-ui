//Store for variables that are common amongst multiple UI components. 


const uiStore = {
    state: () => ({
       isDataRecorderOn: false,    //is the Data Recorder element active
       isDraggable: true,

       }),
       mutations:{
         SET_DATA_RECORDER(state, set){
            state.isDataRecorderOn = set;
         },
         SET_DRAGGABLE(state, draggable){
            state.isDraggable = draggable;
         },
         

       },
       actions:{
         setDataRecorder(context, set){
            context.commit("SET_DATA_RECORDER", set);
         },
         setDraggable(context, draggable){
             context.commit('SET_DRAGGABLE', draggable);
         },


       },
       getters:{
         getIsDataRecorderOn(state){
            return state.isDataRecorderOn;
         },
         getDraggable(state){
             return state.isDraggable;
         },
         
         
       },  
  
  }

  export default uiStore;
