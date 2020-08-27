<template>
<div>
	<div id="buttons">
		<article>
			<button id="start" class="button" @click="start">Start</button>
			<button id="brake" class="button" @click="brake">Brake</button>
			<button id="load" class="button" @click="load">Load</button>
			<button id="free" class="button" @click="free">Free</button>
			<button id="cal" class="button" @click="calibrate">Cal</button>
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
				<input type="range" min="0" max="100" v-model="driveParam" class="slider" id="driveSlider" @change="updateDriveParam">
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
			<input type="range" min="0" max="100" v-model="brakeParam" class="slider" id="brakeSlider" @change="updateBrakeParam">
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
				<input type="range" min="50" max="200" v-model="dataParam" class="slider" id="dataSlider" @change="updateDataParam">
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
//import { eventBus } from "../main";
import ReconnectingWebSocket from '../../public/js/reconnecting-websocket.min.js';
//import SmoothieChart from '../../public/js/smoothie.js';
//import TimeSeries from '../../public/js/smoothie.js';

export default {
    name: "ControlPanel",
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
			dataParam: 0,

        }
    },
    created(){
		
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
		updateDriveParam(){
			console.log("Driving " + this.driveParam);
			this.dataSocket.send(JSON.stringify({
				cmd: "drive",
				param: this.driveParam
			}));
		},
		updateBrakeParam(){
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