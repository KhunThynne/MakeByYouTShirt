<template>
    <div class="container ">
        <div class="row m-2">
            <b class="col align-self-center text-center">
                <i class="bi bi-shop"></i>
                Store
            </b>
        </div>
        <div class="row  border-bottom  m-2 mx-5" v-for="item in TheData">
            <div class="col-5 bi bi-person-fill px-0">
                <small> ผู้ออกแบบ </small>
            </div>
            <div class="col-7">
                <small class=""> {{ item.name }} </small>
            </div>
        </div>


        <div class=" mt-3" style="">
            <div class="row m-2 ">
                <Shirt_Component v-for="item of data" :data_="item" :pages="'profile'" />
            </div>
        </div>
    </div>


</template>
<script scope>

import Edit_ModalVue from '@/components/Menu_bar/Edit_Modal.vue';
import Shirt_Component from '@/components/Menu_bar/Shirt_Component.vue';
import axios from 'axios';
export default {
    name: "Store",
    components: {
        Edit_ModalVue,
        Shirt_Component,
    },
    data() {
        return {
           localhost: 'localhost:3000',
            data: [],
            _name: String,

            TheData: null,
        }

    },
    mounted() {

        const _id = this.$route.params.id;
        const permission = true;



        axios.get(`http://${this.localhost}/services/arm_service/own_shirts/${_id}/${permission}`)
            .then(response => {
                this.data = response.data;

            })
            .catch(error => {
                console.log(error);
            });


        axios.get(`http://${this.localhost}/services/arm_service/store/${_id}`)
            .then(response => {
                this.TheData = response.data;

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

</style>
