<template>

<b-container class="bg-light" style="padding-top:6rem; min-height:100vh">
    <b-row no-gutters>

      <b-col cols="12" lg="4" class="pr-lg-3">
        <b-card>
          {{ this.offices }}
        </b-card>
      </b-col>

      <b-col cols="12" lg="8">
        <OfficeCard v-for="office in offices" :key="office._id" :officeModel="office"/>
      </b-col>
    </b-row>
        
      
  </b-container>
</template>

<script>
import OfficeCard from '../components/OfficeCard'
//import OfficeCardSmall from'../components/OfficeCardSmall'
import axios from 'axios'
export default {
  name: 'Search',
  data: () => ({
    offices: []
  }),
  components: {
    //OfficeCardSmall,
    OfficeCard
  },
  mounted() {
    axios.get(this.$store.state.serverPath + '/api/office/').then(res => {
      console.log(res.data);
      
      this.offices = res.data;
      //this.images = res.images;


    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style>

</style>