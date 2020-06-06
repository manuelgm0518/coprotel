<template>
    <div id="Office">
        <h1 style="margin-top: 80px;">Oficina</h1>
        <h1>Aún en proceso de programación</h1>
        <h2>{{office.name}}</h2>
        <h3>Imagenes</h3>
        <img height="100px" v-for="(image, i) in office.images" v-bind:key="i" alt="Imagen de una oficina" :src="$store.state.serverPath + '/file/' + office.images[i]">
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
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Office',
    data(){
        return {
            office:{}
        }
    },
    created(){
        axios.get(this.$store.state.serverPath + '/api/office/' + this.$route.params.officeId).then(res => {
            if(res.data == null)
                this.$router.push('/');
            else
                this.office = res.data;
        }).catch(err => {
            console.log(err);
            this.$router.push('/');
        });
    }
}
</script>

<style scoped>

</style>