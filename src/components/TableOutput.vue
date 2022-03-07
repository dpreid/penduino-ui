<template>
<div class='container-sm m-2 bg-white border rounded table'>
    <div class="row mb-5 justify-content-center">
    <!-- <input type="text" id="search" v-on:keyup="search" v-model="search_field" placeholder="Search the table..."> -->

    <table class="table">
        <tr>
            <!-- <th scope="col">ID</th> -->
            <th scope="col">Time/s</th>
            <th scope="col">Angle/rad</th>
            <th scope="col">Angular Velocity/rad/s</th>
        </tr>
        <tr v-for="row in tableData" :id="row.id" :key="row.id" v-bind:class="[row.id == selected_row_id ? 'selected-row' : '']" @click="changeSelected(row.id)">
            <!-- <td>{{row.id}}</td> -->
            <td>{{row.t.toFixed(2)}}</td>
            <td>{{row.theta.toFixed(2)}}</td>
            <td>{{row.omega.toFixed(2)}}</td>
        </tr>
                            
    </table> 

    </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'TableOutput',
    props:[
      'selected_point'
    ],
    data(){
        return{
            tableData: [],
            searchData:[],
            search_field:"",
            selected_row_id: "0",
        }
    },
    methods: {
        updateTable(){
            this.tableData = [...this.getData];     //get a clone of the data, not set tableData to the getData getter
        },
    //     search(){
    //         if(this.search_field == ""){
    //             this.searchData = Array.from(this.tableData);
    //         } else{
    //             this.searchData = [];
    //             let d;
    //             let string_data_row;
    //             // Loop through all tableData, create a string of all elements in the table row, search if the current search_field text is contained and set hidden appropriately.
    //             for (let i = 0; i < this.tableData.length; i++) {
    //                 d = this.tableData[i];
    //                 string_data_row = d.id + d.mass + d.name + d.reclat + d.reclong + d.recclass;

    //                 if (string_data_row.toUpperCase().indexOf(this.search_field.toUpperCase()) > -1) {
    //                     this.searchData.push(d);
    //             }    else {
    //                     //tr[i].style.display = "none";
    //         }
        
    // }
    //         }
            
    //     },
        changeSelected(id){
            this.selected_row_id = id;
            var elmnt = document.getElementById(id);
            elmnt.scrollIntoView(); 
        }
      },
      computed:{
        ...mapGetters([
            'getIsRecording',
            'getData',
        ])
      },
      watch:{
          //to clear data table on reset.
        getData(data){
            if(data.length == 0){
                this.updateTable();
            }
        },
        //to update table once recording complete
        getIsRecording(now, prev){
            if(!now && prev){
                this.updateTable();
            }
        },
        selected_point(id){
            this.changeSelected(id);
        }
      },
      mounted() {
        this.updateTable();
      },
      created(){
          
      }
}
</script>

<style scoped>

.selected-row{
    background-color: red;
    color: white;
}

.table{
    overflow: scroll;
    max-height: 500px;
}
</style>
