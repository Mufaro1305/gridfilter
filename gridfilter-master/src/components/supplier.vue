<template>
  <div class="row">
    <div class="col-6">
    
      <!---Department table-->
      <table class="content-table">
          <input type="text" v-model="search" placeholder="search department"/>
        <thead>
          <th>Department</th>
          <th class="d-flex justify-content-center">
            <Button
              icon="pi pi-plus"
              class="p-button-outlined p-button-rounded"
              @click="setAddDepartment"
            />
          </th>
        </thead>
        <tbody>
          <tr v-for="dept in filteredDepartments" :key="dept.id">
            <td>{{ dept.department }}</td>
            <!---Buttons-->
            <td>
              <Button
                icon="pi pi-pencil"
                @click="setEditDepartment"
                class="p-button-success p-button-rounded mt-2 mb-2"
              />
              <Button
                icon="pi pi-trash"
                @click="deleteDepartment(dept.id)"
                class="p-button-rounded p-button-danger mt-2 mb-2 ms-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Location Table  -->
    <div class="col-6">
      <table class="content-table">
        <thead>
          <th>Location</th>
          <th class="d-flex justify-content-center">
            <Button
              icon="pi pi-plus"
              class="p-button-outlined p-button-rounded"
              @click="setAddLocation"
            />
          </th>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location.id">
            <td>{{ location.location}}</td>
            <!---Buttons-->
            <td>
              <Button
                icon="pi pi-pencil"
                @click="setEditLocation"
                class="p-button-success p-button-rounded mt-2 mb-2"
              />
              <Button
                icon="pi pi-trash"
                @click="deleteLocation(location.id)"
                class="p-button-rounded p-button-danger mt-2 mb-2 ms-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   
  </div>

  <AddDept
    v-if="isDepartmentModalOpen"
    :deptObj="deptObj"
    :isEditing="isEditing"
    :postDepartment="postDepartment"
    :toggleDepartmentModal="toggleDepartmentModal"
    :editDepartment="editDepartment"
    :filteredDepartment="filteredDepartment"
  />
  <AddLocation
    v-if="isLocationModalOpen"
    :locationObj="locationObj"
    :postLocation="postLocation"
    :isEditing="isEditing"
    :toggleLocationModal="toggleLocationModal"
    :editLocation="editLocation"
    
  />
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import maintenanceService from "@/services/maintenanceService";
import AddDept from "@/components/LookupMaintentance/AddDept.vue";
import AddLocation from "@/components/LookupMaintentance/AddLocation.vue";

export default {
  components: {
    Dialog,
    Button,
    AddDept,
    AddLocation,
  },
  data() {
    return {
      departments: [],
      locations: [],
      isLocationModalOpen: false,
      isDepartmentModalOpen: false,
      search:'',
      deptObj: {
        department: null,
        id: null,
        filteredDepartments:'',
      },
      locationObj: {
        location: null,
        id: null,
      },
    };
  },
  methods: {
    //Get department from data
    getDepartments() {
      maintenanceService
        .getAllDepartments()
        .then((resp) => {
          this.departments = resp.data;
          this.isEditing = true;
        })
        .catch((err) => {
          alert(err);
        });
    },
   
    //Add location
    setAddLocation() {
      this.isEditing = false;
      this.clearObj();
      this.toggleLocationModal();
    },
    //Add department
    setAddDepartment() {
      this.isEditing = false;
      this.clearObj();
      this.toggleDepartmentModal();
    },
    //Edit Location
    setEditLocation() {
      this.isEditing = true;
      this.clearObj();
      this.toggleLocationModal();
    },
    //Edit Department
    setEditDepartment(id) {
      this.isEditing = true;

      this.toggleDepartmentModal();
    },
    //Post department
    postDepartment() {
      maintenanceService.postDepartment(this.deptObj).then((resp) => {
        this.departments = resp.data;
      });
    },
    //Edit department from data
    editDepartment() {
      maintenanceService
        .editDepartment(this.deptObj.id.data, this.deptObj)
        .then((resp) => {
          this.departments = resp.data;
        });
    },
    //delete department from data
    deleteDepartment(id) {
      supplierService.deleteDepartment(id).then(() => {
        this.getDepartment();
      });
    },
    toggleLocationModal() {
      this.isLocationModalOpen = !this.isLocationModalOpen;
    },
    toggleDepartmentModal() {
      this.isDepartmentModalOpen = !this.isDepartmentModalOpen;
    },
    //Get Locations
    getLocations() {
      maintenanceService
        .getAllLocations()
        .then((resp) => {
          this.locations = resp.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    //Get Location
    getLocation(id) {
      maintenanceService.getLocation(id).then((resp) => {
        this.locationObj = resp.data;
        this.setEditLocation(id);
      });
    },
    //Get department
    getDepartment(id) {
      maintenanceService.getDepartment(id).then((resp) => {
        this.deptObj = resp.data;
        this.setEditDepartment;
        this.toggleDepartmentModal();
      });
    },

    //post Location
    postLocation() {
      maintenanceService.postLocation(this.locationObj).then((resp) => {
        this.locations = resp.data;
      });
    },
    //Edit Location
    editLocation() {
      maintenanceService
        .editLocation(this.locationObj.id, this.locationObj)
        .then((resp) => {
          this.location = resp.data;
        });
    },
    //Delete location from data
    deleteLocation(id) {
      supplierService.deleteLocation(id).then(() => {
        this.getLocation();
      });
    },
    //clear objects
    clearObj() {
      this.deptObj.department = null;
      this.locationObj.location = null;
    },
  },
  computed:{
   filteredDepartments:function(){
     return this.departments.filter((Departments) =>{
       return Departments.department.toLowerCase().match(this.search)
     })
   }
  },
  beforeMount() {
    this.getDepartments();
    this.getLocations();
  },
};
</script>

<style lang="scss" scoped>
/*   color variables */
$clr-primary: #81d4fa;
$clr-primary-light: #e1f5fe;
$clr-primary-dark: #009879;
$clr-gray100: #f9fbff;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;

/*   border radius */
$radius: 0.2rem;

body {
  font-family: Mukta, sans-serif;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  color: $clr-gray500;
  font-size: 0.9rem;
  background-color: $clr-gray100;
}

table {
  border-collapse: collapse;
  box-shadow: 0 5px 10px $clr-gray300;
  background-color: white;
  text-align: left;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;

  thead {
    box-shadow: 0 2px 10px $clr-gray400;
    background-color: $clr-primary-dark !important;
    color: $clr-gray100;
    font-family: sans-serif !important;
  }

  th {
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }

  td {
    padding: 1rem 2rem;
  }

  //Color alternating rows
  tr:nth-child(odd) {
    background-color: $clr-gray150;
  }
}
.p-button {
  color: $clr-gray100;
}
.p-button:hover {
  background-color: $clr-gray100 !important;
  color: $clr-primary-dark !important;
}
.p-button-danger:hover {
  color: #dc3545 !important;
}
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
</style>