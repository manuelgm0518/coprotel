<template>
    <div id="AddOffice" style="margin: 10px">
        <h1>Agregar una oficina</h1>
        <h1>Agregar una oficina</h1>
        <b-form>
            <b-input id="name" type="text" placeholder="Escribe un nombre de oficina" v-model="office.name.value" :state="office.name.state" @blur="office.name.validate(office.name)"></b-input>
            <AreaEditor @update="updateDescription" :content="office.description.value"/>
            <b-select id="country">
                <option value="" disabled>Elije un país</option>
            </b-select>
            <b-select id="location">
                <option value="" disabled>Elije un estado</option>
            </b-select>
            <b-input id="rentAmount" type="text" placeholder="Escribe un precio de renta" v-model="office.rentAmount.value" :state="office.rentAmount.state" @blur="office.rentAmount.validate(office.rentAmount)"></b-input>
            <b-textarea id="contact" placeholder="Escribe los datos de contacto"></b-textarea>
            <b-input id="area" type="text" placeholder="Escribe el área" v-model="office.area.value" :state="office.area.state" @blur="office.area.validate(office.area)"></b-input><p>Metros cuadrados</p>
            <b-input id="capacity" type="text" placeholder="Escribe la capacidad" v-model="office.capacity.value" :state="office.capacity.state" @blur="office.capacity.validate(office.capacity)"></b-input>
            <b-file class="image" placeholder="Elije una imagen"></b-file>
            <b-input class="keyword" type="text" placeholder="Escribe una palabra clave"></b-input>
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
                description:{value:'<p>Escribe una descripción de la oficina</p>', state:null},
                ownwer:'',
                location:{value:'', state:null},
                rentAmount:{value:'', state:null, validate:this.validateFloat},
                contact:{value:'', state:null},
                area:{value:'', state:null, validate:this.validateFloat},
                capacity:{value:'', state:null, validate:this.validateInt},
                images:{value:[], state:null},
                rents:{value:[], state:null},
                keywords:{value:[], state:null}
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
        validateText(input){
            if(input.value.length <= 3)
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
        }
    }
}
</script>

<style scoped>

</style>