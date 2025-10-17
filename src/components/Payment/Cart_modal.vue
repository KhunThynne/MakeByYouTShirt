<template>
    {{ cartCount }}
    <div class="" @click="showCart = !showCart">

        <i class="bi bi-cart2 fa-2x text-warning "> </i>



    </div>

    <Transition name="modal" appear>
        <div id="modal" v-if="showCart">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header ">
                            <slot name="header">
                                ตะกร้าสินค้า

                                <span @click="showCart = !showCart"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>
                        <div class="modal-body ">
                            <slot name="body">
                                <!-- img -->

                                <div v-if="(this.user_id != null)">
                                    <div class="cart_show overflow-auto " style="height: 300px;">
                                        <div class="card p-3 my-1" v-for="items, key in cart_shirts">
                                            <!-- F -->
                                            <div class="row ">





                                                <div class="col-3 parent">
                                                    <div class="shirt_position"
                                                        :style='_color(items.path.property.color)'>
                                                    </div>
                                                    <img class='child '
                                                        v-bind:src='require(`@/assets/img/${items.path.property._type}front.png`)' />
                                                    <img class='child-can'
                                                        v-bind:src='`http://${localhost}/images/${items.path.shirt_path.front}.png`' />


                                                </div>
                                                <div class="col-3 parent">
                                                    <div class="shirt_position"
                                                        :style='_color(items.path.property.color)'>
                                                    </div>
                                                    <img class='child '
                                                        v-bind:src='require(`@/assets/img/${items.path.property._type}back.png`)' />
                                                    <img class='child-can'
                                                        v-bind:src='`http://${localhost}/images/${items.path.shirt_path.back}.png`' />

                                                </div>




                                                <div class="col align-self-center">
                                                    <div class="col text-center">
                                                        <small>

                                                            {{ items.aprice }} THB
                                                        </small>
                                                    </div>

                                                    <div class="col text-center ">

                                                        <div class="border-top ">




                                                            <div class="btn btn-outline-warning m-1 p-1 px-2 "
                                                                @click="Edit_Cart_Shirt(items)">

                                                                <i class=" bi bi-pen fa-2xs"></i>
                                                            </div>

                                                            <div class="btn btn-outline-danger m-1 p-1 px-2"
                                                                @click="Order_Cancel(items)">

                                                                <i class=" bi bi-trash2 fa-2xs"></i>
                                                            </div>

                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>


                                    </div>

                                    <!-- img -->



                                    <AddressVue :_id="user_id" />



                                    <div class="row mt-2">

                                        <b class="col"> Total </b>
                                        <span class="col text-end mx-2"> {{ Total }} <small>THB</small></span>
                                    </div>

                                </div>


                                <div v-else>

                                    <div class="text-center text-danger " style="height: 400px; padding-top: 50%;">

                                        *กรุณาเข้าสู่ระบบเพื่อใช้งานตะกร้าสินค้า

                                    </div>

                                </div>


                            </slot>
                        </div>

                        <div class="modal-footers container">
                            <slot name="footer">

                                <div class="row ">


                                    <button class="btn btn-confirm p-2 col-12 " @click="Order_Create"
                                        :class="button_disabled">
                                        ยืนยันรายการสั่งซื้อ
                                    </button>


                                    <button class="btn btn-dark p-2  col-12 my-3" @click="showCart = !showCart">
                                        เลือกสินค้าเพิ่มเติม
                                    </button>
                                </div>
                            </slot>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Transition name="alert">
        <div id="alert" v-if="showAlert">
            <div class="alert-mask">
                <div class="alert-wrapper">
                    <div class="alert-container ">
                        <div :class="Alert.type">
                            <slot name="header">
                                <div class="text-center  text-white">
                                    {{ Alert.head }}
                                </div>
                            </slot>
                        </div>
                        <div class="alert-body ">
                            <slot name="body">
                                {{ Alert.body }}
                            </slot>
                        </div>
                        <div class="alert-footers">
                            <slot name="footer">
                                <div class="btn btn-dark mx-2" @click="showAlert = !showAlert">ยกเลิก</div>

                                <div class="btn btn-warning" @click="_Alert('confirm')">ตกลง</div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <Shirt_ComponentVue :showModals="editShirt.Modal" :data_="editShirt.data_" pages='Cart'
        @close="this.editShirt.Modal = !this.editShirt.Modal" />

</template>
  
