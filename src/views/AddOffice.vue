<template>
    <div id="AddOffice" style="margin: 10px">
        <h1>Agregar una oficina</h1>
        <h1>Agregar una oficina</h1>
        <b-form>
            <b-input id="name" type="text" placeholder="Escribe un nombre de oficina" v-model="office.name.value" :state="office.name.state" @blur="office.name.validate(office.name)"></b-input>
            <AreaEditor @update="updateDescription" :content="office.description.value"/>
            <p v-if="!office.description.state && office.description.state != null"><i style="color:red;">Debe escribir una descripción</i></p> <!--Falta ponerlo más bonito-->
            <b-select id="country">
                <option value="" disabled>Elije un país</option>
            </b-select>
            <b-select id="location">
                <option value="" disabled>Elije un estado</option>
            </b-select>
            <b-input id="rentAmount" type="text" placeholder="Escribe un precio de renta" v-model="office.rentAmount.value" :state="office.rentAmount.state" @blur="office.rentAmount.validate(office.rentAmount)"></b-input>
            <AreaEditor @update="updateContact" :content="office.contact.value"/>
            <p v-if="!office.contact.state && office.contact.state != null"><i style="color:red;">Debe escribir los datos de contacto</i></p> <!--Falta ponerlo más bonito-->
            <b-input id="area" type="text" placeholder="Escribe el área" v-model="office.area.value" :state="office.area.state" @blur="office.area.validate(office.area)"></b-input><p>Metros cuadrados</p>
            <b-input id="capacity" type="text" placeholder="Escribe la capacidad" v-model="office.capacity.value" :state="office.capacity.state" @blur="office.capacity.validate(office.capacity)"></b-input>
            <b-input
                class="keyword"
                type="text"
                placeholder="Escribe una palabra clave"
                v-for="(word, i) in office.keywords.value"
                v-bind:key="i"
                v-model="office.keywords.value[i]"
                @input="addKeyword"
                :state="office.keywords.state"
                @blur="office.keywords.validate(office.keywords);"
            ></b-input>
            <b-file
                class="image"
                placeholder="Elije una imagen"
                v-for="(imag, j) in office.images.value"
                v-bind:key="'i' + j"
                v-model="office.images.value[j]"
                @input="addImage(); office.images.validate(office.images);"
                :state="office.images.state"
            ></b-file>
            <b-button type="button" variant="primary" @click="test">Agregar</b-button>
        </b-form>
    </div>
</template>

<script>
import AreaEditor from '../components/AreaEditor.vue';

export default {
    name:'AddOffice',
    data(){
        return {
            office:{
                name:{value:'', state:null, validate:this.validateText},
                description:{value:'<p>Escribe una descripción de la oficina</p>', state:null, validate:this.validateTextArea},
                ownwer:'', //Xd
                location:{value:'', state:null},
                rentAmount:{value:'', state:null, validate:this.validateFloat},
                contact:{value:'<p>Escribe los datos de contacto</p>', state:null, validate:this.validateTextArea},
                area:{value:'', state:null, validate:this.validateFloat},
                capacity:{value:'', state:null, validate:this.validateInt},
                images:{value:[null], state:null, validate:this.validateMultImages},
                keywords:{value:[''], state:null, validate:this.validateMultText}
            }
        }
    },
    components:{
        AreaEditor
    },
    methods:{
        updateDescription(html){
            this.office.description.value = html;
        },
        updateContact(html){
            this.office.contact.value = html;
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
                    if(this.office[input].state = false)
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
        test(){
            console.log(this.office);
            this.changeStates();
        }
    }
}
</script>

<style scoped>

</style>