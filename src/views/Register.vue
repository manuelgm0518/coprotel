<template>
    <div id=Register>
        <h2>Regístrate</h2>
             <b-form>
                 <label for="name">Nombre</label>
                 <b-input id="name" type="text" placeholder="Tu nombre" v-model="user.name"></b-input>
                 <label for="lastName">Apellido</label>
                 <b-input id="lastName" type="text" placeholder="Tu apellido" v-model="user.lastName"></b-input>
                 <label for="email">Correo Electrónico</label>
                 <b-input id="email" type="text" placeholder="Tu correo electrónico" v-model="user.email"></b-input>
                 <label for="password">Contraseña</label>
                 <b-input id="password" type="text" placeholder="Tu contraseña" v-model="user.password"></b-input>
                 <label for="password">Confirmar contraseña</label> <!--xd-->
                 <b-input id="password" type="text" placeholder="Tu contraseña" v-model="user.password"></b-input>                
                 <label for="phone">Teléfono (opcional)</label>
                 <b-input id="phone" type="text" placeholder="Tu teléfono" v-model="user.phone"></b-input> 
                 <select v-model="user.location">
                    <option disabled value="">Seleccione un país</option>
                    <option value="México">México</option>
                    <!--<option v-for="country in countries" v-bind:value="country">
                        {{ country.name}} 
                    </option>-->
                </select> 
                <select v-model="user.location">
                    <option disabled value="">Seleccione un estado</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <!--<option v-for="country in countries" v-bind:value="country">
                        {{ country.name}} 
                    </option>-->
                </select>
                
             </b-form>
    </div>
</template>

<script>
export default {
    //options null- luego aparecen los países
}
</script>