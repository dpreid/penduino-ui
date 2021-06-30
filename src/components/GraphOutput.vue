<template>
<div class='container-sm m-2 bg-white border rounded'>
    <div class="row mb-5 justify-content-center" id="chart-canvas">
        <div class="col">
            <canvas id='graph-canvas' @mousedown="startLine" @mouseup="endDrag" @mousemove="endLine"></canvas>
        </div>
    </div>

    <div class="row mb-5 justify-content-center" id="chart-functions">
        <div class="col">
            <div class="row justify-content-center">
                <label for="graphSelect">Graph:</label>
            </div>

            <select name="graphSelect" id="graphSelect" v-model="currentDataParameter" @change="getAllData">
                <option value="theta">Angle</option>
                <option value="omega">Angular Velocity</option>
                
            </select> 
            
        </div>

        <div class='form-group col-3'>
            <label class='m-2' for="gradient">Gradient:</label>
            <input class='col-sm' id="gradient" :value="gradient" readonly> 
        </div>
        
        <div class='form-group col-6'>
            <label class='m-2' for="graph">Plot function: </label>
            <select class='col-sm-4' name="function" id="function" v-model="currentFunction">
                <option value="linear">Linear</option>
                <option value="quadratic">Quadratic</option>
                <option value="trigonometric">Trigonometric</option>
                <option value="exponential">Exponential</option>
            </select> 

            <div v-if="currentFunction === 'linear'">
               
                <div class='row justify-content-center'>
                    <img id='linear_function' src='../../public/images/LinearFunction.png'>
                </div>


                <div class='row justify-content-center'>
                    <div>
                        <label class='m-2' for="func_a">a = </label>
                        <input id="func_a" v-model="func_a" size="3">
                    </div>
                    

                    <div>
                        <label class='m-2' for="func_b">b = </label>
                        <input id="func_b" v-model="func_b" size="3">                
                    </div>
                </div>

                <!-- <label class='m-2' for="func_a">y=</label>
                <input id="func_a" v-model="func_a" size="3">
                <label class='m-2' for="func_b">x + </label>
                <input id="func_b" v-model="func_b" size="3">  -->


                <div class="row-sm justify-content-center">
                    <button class="btn btn-default btn-xs m-1" id="plotFunctionButton" @click="plotFunc(linear)">Plot</button>
                    <button class="btn btn-default btn-xs m-1" id="clearFunctionButton" @click="deleteFunctionDataset">Clear</button>
                </div>
            </div>
                <div v-else-if="currentFunction === 'quadratic'">

                    <div class='row justify-content-center'>
                    <img id='linear_function' src='../../public/images/QuadraticFunction.png'>
                </div>


                <div class='row justify-content-center'>
                    <div>
                        <label class='m-2' for="func_a">a = </label>
                        <input id="func_a" v-model="func_a" size="3">
                    </div>
                    

                    <div>
                        <label class='m-2' for="func_b">b = </label>
                        <input id="func_b" v-model="func_b" size="3">                
                    </div>
                </div>

                <!-- <label class='m-2' for="func_a">y=</label>
                <input id="func_a" v-model="func_a" size="3">
                <label class='m-2' for="func_b">x<sup>2</sup> + </label>
                <input id="func_b" v-model="func_b" size="3">  -->
                <div class="row-sm justify-content-center">
                    <button class="btn btn-default btn-xs m-1" id="plotFunctionButton" @click="plotFunc(quadratic)">Plot</button>
                    <button class="btn btn-default btn-xs m-1" id="clearFunctionButton" @click="deleteFunctionDataset">Clear</button>
                </div>
            </div>
            <div v-else-if="currentFunction === 'trigonometric'">

                <div class='row justify-content-center'>
                    <img id='trig_function' src='../../public/images/TrigFunction.png'>
                </div>


                <div class='row justify-content-center'>
                    <div>
                        <label class='m-2' for="func_a">A</label>
                        <input id="func_a" v-model="func_a" size="3">
                    </div>
                    
                    <div>
                        <label class='m-2' for="func_b">&omega;</label>
                        <input id="func_b" v-model="func_b" size="3">
                    </div>

                    <div>
                        <label class='m-2' for="func_c">&phi;</label>
                        <input id="func_c" v-model="func_c" size="3">                
                    </div>
                </div>

                <!-- <label class='m-2' for="func_a">y=</label>
                <input id="func_a" v-model="func_a" size="2">
                <label class='m-2' for="func_b">sin(</label>
                <input id="func_b" v-model="func_b" size="2"> 
                <label class='m-2' for="func_c"> t + </label>
                <input id="func_c" v-model="func_c" size="2"> 
                <label class='m-2'> ) </label> -->
                <div class="row-sm justify-content-center">
                    <button class="btn btn-default btn-xs m-1" id="plotFunctionButton" @click="plotFunc(trigonometric)">Plot</button>
                    <button class="btn btn-default btn-xs m-1" id="clearFunctionButton" @click="deleteFunctionDataset">Clear</button>
                </div>
            </div>
            <div v-else-if="currentFunction === 'exponential'">

                 <div class='row justify-content-center'>
                    <img id='linear_function' src='../../public/images/ExpFunction.png'>
                </div>


                <div class='row justify-content-center'>
                    <div>
                        <label class='m-2' for="func_a">A = </label>
                        <input id="func_a" v-model="func_a" size="3">
                    </div>
                    

                    <div>
                        <label class='m-2' for="func_b">b = </label>
                        <input id="func_b" v-model="func_b" size="3">                
                    </div>
                </div>

                <!-- <label class='m-2' for="func_a">y=</label>
                <input id="func_a" v-model="func_a" size="3">
                <label class='m-2' for="func_b">exp(</label>
                <input id="func_b" v-model="func_b" size="3"> 
                <label class='m-2' for="func_b"> t)</label> -->
                <div class="row-sm justify-content-center">
                    <button class="btn btn-default btn-xs m-1" id="plotFunctionButton" @click="plotFunc(exponential)">Plot</button>
                    <button class="btn btn-default btn-xs m-1" id="clearFunctionButton" @click="deleteFunctionDataset">Clear</button>
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
import { store } from "../store.js";
import { Chart } from 'chart.js';
import { eventBus } from "../main.js";

