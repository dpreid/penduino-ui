<template>
<div class='container-sm m-2 bg-white border rounded'>
	<div>
		<canvas id="smoothie-chart" width="640" height="120"></canvas>
	</div>
	<div id="buttons">
		<article>
			<button id="start" class="btn btn-default btn-lg" @click="start">Start</button>
			<button id="brake" class="btn btn-default btn-lg" @click="brake">Brake</button>
			<button id="load" class="btn btn-default btn-lg" @click="load">Load</button>
			<button id="free" class="btn btn-default btn-lg" @click="free">Free</button>
			<button id="cal" class="btn btn-default btn-lg" @click="calibrate">Cal</button>
		</article>
	</div>

<article>

<h2 class='m-2'> Settings </h2>


<div class="row">
	<div class="column1-4">&nbsp; </div>
	<div class="column2-4">
		<div class="row">
			<div class="column1-3  sliderlabel"> Drive ({{driveParam}}%)</div>
			<div class="column2-3" @mousedown="setDraggable(false)" @mouseup="setDraggable(true)">
				<input type="range" min="0" max="100" v-model="driveParam" class="slider" id="driveSlider" @change="updateDriveParam(null)">
			</div>
		</div>
	</div>
	<div class="column1-4"></div>
</div>

<div class="row">
	<div class="column1-3 sliderlabel"></div>
	<div class="column1-2"></div>
</div>

<div class="row">
	<div class="column1-4">&nbsp; </div>
	<div class="column2-4">
		<div class="row">
			<div class="column1-3  sliderlabel"> Brake ({{brakeParam}}%)</div>
		<div class="column2-3" @mousedown="setDraggable(false)" @mouseup="setDraggable(true)">
			<input type="range" min="0" max="100" v-model="brakeParam" class="slider" id="brakeSlider" @change="updateBrakeParam(null)">
		</div>
	</div>
	</div>
	<div class="column1-4"></div>
</div>

<div class="row">
	<div class="column1-4">&nbsp; </div>
	<div class="column2-4">
		<div class="row">
			<div class="column1-3  sliderlabel"> Start bump ({{startParam}}ms)</div>
			<div class="column2-3" @mousedown="setDraggable(false)" @mouseup="setDraggable(true)">
				<input type="range" min="1" max="100" v-model="startParam" class="slider" id="startSlider" @change="updateStartParam">
			</div>
	</div>
	</div>
	<div class="column1-4"></div>
</div>

<div class="row">
	<div class="column1-4">&nbsp; </div>
	<div class="column2-4">
		<div class="row">
			<div class="column1-3  sliderlabel"> Report every {{intervalParam}}ms</div> 
			<div class="column2-3" @mousedown="setDraggable(false)" @mouseup="setDraggable(true)">
				<input type="range" min="20" max="200" v-model="intervalParam" class="slider" id="dataSlider" @change="updateInterval">
			</div>
			</div>
		</div>
	<div class="column1-4"></div>
</div>



</article>



</div>
</template>

<script>

import { mapActions } from 'vuex'

import { SmoothieChart } from 'smoothie';
import { TimeSeries } from 'smoothie';
//import ReconnectingWebSocket from 'reconnecting-websocket';
//import Tooltip from "./Tooltip.vue";


