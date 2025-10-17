<template>



    <Transition name="modal" appear>
        <div v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header ">
                            <slot name="header">
                                <div> </div>
                                <span @click="showModal = !showModal"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">
                                <div class=" container p-3">
                                    <b>
                                        <i class="bi  bi-wallet2"></i>
                                        รายการขาย
                                    </b>

                                </div>


                                <div class="row text-center bg-light border p-2">
                                    <div class="col-5">
                                        <b>
                                            วันที่</b>
                                    </div>

                                    <div class="col-3">
                                        <b> ชื่อเสื้อ </b>


                                    </div>
                                    <div class="col">

                                        <b>ราคา</b>
                                    </div>



                                </div>

                                <div style="height: 400px; overflow-x: hidden;">
                                    <div class="row text-center  p-2 border-bottom  " v-for="item in data">
                                        <div class="col-5" style="font-size: 12px;">
                                            {{ item.date }}
                                        </div>
                                        <div class="col-3" style="font-size: 12px;">

                                            {{ Name_set(item._nameshirt) }}
                                        </div>
                                        <div class="col">
                                            {{ item.price }}

                                        </div>




                                    </div>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">

                            </slot>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </Transition>

    <Transition name="modal" appear>
        <div v-if="See_Modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header ">
                            <slot name="header">
                                <div> </div>
                                <span @click="See_Modal = !See_Modal"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">
                                <div class=" container p-3">
                                    <b>
                                        <i class="bi  bi-wallet2"></i>
                                        แสดงผล
                                    </b>
                                </div>
                                <div class="row text-center bg-light border p-2">
                                    <div class="col-5">
                                        <b>วันที่</b>
                                    </div>

                                    <div class="col-3">
                                        <b>สถานะ</b>
                                    </div>
                                    <div class="col">
                                        <b> </b>
                                    </div>
                                </div>

                                <div style="height: 400px; overflow-x: hidden;">
                                    <div class="row text-center  p-2 border-bottom  " v-for="i in data.lenght">
                                        <div class="col-5">
                                            01-10-1999
                                        </div>
                                        <div class="col-3 text-warning">
                                            รอชำระเงิน
                                        </div>
                                        <div class="col">
                                            <i class=" bi bi-eye fa-2xs mx-3 text-primary"></i>

                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">

                            </slot>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </Transition>




</template>
<script scope>
import axios from 'axios';
export default {
    name: "Customer_Orders",
    props: {
        showModal: Boolean
    },
    components: {

    },
    data() {
        return {
            Modal: false,
            See_Modal: false,
            data: {},
           localhost: 'localhost:3000',
            user_id: this.$cookies.get('_id'),
        }

    },
    mounted() {

    },
    methods: {
        Name_set(text) {

            let re = text
            if (text.length >= 10) {
                re = `${text.slice(0, 6)}...`

            }
            return re
        },

    },
    updated() {
        this.user_id = this.$cookies.get('_id');
        axios.get(`http://${this.localhost}/services/arm_service/order/${this.user_id}/customer:`)
            .then(response => {
                this.data = response.data;
                console.log(response.data)
                if (response.data.deletedCount) {
                    this.Cancelalert = !this.Cancelalert
                };
            })
            .catch(error => {
                console.log(error);
            })
    },

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

.views {
    margin-left: 30px;
    text-decoration: none;
    color: #030303;

}

.no-outline:focus {
    outline: none;
}

.modal-footer .btn:first-child {
    margin-top: 30%;
    width: 100%;

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
    padding: 20px 30px;
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
