<template>
    <transition name="modal">
        <div v-if="showModal">

            <div class="modal-mask">
                <div class="modal-wrapper pt-3">
                    <div class="modal-container">

                        <div class="modal-header ">
                            <slot name="header">

                                ตัวอักษร



                                <span @click="showModal = onClickClose()"><i class="bi bi-x-lg text-warning"></i>
                                </span>


                            </slot>
                        </div>

                        <div class="modal-body ">
                            <slot name="body">

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





</template>
  
<script>
export default {
    name: "text_edit",
    props: {
        showModal: Boolean
    },

    data() {
        return {
            count: 0
        }

    },
    mounted() {

    },
    methods: {

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

.modal-wrapper {
    display: table-cell;


}

.modal-container {
    width: 90%;
    height: 60%;
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