export default {
	name: "ControlPanel",
	components:{
		//Tooltip,
		
	},
	props:{
		url: String,
	},
    data(){
        return{
			dataSocket: null,
			isDataSocketOpen: false,

			startSlider: null,
			startParam: 50,

			driveSlider: null,
			driveParam: 50,

			brakeSlider: null,
			brakeParam: 50,

			dataSlider: null,
			intervalParam: 50,

			canvas: null,

			tooltip_width: "50px",
			tooltip_height: "40px",

        }
    },
    created(){
		
	},
    computed:{
		getUrl(){
            return this.$store.getters.getDataURL;
		},
	},
	watch:{
		getUrl(){
		
            this.connect();
			console.log('connection complete');
			
		},
		isDataSocketOpen(open){
			if(open){
				this.updateInterval();
				setTimeout(() => {this.updateDriveParam(null)}, 500);
				setTimeout(() => {this.updateBrakeParam(null)}, 1000);
				
			}
		}
	},
    mounted(){
		


	},
	methods:{
		...mapActions([
			'setDraggable'
		]),
		start(){
			console.log("START " + this.startParam);
			this.$store.dispatch('start', this.startParam);
		},
		updateStartParam(){
			console.log("start", this.startParam);
			//don't send as it will make it start
		},
		brake(){
			console.log("BRAKE " + this.brakeParam);
			this.$store.dispatch('brake');
		},
		updateBrakeParam(val){
			console.log('brake update');
			if(val !== null){
				this.brakeParam = val;
			}
			console.log("Braking " + this.brakeParam);
			this.$store.dispatch('updateBrake', this.brakeParam);
		},
		free(){
			console.log("undamped");
			this.$store.dispatch('free');
		},
		load(){
			console.log("LOAD");
			this.$store.dispatch('load');
		},
		calibrate(){
			console.log("calibrate");
			this.$store.dispatch('calibrate');
		},
		updateDriveParam(val){
			console.log('drive update');
			if(val !== null){
				this.driveParam = val;
			}

			console.log("Driving " + this.driveParam);
			this.$store.dispatch('updateDrive', this.driveParam);
		},
		updateInterval(){
			console.log("data delay", this.intervalParam)
			this.$store.dispatch('updateInterval', this.intervalParam);
		},
		hotkey(event){
			if(event.key == "f"){
				this.free();
            } else if(event.key == "b"){
				this.brake();
			} else if(event.key == "l"){
				this.load();
			} else if(event.key == 's'){
				this.start();
			}
		},
		test(){
			console.log('SECOND');
		},
		connect(){

			let _this = this;

			this.dataSocket = new WebSocket(this.url);
			//this.dataSocket = new ReconnectingWebSocket(this.url);
			//this.dataSocket = new ReconnectingWebSocket(dataUrl, null,wsOptions);
			console.log(this.dataSocket);
			this.$store.dispatch('setDataSocket', this.dataSocket);

			//let dataOpen = false;
			var delay = 0;
			let delay_sum = 0;
			// let avgDelay = 0;
			// let delays = [];
			var messageCount = 0;
			let a;
			let b;
			let debug = false;
			let wrapEncoder = true;

			var initialSamplingCount = 1200 // 2 mins at 10Hz
			var delayWeightingFactor = 60  // 1 minute drift in 1 hour
			let encoderPPR = 2400

			let responsiveSmoothie = true;
			let thisTime;

			var chart = new SmoothieChart({responsive: responsiveSmoothie, millisPerPixel:10,grid:{fillStyle:'#ffffff'}, interpolation:"linear",maxValue:135,minValue:-135,labels:{fillStyle:'#0024ff',precision:0}}); //interpolation:'linear
			this.canvas = document.getElementById("smoothie-chart");
			let series = new TimeSeries();
			chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#0024ff'});
			chart.streamTo(this.canvas, 0);

			this.dataSocket.onopen = () =>  {
				//dataOpen = true; 
				this.isDataSocketOpen = true;
				
				
			};

			
			this.dataSocket.onmessage = (event) =>  {
				
				try {
					//console.log("messaged")
					//console.log("event data = " + event.data);
					var obj = JSON.parse(event.data);
					//console.log("parsed data = " + obj);
					var msgTime = obj.time;
					//console.log("time = " + msgTime);
					var thisDelay = new Date().getTime() - msgTime;

					// if (testNaN){
					// console.log("appending NaNs")
					// series.append(msgTime + delay, NaN)
					// series.append(NaN, 0)
					// series.append(NaN, NaN)
					// }

					var enc = obj.enc;

					if(messageCount == 0){
						delay = thisDelay
						delay_sum += thisDelay;
					} else{
						if(!isNaN(thisDelay)){
							delay_sum += thisDelay;
							delay = delay_sum / (messageCount + 1);
						} else{
							delay_sum += delay;
							delay = delay_sum / (messageCount + 1);
							
						}
						
					}

					
					
			
					// avgDelay = 0;
					// for (let i=0; i<delays.length;i++){
					// 	avgDelay += delays[i];
					// }
				
					// avgDelay /= delays.length;
					
					a = 1 / delayWeightingFactor
					b = 1 - a

					
					if (messageCount < initialSamplingCount) {
						thisDelay = ((delay * messageCount) + thisDelay) / (messageCount + 1)
					} else {
						thisDelay = (delay * b) + (thisDelay * a)
					}
					
					messageCount += 1

					//https://stackoverflow.com/questions/4633177/c-how-to-wrap-a-float-to-the-interval-pi-pi
					if (wrapEncoder){ //wrap and convert to degrees
						enc = Math.atan2(Math.sin(obj.enc / (encoderPPR/2) * Math.PI), Math.cos(obj.enc / (encoderPPR/2) * Math.PI)) / Math.PI * 180
						enc = Math.min(135, enc)
						enc = Math.max(-135, enc)
						_this.$store.dispatch('setCurrentAngle',enc * Math.PI / 180);		//for output graph, convert to radians
					}
					else{ //convert to degrees only
						enc = enc * 360.0 / encoderPPR;
						_this.$store.dispatch('setCurrentAngle', enc * Math.PI / 180);		//for data storage, convert to radians
					}

					thisTime = msgTime + thisDelay
					
					if (!isNaN(thisTime) && !isNaN(enc)){
						series.append(msgTime + thisDelay, enc)
						_this.$store.dispatch('setCurrentTime', msgTime);			//for output graph

						if(debug) {
							console.log(delay,thisDelay,msgTime, enc)
						}
					}
					else {
						if (debug) {
							console.log("NaN so not logging to smoothie",delay,thisDelay,msgTime, enc)
						}
					} 

				} catch (e) {
					if (debug){
						console.log(e)
					}
				}
			}


			_this.$store.dispatch('setStartTime', new Date().getTime());
			window.addEventListener('keydown', this.hotkey, false);
			window.addEventListener('pagehide', this.free);				//closing window
			window.addEventListener('beforeunload', this.free);			//refreshing page, changing URL
	
		
	},

	},
}




