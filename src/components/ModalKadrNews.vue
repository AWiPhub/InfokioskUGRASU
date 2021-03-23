<template>
  <div v-if="showModalKadrNews" class="modal-shadowModalKadrNews" @click.self="closeModal">
  
  <div v-if="showImg" class="modal-shadowKardImg" @click.self="closeImg">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <img class="showImg" :src="activeImg">
      </div>
      <div class="modalFrontLayoutBT" @click="closeImg">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
  
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <span class="TitleNews"> {{ KadrNewsID.Title }} </span>
        <span class="DescriptionNews"> {{ KadrNewsID.Description }} </span>
        <div class="ImgsNews">
          <div class="inImgsNewsBlock">
            <img
              v-for="(img, index) in KadrNewsID.imgs"
              :key="img.imgID"
              :src="KadrNewsID.imgs[index].img"
              @click="showModalImg(KadrNewsID.imgs[index].img)">
          </div>
        </div>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModal">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ModalKadrNews",
  props: ['KadrNewsID'],
  data: function () {
    return {
      showModalKadrNews: false,
      showImg: false,
      activeImg: null,
      news: []
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get('http://' + this.$store.state.ip + ':3012/newsKadr')
        .then((response) => (this.news = response.data));
    },
    closeModal: function () {
      this.showModalKadrNews = false;
    },
    showModalImg(img) {
      this.activeImg = img;
      this.showImg = true;
    },
    closeImg() {
      this.showImg = false;
      this.showModalKadrNews = true;
    }
  }
};
</script>

<style lang="scss">
.modal-shadowKardImg{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 104.5vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .modalBackLayout{
    background: #E0E0E0 !important;
    .modalFrontLayoutUP{
      padding: 0vw !important;
      margin-top: 0vw !important;
      width: 100% !important;
      .showImg{
        width: 100%;
        height: auto;
      }
    }
  }
}
.modal-shadowModalKadrNews{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .modalBackLayout{
    background: #fff;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    max-height: 70vh;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      padding: 4vw;
      width: 98%;
      height: auto;
      max-height: 65vh;
      background: #fff;
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      overflow-y: auto;
      margin-top: 3vw;
      .TitleNews{
        font-family: MontBold;
        font-size: 3vw;
        margin-top: -1.5vh;
      }
      .DescriptionNews{
        margin-top: 1.5vh;
        font-family: MontSemiBold;
        font-size: 2.3vw;
        white-space: pre-line;
      }
      .ImgsNews{
        width: 100%;
        height: 11vh;
        display: flex;
        flex-direction: row;
        margin-top: 1.5vh;
        .inImgsNewsBlock{
          display: flex;
          flex-direction: row;
          width: 100%;
          overflow-x: auto;
          img{
            margin: 0 1vw;
            width: 20vw;
            height: 10vh;
            border-radius: 2vw;
          }
        }
      }
    }
    .modalFrontLayoutBT{
      width: 100%;
      min-height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vw;
      color: #818181;
      border-radius: 0 0 3vw 3vw;
      background: #E0E0E0;
      font-family: MontBold;
    }
  }
}

</style>