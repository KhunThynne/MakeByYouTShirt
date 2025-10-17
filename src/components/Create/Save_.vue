<template>
    <transition name="modal">
        <div v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header ">
                            <slot name="header">
                                Save
                                <span @click="showModal = onClickClose()"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>
                        <div class="modal-body ">
                            <slot name="body">
                                <div class="row text-center Image-layOut">
                                    <div class="col-6 parent">
                                        <img class="child" :src="canvasdata.front" />
                                        <img class="ms-save shirt_color" v-bind:src="Shirt_type.front" />
                                    </div>
                                    <div class="col-6">
                                        <div class="parent">
                                            <img class="child" :src="canvasdata.back" />
                                            <img class="ms-save shirt_color" v-bind:src="Shirt_type.back" />

                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-12 p-4 pb-2">
                                        <label for="staticEmail">
                                            <b class=""> ชื่อแบบเสื้อ {{ shirt_name }}</b>
                                        </label>
                                    </div>
                                    <div class="col-12">
                                        <input type="text" class="form-control-plaintext border" id="staticEmail"
                                            v-model="shirt_name" placeholder="  ชื่อเสื้อ">

                                    </div>


                                </div>




                                <div class="row  pt-4 pb-2">
                                    <div class="col my-2 ms-2">
                                        <input class="" type="checkbox" value="" id="flexCheckDefault"
                                            v-model="permission_check">
                                    </div>
                                    <div class="col-10">
                                        <label class="form-check-label fw-bold" for="flexCheckDefault">
                                            แสดงใน Design Gallery เพื่อให้คนอื่นสามารถเลือกซื้อได้
                                        </label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 pt-1 p-4 pb-1">
                                        <label for="staticEmail">
                                            <b class=""> รายละเอียด </b>
                                        </label>
                                    </div>
                                    <div class="col-12">
                                        <textarea type="text" class="form-control-plaintext border" rows="4"
                                            v-model="detail" cols="50"> รายละเอียด </textarea>

                                    </div>
                                </div>




                            </slot>
                        </div>

                        <div class="modal-footer  bg-warning row" @click="Save_explore">
                            <!--   @click="Save_explore" -->
                            <slot name="footer">

                                <div class="col text-center p-2">
                                    <h3> <b> Save</b> </h3>
                                </div>


                            </slot>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </transition>

    <transition name="savemenu" :style="show_Modal">
        <div v-if="savemenu">
            <div class="menu-mask">
                <div id="SaveMenu">

                    <div class="row mx-3">

                        <div class="col-12  p-3 bg-dark text-warning rounded" @click="Check_Login">
                            Save/Share
                        </div>


                        <div class="col-12  p-3 bg-warning my-1 rounded" @click="Buy_now">
                            BUY NOW
                        </div>
                        <div class="col-12   p-3 bg-dark text-white rounded" @click="onClickClose">
                            Close
                        </div>


                    </div>

                </div>
            </div>


        </div>
    </transition>

</template>
  


<script>

export default {
    name: "save",
    props: ['canvasdata', 'savemenu', 'typeshirt', 'property'],
    emits: ['close', 'save', 'alert'],

    data() {
        return {
            saveClick: false,
            showModal: false,
            shirt_name: "",
            permission_check: false,
            detail: null,
            color_shirt: null,
        }

    },
    computed: {
        show_Modal() {

            if (this.showModal) {
                return "display:none;"
            }


        },

        close() {


            return this.saveMenu
        },
        Shirt_type() {

            return {
                'front': require(`../../assets/img/${this.typeshirt}front.png`),
                'back': require(`../../assets/img/${this.typeshirt}back.png`)
            }
        }

    },
    updated() {
        this.color_shirt = this.property.color;

    },
    mounted() {
        this.type = this.typeshirt;





    },
    methods: {
        Buy_now() {

            this.$emit('Buy_now');
        },
        Modal_Show() {



            this.showModal = !this.showModal
        },
        Check_Login() {


            const email = this.$cookies.get('email')


            if (email) {
                this.Modal_Show();

            } else {
                this.$emit('alert', { head: "แจ้งเตือน", body: "กรุณาเข้าสู่ระบบก่อนใช้งาน", type: "warning" });
            }


        },
        test(ev) {

        },
        Save_explore(ev) {


            if (this.shirt_name == "") {

                this.$emit('alert', { head: "แจ้งเตือน", body: "กรุณากรอกชื่อแบบเสื้อ", type: "warning", tool: "some" });

            } else {
                this.$emit('save', {
                    head: "คุณต้องการบันทึกข้อมูล", body: "ยืนยันการเพิ่มข้อมูลลงในฐานข้อมูล", type: "warning", tool: "full", container:
                    {
                        nameshirt_: this.shirt_name,
                        detail: this.detail,
                        permission: this.permission_check
                    }
                });
            }
        },
        onClickClose(event) {

            this.$emit('close')
            return false;
        },
    }
};


</script>
  
  
<style scoped>
/* we will explain what these classes do next! */

/* Enter and leave animations can use different */
/* durations and timing functions.              */

.shirt_color {


    background-color: v-bind(color_shirt);

}

.savemenu-enter-active,
.savemenu-leave-active {

    opacity: 0;
}

.savemenu-enter,
.savemenu-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;

}

#SaveMenu {

    width: 100%;
    position: fixed !important;
    z-index: 9998;
    bottom: 0;

    text-align: center;
    margin-bottom: 20px;


}

.detail {
    height: 200px;
}

.shirt_choice:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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


.ms-save {
    width: 155px;
}

@media (max-height: 500px) {
    .modal-footer {

        display: none;

    }

    .Image-layOut {
        display: none;
    }
}


@media(min-width: 1400px) {
    .modal-container {

        width: 30%;
        height: 70%;
    }

    #SaveMenu {

        width: 30%;
        position: fixed !important;
        z-index: 9998;
        bottom: 0;
        right: 35%;

        text-align: center;
        margin-bottom: 10%;


    }

}

.modal-footer {

    bottom: 0;
    left: 0;

    position: fixed;
    width: 105%;

}



.btn-upload {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;
    width: 100%;

    position: absolute !important;
    bottom: 50px
}

.btn-confirm {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;
    width: 100% !important;

    position: absolute !important;
    bottom: 1px
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


.menu-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0); */
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
    padding: 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    margin-top: 1%;
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

.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 70px;
    height: 120px;
    text-align: center;
}
</style>