</script>

<style scoped>

#smoothie-chart{
	width:100%;
	height: 120px;
}

.slidecontainer {
	width: 100%; /* Width of the outside container */
}
.slider {
	-webkit-appearance: none;
	width: 100%;
	height: 15px;
	border-radius: 5px;  
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%; 
	background: #5b7fa5ff; 
	cursor: pointer;
}

.slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #5b7fa5ff;
	cursor: pointer;
}

/* Mouse-over effects */
.slider:hover {
	opacity: 1; /* Fully shown on mouse-over */
}

.column {
	float: left;
	width: 50%;
}


.sliderlabel{ text-align: left;}

.column1-4 {
	float: left;
	width: 30%;
}

.column2-4 {
	float: left;
	width: 40%;
}

.column3-4 {
	float: left;
	width: 75%;
}

.column1-3 {
	float: left;
	width: 33.3%;
}
.column2-3 {
	float: left;
	width: 66.6%;
}

.row{
	margin-top: 12px;
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}



#start       {background-color: #4CAF50FF;}
#start:hover {background-color: #3e8e41} 

#brake       {background-color: #e13131ff;}
#brake:hover {background-color: #cc1e1eff;}

#load        {background-color: #e17a31ff;}
#load:hover  {background-color: #cc661eff;}

#free        {background-color: #e1b131ff;}
#free:hover  {background-color: #cc9d1eff;}


#cal         {background-color: #5b7fa5ff;}
#cal:hover   {background-color: #46627fff;}
</style>