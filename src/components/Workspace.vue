<template>
<div>
    <canvas id="workspace" @mousedown="checkClick" @mousemove="moveClicked" @mouseup="mouseUnclick"></canvas>
    <img id="protractor" src="../../public/images/protractor.png" hidden>
    <img id="ruler" src="../../public/images/ruler.png" hidden>
    <img id="caliper" src="../../public/images/caliper.png" hidden>
</div>
</template>

<script>
//import * as pendulum from "../pendulum";
import { eventBus } from "../main";
import { store } from "../store.js";

var canvas;
var ctx;


// let rect_width = 100;
// let rect_height = 20;
// let rect_top_left_x = 200;
// let rect_top_left_y = 200; 
//var WIDTH = 400;
//var HEIGHT = 300;

let protractor = new Image();
let ruler = new Image();
let caliper = new Image();

let shapes = [];        //the added objects to canvas

export default {
    name: "Workspace",
    data(){
        return{
            isSelected: false,
            selected_index: null,
            selected_offset_x: 0,
            selected_offset_y: 0,
            rotateMode: false,
            isCaliperActive: false,
        }
    },
    mounted(){
        shapes = [];        //ensure when mounted again that the shapes are not redrawn

        canvas = document.getElementById("workspace");
    
        canvas.width = screen.width;
        canvas.height = screen.height;
       
        ctx = canvas.getContext("2d");
       
        //setInterval(() => {this.draw()}, 10);         //not constantly animating, but instead call draw when click and mouse move
        this.addImages();

        //the rectangle shape added to shapes array
        //shapes.push({x:rect_top_left_x, y:rect_top_left_y, width:rect_width, height:rect_height, image:null, angle:0});

        //add a shift key press modifier to the window
        window.addEventListener('keydown', this.updateMode, false);
        window.addEventListener('keyup', this.updateMode, false);


    },
    methods:{
        draw() {
            
            ctx.clearRect(0,0,screen.width, screen.height);

            for(let i=0; i< shapes.length;i++){

                ctx.save();

                if(shapes[i].image != null){
                    ctx.translate(shapes[i].x,shapes[i].y);
                    ctx.translate(shapes[i].width/2, shapes[i].height/2)
                    ctx.rotate(shapes[i].angle);
                    //ctx2.drawImage(shapes[i].image, shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
                    ctx.drawImage(shapes[i].image, -shapes[i].width/2, -shapes[i].height/2, shapes[i].width, shapes[i].height);
                } 
                else
                {
                    // ctx2.clearRect(0,0,screen.width, screen.height);
                    ctx.beginPath();
                    ctx.rect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
                    ctx.stroke();
                    ctx.fill();
                    ctx.fillStyle = "#444444";
                }

                ctx.restore();
            }


            

        },
        addImages(){
             protractor.onload = function() {
                let x = 100;
                let y= 100;
                let w=400;
                let h=200;
                shapes.push( {x:x, y:y, width:w, height:h, image:protractor, angle:0} );
                ctx.drawImage(protractor, x, y, w, h);
                
            };
            protractor.src = document.getElementById("protractor").src;

            ruler.onload = function() {
                let x = 100;
                let y= 300;
                let w=800;
                let h=80;
                ctx.drawImage(ruler, x, y, w, h);
                shapes.push( {x:x, y:y, width:w, height:h, image:ruler, angle:0} );
            };
            ruler.src = document.getElementById("ruler").src;

            caliper.onload = function() {
                let x = 100;
                let y= 400;
                let w=100;
                let h=100;
                ctx.drawImage(caliper, x, y, w, h);
                shapes.push( {x:x, y:y, width:w, height:h, image:caliper, angle:0} );
            };
            caliper.src = document.getElementById("caliper").src;
            
        },
        updateMode(event){
            if(event.repeat){
                return;
            } else{
                if(event.key == "r"){
                    this.rotateMode = !this.rotateMode;
                } 
                else if(event.key == "c")
                {
                    this.isCaliperActive = !this.isCaliperActive;
                }
                // console.log(event);
                // console.log(this.rotateMode);
            }
            
        },
        checkClick(event){
            //console.log(event);
            for(let i=0; i<shapes.length;i++){
                if(event.offsetX >= shapes[i].x && event.offsetX <= shapes[i].x + shapes[i].width){
                    if(event.offsetY >= shapes[i].y && event.offsetY <= shapes[i].y + shapes[i].height){
                        this.isSelected = true;
                        this.selected_index = i;
                        this.selected_offset_x = event.offsetX - shapes[i].x;
                        this.selected_offset_y = event.offsetY - shapes[i].y;
                    }
                
            }
            }

            if(shapes[this.selected_index].image == caliper){
                if(this.isCaliperActive){
                    this.outputData();
                }
                
            }
            
        },
        moveClicked(event){
            if(this.isSelected){
                if(this.rotateMode){
                    if(event.movementY < 0){
                        shapes[this.selected_index].angle -= Math.PI/180;
                    } else if(event.movementY > 0){
                        shapes[this.selected_index].angle += Math.PI/180;
                    }
                    
                } 
                else
                {
                    //ctx2.clearRect(rect_top_left_x, rect_top_left_y, rect_width, rect_height);
                    shapes[this.selected_index].x = event.offsetX - this.selected_offset_x;
                    shapes[this.selected_index].y = event.offsetY - this.selected_offset_y;
                
                }
                this.draw();        //redraw the shapes only when attempting to move
            }
            
        },
        mouseUnclick(){
            this.isSelected = false;
            this.selected_index = null;
        },
        outputData(){
                console.log("output data");
                let angle = store.state.current_angle;
                let time = store.getTime();
                console.log(time);
                let data_object = {id: store.state.data.length, t: parseFloat(time), theta: parseFloat(angle)};
                store.addData(data_object);
                eventBus.$emit('updateGraph');
            },
    }
}


</script>

<style scoped>

#workspace{
    z-index: 2;
    position:absolute;
    left:0px;
    top:100px;
}


</style>