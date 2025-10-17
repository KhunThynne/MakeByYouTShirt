<template>
    <div class=" parent">

        <img class="child" v-bind:src="this.img_canvas[Slide]" />


        <div class="shirt_position" :style='_color'> </div>
        <img v-bind:src="this.image[Slide]" style="width:100%">

    </div>
</template>
  
<script scope>
import axios from 'axios';

export default {
    name: "Image",
    component: {

    },
    props: {

        _data: Object,
    },

    computed: {
        _color() {

            let color = ` background-color:${this.color_shirt[this.Slide]};`
            return color;
        },
        Slide() {
            let slide = this._data.num - 1;

            if (this._data.num > this.data.length) {

                slide = 0;

            }
            return slide
        },
    },
    data() {
        return {
            data: [],
            image: [],
            img: null,
            img_canvas: [],
           localhost: 'localhost:3000',
            color_shirt: [],
        }

    },
    mounted() {
        axios.get(`http://${this.localhost}/services/arm_service/searchshirt/${this._data._id}`)
            .then(response => {
                this.data = response.data;
                for (let i in this.data) {
                    this.image.push(require(`@/assets/img/${this.data[i].property._type}front.png`));


                    this.color_shirt.push(this.data[i].property.color);
                    this.img_canvas.push(`http://${this.localhost}/images/${this.data[i].shirt_path.front}.png`)

                }

            })
            .catch(error => {
                console.log(error);
            });

    },
    methods: {

    }
};
</script>
  
  
<style scoped>
/* we will explain what these classes do next! */
.shirt_position {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    text-align: center;
    z-index: -1;
}


.shirt_add {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 90%;
    text-align: center;
    z-index: -1;
}

.parent {
    position: relative;
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