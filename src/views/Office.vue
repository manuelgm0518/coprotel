<template>
    <b-container id="Office">

        <b-card >

        <!-- Los datos no están en orden -->
        
        <h1>{{office.name}}</h1>
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
        
        <div v-if="!editToggle">
            <b-button variant="danger" @click="rentRequestShow" v-if="acceptRequest">Rentar</b-button>
            <i v-else style="color:red">Esta oficina ya se encuentra rentada</i>
        </div>
            
        
        <h3>Marcar como favorito</h3>
        <b-button variant="warning" @click="addFavorite" v-if="!favoriteToggle">Añadir a favoritos</b-button>
        <b-button variant="warning" @click="quitFavorite" v-if="favoriteToggle">Quitar de favoritos</b-button>

        <div v-if="contactInfo">
            <h3>Información de contacto</h3>
            <b-card>
                <span v-html="office.contact"></span>
            </b-card>
            <p><i>Código de registro: </i>{{code}}</p>
        </div>

        <!-- Dueño y admin -->
        <div id="edit" v-if="editToggle">
            <h3>Eliminar</h3>
            <b-button variant="dark" @click="remove">Eliminar</b-button>
            <h2>Solicitudes</h2>
            <b-card-group>
                <b-card v-for="(rent, i) in office.rents" v-bind:key="i">
                    <p><i>Nombre: </i> {{rent.lessee.name}}</p>
                    <p><i>Apellido: </i> {{rent.lessee.lastName}}</p>
                    <p><i>Correo: </i>{{rent.lessee.email}}</p>
                    <p><i>Fecha de solicitud: </i>{{getTime(rent.requestDate)}}</p>
                    <p><i>Fecha de alojamiento: </i> {{getTime(rent.startDate)}}</p>
                    <p><i>Fecha de desalojamiento: </i> {{getTime(rent.endDate)}}</p>
                    <p><i>Código de registro: </i>{{rent.code}}</p>
                    <div class="optionsRequest" v-if="rent.startDate == null || rent.endDate == null">
                        <div class="requestAccept" v-if="acceptRequest">
                            <b-button variant="success" @click="sendAcceptRequest(rent)">Aceptar solicitud</b-button>
                            <b-button variant="secondary">Eliminar solicitud</b-button>
                        </div>
                        <div class="requestEnd" v-if="rent.startDate != null && rent.endDate == null">
                            <b-button variant="danger" @click="sendCloseRequest(rent)">Cerrar solicitud</b-button>
                        </div>
                    </div>
                </b-card>
            </b-card-group>
        </div>

        <b-card id="requestRent" v-if="rentToggle">
            <h2>Está a punto de rentar una oficina.</h2>
            <p><strong>Aquí van las consideraciones antes de rentar la oficina</strong></p>
            <b-button variant="primary" @click="requestRent">Rentar</b-button>
            <b-button @click="rentToggle = false">Cancelar</b-button>
        </b-card>
        </b-card>
    </b-container>
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
            editToggle:false,
            favoriteToggle:false,
            rentToggle:false,
            acceptRequest:false,
            contactInfo:false,
            code:''
        }
    },
    mounted(){
        axios.get(this.$store.state.serverPath + '/api/office/' + this.$route.params.officeId).then(res => {
            if(res.data == null)
                this.$router.push('/');
            else{
                this.office = res.data;
                this.office.date = new Date(this.office.date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                if(this.$store.state.user){
                    if(this.office.owner == this.$store.state.user._id || this.$store.state.admin)
                        this.editToggle = true;
                    this.favoriteToggle = this.searchFavorite();
                    this.acceptRequest = this.getAcceptRequest();
                    let userRequest = this.getUserRequest();
                    if(userRequest != null){
                        if(userRequest.lessee._id == this.$store.state.user._id){
                            this.code = userRequest.code;
                            this.contactInfo = true;
                        }
                    }
                }
                this.acceptRequest = this.getAcceptRequest();
            }
        }).catch(err => {
            console.log(err);
            this.$router.push('/');
        });
    },
    methods:{
        rentRequestShow(){
            if(this.$store.state.user == null){
                alert('Debe iniciar sesión para poder rentar la oficina'); //Falta ponerlo más bonito
            } else {
                this.rentToggle = true;
            }
        },
        requestRent(){
            axios.post(this.$store.state.serverPath + '/api/office/request/add', {user:this.$store.state.user._id, office:this.$route.params.officeId}).then(res => {
                if(res.status == 200){
                    if(res.data.error){
                        alert('Ya hay una solicitud suya'); //Falta ponerlo más bonito
                    } else {
                        alert('Se ha registrado correctamente'); //Falta ponerlo más bonito
                        this.rentToggle = false;
                    }
                }
            }).catch(err => {
                console.log(err);
            });
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
                    if(res.status == 200){
                        this.favoriteToggle = true;
                        this.upadateUser();
                    }
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
                    if(res.status == 200){
                        this.favoriteToggle = false;
                        this.upadateUser();
                    }
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
        },
        upadateUser(){
            if(localStorage.getItem('token')){
            axios.get(this.$store.state.serverPath + '/api/user/logIn/verify/' + localStorage.getItem('token')).then(res => {
                if(res.data.unauthorized){
                    localStorage.clear();
                    this.$store.state.user = null;
                } else {
                    this.$store.state.user = res.data;
                }
            }).catch(err => {
                console.log(err);
            });
            } else {
                this.$store.state.user = null;
                localStorage.clear();
            }
            this.user = this.$store.state.user;
        },
        getTime(value){
            if(value)
                return new Date(value).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            else
                return 'Aún no asignada';
        },
        getAcceptRequest(){
            var band = true;
            for(var rent of this.office.rents){
                if(rent.startDate != null && rent.endDate == null){
                    band = false;
                }
            }
            return band;
        },
        getUserRequest(){
            var band = null;
            for(var rent of this.office.rents){
                if(rent.startDate != null && rent.endDate == null){
                    band = rent;
                }
            }
            return band;
        },
        sendAcceptRequest(user){
            axios.post(this.$store.state.serverPath + '/api/office/request/accept', {user:user.lessee._id,date:user.requestDate, office:this.$route.params.officeId}).then(res => {
                if(res.status == 200)
                    this.acceptRequest = false;
            }).catch(err => {
                console.log(err);
            });
        },
        sendCloseRequest(user){
            axios.post(this.$store.state.serverPath + '/api/office/request/close', {user:user.lessee._id,date:user.requestDate,office:this.$route.params.officeId,start:user.startDate}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
</style>