<template>
  <div>
  <b-container fluid class="bg-light vh-10" style="padding-top:4rem">
    <NavigationBar/>
    <div class="vertical-middle text-center">
    <br><br>
    </div>
  </b-container>
  <b-container>
    <div class="vertical-left text center">
      <br>
      <h2>Mi perfil</h2>
      <br>
      <div>
        <h5>Nombre: {{user.name}}</h5>
        <h5>Apellido: {{user.lastName}}</h5>
        <h5>Correo electrónico: {{user.email}}</h5>
        <h5>Estado: {{user.location.state.name}}</h5>
        <h5>Municipio: {{user.location.name}}</h5>
        <img :src="$store.state.serverPath + '/file/' + user.image">
        <b-button variant="primary" @click="mostrar = !mostrar">Editar imagen</b-button>
        <template v-if="mostrar">
            <b-file
                class="image"
                placeholder="Elige una imagen" 
                v-model="tempimg"
                @input="tempimg"
            ></b-file>
            <b-button variant="primary" @click="mostrar = !mostrar, changePfp()">Editar</b-button>
        </template>
        <br>
      <b-button variant="danger" @click="logOut">Cerrar sesión</b-button>
      <h2>Mis oficinas</h2>
      <b-button variant="warning" @click="$router.push('/addoffice')">Agregar una oficina</b-button>
      <b-card v-for="(office, i) in offices" v-bind:key="i">
        <h3>{{office.name}}</h3>
        <img :src="$store.state.serverPath + '/file/' + offices[i].images[0]">
        <b-button variant="success" @click="goOffice(office)">Ver más</b-button>
        
        <!-- <b-link src='/office/' + offices[i]._id>
        <h3>{{offices[i].name}}</h3>
         
        </b-link> -->
      </b-card>
      </div>
    </div>
  </b-container>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';

export default {
  name: 'Profile',
  components: {
    NavigationBar
  },
  data(){
    return{
      mostrar:false,
      tempimg:null,
      user:{
        name:'',
        lastName:'',
        email:'',
        location:{name:'', state:{name:''}},
        image:''
      },
      offices:[]
    }
  },
  mounted(){
    this.user = this.$store.state.user;
    axios.get(this.$store.state.serverPath + '/api/office/user/' + this.user._id).then(res => {
      console.log(res.data);
      this.offices = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
  methods:{
      changePfp(){
        var formData = new FormData();
          formData.append('image', this.tempimg);
          axios.post(this.$store.state.serverPath + '/api/user/image/' + this.user._id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
          alert('aah'); //Falta poner la página de regreso
          this.$router.push('/');
      },
      goOffice(office){
        this.$router.push('/office/' + office._id);
      },
      logOut(){
        localStorage.clear();
        this.$router.go();
      }
  }
  
}
</script>

<style>
 
</style>
    
