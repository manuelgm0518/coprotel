<template>
    <div id=AdmReg>
        <h2>Regístrate como Administrador</h2>
        <b-form>
            <label for="name">Nombre</label>
            <b-input id="name" type="text" placeholder="Tu nombre" v-model="admin.name.value" :state="admin.name.state" @blur="admin.name.verify(admin.name)"></b-input>
            <label for="lastName">Apellido</label>
            <b-input id="lastName" type="text" placeholder="Tu apellido" v-model="admin.lastName.value" :state="admin.lastName.state" @blur="admin.lastName.verify(admin.lastName)"></b-input>
            <label for="email">Correo Electrónico</label>
            <b-input id="email" type="text" placeholder="Tu correo electrónico" v-model="admin.email.value" :state="admin.email.state" @blur="admin.email.verify(admin.email)"></b-input>
            <label for="password">Contraseña</label>
            <b-input id="password" type="password" placeholder="Tu contraseña" v-model="admin.password.value" :state="admin.password.state" @blur="admin.password.verify(admin.password)"></b-input>
            <label for="confirmPassword">Confirmar contraseña</label> 
            <b-input id="confirmPassword" type="password" placeholder="Confirmar contraseña" v-model="admin.confirmPassword.value" :state="admin.confirmPassword.state"  @blur="admin.confirmPassword.verify(admin.confirmPassword)"></b-input>                
            <b-button type="button" variant="primary" @click="test">Regístrate</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            admin:{
                name:{value:'', state:null, verify:this.verifyText},
                lastName:{value:'', state:null, verify:this.verifyText},
                email:{value:'', state:null, verify:this.verifyEmail},
                password:{value:'', state:null, verify:this.verifyText},
                confirmPassword:{value:'', state:null, verify:this.verifyPassword},
            }
        }
    },
    methods:{
        test(){
            this.changeState();
            if(this.validateInput()){
                let data = {
                    name:this.admin.name.value,
                    lastName:this.admin.lastName.value,
                    email:this.admin.email.value,
                    password:this.admin.password.value,
                }
                axios.post(this.$store.state.serverPath + '/api/admin', data).then(reg => {
                    /////
                    alert('Administrador registrado: ' + reg.data.name); //Falta fixear esto xd
                    /////
                }).catch(err => {
                    console.log(err);
                });
            }
            else
                alert('Llene todos los campos'); //Falta poner este más bonito
        },
        verifyText(input){
            if(input.value == '')
                input.state = false; 
            else
                input.state = true;
        },
        verifyEmail(input){
            if(input.value == '' || this.admin.email.value.indexOf('@') == -1 || this.admin.email.value.indexOf('.') == -1)
                input.state = false;
            else{
                axios.get(this.$store.state.serverPath + '/api/user/email/' + input.value).then(res => {
                    if(res.data == null)
                        input.state = true;
                    else{
                        input.state = false;
                        alert('Correo ya registrado'); //Hacerlo bonito pls
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        verifyPassword(input){
            if(this.admin.password.value !=false && this.admin.password.value == input.value){
                input.state = true;
            } else {
                input.state = false;
            }                  
        },

        changeState(){
            for(var input in this.admin){
                this.admin[input].verify(this.admin[input]);
            }  
        },
        validateInput(){
            var band = true;
            for(var input in this.admin){
                if(this.admin[input].state == false)
                band = false;
            }
            return band;
        }
    }
}
</script>