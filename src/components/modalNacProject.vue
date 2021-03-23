<template>
  <div v-if="showNacProjectModal" class="modal-shadowNacProject" @click.self="closeProjModal">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <div class="Tags">
          <div class="tag" v-for="tag in activeProj.tags" :key="tag.tagID"> {{ tag.tag }} </div>
        </div>
        <div class="Title">
          <span>
            {{ activeProj.name }}
          </span>
        </div>
        <div class="Description">
          <span>
            {{ activeProj.description }}
          </span>
        </div>
        <div class="Images" v-if="activeProj.imgs != null && activeProj.imgs.length != 0">
          <img
            v-for="(img, index) in activeProj.imgs"
            :key="img.imgID"
            :src="activeProj.imgs[index].img"
            @click="showModalImg(activeProj.imgs[index].img)"
            >
        </div>
      </div>
      <div class="modalFrontLayoutBT" @click="closeProjModal">
        <span>Закрыть окно</span>
      </div>
    </div>

    <div v-if="showImg" class="modal-shadowNacImg" @click.self="closeImg">
      <div class="modalBackLayout">
        <div class="modalFrontLayoutUP">
          <img class="showImg" :src="activeImg">
        </div>
        <div class="modalFrontLayoutBT" style="min-height: 6.3vh;" @click="closeImg">
          <span>Закрыть окно</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeProj'],
  data() {
    return {
      showNacProjectModal: false,
      showImg: false,
      activeImg: null
    }
  },
  methods: {
    closeProjModal() {
      this.showNacProjectModal = false;
    },
    showModalImg(img) {
      this.activeImg = img;
      this.showImg = true;
    },
    closeImg() {
      this.showImg = false;
    }
  }
}
</script>

<style lang="scss">
.modal-shadowNacImg{
  position: absolute;
  width: 100%;
  height: 104.9vh;
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
      overflow-y: auto;
      .showImg{
        width: 100%;
        height: auto;
        overflow-y: scroll;
      }
    }
  }
}
.modal-shadowNacProject{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 104.5vh;
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
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      width: 98%;
      height: auto;
      background: #fff;
      border-radius: 3vw;
      color: #000000;
      padding: 2vw 5vw;
      max-height: 70vh;
      overflow-y: auto;
      margin-top: 1vh;
      .Tags{
        width: 100%;
        display: flex;
        flex-direction: row;
        font-family: MontSemiBold;
        font-size: 2vw;
        .tag{
          border: 1px solid #387EE8;
          border-radius: 1vw;
          padding: 1vw;
          color: #387EE8;
          margin: 0 2vw 0 0;
        }
      }
      .Title{
        font-family: MontBold;
        font-size: 3vw;
        margin-top: 1.5vh;
      }
      .Description{
        margin-top: 1.5vh;
        font-family: MontSemiBold;
        font-size: 2.3vw;
        white-space: pre-line;
        line-height: 161.4%;
      }
      .Images{
        width: 100%;
        height: 11vh;
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: auto;
        margin-top: 1.5vh;
        img{
          margin: 0 1vw;
          width: 20vw;
          height: 10vh;
          border-radius: 2vw;
        }
      }
    }
    .modalFrontLayoutBT{
      background: #E0E0E0;
      width: 100%;
      height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vw;
      color: #818181;
      font-family: MontBold;
      border-radius: 0 0 3vw 3vw;
    }
  }
}
</style>