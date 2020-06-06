<template>
    <div id=Register>
       <h2>Regístrate</h2>
        <b-form>
            <label for="name">Nombre</label>
            <b-input id="name" type="text" placeholder="Tu nombre" v-model="user.name.value" :state="user.name.state" @blur="user.name.verify(user.name)"></b-input>
            <label for="lastName">Apellido</label>
            <b-input id="lastName" type="text" placeholder="Tu apellido" v-model="user.lastName.value" :state="user.lastName.state" @blur="user.lastName.verify(user.lastName)"></b-input>
            <label for="email">Correo Electrónico</label>
            <b-input id="email" type="text" placeholder="Tu correo electrónico" v-model="user.email.value" :state="user.email.state" @blur="user.email.verify(user.email)"></b-input>
            <label for="password">Contraseña</label>
            <b-input id="password" type="password" placeholder="Tu contraseña" v-model="user.password.value" :state="user.password.state" @blur="user.password.verify(user.password)"></b-input>
            <label for="confirmPassword">Confirmar contraseña</label> 
            <b-input id="confirmPassword" type="password" placeholder="Confirmar contraseña" v-model="user.confirmPassword.value" :state="user.confirmPassword.state"  @blur="user.confirmPassword.verify(user.confirmPassword)"></b-input>                
            <label for="phone">Teléfono (opcional)</label>
            <b-input id="phone" type="text" placeholder="Tu teléfono" v-model="user.phone.value" :state="user.phone.state"></b-input>
            <label for="location">Selecciona tu país y estado</label>
            <b-select v-model="user.country.value" :state="user.country.state" @change="loadStates(); user.country.verify(user.country);">
                <option v-for="(country, i) in countries" v-bind:key="i" :value="country._id">{{country.name}}</option>
            </b-select> 
            <b-select v-model="user.location.value" :state="user.location.state" @change="user.location.verify(user.location)">
                <option v-for="(state, j) in states" v-bind:key="j" :value="state._id">{{state.name}}</option>
            </b-select>
            <b-button type="button" variant="primary" @click="test">Regístrate</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            user:{
                name:{value:'', state:null, verify:this.verifyText},
                lastName:{value:'', state:null, verify:this.verifyText},
                email:{value:'', state:null, verify:this.verifyEmail},
                password:{value:'', state:null, verify:this.verifyText},
                confirmPassword:{value:'', state:null, verify:this.verifyPassword},
                phone:{value:'', state:null, verify:this.verifyPhone},
                country:{value:'', state:null, verify:this.verifyText},
                location:{value:'', state:null, verify:this.verifyText}
            },
            countries:[],
            states:[{name:'Elija un estado', _id:''}]
        }
    },
    created(){
        axios.get(this.$store.state.serverPath + '/api/country').then(res => {
            this.countries = res.data;
            this.countries.unshift({name:"Elija un país", _id:""});
        }).catch(err => {
            console.log(err);
        });
    },
    methods:{
        test(){
            this.changeState();
            if(this.validateInput()){
                let data = {
                    name:this.user.name.value,
                    lastName:this.user.lastName.value,
                    email:this.user.email.value,
                    password:this.user.password.value,
                    phone:this.user.phone.value,
                    location:this.user.location.value
                }
                axios.post(this.$store.state.serverPath + '/api/user', data).then(reg => {
                    axios.post(this.$store.state.serverPath + '/api/user/logIn', {email:reg.data.email, password:this.user.password.value}).then(res => {
                        if(res.data.error){
                            console.log('Usuario o contraseña incorrecto');
                        } else {
                            localStorage.setItem('token', res.data);
                            this.$router.push('/');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
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
            if(input.value == '' || this.user.email.value.indexOf('@') == -1 || this.user.email.value.indexOf('.') == -1)
                input.state = false;
            else{
                axios.get(this.$store.state.serverPath + '/api/user/email/' + input.value).then(res => {
                    if(res.data == null)
                        input.state = true;
                    else{
                        input.state = false;
                        alert('Correo ya registrado'); //Falta ponerlo más bonito
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        verifyPassword(input){
            if(this.user.password.value !=false && this.user.password.value == input.value){
                input.state = true;
            } else {
                input.state = false;
            }                  
        },
        verifyPhone(input){
            if(input.value != '')
                input.state = true;
        },
        loadStates(){
            this.user.location.value = '';
            if(this.user.country.value == '')
                this.states = [{name:'Elija un estado', _id:''}];
            else{
                axios.get(this.$store.state.serverPath + '/api/state/' + this.user.country.value)
                .then(res => {
                    this.states = res.data;
                    this.states.unshift({name:"Elija un estado", _id:""});
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        changeState(){
            for(var input in this.user){
                this.user[input].verify(this.user[input]);
            }  
        },
        validateInput(){
            var band = true;
            for(var input in this.user){
                if(input != 'phone'){
                    if(this.user[input].state == false)
                    band = false;
                }
            }
            return band;
        }
    }
}
</script>