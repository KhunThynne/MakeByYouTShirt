<template>



    <Transition name="modal" appear>
        <div v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header ">
                            <slot name="header">
                                <div> </div>
                                <span @click="$emit('close')"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">



                                <div class=" container p-3">
                                    <b>
                                        <i class="bi  bi-wallet2"></i>
                                        รายการรอชำระเงิน
                                    </b>

                                </div>

                                <div class="row text-center bg-light border p-2">
                                    <div class="col-5">
                                        <b>
                                            วันที่</b>
                                    </div>

                                    <div class="col-3">
                                        <b>สถานะ</b>

                                    </div>
                                    <div class="col">
                                        <b> </b>

                                    </div>



                                </div>

                                <div style="height: 400px; overflow-x: hidden;">
                                    <div class="row text-center  p-2 border-bottom  align-items-center"
                                        v-for="( item, key) in data">
                                        <div class="col-5" style="font-size: 10px;">
                                            {{ item.date }}
                                        </div>

                                        <div class="col-3 ">




                                            <div class="row text-center">


                                                <span
                                                    :class="[item.state ? 'text-success bi bi-check-square-fill' : 'text-warning bi bi-exclamation-square-fill']">

                                                </span>
                                                <text style="font-size:xx-small;" class="text-secondary"> {{
                                                        WaitPay(key)
                                                }}


                                                </text>
                                            </div>





                                        </div>
                                        <div class="col" v-if="item.state">
                                            <i class=" bi bi-receipt fa-2xs mx-3 text-secondary"
                                                style="font-size: 18px;"
                                                @click="showModalPayment = !showModalPayment"></i>


                                        </div>
                                        <div class="col" v-else>
                                            <i class=" bi bi-eye fa-2xs mx-3 text-primary " style="font-size: 18px;"
                                                @click="showModalPayment = !showModalPayment"></i>
                                            <i class=" bi bi bi-x-octagon fa-2xs  text-danger" style="font-size: 18px;"
                                                @click="Cancel(item._id)"></i>

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

    <Transition name="modal">
        <div v-if="showModalPayment">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header ">
                            <slot name="header">
                                ชำระเงิน/หลักฐาน

                                <span @click="showModalPayment = !showModalPayment"><i
                                        class="bi bi-x-lg text-warning"></i>
                                </span>


                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">
                                <!-- img -->
                                <div class="row container">
                                    <div class="col ">

                                        <div class=' text-center   align-items-center'>
                                            <img :src="this.Tes" style="height:125px;width: 125px;" />

                                        </div>
                                    </div>
                                    <div class="col">
                                        ----------------------------
                                        -----------------------------
                                        ---
                                    </div>
                                </div>

                                <div class="detail mt-4 border m-3" style="height: 100px;">
                                    <text class="container">


                                    </text>

                                </div>


                            </slot>
                        </div>
                        <b class="ms-3"> แนบไฟล์หลักฐาน </b>
                        <div class="modal-footers container ">
                            <slot name="footer">

                                <div class="row p-4">


                                    <button class="btn btn-warning p-2  col-12" @click="popFileSelector">
                                        อัพโหลดรูปภาพ
                                    </button>
                                    <button class="btn btn-dark  p-2 mt-2 col-12" @click="showModal = false">
                                        ยืนยันหรือส่งหลักฐานการชำระเงิน
                                    </button>

                                    <input type="file" @change="handleFiles" id="fileElem" style="display: none;"
                                        multiple accept="image/*" />
                                </div>
                            </slot>

                        </div>
                    </div>
                </div>
            </div>


        </div>

    </Transition>

    <AlertVue :show-alert="Cancelalert" :data="_data" @confirm="Confirm" @close="(Cancelalert = !Cancelalert)">
    </AlertVue>



</template>
<script scope>
import axios from 'axios';
import AlertVue from './Alert.vue';
export default {
    name: "Order",
    props: ['showModal'],
    emits: ['update:showModal'],
    components: {
        AlertVue,
    }, computed: {

    },
    data() {
        return {
            Modal: false,
            showModalPayment: false,
            user_id: this.$cookies.get('_id'),
           localhost: 'localhost:3000',
            data: [],
            order_id: null,
            Cancelalert: false,
            _data: {},
            previewImg: '',
            Tes: `https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg`,

        }

    },
    mounted() {
        console.log('')
    },
    updated() {
        this.Data('page:');

    },
    methods: {
        handleFiles(ev) {
            console.log(ev.target.files[0])
            this.previewImg = URL.createObjectURL(ev.target.files[0])
        },
        popFileSelector() {
            var el = document.getElementById("fileElem");
            if (el) {
                el.click()


            }
        },
        Data(ev) {
            this.user_id = this.$cookies.get('_id');
            console.log(ev)
            axios.get(`http://${this.localhost}/services/arm_service/order/${this.user_id}/${ev}`)
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
        WaitPay(i) {
            let text = 'รอชำระเงิน';

            if (this.data[i].state) {
                text = 'เรียบร้อย';
            };
            return text;
        },
        Cancel(_id) {
            console.log("Cancel")

            this.Cancelalert = !this.Cancelalert
            this._data = { 'head': 'แจ้งเตือน', 'body': 'คุณต้องการยกเลิกคำสั่งซื้อ', 'type': 'danger' }
            this.order_id = _id;

        },
        Payment(ev) {

            console.log("Pay")
            this.$emit("Payment")
        },
        Confirm(ev) {


            this.Data(`delete:${this.order_id}`);
        },

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
