<template>


    <transition name="modal">
        <div v-if="showModal">

            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header ">
                            <slot name="header">

                                เลือกแบบเสื้อ



                                <span @click="showModal = onClickClose()"><i class="bi bi-x-lg text-warning"></i>
                                </span>


                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">

                                <div class="row my-2 ">
                                    <div class="col border" @click="Choice_(`crew_`)"
                                        :class="[Active_type(`crew_`) ? 'shirt_choice' : '']">
                                        <div class=" p-2 text-center  ">
                                            <img src="../../assets/img/crew_front.png" width="80" />
                                            <img src="../../assets/img/crew_back.png" width="80" />
                                            <br>
                                            <small> เสื้อผู้ชาย</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col border" @click="Choice_(`womens_crew_`)"
                                        :class="[Active_type(`womens_crew_`) ? 'shirt_choice' : '']">
                                        <div class=" p-2 text-center ">
                                            <img src="../../assets/img/womens_crew_front.png" width="80" />
                                            <img src="../../assets/img/womens_crew_back.png" width="80" />
                                            <br>
                                            <small> เสื้อผู้หญิง </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col border" @click="Choice_(`mens_tank_`)"
                                        :class="[Active_type(`mens_tank_`) ? 'shirt_choice' : '']">
                                        <div class=" p-2 text-center ">
                                            <img src="../../assets/img/mens_tank_front.png" width="80" />
                                            <img src="../../assets/img/mens_tank_back.png" width="80" />
                                            <br>
                                            <small> เสื้อกล้าม </small>
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

    </transition>

    <div class="col btn btn-outline-dark">
        <div class=" bi bi-clipboard-heart  p-3" @click="showModal = !showModal"></div>
    </div>

</template>
  
<script>
export default {
    name: "shirt_choice",
    props: ['type'],
    emits: ['close', 'choiceshirt'],

    data() {
        return {
            count: 0,
            showModal: false,
            shirt: null,
            type_shirt: null,
        }

    },
    computed: {


    },

    mounted() {
        this.type_shirt = this.type

    },
    methods: {
        Active_type(obj) {

            if (this.type_shirt == obj) {
                return true
            }


        },



        Choice_(obj) {

            this.type_shirt = obj
            this.showModal = !this.showModal
            this.$emit(`choiceshirt`, { type: obj })

        },
        onClickClose(event) {

            this.$emit('close', { name: 'this.showLogin', state: false })
            return false;
        },
    }
};
</script>
  
  
<style scoped>
/* we will explain what these classes do next! */
.detail {
    height: 200px;
}


.shirt_choice {



    border: 1.5px solid #ffc000 !important;


}

.shirt_choice:hover {

    border: 1px solid #ffc000;
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

.modal-footer {
    margin-top: 20%;
    height: 10%;
    position: relative !important;
}

.btn-upload {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;
    width: 100%;

    position: absolute !important;
    bottom: 50px
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
    width: 90%;
    height: 80%;
    margin: 0px auto;
    padding: 20px 30px;
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
</style>