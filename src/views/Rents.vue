<template>
  <b-container class="vh-100">
      <div v-if="!$store.state.user" style="height:80vh">
      <LoginError message="Inicia sesión para poder revisar tus rentas." class="vertical-middle" />
    </div>
    <div v-else>
      <h1>Mis Rentas</h1>
      <b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />
    </div>
  </b-container>
</template>

<script>
import LoginError from '../components/LoginError'
export default {
  name: 'Rents',
  components: {
    LoginError
  }
}
</script>

<style>

</style>