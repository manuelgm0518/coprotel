<template>
  <b-container fluid class="bg-light vh-100" style="padding-top:4rem">
    <NavigationBar/>
    <div class="vertical-middle text-center d-block d-lg-none">
      <h1>
        Joaqín c la come en responsive
      </h1>
    </div>
  </b-container>
</template>

<script>
import NavigationBar from '../components/NavigationBar'
export default {
  name: 'Home',
  components: {
    NavigationBar
  }
}
</script>
