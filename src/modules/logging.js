

const loggingStore = {
    state: () => ({
        logSocket: null,
        uuid: 'david-test-pendulum',                      //SET HERE FOR TESTING
        logging_consent_given: true,        //SET HERE FOR TESTING
        exp: 'pendulum',                     //SET HERE FOR TESTING
        course: 'engdes1',                      //needed for differentiating tasks in different classes, 'engdes1'
        saved: [],

       }),
       mutations:{
            SET_LOG_SOCKET(state, socket){
                state.logSocket = socket;
            },
            SET_LOGGING_CONSENT(state, consent){
                state.logging_consent_given = consent;
            },
            SET_UUID(state, uuid){
                state.uuid = uuid;
            },
            SET_EXPERIMENT(state, exp){
                state.exp = exp;
            },
            SET_COURSE(state, course){
                state.course = course;
            },
            SET_SAVED(state, data){
                state.saved = data;
            },
            LOG(state, payload){
                //only log to server if user has given consent.
                //Still may require logging internally for achievements etc.
                if(state.logging_consent_given && state.logSocket != null){
                    console.log('logged')
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.exp, 
                        course: state.course,
                        type: "log",       
                        payload: payload
                    }));
                }
                
                
            },  

       },
       actions:{
            setLogSocket(context, socket){
                context.commit('SET_LOG_SOCKET', socket);
            },
            setLoggingConsent(context, consent){
                context.commit('SET_LOGGING_CONSENT', consent);
            },
            setUUID(context, uuid){
                context.commit('SET_UUID', uuid);
            },
            setExperiment(context, exp){
                context.commit('SET_EXPERIMENT', exp);
            },
            setCourse(context, course){
                context.commit('SET_COURSE', course);
            },
            setSaved(context, data){
                context.commit('SET_SAVED', data);
            },
            log(context, payload){
                //context.commit('LOG_PARAMETERS', payload.data);
                context.commit('LOG', payload);
            },

       },
       getters:{
           getLogSocket(state){
                return state.logSocket;
           },
           getLogConsent(state){
            return state.logging_consent_given;
            },
            getLogUUID(state){
                return state.uuid;
            },
            getExperiment(state){
                return state.exp
            },
            getCourse(state){
                return state.course
            },
            getSaved(state){
                return state.saved;
            }
          
       },  
  
  }

  export default loggingStore;
