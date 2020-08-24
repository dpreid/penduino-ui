<template>
<div>
    <canvas id="workspace"></canvas>
    <canvas id="workspace2" @mousedown="checkClick" @mousemove="moveClicked" @mouseup="mouseUnclick"></canvas>
    <img id="protractor" src="../../public/images/protractor.png" hidden>
    <img id="ruler" src="../../public/images/ruler.png" hidden>
</div>
</template>

<script>
//import * as pendulum from "../pendulum";
//import { eventBus } from "../main";
var canvas;
var ctx1;
var x = 400;
var y = 300;
var dx = 2;
var dy = 4;

let canvas2;
let ctx2;
let rect_width = 100;
let rect_height = 20;
let rect_top_left_x = 200;
let rect_top_left_y = 200; 
//var WIDTH = 400;
//var HEIGHT = 300;

let protractor = new Image();
let ruler = new Image();

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
        }
    },
    mounted(){
        shapes = [];        //ensure when mounted again that the shapes are not redrawn

        canvas = document.getElementById("workspace");
        canvas2 = document.getElementById("workspace2");
    
        canvas.width = screen.width;
        canvas.height = screen.height;
        canvas2.width = screen.width;
        canvas2.height = screen.height;
       
        ctx1 = canvas.getContext("2d");
        ctx2 = canvas2.getContext("2d");
       
        //setInterval(() => {this.draw()}, 10);         //not constantly animating, but instead call draw when click and mouse move
        this.addImages();
        

        //the rectangle shape added to shapes array
        shapes.push({x:rect_top_left_x, y:rect_top_left_y, width:rect_width, height:rect_height, image:null, angle:0});

        //add a shift key press modifier to the window
        window.addEventListener('keydown', this.updateMode, false);
        window.addEventListener('keyup', this.updateMode, false);


    },
    methods:{
        draw() {
            ctx1.clearRect(0, 0, screen.width, screen.height);
            ctx1.fillStyle = "#FAF7F8";
            //ctx1.beginPath();
            //ctx1.rect(0,0,WIDTH,HEIGHT);
            //ctx1.closePath();
            ctx1.fill();
            ctx1.fillStyle = "#444444";
            ctx1.beginPath();
            ctx1.arc(x, y, 10, 0, Math.PI*2, true);
            ctx1.closePath();
            ctx1.fill();

            if (x + dx > screen.width || x + dx < 0)
            dx = -dx;
            if (y + dy > screen.height || y + dy < 0)
            dy = -dy;

            x += dx;
            y += dy;

            ctx2.clearRect(0,0,screen.width, screen.height);

            for(let i=0; i< shapes.length;i++){

                ctx2.save();

                if(shapes[i].image != null){
                    ctx2.translate(shapes[i].x,shapes[i].y);
                    ctx2.translate(shapes[i].width/2, shapes[i].height/2)
                    ctx2.rotate(shapes[i].angle);
                    //ctx2.drawImage(shapes[i].image, shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
                    ctx2.drawImage(shapes[i].image, -shapes[i].width/2, -shapes[i].height/2, shapes[i].width, shapes[i].height);
                } 
                else
                {
                    // ctx2.clearRect(0,0,screen.width, screen.height);
                    ctx2.beginPath();
                    ctx2.rect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
                    ctx2.stroke();
                    ctx2.fill();
                    ctx2.fillStyle = "#444444";
                }

                ctx2.restore();
            }


            

        },
        addImages(){
             protractor.onload = function() {
                let x = 100;
                let y= 100;
                ctx2.drawImage(protractor, x, y);
                shapes.push( {x:x, y:y, width:400, height:200, image:protractor, angle:0} );
            };
            protractor.src = document.getElementById("protractor").src;

            ruler.onload = function() {
                let x = 100;
                let y= 300;
                ctx2.drawImage(ruler, x, y);
                shapes.push( {x:x, y:y, width:800, height:80, image:ruler, angle:0} );
            };
            ruler.src = document.getElementById("ruler").src;
            
        },
        updateMode(event){
            if(event.repeat){
                return;
            } else{
                if(event.key == "r"){
                    this.rotateMode = !this.rotateMode;
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
        }
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

#workspace2{
    z-index: 3;
    position:absolute;
    left:0px;
    top:100px;
}

#imagespace{
     z-index: 1;
    position:absolute;
    left:0px;
    top:100px;
}
</style>