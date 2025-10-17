<template>


    <div class="custom ">
        <div class="container">
            <h2 class="container">
                <i @click="state_shirt = !State_canvas()" class="bi"
                    :class="[state_shirt ? 'bi-front' : 'bi-back']"></i>
                <div style="margin-top: 250px; position: absolute; z-index: 2;">
                    <i @click="this.color_shirt = 'rgb(28, 28, 28)'" class="bi bi-circle-fill "
                        style="color:rgb(28, 28, 28);"></i>
                    <br />
                    <i @click="this.color_shirt = 'rgb(255, 255, 255)'" class="bi bi-circle "></i>
                </div>
            </h2>

            <div>
                <div class="parent text-center">
                    <img id="my-shirt" v-bind:src="shirt_s" class="shirt_color " />
                    <div v-bind:style="canvas_sf" class="child" :class="size_re">
                        <canvas ref="front" class="demo"></canvas>
                        <div style="background-color:#a1a1a1">
                            <text class="text-white"> Paintable Area</text>
                        </div>



                    </div>
                    <div v-bind:style="canvas_sb" class="child " :class="size_re">
                        <canvas ref="back" class="demo"></canvas>


                        <div style="background-color:#a1a1a1">
                            <text class="text-white"> Paintable Area</text>
                        </div>


                    </div>




                </div>
            </div>




        </div>

        <nav class="fixed-bottom bg-white row  mx-0 reposive">


            <!--  BTN  -->
            <Shirt_ChoiceVue v-bind:type="type_shirt" @choiceshirt="Change_type" />



            <div class="col btn btn-outline-dark">
                <div class=" bi bi-fonts p-3" @click="Addtext()"></div>

            </div>

            <div class="col  btn btn-outline-dark ">
                <div class="bi bi-image p-3" @click="popFileSelector()"></div>

            </div>
            <div type="button" class="col  btn btn-outline-dark " disabled>
                <div type="button" class="bi bi-sticky p-3" @click="test" disabled></div>

            </div>
            <div class="col  btn btn-outline-dark ">
                <div class="bi bi-check-lg text-warning p-3" @click="Save_Fn"></div>

            </div>


            <!--  save_Button()  -->
        </nav>
    </div>
    <div>

        <form>
            <input type="hidden" id="myfile" name="myfile" v-model="this.data" />
        </form>
    </div>
    <!--  Modal  Line-->

    <Text_Edit :show-modal=on_edit_text>
        <template v-slot:body>
            <input class="text-center" type="text" placeholder="" name="text" id="text" style="width:90%;"
                maxlength="15" :style="{ color: font_color, backgroundColor: bg_color }" v-model="text_value"
                @change="check_text(text_value)" />
            <br>

            <div class="row container  mt-3 " name="font_label">
                <div class=" col">
                    <select name="font" id="font" style="width: 100%;" v-model="font">

                        <option value="Serif">Serif</option>
                        <option value="Sans-Serif">Sans-Serif</option>
                        <option value="Monospace">Monospace</option>
                        <option value="Cursive">Cursive</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="MS">MS</option>
                    </select>
                </div>

            </div>

            <br>
            <div class="row container  text-center" name="color_label">
                <div class="col">
                    <label for="font_color"><small>ตัวอักษร</small></label>
                    <input type="color" id="font_color" name="font_color" v-model="font_color">
                </div>
                <div class="col">
                    <label for="bg_color"><small>พื้นหลัง</small></label>
                    <input @change="check_text(text_value)" type="color" id="bg_color" name="bg_color"
                        v-model="bg_color" /><br>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="btn btn-success mx-1" @click="Update_text()"> ตกลง </div>
            <div class="btn btn-warning mx-1 text-white" @click="this.on_edit_text = false"> ยกเลิก </div>
            <div class="btn btn-danger mx-1 text-white" @click="Obj_delete"> ลบ </div>
        </template>

        <div class="static" :class="{
            active: isActive,
            'text-danger': hasError
        }">
            ssd
        </div>
    </Text_Edit>



    <Save v-bind:savemenu='on_save' :typeshirt='type_shirt' :canvasdata='DataC' :property='{ "color": color_shirt }'
        @close="on_save = !on_save" @save="Alert" @alert="Alert" @Buy_now="Mongo_DB('buy')" />

    <AlertVue :showAlert="showAlert" :data="Data" @close="showAlert = !showAlert" @confirm="Mongo_DB('save')">
    </AlertVue>
    <form>

        <input type="file" @change="handleFiles" id="fileElem" multiple accept="image/*" style="display:none" />
    </form>

    <Shirt_ComponentVue :showModals='BuyNow' :pages='"buynow"' :data_="_data" @close="Buy_now" />

