<template>


    <Transition name="slide-fade">
        <div id="mySidebar" class="sidebar" v-if="Menu_show">
            <a href="javascript:void(0)" class="closebtn" @click="EndNav()">×</a>
            <div class="backgroud">
                <nav>
                    <router-link class="views" :to="{ name: 'Home' }" @click="CloseNave">
                        <b>หน้าแรก </b>
                        <span class="position-absolute end-0 me-3"> <i class="bi bi-chevron-right ps-5 text-end "></i>
                        </span>
                    </router-link>
                    <router-link class="views" :to="{ name: 'Create' }" @click="CloseNave">
                        <b> ออกแบบเสื้อ </b> <span class="position-absolute end-0 me-3"> <i
                                class="bi bi-chevron-right ps-5 text-end"></i> </span>
                    </router-link>

                    <router-link class="views" :to="{ name: 'Gallery' }" @click="CloseNave"
                        v-bind:class="[isActiveGallery ? 'shadow bg-warning' : 'none']"><b> Design Gallery </b> <span
                            class="position-absolute end-0 me-3"> <i class="bi bi-chevron-right ps-5 text-end"></i>
                        </span>
                    </router-link>




                    <div v-if="!login">


                        <router-link class="link" :to="{ name: '' }" @click="showRegister = !showRegister"><i
                                class="bi bi-person-fill"></i><b>สมัครสมาชิก</b> <span
                                class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>
                        <div class="container" @click="test()">
                        </div>
                        <router-link class="link" :to="{ name: '' }" @click="showLogin = !showLogin" name="showLogin"
                            id="showLogin">
                            <i class="bi bi-box-arrow-in-right"></i>
                            <b>เข้าสู่ระบบ</b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>

                    </div>
                    <div v-else>

                        <!--
                        <router-link class="link" :to="{ name: '' }" @click="showLogin = !showLogin" name="showLogin"
                            id="showLogin">
                            <i class="bi bi-person"></i>
                            <b class=""> ชื่อผู้ใช้งาน </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>

                            -->
                        <router-link @click="CloseNave" class="views" :to="{ name: 'Profile', params: { id: '' } }">
                            <i class="bi  bi-file-earmark-person"></i>
                            <b> โปรไฟล์ </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>



                        <router-link class="link" :to="{ name: '' }" @click="showOrders = !showOrders" name="modal"
                            id="modal">
                            <i class="bi  bi-wallet2"></i>
                            <b> รายการรอชำระเงิน </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>






                        <router-link class="link" :to="{ name: '' }" @click="showCustomer = !showCustomer" name="modal"
                            id="modal">
                            <i class="bi bi-credit-card-2-front"></i>
                            <b> รายการขาย </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>



                        <router-link class="views" :to="{ name: 'Orders_Selled' }" @click="test_c = true" name="logOut"
                            id="logOut">
                            <i class="bi bi bi-shop"></i>
                            <b> ดูแบบเสื้อที่มีการสั่งซื้อ </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>

                        <router-link class="link" :to="{ name: '' }" @click="showLogout = true" name="logOut"
                            id="logOut">
                            <i class="bi bi-box-arrow-in-left"></i>
                            <b> ออกจากระบบ </b><span class="position-absolute end-0 me-3">
                                <i class="bi bi-chevron-right ps-5 text-end"></i> </span>
                        </router-link>



                    </div>
                </nav>
            </div>
        </div>
    </Transition>



    <nav class="navbar bg-dark pb-0 ">
        <div style="height: 6px;">Thynne</div>
        <div class="container-fluid bg-white shadow breakpoin">
            <div class="branding">
                <img v-bind:src="require(`@/assets/07.png`)" alt="Bootstrap" width="200" height="50">
            </div>

            <div class="d-flex">

                <Cart_Modal @close="click_event" @Edit="Edit_" v-bind:on='on' />

                <div class="p-1" @click="Menu_show = !Menu_show">
                    <i class="bi bi-list fa-2x text-warning"></i>
                </div>

            </div>


        </div>


    </nav>
    <br />



    <nav class="fixed-bottom menubottom text-center ">


        <div class="row">

            <router-link class="col p-3 link menu_bt" :to="{ name: 'Home' }">
                <text><b> ALL PORDUCTS </b></text>
            </router-link>



            <router-link class="col p-3 link menu_bt" :to="{ name: 'Create' }">
                <text><b>Create</b></text>
            </router-link>




        </div>
    </nav>



    <!-- Modal <Register_ModalVue /> -->



    <!-- The Modal -->
    <Logout_ModalVue :showModal=showLogout @close="close" @logOut="logOut" />
    <Register_ModalVue :showModal=showRegister @close="click_event" />
    <Login_ModalVue :showModal=showLogin @close="click_event" @login="check_login_" />
    <Customer_Orders :showModal='showCustomer' @close="(showCustomer = !showCustomer)" />

    <OrdersVue :showModal='showOrders' @Cancel_Alert='OrdersAlert' @close="(showOrders = !showOrders)" />

    <AlertVue :showAlert='on_alert' :data='alert_data' @close="on_alert = !on_alert" />
