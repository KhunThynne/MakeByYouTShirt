<template>
    <div class="container ">
        <div class="row m-2">


            <div class="col text-end">
                <!--   <Edit_ModalVue @child_res="res_Data" />-->
            </div>


            <b class="col-12 text-center  p-2 border-bottom">
                <i class="bi bi bi-shop"></i> แบบเสื้อที่มีการสั่งซื้อ


            </b>


        </div>

        <ol class="list-group list-group-numbered row ">
            <li class="list-group-item d-flex justify-content-between align-items-start my-1 border"  v-for="item in data">
                <div class="ms-2 me-auto col">
                    <div class="fw-bold">{{ Name_set(item.nameshirt_) }} <small class="fw-lighter"></small>
                    </div>




                    <div class="row" style="width: 90%;">
                        <div class="parent  col">
                            <img v-bind:src="require(`@/assets/img/${item.property._type}front.png`)"
                                style="width: 100%;" />


                            <img :src="`http://${this.localhost}/images/${item.shirt_path.front}.png`" class="child" />

                        </div>

                        <div class="parent   col">
                            <img v-bind:src="require(`@/assets/img/${item.property._type}back.png`)"
                                style="width: 100%;" />


                            <img :src="`http://${this.localhost}/images/${item.shirt_path.back}.png`" class="child" />

                        </div>



                    </div>


                </div>


                <div class=" text-end align-self-center">



                    <div class="col-12">
                        <span class="badge bg-secondary rounded-pill col-12">รวม</span>
                    </div>
                    <div class="col-12">
                        <span class="badge bg-primary rounded-pill col-12">จำนวน</span>
                    </div>



                </div>
            </li>


        </ol>





        <div class=" mt-3" style="">
            <div class="row m-2">
                <!-- <Shirt_Component v-for="item of data" :data_="item" :pages="'profile'" />
         -->
            </div>
        </div>
    </div>


</template>
<script scope>
import axios from 'axios';
export default {
    name: "Orders_Selled",
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
        this.user_id = this.$cookies.get('_id');
        axios.get(`http://${this.localhost}/services/arm_service/orderselled/${this.user_id}`)
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
    methods: {
        Name_set(text) {

            let re = text
            if (text.length >= 10) {
                re = `${text.slice(0, 6)}...`

            }
            return re
        },
        canvas(path) {

            return
        },

    },
    updated() {

    },


};

</script> 

<style lang="scss" scoped>
.parent {
    position: relative;
    width: auto;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 70%;
    text-align: center;
}
</style>
