<template>
  <div id="app">
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import axios from 'axios';

export default {
  name:'app',
  components: {
    NavigationBar
  },
  async created(){
    if(localStorage.getItem('token')){
      var res = await axios.get(this.$store.state.serverPath + '/api/user/logIn/verify/' + localStorage.getItem('token'))
      if(res.data.unauthorized){
        localStorage.clear();
        this.$store.state.user = {}
      } else {
        this.$store.state.user = res.data;
      }
    } else {
      this.$store.state.user = {}
      localStorage.clear();
    }
  }
}
</script>