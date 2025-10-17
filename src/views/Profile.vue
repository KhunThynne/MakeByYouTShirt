<template>
    <div class="container breakpoin">
        <div class="row m-2">
            <b class="col align-self-center ">
                <i class="bi bi-file-earmark-person"></i> Profile
            </b>

            <div class="col text-end">
                <Edit_ModalVue @child="res_Data" v-bind:tests="'asd'" />
            </div>


            <b class="col-12 text-center  p-2 border-bottom">
                <i class="bi bi-grid-3x3-gap"></i> รายการที่ออกแบบ


            </b>


        </div>

        <div class="row  border-bottom  m-2 mx-5">
            <div class="col-5 bi bi-person-fill px-0">
                <small> ชื่อผู้ใช้ </small>


            </div>
            <div class="col-7">
                <small class=""> {{ _name }} </small>


            </div>


        </div>





        <div class=" mt-3" style="">
            <div class="row m-2">
                <Shirt_Component v-for="item of data" v-bind:data_="item" v-bind:pages="'profile'"
                    @close="this.$emit('cart')" />
            </div>
        </div>
    </div>


</template>
<script scope>

import Edit_ModalVue from '@/components/Menu_bar/Edit_Modal.vue';
import Shirt_Component from '@/components/Menu_bar/Shirt_Component.vue';
import axios from 'axios';
export default {
    name: "Profile",

    components: {
        Edit_ModalVue,
        Shirt_Component,
    }, emits: [
        'cart',
    ],
    data() {
        return {
            update: false,
            data: [],
            _name: String,
           localhost: 'localhost:3000',
        }

    },
    mounted() {

        let _id = this.$cookies.get('_id');;
        let permission = false;


        axios.get(`http://${this.localhost}/services/arm_service/own_shirts/${_id}/${permission}`)
            .then(response => {
                this.data = response.data;

            })
            .catch(error => {
                console.log(error);
            });

    },


    methods: {

        res_Data(data) {
            this._name = data.user_name

        },

    }

};

</script> 

<style lang="scss" scoped>
@media (min-width: 1400px) {



    .breakpoin {

        padding-inline: 10%;
    }
}
</style>
