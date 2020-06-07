<template>
  <div id="app" class="bg-light pb-lg-0" style="padding:4.5rem 0;">
    <NavigationBar/>
    <router-view v-if="show"/>
    <Footer/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer'
import axios from 'axios';

export default {
  name:'app',
  components: {
    NavigationBar,
    Footer
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