<script>
import Shirt_ComponentVue from '../Menu_bar/Shirt_Component.vue';
import AddressVue from '@/components/Create/Address.vue';
import axios from 'axios';
export default {
    name: "cart_modal",
    components: {
        Shirt_ComponentVue,
        AddressVue,
    },
    props: ['on', 'showModal'],

    emits: ['Edit', 'close'],
    data() {
        return {
            login: false,
            editShirt: { 'Modal': false, 'data_': null },
            showAlert: false,
            typeAlert: '',
            count: 0,
            test: Boolean,
            showCart: false,
            image: [],
            total: 0,
           localhost: 'localhost:3000',
            cartCount: 0,
            cart_shirts: [],
            user_id: this.$cookies.get('_id'),
            shirt_id: null,
            cart_id: null,
            color_shirt: null,
        }

    },
    computed: {

        Tes() {
            return 'background-color: coral';
        },
        button_disabled() {
            let class_ = ''
            if (this.cartCount == 0) {

                class_ = 'disabled';
            }

            return class_;
        },
        Alert() {
            let alert = '';
            console.log(this.typeAlert)
            if (this.typeAlert != 'createOrder') {

                alert = { 'head': 'แจ้งเตือน', 'body': '! คุณต้องการยกเลิกคำสั่งซื้อหรือไม่', 'type': 'alert-header p-3 shadow bg-danger' };

            }
            else {
                alert = { 'head': 'แจ้งเตือน', 'body': '! ยืนยันการสั่งซื้อสินค้า', 'type': 'alert-header p-3 shadow bg-warning' };
            }
            return alert
        },
        Count() {

            let count = 0
            for (let i in this.cart_shirts) {
                count = i

            }
            return parseInt(count) + 1
        },
        Total() {
            let total = 0
            for (let i in this.cart_shirts) {
                total += this.cart_shirts[i].aprice
            }

            return total
        },
    },
    updated() {

        this.user_id = this.$cookies.get('_id');
        this.getData();



    },
    mounted() {

        this.getData();
    },
    methods: {

        _color(ev) {

            let color = `background-color:${ev}`
            return color;
        },
        getData(ev) {

            if (this.user_id != "") {
                axios.get(`http://${this.localhost}/services/arm_service/cart/${this.user_id}`)
                    .then(response => {
                        this.cart_id = response.data[0]._id;
                        this.cart_shirts = response.data[0].shirts;
                        this.cartCount = this.cart_shirts.length;

                    })
                    .catch(error => {
                        this.cartCount = 0;
                        this.cart_shirts = null;
                        this.cart_id = null;
                        this.color_shirt = null;
                        //console.log(error);
                    });
            }

        },
        Order_Create(ev) {


            this.typeAlert = 'createOrder';

            this._Alert(ev);
        },
        Order_Cancel(ev) {
            this.typeAlert = 'cancelAOrder';
            this._Alert(ev);
        },

        Edit_Cart_Shirt(arg) {

            //this.$emit("Edit", arg);
            this.editShirt.Modal = !this.editShirt.Modal
            this.editShirt.data_ = arg;

        },
        _Alert(ev) {
            this.showAlert = !this.showAlert;

            if (ev.shirt_id) {
                this.shirt_id = ev.shirt_id;
            }

            switch (this.typeAlert) {
                case 'createOrder':
                    if (ev == 'confirm') {
                        console.log(this.cart_shirts)
                        const data = JSON.stringify({ '_idcart': this.cart_id });
                        axios.post(`http://${this.localhost}/services/arm_service/createorders`, data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {

                                this.getData();

                            })
                            .catch(error => {
                                console.log(error);
                            });
                    };
                    break;

                default:
                    if (ev == 'confirm') {
                        const data = JSON.stringify({ 'user_id': this.user_id, 'shirt_id': this.shirt_id });
                        axios.post(`http://${this.localhost}/services/arm_service/cartdelete`, data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {

                                this.getData();

                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                    break;
            }







        },

        onClickClose(event) {
            this.$emit('close', { name: 'Payment_Modal', state: false })

            return false;
        },

    }
};
</script>
  <link rel="stylesheet" href="../assets/css/modal_css.css" /> 
  
<style scoped>
.parent {
    position: relative;

}

.shirt_position {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 128%;
    text-align: center;
    z-index: 0.9;
}


.shirt_add {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 90%;
    text-align: center;
    z-index: 0.9;
}


.shirt_color {


    background-color: v-bind(color_shirt);

}



.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 77px;

    text-align: center;
}

.child-can {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45px;
    height: auto;
    text-align: center;
}

/* we will explain what these classes do next! */
.detail {
    height: 150px;
}

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


.lay {

    bottom: 0;

}

.btn-another {
    background-color: #181818 !important;
    color: rgb(255, 255, 255) !important;


}

.btn-confirm {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;


}





.alert-mask {
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



.alert-wrapper {

    display: table-cell;
    vertical-align: middle;
}

.alert-container {
    position: relative;
    width: 300px;
    height: 200px;
    margin: 0px auto;

    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}



.alert-header {
    margin-top: 5%;

    color: #030303;
    font-size: large;
    font-weight: 900;
}

.alert-body {
    margin: 30px 20px 10px 20px;
}




.alert-footers {
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
    right: 0;
    padding-right: 20px;
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
    position: relative;
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
    margin-top: 2%;
    color: #030303;
    font-size: large;
    font-weight: 900;

}

.modal-body {
    margin: 20px 0;
}

.modal-footers {
    /* */

}


.modal-enter-active,
.modal-leave-active {
    transition: opacity 0s ease;
}


.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@media (min-width: 420px) {
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
        width: 70%;
        height: auto;

    }
}


@media (min-width: 1000px) {
    .shirt_position {
        width: 60%;
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

    .modal-container {
        width: 30%;
        height: auto;

    }
}
</style>