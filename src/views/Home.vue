<template>
  <div class="home container">

    <div class="d-flex justify-content-center main_product">
      <img src="../assets/06.jpg" style="width: 320px;height: 150px;">
      <!-- img <div class="border border-5" style="width: 800px;height: 400px;"></div> -->

    </div>


    <div class="container mt-3">

      <h5 class="row">
        <b class="col"> Product </b>
        <router-link class="col-2 text-dark" :to="{ name: 'Gallery' }">
          <i class="bi  bi-grid-3x2-gap col-2"></i>
        </router-link>
      </h5>
      <hr>
      <Shirt_Component v-if="showM.bol" :data_="data[showM.num]" :showModals='showM' pages="onther" @close="closeFn" />
      <carousel v-bind:items-to-show="3.5" :wrapAround="true" v-if="data.length">
        <slide v-for="item of  data.length " :key="item">
          <div @click="Show(item, '')">
            <Shirt_Component v-bind:data_='data[item - 1]' :pages="'Modal'" />
          </div>
        </slide>
      </carousel>

      <!-- 
    -->

      <div class="row">
        <div class="col-4 d-flex"> <i class="bi  bi-arrow-left"></i></div>
        <div class="col-4"></div>
        <div class="col-4  d-flex flex-row-reverse"> <i class="bi  bi-arrow-right"></i> </div>
      </div>


    </div>


    <div class="container mt-3">

      <h5 class="row">
        <b class="col"> Featured Creators </b>

      </h5>
      <hr>


      <div v-for="cards in data_users" :key="cards" class="row  mb-2 card " @click="Profile_nav(cards)">
        <div class="col-12 ">


          <carousel v-bind:items-to-show="1" :autoplay="Randdom()" :wrap-around='true' class="m-5 mb-0">


            <slide v-for="slide in 3" :key="slide">
              <Image v-bind:_data="{ '_id': cards._id, 'num': slide }" />

            </slide>
          </carousel>

          <h5 class="text-secondary col-6 border-bottom text-center" style="width: 100%;"><b>{{ cards.name }} </b> </h5>
        </div>
        <div class="px-4 p-3">

          <div class="col-12 row ">
            <small class="text-secondary col-3"><b> Email </b> </small>
            <small class="text-secondary col"> {{ cards.email }} </small>
          </div>
       
        </div>
      </div>






      <div style="margin-bottom:20%"> </div>
    </div>


  </div>


  <div id="my-flicking" class="flicking-viewport">
    <div class="flicking-camera">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </div>
  </div>


</template>

<script >
import Shirt_Component from '@/components/Menu_bar/Shirt_Component.vue';
import Image from '@/components/Menu_bar/Image.vue';
import Cart_Modal from '@/components/Payment/Cart_modal.vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
  name: "Home",
  emits: ['cart'],
  components: {
    Image,
    Cart_Modal,
    Shirt_Component,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      data_users: [],
      data: [],
      cards_id: '',
      keySlide: 0,
      showM: { 'bol': false, 'num': 0 },
      items_advance_modal: [],
      img: [],
     localhost: 'localhost:3000',
    }
  },
  computed: {


    Test() {

      if (this.showM == true) {
        return true;
      } else {
        return false;
      }


    },
    Value() {

      let test = "sadsad";
      setTimeout(() => {
        test = "this.data[0]._id";

      }, 1000)
      setTimeout(1)
      return test

    },

    keySlide_() {
      setTimeout(() => {

      }, 1000)

      setTimeout('');



    }

  },

  async mounted() {
    await axios.get(`http://${this.localhost}/services/arm_service/shirts/home`)
      .then(response => {
        this.data = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    await axios.get(`http://${this.localhost}/services/arm_service/users`)
      .then(response => {
        this.data_users = response.data;

      })
      .catch(error => {
        console.log(error);
      });



  },
  methods: {
    closeFn(ev) {
      this.showM.bol = false;
      this.$emit('cart');
    },
    front_canvas(ev) {
      let permission = true;
      axios.get(`http://${this.localhost}/services/arm_service/own_shirts/${ev}/${permission}`)
        .then(response => {
          this.img = response.data;

        })
        .catch(error => {
          console.log(error);
        });
      return ev;
    },
    SlideImage(ev) {
      console.log(ev)

      let permission = true;

      this.img = ev._id

      /*axios.get(`http://${this.localhost}/services/arm_service/own_shirts/${ev}/${permission}`)
        .then(response => {
          this.img = response.data;
          console.log(this.img)
        })
        .catch(error => {
          console.log(error);
        }); */

    },
    Profile_nav(ev) {
      this.$router.push({ name: 'Store', params: { id: ev._id } })
    },
    Show(slide, type) {
      this.showM.bol = true;
      this.showM.num = slide - 1;
    },
    Randdom(ev) {

      //this.items_advance_modal.push(ev);
      //console.log(this.items_advance_modal)
      var items = Array(4000, 6000, 5000);

      var item = items[Math.floor(Math.random() * items.length)]
      return item;
    },
    dataRespone(rep) {
      console.log(rep)
    }

  },


};
</script>

<style lang="scss" scoped>
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 70%;
  text-align: center;
}

.main_product {
  .border {
    background-color: rgb(201, 201, 201);
  }

}

@media (min-width: 1400px) {



  .home {

    padding-inline: 10%;
  }
}

.creator {
  .border {
    background-color: rgb(201, 201, 201);
  }
}

#mdiv {
  width: 25px;
  height: 25px;
  background-color: red;
  border: 1px solid black;
}

.mdiv {
  height: 85px;
  width: 2px;
  margin-left: 50%;
  background-color: rgb(126, 126, 126);
  transform: rotate(45deg);
  Z-index: 1;
}

.md {
  height: 85px;
  width: 2px;
  background-color: rgb(126, 126, 126);
  transform: rotate(90deg);
  Z-index: 2;
}

.hero {

  background-attachment: fixed;
  position: relative;
  height: 100vh;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }

    h2 {
      font-size: 50px;

      @media (min-width: 550px) {
        font-size: 85px;
      }
    }

    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }

    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}



.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
