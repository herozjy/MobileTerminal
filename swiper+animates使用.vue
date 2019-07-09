<template>
    <div class="scroll">
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper">
  
        <swiper-slide class="swiper-slide re_first">
          <div class="item">
            <img class="person animated bounceInLeft  delay-1s " src="../../../assets/logo.png">
            <img class="iconup animated  infinite bounce" src="../../../assets/logo.png">
            <div class="myTestFont animated  rotateInDownRight" src="../../../assets/logo.png">
              rotateInDownRight
            </div>
          </div>
  
        </swiper-slide>
  
        <swiper-slide class="swiper-slide  re_second">
          <div class="item">
  
            <img class="myfirstanimated" src="../../../assets/logo.png">
          </div>
        </swiper-slide>
  
        <swiper-slide class="swiper-slide  re_three">
          <div class="item">
            slider3
          </div>
        </swiper-slide>
  
      </swiper>
    </div>
  </template>
  
  <script>
    import {
      swiper,
      swiperSlide
    } from 'vue-awesome-swiper'
    import $ from 'jquery'
    export default {
      name: 'HelloWorld',
      data() {
        return {
          swiperOption: {
            // swiper configs 所有的配置同swiper官方api配置
            notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            direction: 'vertical', //水平方向移动
            grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
            setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
            autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
            slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
            mousewheel: true, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
            mousewheelControl: false, //同上
            height: window.innerHeight, // 高度设置，占满设备高度
            resistanceRatio: 0, //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
            observeParents: true, //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
            on: {
              // 回调函数，swiper从一个slide过渡到另一个slide结束时执行。
              slideChangeTransitionEnd: function (e) {
                //swiper 切换页面 重新加载动画  
                // 思路：使用display属性把div未在当前swiper页面的元素隐藏不执行动画，当swiper滑动到当前页面时候block显示 div执行动画
                $(".swiper-slide-active").find('.item').removeClass('nopage').addClass('showpage')
                $(".swiper-slide-prev,.swiper-slide-next").find('.item').removeClass('showpage').addClass('nopage')
              },
              //监听滑动切换事件，返回swiper对象
              slideChange: () => {
                let swiper = this.$refs.mySwiper.swiper;
                console.log(swiper.activeIndex); //滑动打印当前索引
              }
            }
  
          },
          flag: true
        }
      },
      created() {
        //从后台获取数据
      },
      // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
      mounted() {
        this.swiper.slideTo(0, 0, false); //手动跳到指定页
  
        //swiper 切换页面 重新加载动画  
        // 思路：使用display属性把div未在当前swiper页面的元素隐藏不执行动画，当swiper滑动到当前页面时候block显示 div执行动画
        $(".swiper-slide-prev,.swiper-slide-next").find('.item').removeClass('showpage').addClass('nopage')
      },
      components: {
        swiper,
        swiperSlide
      }
    }
  
  </script>
  
  <style scoped>
    * {
      margin: 0;
      padding: 0;
    }
  
    .re_first {
      background: #9261BF;
      padding-left: 0.3rem;
      box-sizing: border-box;
      position: relative;
    }
  
    .person {
      position: absolute;
      right: 0;
      width: 40%;
      height: 6rem;
      animation-duration: 3s;
  
    }
  
    .iconup {
      position: absolute;
      bottom: 0.5rem;
      left: 45%;
    }
  
    .myTestFont {
      animation-duration: 3s;
      animation-delay: 2s;
  
      font-size: 40px;
      color: #fff;
      position: absolute;
      left: 10%;
      top: 50%
    }
  
  
  
    .nopage {
      display: none;
    }
  
    .showpage {
      display: block;
    }
  
    .myfirstanimated {
      width: 100px;
      height: 100px;
      opacity: 0;
  
      animation: myfirst 5s 2s;
      -moz-animation: myfirst 5s 2s forwards;
      /* Firefox */
      -webkit-animation: myfirst 5s 2s forwards;
      /* Safari and Chrome */
      -o-animation: myfirst 5s 2s forwards;
      /* Opera */
    }
  
  
    @keyframes myfirst {
      0% {
        width: 100px;
        height: 100px;
        opacity: 0;
      }
  
      100% {
        width: 300px;
        height: 300px;
        opacity: 1;
  
      }
    }
  
    /* animted可以更改动画的持续时间、添加延迟或更改播放的次数：
  
    .yourElement {
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
    } 
  
    */
  
    /* 
      animation: name duration timing-function delay iteration-count direction;
  
      animation-name	规定需要绑定到选择器的 keyframe 名称。。
      animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
      animation-timing-function	规定动画的速度曲线。
      animation-delay	规定在动画开始之前的延迟。
      animation-iteration-count	规定动画应该播放的次数。
      animation-direction	规定是否应该轮流反向播放动画。
     */
  
  </style>
  