<template>
    <div id=Register>

        <h2>Regístrate</h2>

        <b-button v-b-modal.modal-prevent-closing size="lg">Sign Up</b-button>

        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Sign Up"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        
        <form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.name.state"
                label="Name"
                label-for="name-input"
                invalid-feedback="Name is required"
            >

            <b-form-input
                id="name-input"
                v-model="user.name.value"
                :state="user.name.state"
                @blur="user.name.verify(user.name)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form2" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.lastName.state"
                label="Last Name"
                label-for="lastname-input"
                invalid-feedback="Last name is required"
            >
            <b-form-input
                id="lastname-input"
                v-model="user.lastName.value"
                :state="user.lastName.state"
                @blur="user.lastName.verify(user.lastName)"
                required
            ></b-form-input>
            </b-form-group>

        </form>
        

        <form ref="form3" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.email.state"
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
            >
            <b-form-input
                id="email-input"
                v-model="user.email.value"
                :state="user.email.state"
                @blur="user.email.verify(user.email)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form4" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.password.state"
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
            >
            <b-form-input
                id="password-input"
                v-model="user.password.value"
                :state="user.password.state"
                type="password"
                @blur="user.password.verify(user.password)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form5" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.confirmPassword.state"
                label="Confirm Password"
                label-for="confirmpassword-input"
                invalid-feedback="Confirm password is required"
            >
            <b-form-input
                id="confirmpassword-input"
                v-model="user.confirmPassword.value"
                :state="user.confirmPassword.state"
                 type="password"
                @blur="user.confirmPassword.verify(user.confirmPassword)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

         <form ref="form6" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.phone.state"
                label="Phone"
                label-for="phone-input"
                invalid-feedback="Phone is required"
            >
            <b-form-input
                id="phone-input"
                v-model="user.phone.value"
                :state="user.phone.state"
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form7" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.state.state"
                label="State"
                label-for="state-input"
                invalid-feedback="State is required"
            >
            <!--<b-form-select
                id="state-input"
                v-model="user.state.value"
                :state="user.state.state"
                :options="states"
                @change="loadMunicipalities(); user.state.verify(user.state);"
                required
            ></b-form-select>-->

            <b-form-select 
                v-model="user.state.value" 
                :state="user.state.state" 
                @change="loadMunicipalities(); user.state.verify(user.state);"
                required
            >
                <option 
                    v-for="(state, i) in states" 
                    v-bind:key="i" 
                    :value="state._id">
                    
                    {{state.name}}
                
                </option>
            </b-form-select>

            </b-form-group>

        </form>

         <form ref="form8" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="user.location.state"
                label="Location"
                label-for="location-input"
                invalid-feedback="Location is required"
            >

            <b-form-select
                id="location-input"
                v-model="user.location.value"
                :state="user.location.state"
                @change="user.location.verify(user.location)"
                required
            >
                <option 
                    v-for="(municipality, j) in municipalities" 
                    v-bind:key="j" 
                    :value="municipality._id">

                    {{municipality.name}}
                
                </option>
            </b-form-select>

            </b-form-group>

        </form>


        </b-modal>
 

        
        <!--<b-form>
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
            <label for="location">Selecciona tu estado y municipio</label>
            <b-select v-model="user.state.value" :state="user.state.state" @change="loadMunicipalities(); user.state.verify(user.state);">
                <option v-for="(state, i) in states" v-bind:key="i" :value="state._id">{{state.name}}</option>
            </b-select> 
            <b-select v-model="user.location.value" :state="user.location.state" @change="user.location.verify(user.location)">
                <option v-for="(municipality, j) in municipalities" v-bind:key="j" :value="municipality._id">{{municipality.name}}</option>
            </b-select> 
            <b-button type="button" variant="primary" @click="register">Regístrate</b-button>
        </b-form>-->
    </div>
</template>

<script>
import axios from 'axios';

export default { //ok
    data(){
        return {
            user:{
                name:{value:'', state:null, verify:this.verifyText},
                lastName:{value:'', state:null, verify:this.verifyText},
                email:{value:'', state:null, verify:this.verifyEmail},
                password:{value:'', state:null, verify:this.verifyText},
                confirmPassword:{value:'', state:null, verify:this.verifyPassword},
                phone:{value:'', state:null, verify:this.verifyPhone},
                state:{value:'', state:null, verify:this.verifyText},
                location:{value:'', state:null, verify:this.verifyText}
            },
            states:[],
            municipalities:[{name:'Elija un municipio', _id:''}]
        }
    },
    mounted(){ //ok
        if(this.$store.state.user != null)
            this.$router.push('/');
        else{
            axios.get(this.$store.state.serverPath + '/api/state').then(res => {
                this.states = res.data;
                this.states.unshift({name:"Elija un estado", _id:""});
            }).catch(err => {
                console.log(err);
            });
        }
    },
    methods:{
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            const valid2 = this.$refs.form2.checkValidity()
            const valid3 = this.$refs.form3.checkValidity()
            const valid4 = this.$refs.form4.checkValidity()
            const valid5 = this.$refs.form5.checkValidity()
            const valid6 = this.$refs.form6.checkValidity()
            const valid7 = this.$refs.form7.checkValidity()
            const valid8 = this.$refs.form8.checkValidity()
            this.user.name.state = valid
            this.user.lastName.state = valid2
            this.user.email.state = valid3
            this.user.password.state = valid4
            this.user.confirmPassword.state = valid5
            this.user.phone.state = valid6
            this.user.state.state = valid7
            this.user.location.state = valid8
            return valid && valid2 && valid3 && valid4 && valid5 && valid6 && valid7 && valid8 
        },
        resetModal() {
            this.user.name.value = ''
            this.user.name.state = null
            this.user.lastName.value = ''
            this.user.lastName.state = null
            this.user.email.value = ''
            this.user.email.state = null
            this.user.password.value = ''
            this.user.password.state = null
            this.user.confirmPassword.value = ''
            this.user.confirmPassword.state = null
            this.user.phone.value = ''
            this.user.phone.state = null
            this.user.state.value = ''
            this.user.state.state = null
            this.user.location.value = ''
            this.user.location.state = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {

            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Hide the modal manually
            this.register()
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },
        register(){
            this.changeState();
            //if(this.validateInput()){
            let data = {
                name:this.user.name.value,
                lastName:this.user.lastName.value,
                email:this.user.email.value,
                password:this.user.password.value,
                phone:this.user.phone.value,
                location:this.user.location.value
            }
            axios.post(this.$store.state.serverPath + '/api/user', data).then(reg => {
                if(reg.status == 200)
                    this.$router.push('/login');
            }).catch(err => {
                console.log(err);
            });
            //}
            //else
                //alert('Llene todos los campos'); //Falta poner este más bonito
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
                        //alert('Correo ya registrado'); //Falta ponerlo más bonito
                        this.$bvToast.toast('Correo ya registrado', {
                            title: `Error`,
                            variant: `danger`,
                            toaster: `b-toaster-top-center`,
                            solid: true
                        })
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
        loadMunicipalities(){ //ok
            this.user.location.value = '';
            if(this.user.state.value == '')
                this.municipalities = [{name:'Elija un municipio', _id:''}];
            else{
                axios.get(this.$store.state.serverPath + '/api/municipality/' + this.user.state.value)
                .then(res => {
                    this.municipalities = res.data;
                    this.municipalities.unshift({name:"Elija un municipio", _id:""});
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