</template>
<script>


import Logout_ModalVue from '@/components/Logout_Modal.vue';
import Register_ModalVue from '@/components/Register_Modal.vue';
import Login_ModalVue from '@/components/Login_Modal.vue';

import Cart_Modal from '@/components/Payment/Cart_modal.vue';
import AlertVue from '@/components/Alert.vue';
import Edit_Modal from '@/components/Menu_bar/Edit_Modal.vue';
import { notify } from "@kyvg/vue3-notification";
import OrdersVue from '@/components/Orders.vue';
import Customer_Orders from '@/components/Customer_Orders.vue';
export default {
    name: "menubar",
    props: {
        on: Boolean,
    },
    components: {
        OrdersVue,
        Register_ModalVue,
        Login_ModalVue,

        Cart_Modal, Logout_ModalVue, AlertVue, Customer_Orders
    },
    computed: {


        switchs() {


            this.$route.name

            return [this.isActive ? 'shadow bg-warning' : 'none']
        },

        name() {

            return this.$route.name
        }


    }
    ,
    data() {
        return {
            showCustomer: false,
            test_c: false,
            isActiveHome: false,
            isActiveCreate: false,
            isActiveGallery: false,
            showOrders: false,

            login: false,
            Menu_show: false,

            showEdit: false,
            showRegister: false,
            showLogin: false,
            showLogout: false,
            showPayment: false,
            showCart: false,

            act: null,
            alert_data: null,
            on_alert: false,
        };
    },

    updated() {


    },
    mounted() {
        this.check_login_()
        let now_ = window.location.pathname.replace('/', '')



        console.log("Menu")



    },
    methods: {
        Edit_(ev) {
            console.log(ev);
        },
        OnPayment(ev) {
            console.log("sd")
            this.showPayment = !this.showPayment
        },
        OrdersAlert(ev) {
            console.log(ev)
            this.alert_data = ev;

            this.on_alert = !this.on_alert
        },
        Close(ev) {


            this.Menu_show = false;
        },
        Active(e) {
            this.isActive = !this.isActive;




        },

        test() {
            console.log(this.$route.name);
        },
        check_login_() {

            const login = this.$cookies.get('email');

            if (login != null) {
                this.login = true;
                this.$emit("cart");

            } else {
                this.login = false;

            }

        },
        logOut(ev) {

            this.showLogout = false;
            this.$emit("cart");
            this.check_login_()
            this.CloseNave()
        },
        close(ev) {

            this.showLogout = false;
            this.showEdit = false;
        },
        click_event(ev) {

            this.showLogout = false;
            this.CloseNave()
        },
        submit() {
            this.$emit('submit', 1)

        },
        EndNav() {

            this.Menu_show = false

            this.clear()


        }, CloseNave(ev) {

            document.getElementById("mySidebar").style.width = "0px"




            this.clear()
        }, clear() {
            this.showLogin = false
            this.showRegister = false
            this.showCart = false
            this.showPayment = false
        },
        sidebar() {
            document.getElementById("mySidebar").style.width = "250px";

        },
    },
};
</script>
<link rel="stylesheet" href="../assets/css/modal_css.css" /> 
<style lang="scss" scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.active {
    color: aqua;
}

nav li:hover,
nav .views.active {
    background-color: #ffc107;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}

nav .active.link.menu_bt {
    color: #FFC000;
    background-color: #000000;
}

nav .link.menu_bt {
    color: #000000;
    background-color: #FFC000;
}

.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.sidebar {


    height: 100%;
    width: 250px;
    position: fixed !important;
    z-index: 9998;
    top: 0;
    right: 0;
    background-color: #111;
    opacity: 90%;
    overflow-x: hidden;
    // transition: 0.5s;
    padding-top: 60px;

    .backgroud {

        background-color: rgba(255, 255, 255, 0.89);

    }
}

.sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 16px;
    color: #050505;
    display: block;
    transition: 0.3s;

}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}

.sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 40px;
    margin-left: 50px;
    color: orange;
}

.openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
}

.openbtn:hover {
    background-color: #444;
}


@media (max-height: 500px) {

    .menubottom {

        display: none;

    }



}

@media (min-width: 1400px) {

    .menubottom {

        display: none;

    }

    .breakpoin {

        padding-inline: 22%;
    }
}

.menubottom {

    .link {
        font-size: 15px;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        text-decoration: none;

        &:hover {
            opacity: 1;
        }
    }

}
</style>
    