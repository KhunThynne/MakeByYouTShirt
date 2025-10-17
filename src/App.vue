
<template>
  <div>

  </div>
  <div class="app">

    <Menubar :on='Cart_on' @cart="submitForm" />
    <notifications position="top" width="60%" style="margin-top: 6%; margin-left: 10%;" />
    <!--  <Navigation /> -->
    <router-view @cart="submitForm" />
  </div>
</template>

<script>

import Menubar from './components/Menubar.vue';
import Login_Modal from './components/Login_Modal.vue';

import { notify } from "@kyvg/vue3-notification";


export default {
  name: "App",

  data() {
    return {

      Cart_on: false,
    }
  },

  mounted() {


  },
  updated() {


  },


  methods: {
    toggleView() {
      console.log('Test')
    },
    submitForm(ev) {
 
      this.Cart_on = !this.Cart_on;
    },
    Test(ev) {
      console.log("App");

    },


  },

  components: {

    Menubar,
    Login_Modal,

  },
};
</script>






<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Georgia, serif;
  font-weight: 400;
}

.app {
  min-height: 100vh;
  position: relative;
  //background-color: #f1f1f1;
}


.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>

