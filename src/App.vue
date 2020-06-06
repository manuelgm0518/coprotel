<template>
  <div id="app" class="bg-light">
    <NavigationBar/>
    <router-view v-if="show"/>
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
  data(){
    return {
      show:false
    }
  },
  created(){
    if(localStorage.getItem('token')){
      axios.get(this.$store.state.serverPath + '/api/user/logIn/verify/' + localStorage.getItem('token')).then(res => {
        if(res.data.unauthorized){
          localStorage.clear();
          this.$store.state.user = null;
        } else {
          this.$store.state.user = res.data;
        }
        this.show = true;
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.$store.state.user = null;
      localStorage.clear();
      this.show = true;
    }
  }
}
</script>