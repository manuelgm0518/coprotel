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
        <b-button variant="danger" @click="rent">Rentar</b-button> <!-- Codificación -->
        <h3>Marcar como favorito</h3>
        <b-button variant="warning">Favorito</b-button> <!-- Codificación -->

        <!-- Dueño y admin -->
        <h3>Eliminar</h3>
        <b-button variant="dark">Eliminar</b-button>
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
            }
        }
    },
    mounted(){
        console.log(this.$store.state.user);
        axios.get(this.$store.state.serverPath + '/api/office/' + this.$route.params.officeId).then(res => {
            if(res.data == null)
                this.$router.push('/');
            else{
                this.office = res.data;
                this.office.date = new Date(this.office.date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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
            }
        }
    }
}
</script>

<style scoped>

</style>