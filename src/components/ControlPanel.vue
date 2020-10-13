<template>
<div>
	<div>
		<canvas id="smoothie-chart" width="640" height="120"></canvas>
	</div>
	<div id="buttons">
		<article>
			<button id="start" class="button" @click="start"><tooltip id="tooltip0" :active_height="tooltip_height" :active_width="tooltip_width">Start the pendulum</tooltip>Start</button>
			<button id="brake" class="button" @click="brake"><tooltip id="tooltip0" :active_height="tooltip_height" :active_width="tooltip_width">Slow the pendulum</tooltip>Brake</button>
			<button id="load" class="button" @click="load"><tooltip id="tooltip0" :active_height="tooltip_height" :active_width="tooltip_width">Stop the pendulum quickly</tooltip>Load</button>
			<button id="free" class="button" @click="free"><tooltip id="tooltip0" :active_height="tooltip_height" :active_width="tooltip_width">Remove the EM driver</tooltip>Free</button>
			<button id="cal" class="button" @click="calibrate"><tooltip id="tooltip0" :active_height="tooltip_height" :active_width="tooltip_width">Recalibrate</tooltip>Cal</button>
		</article>
	</div>

<article>

<h2> Settings </h2>


<div class="row">
	<div class="column1-4">&nbsp; </div>
	<div class="column2-4">
		<div class="row">
			<div class="column1-3  sliderlabel"> Drive ({{driveParam}}%)</div>
			<div class="column2-3">
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
		<div class="column2-3">
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
			<div class="column2-3">
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
			<div class="column1-3  sliderlabel"> Report every {{dataParam}}ms</div> 
			<div class="column2-3">
				<input type="range" min="20" max="200" v-model="dataParam" class="slider" id="dataSlider" @change="updateDataParam">
			</div>
			</div>
		</div>
	<div class="column1-4"></div>
</div>



</article>



</div>
</template>

<script>
//import * as pendulum from "../pendulum";
import { store } from "../store.js";
import { eventBus } from "../main";
//import ReconnectingWebSocket from '../../public/js/reconnecting-websocket.min.js';
import ReconnectingWebSocket from 'reconnecting-websocket';
//import { SmoothieChart } from '../../public/js/smoothie.js';
//import { TimeSeries } from '../../public/js/smoothie.js';
import { SmoothieChart } from 'smoothie';
import { TimeSeries } from 'smoothie';

import Tooltip from "./Tooltip.vue";
//import PopupMenu from "./PopupMenu.vue";

export default {
	name: "ControlPanel",
	components:{
		Tooltip,
		//PopupMenu,
	},
    data(){
        return{
			dataSocket: null,

			startSlider: null,
			startParam: 50,

			driveSlider: null,
			driveParam: 50,

			brakeSlider: null,
			brakeParam: 50,

			dataSlider: null,
			dataParam: 50,

			canvas: null,

			tooltip_width: "50px",
			tooltip_height: "40px",

        }
    },
    created(){
		eventBus.$on('startcommand', this.start);
		eventBus.$on('updatedrivecommand', this.updateDriveParam);
		eventBus.$on('freecommand', this.free);
		eventBus.$on('brakecommand', this.brake);
		eventBus.$on('updatebrakecommand', this.updateBrakeParam);
		eventBus.$on('loadcommand', this.load);
	},
        
    mounted(){
        //dataUrl =  scheme + host + ':' + port + '/' + data;
		let dataUrl = 'wss://video.practable.io:443/bi/dpr/pendulum0';

		//console.log(dataUrl)

		var wsOptions = {
			automaticOpen: true,
			reconnectDecay: 1.5,
			reconnectInterval: 500,
			maxReconnectInterval: 10000,
		}

		this.dataSocket = new ReconnectingWebSocket(dataUrl, null,wsOptions);
		//console.log(this.dataSocket);

		let dataOpen = false;
		var delay = 0
		var messageCount = 0
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
		console.log("created");
		chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#0024ff'});
		chart.streamTo(this.canvas, 0);

		this.dataSocket.onopen = function (event) {
			console.log("dataSocket open" + event);
			dataOpen = true; 
			console.log(dataOpen);

			this.dataSocket.send(JSON.stringify({
				cmd: "drive",
				param: this.driveParam
			}));
			this.dataSocket.send(JSON.stringify({
				cmd: "brake",
				param: this.brakeParam
			}));
			
			this.dataSocket.send(JSON.stringify({
				cmd: "interval",
				param: this.dataParam
			}));

		};

		this.dataSocket.onmessage = function (event) {
			
			try {
				var obj = JSON.parse(event.data);
				var msgTime = obj.time
				var thisDelay = new Date().getTime() - msgTime

				// if (testNaN){
				// console.log("appending NaNs")
				// series.append(msgTime + delay, NaN)
				// series.append(NaN, 0)
				// series.append(NaN, NaN)
				// }

				var enc = obj.enc

				if (messageCount == 0){
					delay = thisDelay
				}

				
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
				store.state.current_angle = enc * Math.PI / 180;		//for output graph, convert to radians
				}
				else{ //convert to degrees only
					enc = enc * 360.0 / encoderPPR;
					store.state.current_angle = enc * Math.PI / 180;		//for data storage, convert to radians
				}

				thisTime = msgTime + delay
				
				if (!isNaN(thisTime) && !isNaN(enc)){
					series.append(msgTime + delay, enc)
					store.state.current_time = msgTime + delay;			//for output graph

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

		store.state.start_time = new Date().getTime();
		window.addEventListener('keydown', this.hotkey, false);
		
	},
	methods:{
		start(){
			console.log("START " + this.startParam);
			this.dataSocket.send(JSON.stringify({
				cmd: "start",
				param: this.startParam
			}));
		},
		brake(){
			console.log("BRAKE " + this.brakeParam);
			this.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "brake"
			}));
		},
		free(){
			console.log("undamped");
			this.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "unloaded"
			}));
		},
		load(){
			console.log("LOAD");
			this.dataSocket.send(JSON.stringify({
				cmd: "stop",
				param: "loaded"
			}));
		},
		calibrate(){
			console.log("calibrate");
			this.dataSocket.send(JSON.stringify({
				cmd: "calibrate"
	}));
		},
		updateStartParam(){
			console.log("start", this.startParam);
			//don't send as it will make it start
		},
		updateDriveParam(val){
			if(val !== null){
				this.driveParam = val;
			}

			console.log("Driving " + this.driveParam);
			this.dataSocket.send(JSON.stringify({
				cmd: "drive",
				param: this.driveParam
			}));
			
		},
		updateBrakeParam(val){
			if(val !== null){
				this.brakeParam = val;
			}

			console.log("Braking " + this.brakeParam);
			this.dataSocket.send(JSON.stringify({
				cmd: "brake",
				param: this.brakeParam
			}));
		},
		updateDataParam(){
			console.log("data delay", this.dataParam)
			this.dataSocket.send(JSON.stringify({
				cmd: "interval",
				param: this.dataParam
	}));
		},
		hotkey(event){
			if(event.key == "f"){
				this.free();
            } else if(event.key == "b"){
				this.brake();
			} else if(event.key == "l"){
				this.load();
			}
		}

	},
}




</script>

<style scoped>
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

.button {
	padding: 15px 25px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	outline: none;
	color: #fff;

	border: none;
	border-radius: 15px;
	box-shadow: 0 9px #999;
}

/*	background-color: #4CAF50;
 .button:hover {background-color: #3e8e41}*/

.button:active {
	background-color: #3e8e41;
	box-shadow: 0 5px #666;
	transform: translateY(4px);
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