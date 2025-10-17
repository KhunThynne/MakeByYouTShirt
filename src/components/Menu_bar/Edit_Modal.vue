<template>

    <div class="btn btn-warning px-5" @click="showModal = true">
        <small> Edit </small>
    </div>
    <transition name="modal">
        <div v-if="showModal">
            <div class="modal-mask text-start">

                <div class="modal-wrapper">

                    <div class="modal-container ">

                        <div class="modal-header ">
                            <slot name="header">

                                <span> </span>

                                <span @click="onClickClose" class="mt-4 m-5 mb-0">
                                    <i class="bi bi-x-lg text-warning"></i>
                                </span>


                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">

                                <div class=" row py-4">
                                    <div class="col-8 px-5">
                                        <i class="bi bi-person-fill"></i><b> ชื่อผู้ใช้</b>
                                    </div>


                                </div>

                                <div class=" ">


                                    <div class="row">
                                        <div class="col-4">
                                            <label for="staticEmail">
                                                <small> <b class="px-2"> Email </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="text" class="form-control-plaintext" id="staticEmail"
                                                placeholder="Email" :value="_email">
                                        </div>


                                        <hr>
                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> รหัสผ่าน </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="รหัสผ่าน" :value="_password">
                                        </div>

                                        <hr>

                                        <div class="col-4">
                                            <label for="name">
                                                <small> <b class="px-2"> ชื่อ </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="text" class="form-control-plaintext" id="name"
                                                placeholder="ชื่อ" :value="_name">
                                        </div>

                                        <hr>


                                        <div class="col-4">
                                            <label for="lastname">
                                                <small> <b class="px-2"> นามสกุล </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="text" class="form-control-plaintext" id="lastname"
                                                placeholder="นามสกุล" :value="_lastname">
                                        </div>

                                        <hr>


                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> ชื่อที่แสดง </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="ชื่อที่แสดง">
                                        </div>

                                        <hr>




                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> รายละเอียด </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="ชื่อที่แสดง">
                                        </div>

                                        <hr>

                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> ลิงค์ </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="ลิงค์">
                                        </div>

                                        <hr>


                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> เบอร์มือถือ </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="เบอร์มือถือ">
                                        </div>

                                        <hr>



                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> ไลน์ไอดี </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="ไลน์ไอดี">
                                        </div>

                                        <hr>



                                        <div class="col-4">
                                            <label for="inputPassword">
                                                <small> <b class="px-2"> ที่อยู่ </b> </small>
                                            </label>
                                        </div>
                                        <div class="col-8">
                                            <input type="password" class="form-control-plaintext" id="inputPassword"
                                                placeholder="ที่อยู่">
                                        </div>

                                        <hr>
                                    </div>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <div class="btn btn-primary px-4" @click="onClickClose">Save</div>




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

export default {
    name: "edit_modal",

    props: ['tests'],
    emits: ['child'],
    data() {
        return {
            showModal: false,
           localhost: 'localhost:3000',
            _email: '',
            _password: 0,
            _name: '',
            _lastname: '',
        }

    },
    mounted() {
        const _id = this.$cookies.get('_id');
        axios.post(`http://${this.localhost}/services/arm_service/user`, { user_id: _id })
            .then(response => {
                this.data = response.data;

                this._email = response.data[0].email;
                this._password = response.data[0].password;
                this._name = response.data[0].name;
                this._lastname = response.data[0].last_name;

                this.$emit('child', { 'user_name': this._name })

            })
            .catch(error => {
                console.log(error);
            });




    },
    methods: {

        test() {
            console.log("hi")
        },
        clear_value() {

        },
        onClickClose(ev) {
            this.showModal = false;
        },

        onConfirm(ev) {

        }

    }
};
</script>
    
    
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

.modal-footer {


    margin-right: 70%;


}

hr {
    display: block;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
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

    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {

    color: #030303;
    font-size: large;
    font-weight: 900;

}

.modal-body {
    margin: 20px 0;
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