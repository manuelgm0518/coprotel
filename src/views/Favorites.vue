<template>
  <div id="Favorites">
    <h1 v-if="user == null" style="text-align:center; margin-top: 200px">
      Debe iniciar sesión para ver sus oficinas favoritas.<br>
      Saludos del equipo de Rookie Rooters.
    </h1>
    <div v-else id="offices">
      <h1 style="margin-top: 100px">Oficinas favoritas</h1>
      <b-card v-for="(office, i) in offices" v-bind:key="i">
        <h3>{{office.name}}</h3>
        <img :src="$store.state.serverPath + '/file/' + offices[i].images[0]">
        <b-button variant="success" @click="goOffice(office)">Ver más</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Favorites',
  data(){
    return {
      user:null,
      offices:[]
    }
  },
  mounted(){
    this.user = this.$store.state.user;
    if(this.user.admin)
      if(this.user.admin == true)
        this.user = null;
    if(this.user != null)
      axios.post(this.$store.state.serverPath + '/api/office/favorites', {offices:this.user.favorites}).then(res => {
        if(res.status == 200)
          this.offices = res.data;
          this.clearOffices();
      }).catch(err => {
        console.log(err);
      });
  },
  methods:{
    goOffice(office){
      this.$router.push('/office/' + office._id);
    },
    clearOffices(){
      while(this.offices.indexOf(null) != -1)
        this.offices.splice(this.offices.indexOf(null), 1);
    }
  }
}
</script>

<style>

</style>