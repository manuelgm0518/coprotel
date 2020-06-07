<template>
    <div id="AddOffice" style="margin: 10px">

        <b-card style="max-width: 60rem;" class=".card">

        <h1 style="margin-top: 100px;">Agregar una oficina</h1>

        <b-form> <!--Los inputs no están en orden-->

            <form ref="form" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.name.state"
                    label="Name"
                    label-for="name-input"
                    invalid-feedback="Name is required"
                >
                <b-form-input
                    id="name-input" 
                    type="text" 
                    v-model="office.name.value" 
                    :state="office.name.state" 
                    @blur="office.name.validate(office.name)"
                    required
                ></b-form-input>
                </b-form-group>

            </form>

            <form ref="form1" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.description.state"
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="Description is required"
                >
                <AreaEditor
                    id="description-input" 
                    type="text" 
                    v-model="office.description.value" 
                    :state="office.description.state" 
                    @update="updateDescription" 
                    :content="office.description.value"
                    required
                />
                </b-form-group>

            </form>

            <form ref="form2" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.state.state"
                    label="State"
                    label-for="state-input"
                    invalid-feedback="State is required"
                >

                <b-form-select
                    id="state-input"
                    v-model="office.state.value" 
                    :state="office.state.state"
                    @change="changeMunicipalities(); office.state.validate(office.state)" 
                    required
                >
                    <option 
                        v-for="(state, k) in states" 
                        v-bind:key="'k' + k" 
                        :value="state._id">
                            {{state.name}}  
                    </option>
                </b-form-select>

                </b-form-group>

            </form>

            <form ref="form3" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.state.state"
                    label="Location"
                    label-for="location-input"
                    invalid-feedback="Location is required"
                >

                <b-form-select
                    id="location-input"
                    v-model="office.location.value" 
                    :state="office.location.state"
                    @change="office.location.validate(office.location)" 
                    required
                > 
                    <option 
                        v-for="(municipality, l) in municipalities" 
                        v-bind:key="'l' + l" 
                        :value="municipality._id">
                            {{municipality.name}}
                    </option>
                </b-form-select>

                </b-form-group>

            </form>

            <form ref="form4" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.rentAmount.state"
                    label="Rent Amount"
                    label-for="rentAmount-input"
                    invalid-feedback="Rent Amount is required"
                >
                <b-form-input
                    id="rentAmount-input" 
                    type="text" 
                    v-model="office.rentAmount.value" 
                    :state="office.rentAmount.state" 
                    @blur="office.rentAmount.validate(office.rentAmount)"
                    required
                ></b-form-input>
                </b-form-group>

            </form>

            <form ref="form5" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.contact.state"
                    label="Contact"
                    label-for="contact-input"
                    invalid-feedback="Contact is required"
                >
                <AreaEditor
                    id="contact-input" 
                    type="text" 
                    v-model="office.contact.value" 
                    :state="office.contact.state" 
                    @update="updateContact"
                    required
                />
                </b-form-group>

            </form>

            <form ref="form6" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.area.state"
                    label="Area"
                    label-for="area-input"
                    invalid-feedback="Area is required"
                >
                <b-form-input
                    id="area-input" 
                    type="text" 
                    v-model="office.area.value" 
                    :state="office.area.state" 
                    @blur="office.area.validate(office.area)"
                    required
                ></b-form-input>
                </b-form-group>

            </form>

            <form ref="form7" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.capacity.state"
                    label="Capacity"
                    label-for="capacity-input"
                    invalid-feedback="Capacity is required"
                >
                <b-form-input
                    id="capacity-input" 
                    type="text" 
                    v-model="office.capacity.value" 
                    :state="office.capacity.state" 
                    @blur="office.capacity.validate(office.capacity)"
                    required
                ></b-form-input>
                </b-form-group>

            </form>
            
            <form ref="form8" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.keywords.state"
                    label="Keyword"
                    label-for="keyword-input"
                    invalid-feedback="Keyword is required"
                >
                <b-form-input
                    id="keyword-input" 
                    type="text" 
                    v-for="(word, i) in office.keywords.value"
                    v-bind:key="'i' + i"
                    v-model="office.keywords.value[i]" 
                    :state="office.keywords.state" 
                    @input="addKeyword"
                    @blur="office.keywords.validate(office.keywords);"
                    required
                ></b-form-input>
                </b-form-group>

            </form>

            <form ref="form9" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    :state="office.images.state"
                    label="Image"
                    label-for="image-input"
                    invalid-feedback="Image is required"
                >
                <!--<b-overlay :show="showOverlay" rounded="sm">-->
                <b-file
                    id="image-input"
                    class="image"
                    placeholder="Elije una imagen"
                    v-for="(imag, j) in office.images.value"
                    v-bind:key="'j' + j"
                    v-model="office.images.value[j]"
                    :state="office.images.state"
                    @input="addImage(); office.images.validate(office.images);"
                    required
                ></b-file>
                <!--</b-overlay>-->

                </b-form-group>

            </form>

            <!--<b-form-input id="name" type="text" placeholder="Escribe un nombre de oficina" v-model="office.name.value" :state="office.name.state" @blur="office.name.validate(office.name)"></b-form-input>
            <AreaEditor @update="updateDescription" :content="office.description.value"/>
            <p v-if="!office.description.state && office.description.state != null"><i style="color:red;">Debe escribir una descripción</i></p> Falta ponerlo más bonito
            <b-select id="state" v-model="office.state.value" @change="changeMunicipalities(); office.state.validate(office.state)" :state="office.state.state">
                <option v-for="(state, k) in states" v-bind:key="'k' + k" :value="state._id">{{state.name}}</option>
            </b-select>
            <b-select id="location" v-model="office.location.value" @change="office.location.validate(office.location)" :state="office.location.state">
                <option v-for="(municipality, l) in municipalities" v-bind:key="'l' + l" :value="municipality._id">{{municipality.name}}</option>
            </b-select>
            <b-input id="rentAmount" type="text" placeholder="Escribe un precio de renta" v-model="office.rentAmount.value" :state="office.rentAmount.state" @blur="office.rentAmount.validate(office.rentAmount)"></b-input>
            <AreaEditor @update="updateContact" :content="office.contact.value"/>
            <p v-if="!office.contact.state && office.contact.state != null"><i style="color:red;">Debe escribir los datos de contacto</i></p> Falta ponerlo más bonito
            <b-input id="area" type="text" placeholder="Escribe el área" v-model="office.area.value" :state="office.area.state" @blur="office.area.validate(office.area)"></b-input><p>Metros cuadrados</p>
            <b-input id="capacity" type="text" placeholder="Escribe la capacidad" v-model="office.capacity.value" :state="office.capacity.state" @blur="office.capacity.validate(office.capacity)"></b-input>
            <b-input
                class="keyword"
                type="text"
                placeholder="Escribe una palabra clave"
                v-for="(word, i) in office.keywords.value"
                v-bind:key="'i' + i"
                v-model="office.keywords.value[i]"
                @input="addKeyword"
                :state="office.keywords.state"
                @blur="office.keywords.validate(office.keywords);"
            ></b-input>
            <b-file
                class="image"
                placeholder="Elije una imagen"
                v-for="(imag, j) in office.images.value"
                v-bind:key="'j' + j"
                v-model="office.images.value[j]"
                @input="addImage(); office.images.validate(office.images);"
                :state="office.images.state"
            ></b-file>-->
            <b-button class="btn btn-primary btn-lg" style="float:right;" type="button" variant="warning" @click="add">Agregar</b-button>
        </b-form>
        </b-card>
    </div>
