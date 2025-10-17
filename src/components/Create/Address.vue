<template>

    <div v-if="pageCart">
        <div class="cart_show  row mt-3 px-3">

            <div class=" p-3 my-1 card col-9  overflow-auto text-dark" style="height: 80px; font-size: 10px;">
                <!-- F -->


                <small v-if="(res != null)">
                    ชื่อ:{{ res.name }} นามสกุล:{{ res.last_name }}
                    <br />
                    e-mail:{{ res.email }}
          
                    <br />
                    ที่อยู่:{{ Address }}
                    <br />
                    รหัสไปษณี่ย์:{{ res.zipcode }}
                </small>




            </div>


            <div class="col-3 align-self-center text-center">


                <button class="btn btn-dark" @click="(AddressModal = !AddressModal)">
                    <i class="bi bi-house fa-2xs"></i>
                </button>


            </div>




        </div>


    </div>




    <Transition name="modal" appear>
        <div id="modal" v-if="AddressModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header ">
                            <slot name="header">
                                ที่อยู่

                                <span @click="(AddressModal = !AddressModal)"><i class="bi bi-x-lg text-warning"></i>
                                </span>


                            </slot>
                        </div>

                        <div class="modal-body text-start">
                            <slot name="body">

                                <div class="my-3 container text-start">
                                    <div class="btn btn-outline-warning" @click="UpdateAddress">บันทึก
                                    </div>
                                </div>
                                <div class="card p-2 ps-4 overflow-auto" style="height:100px; font-size: 16px;">
                                    <small>
                                        ชื่อ:{{ res.name }} นามสกุล:{{ res.last_name }}
                                        <br />
                                        e-mail:{{ res.email }}
                                   
                                        <br />
                                        ที่อยู่: {{ Address }}
                                        <br />
                                        รหัสไปษณี่ย์:{{ res.zipcode }}
                                    </small>
                                </div>

                                <div class="container">





                                    <div class="my-3 ">
                                        <text class="text-secondary mx-2">Address Line1 </text><text
                                            class="text-danger"> * </text>
                                        <input type="text" v-model.value="address1" class="border-light"
                                            style="width: 100%;" />


                                    </div>
                                    <div class="my-3 ">
                                        <text class="text-secondary mx-2">Address Line2 </text><text
                                            class="text-danger"> * </text>
                                        <input type="text" v-model.value="address2" class="border-light"
                                            style="width: 100%;" />


                                    </div>

                                    <div class="my-3 ">
                                        <text class="text-secondary mx-2"> ZIP Code </text><text class="text-danger"> *
                                        </text>
                                        <br />
                                        <input type="text" v-model.value="zipcode" class="border-light" />


                                    </div>

                                    <div class="my-3 ">
                                        <textarea style="width: 100%;" v-model.value="more">
                                     </textarea>

                                    </div>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footers container  text-end">
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
import Address from 'ipaddr.js';

export default {
    name: "Address",
    components: {

    },
    props: ['_id'],
    data() {
        return {
            AddressModal: false,
            pageCart: true,
           localhost: 'localhost:3000',
            data: {},
            res: null,
            zipcode: '',
            address1: '',
            address2: '',
            more: 'More information.',
        }

    },
    computed: {

        Address() {

            const address = `${this.res.address1} ${this.res.address2}`
            return address;
        },
    },
    updated() {

        console.log("Update")
    },
    mounted() {


        this.data['user_id'] = this._id;

        this.Axios(this.data);
    },
    methods: {
        UpdateAddress(ev) {


            this.data['tool'] = 'update';
            this.data['address1'] = this.address1;
            this.data['address2'] = this.address2;
            this.data['zipcode'] = this.zipcode;
            this.data['more'] = this.more;

            this.Axios(this.data);
        },
        Axios(data) {

            axios.post(`http://${this.localhost}/services/arm_service/user`, data)
                .then(response => {
                    this.res = response.data[0];
                    this.zipcode = this.res.zipcode;
                    this.address1 = this.res.address1;
                    this.address2 = this.res.address2;
                })
                .catch(error => {
                    console.log(error);
                });
        },


    }

};

</script> 

<style lang="scss" scoped>
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
    margin: 5% 0;
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
