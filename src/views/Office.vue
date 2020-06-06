<template>
    <div id="Office">
        <h1 style="margin-top: 80px;">Oficina</h1>
        <h1>Aún en proceso de programación</h1>
        <h2>{{office.name}}</h2>
        <h3>Imagenes</h3>
        <img height="100px" v-for="(image, i) in office.images" v-bind:key="i" alt="Imagen de una oficina" :src="$store.state.serverPath + '/file/' + office.images[i]">
        <h3>Palabras claves</h3>
        <h4><b-badge variant="primary" v-for="(word, j) in office.keywords" v-bind:key="'j' + j">{{word}}</b-badge></h4>
        <h3>Descripción</h3>
        <b-card>
            <span v-html="office.description"></span>
        </b-card>
        <h3>Información adicional</h3>
        <p><i>Estado: </i>{{office.location.state.name}}</p>
        <p><i>Municipio: </i>{{office.location.name}}</p>
        <p><i>Área: </i>{{office.area}} metros cuadrados</p>
        <p><i>Capacidad: </i>{{office.capacity}} personas</p>
        <p><i>Fecha de registro: </i>{{office.date}}</p>
        <h3>Precio de renta</h3>
        <p><i>Precio: </i>{{office.rentAmount}}</p>
        <b-button variant="danger" @click="rent">Rentar</b-button>
        <h3>Marcar como favorito</h3>
        <b-button variant="warning" @click="addFavorite" v-if="!favoriteToggle">Añadir a favoritos</b-button>
        <b-button variant="warning" @click="quitFavorite" v-if="favoriteToggle">Quitar de favoritos</b-button>

        <!-- Dueño y admin -->
        <div id="edit" v-if="edit">
            <h3>Eliminar</h3>
            <b-button variant="dark" @click="remove">Eliminar</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Office',
    data(){
        return {
            office:{
                name:'',
                images:[],
                description:'',
                location:{name:'', state:{name:''}},
                area:'',
                capacity:'',
                date:null,
                keywords:[]
            },
            edit:false,
            favoriteToggle:false
        }
    },
    mounted(){
        axios.get(this.$store.state.serverPath + '/api/office/' + this.$route.params.officeId).then(res => {
            if(res.data == null)
                this.$router.push('/');
            else{
                this.office = res.data;
                this.office.date = new Date(this.office.date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                if(this.office.owner == this.$store.state.user._id || this.$store.state.admin)
                    this.edit = true;
                this.favoriteToggle = this.searchFavorite();
            }
        }).catch(err => {
            console.log(err);
            this.$router.push('/');
        });
    },
    methods:{
        rent(){
            if(this.$store.state.user == null){
                alert('Debe iniciar sesión para poder rentar la oficina'); //Falta ponerlo más bonito
            } else {
                alert('Aquí debería haber una renta');
            }
        },
        searchFavorite(){
            var band = false;
            if(this.$store.state.user != null){
                for(var fav of this.$store.state.user.favorites)
                    if(fav == this.$route.params.officeId)
                        band = true;
            }
            return band;
        },
        addFavorite(){
            if(this.$store.state.user == null){
                alert('Debe iniciar sesión para poder añadir a favoritos'); //Falta ponerlo más bonito
            } else {
                axios.post(this.$store.state.serverPath + '/api/user/favorite/add', {user:this.$store.state.user._id, office:this.$route.params.officeId}).then(res => {
                    if(res.status == 200)
                        this.favoriteToggle = true;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        quitFavorite(){
            if(this.$store.state.user == null){
                alert('Debe iniciar sesión para poder añadir a favoritos'); //Falta ponerlo más bonito
            } else {
                axios.post(this.$store.state.serverPath + '/api/user/favorite/quit', {user:this.$store.state.user._id, office:this.$route.params.officeId}).then(res => {
                    if(res.status == 200)
                        this.favoriteToggle = false;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        remove(){
            axios.delete(this.$store.state.serverPath + '/api/office/' +  this.$route.params.officeId).then(res => {
                if(res.status == 200){
                    alert('Falta asignar ruta de regreso');
                    this.$router.push('/');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>