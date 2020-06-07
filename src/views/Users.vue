<template>
    <div id="Users">
        <h1 style="margin-top:100px;">Usuarios</h1>
        <b-button variant="success" @click="addAdmin">Añadir un administrador</b-button>
        <b-card-group>
            <b-card v-for="(userd, i) in users" v-bind:key="i">
                <p><i>Nombre: </i>{{userd.name}}</p>
                <p><i>Apellido: </i>{{userd.lastName}}</p>
                <p><i>Correo: </i>{{userd.email}}</p>
                <p><i>Teléfono: </i>{{userd.phone}}</p>
                <p><i>Estado: </i>{{userd.location.state.name}}</p>
                <p><i>Municipio: </i>{{userd.location.name}}</p>
                <b-button variant="danger" @click="deleteUser(userd)">Eliminar usuario</b-button>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Users',
    data(){
        return {
            user:null,
            users:[]
        }
    },
    mounted(){
        this.user = this.$store.state.user;
        if(this.user){
            if(this.user.admin == true){
                axios.get(this.$store.state.serverPath + '/api/user').then(res => {
                    this.users = res.data;
                }).catch(err => {
                    console.log(err);
                });
                return;
            }
        }
        this.$router.push('/');
    },
    methods:{
        deleteUser(user){
            axios.delete(this.$store.state.serverPath + '/api/user/' + user._id).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        },
        addAdmin(){
            this.$router.push('/admReg');
        }
    }
}
</script>

<style scoped>

</style>