</template>

<script>
import AreaEditor from '../components/AreaEditor.vue';
import axios from 'axios';

export default {
    name:'AddOffice',
    data(){
        return {
            office:{
                name:{value:'', state:null, validate:this.validateText},
                description:{value:'<p></p>', state:null, validate:this.validateTextArea},
                state:{value:'', state:null, validate:this.validateSelect},
                location:{value:'', state:null, validate:this.validateSelect},
                rentAmount:{value:'', state:null, validate:this.validateFloat},
                contact:{value:'<p></p>', state:null, validate:this.validateTextArea},
                area:{value:'', state:null, validate:this.validateFloat},
                capacity:{value:'', state:null, validate:this.validateInt},
                images:{value:[null], state:null, validate:this.validateMultImages},
                keywords:{value:[''], state:null, validate:this.validateMultText}
            },
            states:[],
            municipalities:[{_id:'', name:'Elija un municipio'}],
            //showOverlay = false
        }
    },
    components:{
        AreaEditor
    },
    mounted(){
        if(this.$store.state.user == null)
            this.$router.push('/');
        else{
            axios.get(this.$store.state.serverPath + '/api/state').then(res => {
                this.states = res.data;
                this.states.unshift({_id:'', name:'Elija un estado'});
            }).catch(err => {
                console.log(err);
            });
        }
    },
    methods:{
        updateDescription(html){
            this.office.description.value = html;
        },
        updateContact(html){
            this.office.contact.value = html;
        },
        changeMunicipalities(){
            this.municipalities = [{_id:'', name:'Elija un municipio'}];
            this.office.location.value = '';
            this.office.location.state = null;
            if(this.office.state.value != ''){
                axios.get(this.$store.state.serverPath + '/api/municipality/' + this.office.state.value).then(res => {
                    this.municipalities = res.data;
                    this.municipalities.unshift({_id:'', name:'Elija un municipio'});
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        validateText(input){
            if(input.value.length <= 3)
                input.state = false;
            else
                input.state = true;
        },
        validateTextArea(input){
            if(input.value == '<p></p>')
                input.state = false;
            else
                input.state = true;
        },
        validateFloat(input){
            if(input.value == '' || isNaN(input.value))
                input.state = false;
            else
                input.state = true;
        },
        validateInt(input){
            if(input.value == '' || isNaN(input.value) || input.value.indexOf('.') != -1)
                input.state = false;
            else
                input.state = true;
        },
        validateMultText(input){
            while(input.value.indexOf('') != -1)
                input.value.splice(input.value.indexOf(''), 1);
            if(input.value.length == 0)
                input.state = false;
            else
                input.state = true;
            input.value.push('');
        },
        validateMultImages(input){
            while(input.value.indexOf(null) != -1)
                input.value.splice(input.value.indexOf(null), 1);
            if(input.value.length == 0)
                input.state = false;
            else
                input.state = true;
            input.value.push(null);
        },
        validateSelect(input){
            if(input.value == '')
                input.state = false;
            else
                input.state = true;
        },
        changeStates(){
            for(var input in this.office){
                if(this.office[input].validate)
                    this.office[input].validate(this.office[input]);
            }
        },
        validateInputs(){
            var band = true;
            for(var input in this.office){
                if(this.office[input].validate)
                    if(this.office[input].state == false)
                        band = false;
            }
            return band;
        },
        addKeyword(){
            while(this.office.keywords.value.indexOf('') != -1)
                this.office.keywords.value.splice(this.office.keywords.value.indexOf(''), 1);
            this.office.keywords.value.push('');
        },
        addImage(){
            while(this.office.images.value.indexOf(null) != -1)
                this.office.images.value.splice(this.office.images.value.indexOf(null), 1);
            this.office.images.value.push(null);
        },
        add(){
            this.changeStates();
            if(this.validateInputs()){
                while(this.office.keywords.value.indexOf('') != -1)
                    this.office.keywords.value.splice(this.office.keywords.value.indexOf(''), 1);
                while(this.office.images.value.indexOf(null) != -1)
                    this.office.images.value.splice(this.office.images.value.indexOf(null), 1);
                let send = {
                    name:this.office.name.value,
                    description:this.office.description.value,
                    owner:this.$store.state.user._id,
                    location:this.office.location.value,
                    rentAmount:this.office.rentAmount.value,
                    contact:this.office.contact.value,
                    area:this.office.area.value,
                    capacity:this.office.capacity.value,
                    keywords:this.office.keywords.value,
                    images:[]
                };
                axios.post(this.$store.state.serverPath + '/api/office', send).then(async res => {
                    if(res.status == 200){
                        //////////////////////////////// Aquí estaría chido poner un overlay porque las imagenes tardan en subirse xd
                        //this.showOverlay = true;
                        for(var img of this.office.images.value){
                            var formData = new FormData();
                            formData.append('image', img);
                            await axios.post(this.$store.state.serverPath + '/api/office/image/' + res.data._id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
                        }
                        //this.showOverlay = false;
                        this.$router.push('/profile');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
            else{
                this.$bvToast.toast('Rellena todos los campos', {
                            title: `Error`,
                            variant: `danger`,
                            toaster: `b-toaster-top-center`,
                            solid: true
                        })
            }
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