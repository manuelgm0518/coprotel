<template>
  <b-container class="vh-100">
      <div v-if="!user" style="height:80vh">
      <LoginError message="Inicia sesión para poder revisar tus rentas." class="vertical-middle" />
    </div>
    <div v-else>
      <h1>Mis Rentas</h1>
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