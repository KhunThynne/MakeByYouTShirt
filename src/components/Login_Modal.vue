<template>
  <transition name="modal">
    <div v-if="showModal">


      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header ">
              <slot name="header">
                เข้าสู่ระบบ
                <span @click="showModal = onClickClose()"><i class="bi bi-x-lg text-warning"></i> </span>
              </slot>
            </div>

            <div class="modal-body ">
              <slot name="body">

                <div class="border-bottom row p-2">
                  <div class="col-4">
                    <label for="email " class=""><b>Email</b></label>
                  </div>
                  <div class="col">
                    <input type="text" v-model="email" id="staticEmail" name="email" placeholder="Email"
                      class="no-outline ">
                  </div>
                </div>




                <div class="border-bottom row  p-2">
                  <div class="col-4">
                    <label for="pass " class=""><b>รหัสผ่าน</b></label>
                  </div>
                  <div class="col">
                    <input v-model="password" type="password" id="password" name="password" placeholder="รหัสผ่าน"
                      class="no-outline">
                  </div>
                </div>

              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-warning " @click="login()">
                  Login
                </button>
                <text>
                  _____________________
                </text>
                <text>
                  {{ log }}
                </text>
                <text>
                  _____________________
                </text>



                <button class="btn btn-facebook" @click="showModal = false">
                  Facebook
                </button>
                <button class="btn btn-google " @click="showModal = false">
                  Google
                </button>

              </slot>

            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>





</template>
  
<script>
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";

import { emit } from 'process';
export default {
  name: "login_modal",

  props: {
    showModal: Boolean
  },

  data() {
    return {


     localhost: 'localhost:3000',
      db_users: [],
      count: 0,
      state_login: false,
      email: null,
      password: null,
      log: '____________________',
    }

  },
  mounted() {






  },
  methods: {


    onClickClose(event) {
      this.$emit('close', { name: 'this.showLogin', state: false })
      this.clear_value()
    },
    login(ev) {
      let data = new FormData();
      data.append('email', this.email);
      data.append('pass', this.password);
      

      axios.post(`http://${this.localhost}/services/arm_service/login`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          if (response.data.state == "success") {
            this.log = 'เข้าสู่ระบบเรียบร้อย'



          
            this.$cookies.set("email", this.email, '24h');
            this.$cookies.set("password", this.password, '24h');
            this.$cookies.set("_id", response.data.id, '24h');
            this.$emit('login');
            this.$emit('close');
          } else {

            this.log = 'อีเมลหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบใหม่'
          }
        })
        .catch(error => {
          console.log(error);
        });


      // this.clear_value()

    },

    clear_value() {
      this.email = null
      this.password = null
      this.log = '____________________'
    },


  }
};
</script>
  <link rel="stylesheet" href="../assets/css/modal_css.css" /> 
  
<style scoped>
/* we will explain what these classes do next! */
input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: rgb(255, 255, 255);
  width: 100%;

}

.no-outline:focus {
  outline: none;
}

.modal-footer .btn:first-child {
  margin-top: 30%;
  width: 100%;

}

.btn-facebook {
  background-color: rgb(66 103 178) !important;
  color: #fff !important;
  width: 100%;
  margin-top: 10% !important;
}

.btn-google {
  background-color: rgb(219 68 55) !important;
  color: #fff !important;
  width: 100%;
  margin-top: 10px !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 1s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 30%;
  color: #030303;
  font-size: large;
  font-weight: 900;

}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


@media (min-width: 600px) {
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 1s ease;
  }

  .modal-container {
    width: 30%;
    height: 80%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}
</style>