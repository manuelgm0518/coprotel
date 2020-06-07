<template>
    <div id=AdmReg>
        <h2>Regístrate como Administrador</h2>

        <b-button v-b-modal.modal-prevent-closing>Sign In</b-button>

        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Sign In"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        
        <form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="admin.name.state"
                label="Name"
                label-for="name-input"
                invalid-feedback="Name is required"
            >
            <b-form-input
                id="name-input"
                v-model="admin.name.value"
                :state="admin.name.state"
                @blur="admin.name.verify(admin.name)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form2" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="admin.lastName.state"
                label="Last Name"
                label-for="lastname-input"
                invalid-feedback="Last Name is required"
            >
            <b-form-input
                id="lastname-input"
                v-model="admin.lastName.value"
                :state="admin.lastName.state"
                @blur="admin.lastName.verify(admin.lastName)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form3" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="admin.email.state"
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
            >
            <b-form-input
                id="email-input"
                v-model="admin.email.value"
                :state="admin.email.state"
                @blur="admin.email.verify(admin.email)"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form4" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="admin.password.state"
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
            >
            <b-form-input
                id="password-input"
                v-model="admin.password.value"
                :state="admin.password.state"
                @blur="admin.password.verify(admin.password)"
                type="password"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        <form ref="form5" @submit.stop.prevent="handleSubmit">

            <b-form-group
                :state="admin.confirmPassword.state"
                label="Confirm Password"
                label-for="confirmpassword-input"
                invalid-feedback="Confirm password is required"
            >
            <b-form-input
                id="confirmpassword-input"
                v-model="admin.confirmPassword.value"
                :state="admin.confirmPassword.state"
                @blur="admin.confirmPassword.verify(admin.confirmPassword)"
                type="password"
                required
            ></b-form-input>
            </b-form-group>

        </form>

        </b-modal>

        <!--<b-form>
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
        </b-form>-->
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
    mounted(){
        if(this.$store.state.user != null)
            this.$router.push('/');
    },
    methods:{
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            const valid2 = this.$refs.form2.checkValidity()
            const valid3 = this.$refs.form3.checkValidity()
            const valid4 = this.$refs.form4.checkValidity()
            const valid5 = this.$refs.form5.checkValidity()
            this.admin.name.state = valid
            this.admin.lastName.state = valid2
            this.admin.email.state = valid3
            this.admin.password.state = valid4
            this.admin.confirmPassword.state = valid5
            return valid && valid2 && valid3 && valid4 && valid5
        },
        resetModal() {
            this.admin.name.value = ''
            this.admin.name.state = null
            this.admin.lastName.value = ''
            this.admin.lastname.state = null
            this.admin.email.value = ''
            this.admin.email.state = null
            this.admin.password.value = ''
            this.admin.password.state = null 
            this.admin.confirmPassword.value = ''
            this.admin.confirmPassword.state = null
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
            this.test()

            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },
        test(){
            //this.changeState();
            //if(this.validateInput()){
            let data = {
                name:this.admin.name.value,
                lastName:this.admin.lastName.value,
                email:this.admin.email.value,
                password:this.admin.password.value,
            }
            axios.post(this.$store.state.serverPath + '/api/admin', data).then(reg => {
                /////
                //alert('Administrador registrado: ' + reg.data.name); //Falta fixear esto xd
                this.$router.push('/login');
                /////
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
            if(input.value == '' || this.admin.email.value.indexOf('@') == -1 || this.admin.email.value.indexOf('.') == -1)
                input.state = false;
            else{
                axios.get(this.$store.state.serverPath + '/api/user/email/' + input.value).then(res => {
                    if(res.data == null)
                        input.state = true;
                    else{
                        input.state = false;
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