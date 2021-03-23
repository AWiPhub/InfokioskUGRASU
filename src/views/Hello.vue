<template>
  <div class="helloPage">
    <div v-if="showModelVideo" class="modal-shadowVideo" @click.self="closeVideo">
      <div class="modalBackLayout">
        <div class="modalFrontLayoutUP">
          <video src="../../public/helloVideo.mp4" controls autoplay></video>
        </div>
        <div class="modalFrontLayoutBT" @click="closeVideo">
          <span>Закрыть окно</span>
        </div>
      </div>
    </div>

    <div class="hello">
      <section class="textUp">Приветствую гостей <br>
                              и жителей Сургутского района <br>
                              и города Сургута
      </section>
      <section class="glava">
        <img v-if="hello[0].img != null && hello[0].img.length != 0" :src="hello[0].img[0].img" alt="glava">
        <span>{{ hello[0].name }}</span>
        <small>Глава Сургутского района</small>
      </section>
      <section class="aboutText">
        <span>
          {{ hello[0].helloText }}
        </span>
      </section>
      <section class="presentation">
        <img src="../../public/img/other/presentation.png" alt="s" @click="showVideo">
      </section>
    </div>

    <router-link to="/" class="goBack">
      <div class="pointBack">
        <img src="../../public/img/icons/pointerBack.svg" alt="pointerBack">
      </div>
      <span>Вернуться назад</span>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hello: [],
      showModelVideo: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/hello')
      .then((response) => (this.hello = response.data));
    },
    showVideo() {
      this.showModelVideo = true;
    },
    closeVideo() {
      this.showModelVideo = false;
    }
  }
}
</script>

<style lang="scss">
.helloPage{
  height: 100vh;
}
section{
  display: flex;
  justify-content: center;
  align-items: center;
}
.hello{
  width: 100%;
  height: 93%;
  color: #fff;
  display: flex;
  text-align: center;
  flex-direction: column;
  .textUp{
    width: 100%;
    margin-top: 4.7vh;
    font-size: 3.7vw;
    font-family: MontBold;
    line-height: 143.4%;
  }
  .glava{
    width: 100%;
    height: 28%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 3.5vh;
    img{
      width: 29vw;
    }
    span{
      width: 55vw;
      font-family: MontBold;
      font-size: 3vw;
    }
    small{
      font-family: MontSemiBold;
      font-size: 2vw;
    }
  }
  .aboutText{
    width: 100%;
    height: 28%;
    font-size: 2.2vw;
    margin-top: 1.4vh;
    font-family: MontSemiBold;
    line-height: 143.4%;
    span{
      white-space: pre-line;
      width: 79%;
    }
  }
  .presentation{
    margin-top: 3vh;
    img{
      width: 70vw;
    }
  }
}


.modal-shadowVideo{
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #0B0808, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .modalBackLayout{
    background: #333333;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      height: auto;
      max-height: 75vh;
      background: rgba($color: #fff, $alpha: .4);
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      overflow-y: auto;
      iframe{
        z-index: 3;
      }
    }
    .modalFrontLayoutBT{
      width: 100%;
      height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vw;
      color: #818181;
      font-family: MontBold;
    }
  }
}
</style>