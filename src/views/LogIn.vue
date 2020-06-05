<template>
    <div id="LogIn">
        <h2>Iniciar sesión</h2>
        <b-form>
            <label for="email">Correo electronico</label>
            <b-input id="email" type="text" placeholder="Tu correo" v-model="user.email"></b-input>
            <label for="password">Contraseña</label>
            <b-input id="password" type="password" placeholder="Tu contraseña" v-model="user.password"></b-input>
            <b-button id="btnLogIn" type="button" variant="danger" @click="logIn">Iniciar sesión</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        logIn(){
            if(this.user.email == '' || this.user.password == ''){
                alert('Debe llenar todos los campos'); //Falta ponerlo más bonito
            } else {
                axios.post(this.$store.state.serverPath + '/api/user/logIn', this.user).then(res => {
                    if(res.data.error){
                        axios.post(this.$store.state.serverPath + '/api/admin/logIn', this.user).then(res => {
                            if(res.data.error)
                                alert('Usuario o contraseña incorrecto'); //Falta ponerlo más bonito
                            else {
                                localStorage.setItem("token", res.data);
                                this.$router.push('/');
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        localStorage.setItem("token", res.data);
                        this.$router.push('/');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
}
</script>

<style scoped>

</style>