export default {
    
    name: 'GraphOutput',
    props: ['type'],
    data(){
        return{
            dataStore: store,
            chart: null,
            currentDataParameter: 'theta',
            chartData: [],
            total_num_charts: store.state.num_graphs,
            gradient_start_point: {x:0, y:0},
            gradient_end_point: {x:0, y:0},
            gradient: 0,
            mouseDragging: false,
            currentFunction: "linear",
            func_a: 0,
            func_b: 0,
            func_c: 0,
            funcTimeStep: 0.01,
            YAxisMax: 0,
            YAxisMin: 0,
            XAxisMax: 0,
            XAxisMin: 0,
            maxDataPoints: 1200,
            current_data_index: 0,
            data_index_interval: 100,
            latest_index: 0,
            max_reached: false,

        }
    },
    methods: {
        updateChart(){
            let max_index = store.getNumData() - 1;
            if(max_index < this.maxDataPoints){
                if(this.latest_index < max_index && store.state.isRecording){
                    for(let i=this.latest_index; i < max_index; i++){
                        this.getDataAtIndex(i);
                    }
                    this.latest_index = max_index;
                    this.chart.update(0);                       //actually updating the chart moved to here!
                    this.chart.options.scales.yAxes[0].scaleLabel.labelString = this.currentDataParameter;
                } 
            } else if(!this.max_reached){
                eventBus.$emit('maxdatapointsreached');
                console.log('max reached');
                this.max_reached = true;
            }

            setTimeout(this.updateChart, 20);
        },
        createChart() {
            const canvas = document.getElementById('graph-canvas');
            const ctx = canvas.getContext('2d');
            var scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: this.type,
                    data: this.chartData,
                    pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                }]
            },
            options: {
                legend:{
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: 'time/s'
                        },
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            callback : (value,index,values) => {
                                this.updateXAxisMax(value, index, values);
                                this.updateXAxisMin(value, index);
                                return value;
                            }
                        },
                    }],
                    yAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: this.currentDataParameter
                        },
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            callback : (value,index,values) => {
                                this.updateYAxisMax(value, index);
                                this.updateYAxisMin(value, index, values);
                                return value;
                            }
                        },
                    }],
                },
                responsive: true
            }
        });
            this.chart = scatterChart;

            canvas.onclick = function(event){
                let active_points = scatterChart.getElementsAtEvent(event);
                if(active_points[0]){
                    eventBus.$emit('newselectedobject', active_points[0]._index);       //data point selected so send event to let other elements know.
                }
                
            };
        },
        updateYAxisMax(value, index){
            if(index == 0){
                this.YAxisMax = value;
            }
            
        },
        updateYAxisMin(value,index,values){
            if(index == values.length - 1){
                this.YAxisMin = value;
            }
        },
        updateXAxisMin(value, index){
            if(index == 0){
                this.XAxisMin = value;
            }
            
        },
        updateXAxisMax(value,index,values){
            if(index == values.length - 1){
                this.XAxisMax = value;
            }
        },
        addDataToChart(data) {
            this.chart.data.datasets[0].data.push(data);
            // this.chart.data.datasets.forEach((dataset) => {
            //     dataset.data.push(data);
            // });
            // this.chart.update(0);       //instantly update with 0 parameter, no animation
            // this.chart.options.scales.yAxes[0].scaleLabel.labelString = this.currentDataParameter;
        },
        clearData(){
            this.chartData = [];
            this.chart.data.datasets[0].data = this.chartData;
            //this.chart.reset();
            this.chart.update();
            this.latest_index = 0;          //NEW
            this.max_reached = false;          //NEW
        },
        getAllData(){
                if(this.current_data_index == 0){
                    this.clearData();
                    
                }
                
                
                //for(let i=0; i<this.$store.getters.getNumData;i++){
                for(let i=this.current_data_index; i<store.getNumData();i++){
                    
                    let x_data = store.state.data[i].t;
                    let y_data;
                    switch(this.currentDataParameter){
                        case 'theta':
                            y_data = store.state.data[i].theta;
                            break;
                        case 'omega':
                            y_data = store.state.data[i].omega;
                            break;

                    }
                    this.addDataToChart({x: x_data, y: y_data});

                    if(i >= this.current_data_index + this.data_index_interval || i == store.getNumData() - 1){
                        this.current_data_index = i + 1;
                        //console.log("broke from get data");
                        break;
                    }
                    
                }

                    if(this.current_data_index < store.getNumData() && this.current_data_index <= this.maxDataPoints){
                        setTimeout(this.getAllData, 20);
                        this.chart.update(0);
                    } else{
                        if(this.current_data_index > this.maxDataPoints){
                            eventBus.$emit('maxdatapointsreached');
                        }
                        this.chart.update(0);
                        console.log('finished loading graph data');
                        this.count = 0;
                        this.current_data_index = 0;
                    }
                    
                
            },
            getLatestData(){
                let index = store.getNumData() - 1;
                let y_data;
                if(index >= 0){
                    
                    let x_data = store.state.data[index].t;
    
                    switch(this.currentDataParameter){
                            case 'theta':
                            y_data = store.state.data[index].theta;
                            break;
                        case 'omega':
                            y_data = store.state.data[index].omega;
                            break;

                        }
                        this.addDataToChart({x: x_data, y: y_data});
                    } else{
                        //console.log("no data");
                    }
                
            },
            getDataAtIndex(index){
                let y_data;
                if(index >= 0){
                   
                    let x_data = store.state.data[index].t;
                
                    switch(this.currentDataParameter){
                            case 'theta':
                            y_data = store.state.data[index].theta;
                            break;
                        case 'omega':
                            y_data = store.state.data[index].omega;
                            break;

                        }
                        this.addDataToChart({x: x_data, y: y_data});
                    } else{
                        //console.log("no data");
                    }
            },
        // getData(){
        //         console.log("getting ALL DATA");
        //         this.clearData();
                
        //         for(let i=0; i<store.state.data.length;i++){
        //             let y_data;
        //             let x_data = store.state.data[i].t;
        //             switch(this.currentDataParameter){
        //                 case 'theta':
        //                     y_data = store.state.data[i].theta;
        //                     break;
        //                 case 'omega':
        //                     y_data = store.state.data[i].omega;

        //             }
        //             this.addDataToChart({x: x_data, y: y_data});
                    
        //         }
                
        //     },
        //     getLatestData(){
        //         console.log("getting LATEST DATA");
        //         let index = store.getNumData() - 1;
        //         let y_data;
        //         if(index >= 0){
        //             let x_data = store.state.data[index].t;
        //             switch(this.currentDataParameter){
        //                     case 'theta':
        //                         y_data = store.state.data[index].theta;
        //                         break;
        //                     case 'omega':
        //                         //data for omega is calculated after the next timestep, so latest is 1 index position behind
        //                         if(index > 0){
        //                             y_data = store.state.data[index - 1].omega;
        //                         }
        //                         break;

        //                 }
        //                 this.addDataToChart({x: x_data, y: y_data});
        //             } else{
        //                 console.log("no data");
        //             }
                
        //     },
            chartAdded(){
                this.total_num_charts = store.state.num_graphs;
            },
            removeChart(){
                this.chart.destroy();
            },
            startLine(event){
                event.preventDefault();
                this.gradient_start_point.x = event.offsetX;
                this.gradient_start_point.y = event.offsetY;

                this.mouseDragging = true;
                
            },
            endDrag(){
                this.mouseDragging = false;
            },
            endLine(event){
                if(this.mouseDragging){
                    //get ratio of y axis to x axis scales, get ratio of y difference in mouse positions and x difference in mouse positions.
                    this.gradient_end_point.x = event.offsetX;
                    this.gradient_end_point.y = event.offsetY;

                    let pointer_ratio = (this.gradient_start_point.y - this.gradient_end_point.y) / (this.gradient_end_point.x - this.gradient_start_point.x);  //pointer ratio

                    let canvas_offset = 32;         //might need to change/check this 
                    let canvas = document.getElementById('graph-canvas');
                    let canvas_height = canvas.clientHeight - canvas_offset;
                    let canvas_width = canvas.clientWidth;
                    let canvas_ratio = canvas_height/canvas_width;      //canvas ratio
                    
                    
                    // let min_x = Infinity;
                    // let min_y = Infinity;
                    // let max_x = -Infinity;
                    // let max_y = -Infinity;
                    // this.chartData.forEach(element => {
                    //     if(element.x < min_x){
                    //         min_x = element.x;
                    //     }
                    //     if(element.x > max_x){
                    //         max_x = element.x;
                    //     }

                    //     if(element.y < min_y){
                    //         min_y = element.y;
                    //     }
                    //     if(element.y > max_y){
                    //         max_y = element.y;
                    //     }

                    // });

                    // if(min_x > 0){       //if two data points set then limits are set to min and max dataset points
                    //     min_x = 0;
                    // }
                    // if(min_y > 0){
                    //     min_y = 0;
                    // }

                    // let y_diff = max_y - min_y;
                    // let x_diff = max_x - min_x;
                    let y_diff = this.YAxisMax - this.YAxisMin;
                    let x_diff = this.XAxisMax - this.XAxisMin;
                    let axis_ratio = y_diff/x_diff;         //axis ratio

                    if(this.chartData.length > 1){
                        this.gradient = axis_ratio*pointer_ratio/canvas_ratio;
                        this.drawLine(this.gradient_start_point, this.gradient_end_point);
                    }
                }
                
            },
            drawLine(from, to){
                
                //draw the gradient line
                //only draw anything if at least 2 data points have been plotted
                let canvas = document.getElementById('graph-canvas');
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.chart.update(0);       //instantly update with no animation

                context.beginPath(); 
                // Staring point 
                context.moveTo(from.x, from.y);
                // End point 
                context.lineTo(to.x, to.y);
                context.lineWidth = 5;
                // set line color
                context.strokeStyle = 'red';
                // Make the line visible
                context.stroke();
                
            },
            plotFunc(func){
                // let min = store.getMinTime();
                // let max = store.getMaxTime();
                let min = this.XAxisMin;
                let max = this.XAxisMax;
                let t_delta = max-min;
                let num_plots = t_delta/this.funcTimeStep;
                let new_data = [];
                let new_t;
                let new_y;
                for(let i=0; i<num_plots;i++){
                    new_t = min + i*this.funcTimeStep;
                    new_y = func(new_t);
                    let data = {
                        x: new_t,
                        y: new_y
                    };
                    new_data.push(data);
                }
                
                this.addNewDataSet('rgba(255, 0, 0, 0.5)', new_data);
            },
            linear(t){
                return (parseFloat(this.func_a)*t + parseFloat(this.func_b));
            },
            quadratic(t){
                return parseFloat(this.func_a)*t*t + parseFloat(this.func_b);
            },
            trigonometric(t){
                return parseFloat(this.func_a)*Math.sin(parseFloat(this.func_b)*t + parseFloat(this.func_c));
            },
            exponential(t){
                return parseFloat(this.func_a)*Math.exp(parseFloat(this.func_b)*t);
            },
            addNewDataSet(colour, data){
                this.chart.data.datasets.push({
                    label:"plotted function",
                    pointBackgroundColor: colour,
                    data: data
                    });
                this.chart.update(0);
            },
            deleteFunctionDataset(){
                this.chart.data.datasets = this.chart.data.datasets.filter(set => set.label !== "plotted function");
                this.chart.update(0);
            },
            

      },
      computed:{
            // newData(){
            //     return this.dataStore.state.data;
            // },
      },
      watch:{
        //   newData(){
        //     if(store.getNumData() <= this.maxDataPoints){
        //         this.getLatestData();
        //     } else{
        //         eventBus.$emit('maxdatapointsreached');
        //     }
            
        // }
      },
      mounted() {
        this.createChart();
        this.getAllData();

        this.updateChart();
      },
      created(){
        //eventBus.$on('updateGraph', this.getData );
        //eventBus.$on('updateGraph', this.getLatestData );
        eventBus.$on('newgraphadded', this.chartAdded);
        eventBus.$on('clearalldata', this.clearData )
        

      }
}
</script>



<style scoped>
#transfer_function{
    width: 120px;
    height: 50px;
}

#second_order_transfer_function{
    width: 160px;
    height: 50px;
}

#linear_function{
    width: 120px;
    height: 30px;
}

#trig_function{
    width: 150px;
    height: 30px;
}

#plotFunctionButton       {background-color: #4CAF50FF;}
#plotFunctionButton:hover {background-color: #3e8e41} 

#clearFunctionButton        {background-color: #e13131ff;}
#clearFunctionButton:hover {background-color: #cc1e1eff;}

#clearButton  {background-color: #e17a31ff;}
#clearButton:hover  {background-color: #cc661eff;}

#outputButton        {background-color: #e1b131ff;}
#outputButton:hover  {background-color: #cc9d1eff;}

label {
    font-size:16px;
    color: #0501f7;
    font-weight: bold;
    display: inline-block;
    /* vertical-align: middle; */
    /* width: 20px; */
    /* padding-top: 20px; */
    /* float: left; */
}

select{
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    
    background-color: #4490d8;
}


</style>
