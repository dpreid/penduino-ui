//Store for sending commands through the dataSocket


const commandStore = {
    state: () => ({
        dataSocket: null,
        currentMode: '',

       }),
       mutations:{
        SET_DATA_SOCKET(state, socket){
            state.dataSocket = socket;
        },
        START(state, value){
            state.dataSocket.send(JSON.stringify({
				cmd: "start",
				param: value
			}));
        },
        BRAKE(state){
            state.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "brake"
			}));
        },
        UPDATE_BRAKE(state, value){
            state.dataSocket.send(JSON.stringify({
				cmd: "brake",
				param: value
			}));
        },
        FREE(state){
            state.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "unloaded"
			}));
        },
        LOAD(state){
            state.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "loaded"
			}));
        },
        CALIBRATE(state){
            state.dataSocket.send(JSON.stringify({
				cmd: "calibrate"
			}));
        },
        UPDATE_DRIVE(state, value){
            state.dataSocket.send(JSON.stringify({
				cmd: "drive",
				param: value
			}));
        },
        UPDATE_INTERVAL(state, value){
            state.dataSocket.send(JSON.stringify({
				cmd: "interval",
				param: value
			}));
        },
        SET_CURRENT_MODE(state, mode){
            state.currentMode = mode;
         },
            

       },
       actions:{
        setDataSocket(context, socket){
            context.commit("SET_DATA_SOCKET", socket);
        },
        start(context, value){
            context.commit('START', value)
        },
        brake(context){
            context.commit('BRAKE');
        },
        free(context){
            context.commit('FREE');
        },
        load(context){
            context.commit('LOAD');
        },
        calibrate(context){
            context.commit('CALIBRATE');
        },
        updateDrive(context, value){
            context.commit('UPDATE_DRIVE', value);
        },
        updateBrake(context, value){
            context.commit('UPDATE_BRAKE', value);
        },
        updateInterval(context, value){
            context.commit('UPDATE_INTERVAL', value)
        },
        setCurrentMode(context, mode){
            context.commit("SET_CURRENT_MODE", mode);
        },


       },
       getters:{
        getDataSocket(state){
            return state.dataSocket;
        },
        getCurrentMode(state){
            return state.currentMode;
        },
          
       },  
  
  }

  export default commandStore;