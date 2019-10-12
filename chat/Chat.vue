<template>
  <div id="chat">
    <div class="container" ref='chatContent'>

      <div class="time">8月8日 早上09:25</div>
      <div class="chat-item-left chat-item">
        <div class='chat-imgbox-left'>
          <img class="chat-headerimg" src="../../assets/beijing.png" alt="">
        </div>
        <div class="chat-frame chat-frame-left">
          <div class="left-sanjiao"></div>
          <div class="text-msg">
            11111111111111111111111111111111111111111111111111111111111111111
          </div>
        </div>
      </div>
      <div class="time">8月8日 早上09:25</div>
      <div class="chat-item-right chat-item">
        <div class="chat-frame chat-frame-right">
          <div class="right-sanjiao"></div>
          <div class="text-msg">
            电饭锅电饭锅水电费三个地方感受到分公司电饭锅电饭锅电饭锅电饭锅地方
          </div>
        </div>
        <div class='chat-imgbox-right'>
          <img class="chat-headerimg" src="../../assets/beijing.png" alt="">
        </div>
      </div>

      <div v-for="(items,index) in chatdata">
        <div class="time">{{items.time}}</div>

        <div class="chat-item-left chat-item" v-if='items.direction=="left"'>
          <div class='chat-imgbox-left'>
            <img class="chat-headerimg" src="../../assets/beijing.png" alt="">
          </div>
          <div class="chat-frame chat-frame-left">
            <div class="left-sanjiao"></div>
            <div class="text-msg">
              {{items.msg}}
            </div>
          </div>
        </div>

        <div class="chat-item-right chat-item" v-if='items.direction=="right"'>
          <div class="chat-frame chat-frame-right">
            <div class="right-sanjiao"></div>
            <div class="text-msg">
              {{items.msg}}
            </div>
          </div>
          <div class='chat-imgbox-right'>
            <img class="chat-headerimg" src="../../assets/beijing.png" alt="">
          </div>
        </div>
      </div>

    </div>




    <div class="footer">
      <div class="wrap-input">
        <textarea rows="1" id="text_input" class="sendInput" @input='text()' v-model='message'></textarea>
      </div>
      <div class="send-message" @click='send'>发送</div>
    </div>



  </div>
</template>


<script>
  import {
    dateFormat
  } from 'vux'
  export default {
    data() {
      return {
        chatdata: [],
        message: '',
        emoji: ['😃', '😁', '😂', '😧', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😙', '😚', '🙂',
          '🤗', '😭', '🤔', '😳', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌',
          '😛', '😟', '😝', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😦'
        ]
      }
    },
    methods: {
      text() {
        text_input.style.height = 'auto';
        text_input.style.height = text_input.scrollHeight + "px";
      },
      send() {
        if (!this.message) {
          return
        }
        var options = {
          msg: this.message,
          direction: 'left',
          time: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }
        this.chatdata.push(options)
        this.message = ''
        text_input.style.height = 'auto';

      },

    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.$refs.chatContent)

        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
        console.log(this.$refs.chatContent.scrollTop)
      })
    },
    watch: {
      chatdata: {
        handler() {
          this.$nextTick(() => {
            setTimeout(() => {
              let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
              document.documentElement.scrollTop = this.$refs.chatContent.scrollHeight
            }, 20)
          })
        },
        deep: true
      }
    }

  }

</script>

<style scoped>
  #chat {
    width: 100%;
    min-height: 100vh;
    background: #efefef;
    padding-bottom: 120px;
  }

  #chat .container {
    padding: 0 20px;
    font-size: 32px;
    overflow-y: scroll;
  }

  #chat .time {
    text-align: center;
    color: #9c9c9c;
    font-size: 28px;
    padding: 40px 0 16px;
  }

  #chat .chat-item-left {
    display: flex;
    justify-content: flex-start;
  }

  #chat .chat-item-right {
    display: flex;
    justify-content: flex-end;
  }

  #chat .chat-headerimg {
    width: 74px;
    height: 74px;
    border-radius: 8px;
  }

  #chat .chat-frame {
    padding: 22px 18px;
    border-radius: 8px;
    line-height: 48px;
    max-width: 480px;
    background: #fff;
    position: relative;
  }

  #chat .chat-frame-left {
    background: #fff;
    margin-left: 12px;
  }

  #chat .chat-frame-right {
    background: #97ec6d;
    margin-right: 12px;
  }

  .left-sanjiao {
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    top: 20px;
    left: -20px;
  }

  .right-sanjiao {
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #97ec6d;
    position: absolute;
    top: 20px;
    right: -20px;
  }

  #chat .chat-imgbox-left {
    width: 85px;
    display: flex;
    justify-content: flex-start;
  }

  #chat .chat-imgbox-right {
    width: 85px;
    display: flex;
    justify-content: flex-end;
  }

  /* #chat .chat-frame-left {}

  #chat .chat-frame-right {
    background: #97ec6d;
    margin-right: 12px;
  } */
  .chat-item {
    padding-top: 24px;
  }


  #chat .footer {
    border-top: 1px solid #e0e0e0;
    /*no*/
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  #chat .footer .wrap-input {
    background: #fff;
    height: auto;
    padding: 10px;
    max-height: 180px;
    flex: 1;
    border-radius: 8px;
    overflow: hidden;
  }

  #chat .text-msg {
    word-wrap: break-word;
  }

  #chat .footer textarea {
    background: #fff;
    font-size: 32px;
    width: 100%;
    height: auto;
  }

  .send-message {
    background: #0bbe60;
    color: #fff;
    font-size: 32px;
    height: 60px;
    line-height: 60px;
    padding: 0 26px;
    border-radius: 8px;
    margin-left: 20px;

  }

</style>
