<template>
  <div id="app">
    <!--- Add :filterSettings="filterOptions" in below code to customize default filter-->
    <ejs-grid ref="grid" :dataSource="data" :allowFiltering ="true">
      <e-columns>
        <e-column field="StaffName" headerText="Staff Name" textAlign="Right"></e-column>
        <!--Add :filter="columnFiltersOptions" in below code to enable checkbox filtering-->
        <e-column field="Location" headerText="Location" :filterTemplate="customTemplate"></e-column>
        <e-column field="Department" headerText="Department" ></e-column>
        <e-column field="Status" headerText="Status"></e-column>
      </e-columns>
    </ejs-grid> 
  </div>     
</template>

<script>
import Vue from "vue";
import{GridPlugin, Filter} from '@sncfusion/ej2-vue-grids';
import {DropDownListPlugin} from '@syncfusion/ej2-vue-dropdowns';
import{DataUtil} from '@syncfusion/ej2-data';
import {data} from "./dataSource";
import func from 'vue-editor-bridge';

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
 data(){
   return {
     data:data,
     //filterOptions:{
     //ignoreAccent:true, //Uncomment this code filter diacritic values
     //columns:[{field: 'StaffName', operator:'startswith', value:'v'}], //Uncomment the code to apply initial filter
     //type:'Excel'//Uncomment to change filter type
     //},
     //columnFilterOptions{//Uncomment while applying the filter type to specific column//}

   };
 },
 methods:{
   customTemplate: function(){
     this.$eventHub.$on("StaffName", this.filterStaffName);
     return{
       template: Vue.component("Template",{
         template:`<ejs-dropdownlist
         :dataSource="staffDistinctData"
         :fields="{text: 'StaffName' value:StaffName}"
         :change="getData">
         </ejs-dropdownlist>`,
    computed:{
      staffDistinctData: function(){
        return DataUtil.distinct(data,'StaffName', true);
      }
    },
  methods:{
    getData(args){
      this.$eventHub.$emit("StaffName", args.itemData.StaffName)//emitted the event  from child component
    }
  }      
       })
     };
   },
   filterStaffName: function(e){
     this.refs.grid.ejInstances.filterByColumn("StaffName", "equal", e);
   }
 },
 provide:{
   grid:[Filter]
 },
};
</script>

<style>

</style>
