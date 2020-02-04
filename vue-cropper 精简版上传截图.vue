<template>
  <div class="wrapper">

    <div class="show-info">
      <div class="cropper-area">
        <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
          :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox" :original="option.original" :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :centerBox="option.centerBox"
          :high="option.high" :infoTrue="option.infoTrue" :maxImgSize="option.maxImageSize" @realTime="realTime"
          @imgLoad="imgLoad" @cropMoving="cropMoving" :enlarge="option.enlarge" :mode="option.mode"></vueCropper>
      </div>

      <div class="test-button">
        <label class="btn" for="uploads">upload</label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <!-- <button @click="startCrop" v-if="!crap" class="btn">start</button>
          <button @click="stopCrop" v-else class="btn">stop</button> -->
        <button @click="clearCrop" class="btn">clear</button>
        <button @click="refreshCrop" class="btn">refresh</button>
        <button @click="changeScale(1)" class="btn">+</button>
        <button @click="changeScale(-1)" class="btn">-</button>
        <button @click="rotateLeft" class="btn">向左边旋转90度</button>
        <button @click="rotateRight" class="btn">向右边旋转90度</button>
        <button @click="finish('base64')" class="btn">preview(base64)</button>
        <button @click='submit()'>确认</button>
      </div>


      <div :style="previewStyle1">
        <div :style="previews.div">
          <img :src="option.img" :style="previews.img">
        </div>
      </div>

      <div>
        <h1>预览</h1>
        <img :src="modelSrc" alt="">
      </div>

    </div>

  </div>
</template>

<script>
  // this.$refs.cropper.startCrop() 开始截图
  // this.$refs.cropper.stopCrop() 停止截图
  // this.$refs.cropper.clearCrop() 清除截图
  // this.$refs.cropper.changeScale() 修改图片大小 正数为变大 负数变小
  // this.$refs.cropper.getImgAxis() 获取图片基于容器的坐标点
  // this.$refs.cropper.getCropAxis() 获取截图框基于容器的坐标点
  // this.$refs.cropper.goAutoCrop 自动生成截图框函数
  // this.$refs.cropper.rotateRight() 向右边旋转90度
  // this.$refs.cropper.rotateLeft() 向左边旋转90度
  import {
    VueCropper
  } from 'vue-cropper'

  export default {
    data: function () {
      return {
        modelSrc:"",//预览路径
        crap: false,
        previews: {},
        option: {
          img: "",
          size: 1,
          full: false,
          outputType: "png",
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 200,
          autoCropHeight: 200,
          centerBox: false,
          high: false,
          cropData: {},
          enlarge: 1,
          mode: 'contain',
          maxImgSize: 2000
        },
        previewStyle1: {},

      };
    },
    methods: {
      startCrop() {
        // start
        this.crap = true;
        this.$refs.cropper.startCrop();
      },
      stopCrop() {
        //  stop
        this.crap = false;
        this.$refs.cropper.stopCrop();
      },
      clearCrop() {
        // clear
        this.$refs.cropper.clearCrop();
      },
      refreshCrop() {
        // clear
        this.$refs.cropper.refresh();
      },
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
      // 实时预览函数
      realTime(data) {
        var previews = data;
        var h = 0.5;
        var w = 0.2;

        this.previewStyle1 = {
          width: previews.w + "px",
          height: previews.h + "px",
          overflow: "hidden",
          margin: "0",
          zoom: h
        };
        this.previews = data;
        console.log(this.previews)
      },
      //预览
      finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.modelSrc = data;
        });
      }
    },
      //上传
      submit() {
      // 输出
        this.$refs.cropper.getCropData(data => {
          this.modelSrc = data;
          // 后台接口
          // ...
        });
    },
      uploadImg(e) {
        //上传图片
        // this.option.img
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = e => {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          let data;
          data = reader.result;
          this.option.img = data;
            // 下面逻辑处理
            let files = e.target.files;
            console.log(files)
        };
        // 转化为base64
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
      imgLoad(msg) {
        console.log(msg);
      },
      cropMoving(data) {
        this.option.cropData = data;
      }
    },
    components: {
      VueCropper,
    },
    mounted() {}
  };

</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .cropper-area {
    width: 100%;
    height: 400px;
  }


  .test-button {
    display: flex;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
  }

</style>