</template>
<script>
import { fabric } from 'fabric'
import Shirt_ChoiceVue from '@/components/Create/Shirt_Choice.vue';
import Text_Edit from '@/components/Create/Text_Edit.vue';
import Save from '@/components/Create/Save_.vue';
import axios from 'axios';
import AlertVue from '@/components/Alert.vue';
import Shirt_ComponentVue from '@/components/Menu_bar/Shirt_Component.vue';
import { emit } from 'process';
var FormData = require('form-data');

var canvas = [];
var __canvases = [];
const del = () => {
    __canvases[0].getActiveObjects().forEach((obj) => {
        __canvases[0].remove(obj)
    });
    __canvases[0].discardActiveObject().renderAll()
}

const stoDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))





export default {
    name: "Create",
    components: {
        Shirt_ComponentVue,
        Shirt_ChoiceVue,
        Text_Edit,
        Save,
        AlertVue
    },

    updated() {
        console.log(this.BuyNow)
    },
    data() {
        return {
            _data: null,
            font: 'Serif',
            Data: [],
            showAlert: false,
            on_save: false,
            fisrt_text: "text",
            state_shirt: true,
            color_shirt: 'rgb(255,255,255)',
            open_shirt: false,
            on_edit_text: false,
            text: "1",

            show_text: "",
            text_value: "",
            font_color: "",
            bg_color: "",
            position: { left: "", top: "" }
            ,
            data: require('../assets/img/crew_front.png'),
            send: "",
            isActive: true,
            hasError: true,

            canvas_e: null,
            old_canvas: canvas
            ,
           localhost: 'localhost:3000',
            img: [],
            cookies: this.$cookies,
            shirt: true,
            fornt_back_shirt: 0,
            type_shirt: "crew_",
            DataC: { 'front': '', 'back': '' },


            customIcon: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNFNTczNzMiIGQ9Ik00Mi41ODMsOS4wNjdsLTMuNjUxLTMuNjVjLTAuNTU1LTAuNTU2LTEuNDU5LTAuNTU2LTIuMDE1LDBsLTEuNzE4LDEuNzJsNS42NjQsNS42NjRsMS43Mi0xLjcxOEM0My4xMzksMTAuNTI2LDQzLjEzOSw5LjYyNSw0Mi41ODMsOS4wNjciLz48cGF0aCBmaWxsPSIjRkY5ODAwIiBkPSJNNC40NjUgMjEuNTI0SDQwLjQ3MTk5OTk5OTk5OTk5NFYyOS41MzVINC40NjV6IiB0cmFuc2Zvcm09InJvdGF0ZSgxMzQuOTk5IDIyLjQ2OSAyNS41MykiLz48cGF0aCBmaWxsPSIjQjBCRUM1IiBkPSJNMzQuNjEgNy4zNzlIMzguNjE2VjE1LjM5MkgzNC42MXoiIHRyYW5zZm9ybT0icm90YXRlKC00NS4wMiAzNi42MSAxMS4zODUpIi8+PHBhdGggZmlsbD0iI0ZGQzEwNyIgZD0iTTYuOTA1IDM1LjQzTDUgNDMgMTIuNTcxIDQxLjA5NHoiLz48cGF0aCBmaWxsPSIjMzc0NzRGIiBkPSJNNS45NjUgMzkuMTcyTDUgNDMgOC44MjcgNDIuMDM1eiIvPjwvc3ZnPg==`,

            BuyNow: false,

            deleteIcon: `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN'
             'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' 
              xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' 
              style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)'
             style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E`,
        }

    },
    computed: {


        size_re() {
            if (this.type_shirt == 'mens_tank_') {
                return '_tank'
            } else if (this.type_shirt == 'womens_crew_') {
                return '_woman'
            }

        },
        canvas_sb() {

            if (this.state_shirt) {
                return "display:none"
            } else {
                return "display:block"
            }
        },
        canvas_sf() {

            if (!this.state_shirt) {
                return "display:none"
            } else {
                return "display:block;"
            }
        },
        shirt_s() {
            if (this.state_shirt) {
                this.data = require(`../assets/img/${this.type_shirt}front.png`);
            } else {
                this.data = require(`../assets/img/${this.type_shirt}back.png`);
            }





            return this.data;
        },



    },
    mounted() {
        /// 


        ////

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'black';
        fabric.Object.prototype.cornerStyle = 'circle';
        fabric.Object.prototype.cornerSize = 10;

        var canvas1 = new fabric.Canvas(this.$refs.front);
        var canvas2 = new fabric.Canvas(this.$refs.back);


        __canvases[0] = canvas1;
        __canvases[0].setDimensions({ width: 140, height: 250 });
        __canvases[1] = canvas2;
        __canvases[1].setDimensions({ width: 140, height: 250 });
        //canvas = new fabric.Canvas(this.$refs.demo);





        var imageURL = require('../assets/img/crew_front.png');
        var image = new Image()
        image.src = require('../assets/img/crew_front.png');

        this.Create_Icon();
        //canvas.on('mouse:down', this.Mouse_d_HavehoverCorsor);


        /*  canvas.on('mouse:dblclick', function (obj) {
              console.log("dbl_check");
              let i = 0;
              alert("test")
          });*/

    },
    methods: {



        Buy_now(ev) {




            if (ev._id != '') {
                console.log("dell")
                axios.get(`http://${this.localhost}/services/arm_service/delshirts/${ev._id}`)
                    .then(shirt => {


                        this.BuyNow = !this.BuyNow

                    })

                    .catch(error => {
                        console.log(error);
                    });


            } else {

                this.$emit('cart')
                this.BuyNow = !this.BuyNow
                this.$router.push({ path: '/' })

            }





        },
        Create_Icon() {
            var customImg = document.createElement('img');
            var deleteImg = document.createElement('img');
            deleteImg.src = this.deleteIcon;

            customImg.src = this.customIcon;
            fabric.Object.prototype.controls.deleteControl = new fabric.Control({
                x: 0.5,
                y: -0.7,
                offsetY: -10,
                cursorStyle: 'pointer',
                mouseUpHandler: this.deleteObject,
                render: this.renderIcon(deleteImg),
                cornerSize: 15
            });

            fabric.Object.prototype.controls.menucustom = new fabric.Control({
                x: -0.5,
                y: -0.7,
                offsetY: -10,
                cursorStyle: 'pointer',
                mouseUpHandler: this.Edit_text,
                render: this.renderIcon(customImg),
                cornerSize: 15
            });


        },
        test(ev) {

            let front = __canvases[0].toJSON();


        },

        Edit_text(ev, obj) {
            this.on_edit_text = !this.on_edit_text;
            var target = obj.target;
            var canvas = obj.canvas;
            console.log(target);
            this.font = target.fontFamily;
            this.text_value = target.text;
            this.font_color = target.fill
            this.bg_color = target.backgroundColor;
            this.position.left = target.left;
            this.position.top = target.top;
        },

        deleteObject(eventData, transform) {
            var target = transform.target;
            var canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();

        },



        renderIcon(icon) {
            return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
                var size = this.cornerSize;
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
                ctx.drawImage(icon, -size / 2, -size / 2, size, size);
                ctx.restore();
            }
        },

        Save_Fn(ev) {

            this.DataC.front = __canvases[0].toDataURL({
                format: 'png',
                enableRetinaScaling: true,
                multiplier: 1
            });

            this.DataC.back = __canvases[1].toDataURL({
                format: 'png',
                enableRetinaScaling: true,
                multiplier: 1

            });


            this.on_save = !this.on_save;
        },
        Change_type(ev) {

            this.type_shirt = ev.type

            switch (this.type_shirt) {


                case 'womens_crew_': {

                    __canvases[0].setDimensions({ width: 135, height: 250 });


                    __canvases[1].setDimensions({ width: 135, height: 250 });

                    break;
                }
                case 'mens_tank_': {
                    __canvases[0].setDimensions({ width: 140, height: 200 });


                    __canvases[1].setDimensions({ width: 140, height: 200 });
                    break;
                }
                default: {

                    __canvases[0].setDimensions({ width: 140, height: 250 });


                    __canvases[1].setDimensions({ width: 140, height: 250 });
                    break;
                }

            }


        },

        State_canvas() {
            if (this.state_shirt) {
                this.fornt_back_shirt = 1;
            } else {
                this.fornt_back_shirt = 0;
            }
            return this.state_shirt
        },
        Check() {

            this.front_c.forEach(obj => {
                canvas.add(obj)
            });


        },
        Alert(ev) {


            this.Data = ev;
            this.showAlert = !this.showAlert;


        },

        handleFiles(event) {
            var data = event.target.files[0]

            var reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = (e) => {
                fabric.Image.fromURL(e.target.result, (img) => {
                    img.scaleToWidth(60);
                    img.scaleToHeight(60);
                    img.set({ 'left': 20 });
                    img.set({ 'top': 20 });
                    __canvases[this.fornt_back_shirt].add(img).renderAll().setActiveObject(img);
                });
            }

        },
        popFileSelector() {
            var el = document.getElementById("fileElem");
            if (el) {
                el.click()


            }
        },

        add_stiker() {

            console.log(this.__canvases[0].getObjects());
            /* let token = "JAfreOCefsj3bMqD6usegzhajzzh4sGYGc8Sp4fG"
             axios.get(`https://search.icons8.com/api/iconsets/v5/search?term=cart&token=${token}`)
                 .then(response => {
                     console.log(response.data);
                 })
                 .catch(error => {
                     console.log(error);
                 }); */
        },
        save_Button() {
            let datas = new FormData();

            let sen = canvas.toDataURL({
                format: 'png',
            });
            let tes = canvas.toSVG();


            datas.append('fileuploads', sen);
            datas.append('svg', tes);
            datas.append('name', this.$cookies.get('email'));
            datas.append('count', '1');
            axios.post('http://localhost:3000/services/arm_service/upload',
                datas,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        imporT_() {

            console.log(this.canvas_e.toDataURL());
            //for image out side canvas;
            stoDataURL(this.canvas_e.toDataURL())
                .then(dataUrl => {
                    let datas = new FormData();
                    datas.append('fileuploads', dataUrl);
                    axios.post('http://localhost:3000/services/arm_service/upload',
                        datas,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
        },




        Mouse_d_HavehoverCorsor(obj) {
            if (obj.target != null) {
                if (obj.target.hoverCursor != null) {
                    this.on_edit_text = !this.on_edit_text;
                    this.show_text = obj.target.text;
                    this.text_value = obj.target.text;
                    this.bg_color = obj.target.backgroundColor;
                    this.font_color = obj.target.fill;

                    this.position.left = obj.target.left;
                    this.position.top = obj.target.top;

                }
            }
        },


        check_text(obj) {
            this.show_text = obj;
            if (obj == "") {

                this.show_text = 'แสดงตัวอย่าง';
            }

        },
        Update_text() {
            del();
            this.Create_Icon()
            this.on_edit_text = !this.on_edit_text;
            var text = new fabric.IText(this.text_value, {
                fontFamily: this.font,
                left: this.position.left,
                top: this.position.top,
                fontSize: 26,
                fill: this.font_color,
                backgroundColor: this.bg_color,
                fontFamily: this.font,
            });


            __canvases[this.fornt_back_shirt].add(text)

        },
        Obj_delete() {
            this.on_edit_text = false,
                del();
        },
        Addtext() {
            var text = new fabric.IText(this.fisrt_text, {
                fontFamily: this.font,
                left: 25,
                top: 100,
                fontSize: 26,
                fill: "#000000",
                //backgroundColor: "#ffffff",

            });
            __canvases[this.fornt_back_shirt].add(text)

        },


        Mongo_DB(tool) {


            let front = __canvases[0].toDataURL({
                format: 'png',
            });
            let back = __canvases[1].toDataURL({
                format: 'png',
            });

            const userEmail = this.cookies.get('email');
            let datas = new FormData();
            let per = '';
            let detail = '';

            let nameshirt_ = '';
            datas.append('back', back);
            datas.append('front', front);



            datas.append('type_shirt', this.type_shirt);
            datas.append('users_id', "dataUrl");
            datas.append('email', userEmail);
            datas.append('color', this.color_shirt);
            datas.append('for_edit', JSON.stringify(__canvases[0].toJSON()));

            if (tool == 'buy') {
                per = "false";
                detail = null;
                nameshirt_ = null;
            } else {

                per = this.Data.container.permission;
                detail = this.Data.container.detail;

                nameshirt_ = this.Data.container.nameshirt_;

            }
            datas.append('permission', per);
            datas.append('detail', detail);
            datas.append('nameshirt_', nameshirt_);

            axios.post(`http://${this.localhost}/services/arm_service/create_shirt`,
                datas,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {


                    if (tool == 'buy') {



                        axios.get(`http://${this.localhost}/services/arm_service/buynow/${response.data.insertedId}`)
                            .then(shirt => {


                                this._data = shirt.data;

                                this.BuyNow = !this.BuyNow;


                            })

                            .catch(error => {
                                console.log(error);
                            });



                    } else {
                        this.$router.push({ path: '/' })
                    }





                })
                .catch(error => {
                    console.log(error);
                });


        },



    }

};
//handler for moving objects on canvas
var moveHandler = function (evt) {
    var movingObject = evt.target;
    console.log(movingObject.get('left'), movingObject.get('top'));
};
//handler for done modifying objects on canvas

var customEvtHandler = function (evt) {
    console.log("I was triggered by a custom event.");
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
    left: 49.5%;
    transform: translate(-50%, -50%);

    height: 70%;
    text-align: center;
}


._tank {
    left: 50%;
    top: 67%;

}

._woman {
    left: 50%;

}



@media (max-height: 500px) {
    .fixed-bottom {

        display: none;

    }


}

@media (min-width: 1400px) {

    .reposive {
        padding-right: 40%;
        padding-left: 40%;
        padding-bottom: 10%;
        position: absolute;
    }

    .custom {

        padding-inline: 35%;
        margin-top: 5%;


    }
}



.back_demo {
    //relative



    border: 1px solid #318cc0;


}

.demo {
    //relative



    border: 1px solid #ffc000;


}

.img {
    width: 75%;
    display: block;
    margin-left: auto;
    margin-right: auto;


}

.text {
    top: 100%;
    width: 100%;
    font-size: 18px;
    text-align: center;
}









#text {
    color: v-bind(color);
    /* wrapped in quotes */

}

input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: solid;
    background-color: rgb(255, 255, 255);

    margin-left: 15px;
    width: 50%;
}


.no-outline:focus {
    outline: none;
}

#my-shirt {
    //background: url("../assets/img/crew_front.png") no-repeat;

    width: 320px;



}

.shirt_color {


    background-color: v-bind(color_shirt);

}


//ffc000

.label_pain {

    text {
        background-color: rgb(161, 161, 161);
        color: white;
        padding: 2px 12px 5px 10px;

    }

    text-align: center !important;
}

.menubottom {

    .btn {
        padding: 15px 20px 15px 20px;
        margin-left: 5px;
        font-size: 25px;
    }

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
