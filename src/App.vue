<template>
  <div id="app">
    <NavigationBar/>
    <router-view />
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
      axios.get(this.$store.state.serverPath + '/api/user/logIn/verify/' + localStorage.getItem('token')).then(res => {
        if(res.data.unauthorized){
          localStorage.clear();
          this.$store.state.user = null;
        } else {
          this.$store.state.user = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.$store.state.user = null;
      localStorage.clear();
    }
  }
}
</script>