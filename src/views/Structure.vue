<template>
  <div class="structurePage">
    <modal-window class="forModalStyle" ref="modal" :strID="activeID"></modal-window>
    <div class="structurePageUpText">
      <span>Структура администрации <br> Сургутского района</span>
    </div>

    <div v-if="loading" class="structurePageBlock">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="structurePageBlock">
      <div class="forGlava">
        <div
          class="strPart"
        >
          <div class="strPartText">
            <span class="UP">{{ struct.data[0].structName }}</span>
            <span class="BT">{{ struct.data[0].glavaName }}</span>
          </div>
          <div class="strPartGo" @click="showModal(0)">
            <span>Направления деятельности</span>
          </div>
        </div>
      </div>
      <div
        class="strPart"
        v-for="(str, index) in struct.data" :key="str._id"
        v-show="index != 0"
      >
        <div class="strPartText">
          <span class="UP">{{ str.structName }}</span>
          <span class="BT">{{ str.glavaName }}</span>
        </div>
        <div class="strPartGo" @click="showModal(index)">
          <span>Направления деятельности</span>
        </div>
      </div>
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
import ModalWindow from '../components/structureModal.vue'

export default {
  data(){
    return {
      struct: [],
      activeID: null,
      loading: true
    }
  },
  mounted(){
    this.getData()
  },
  components: {
    ModalWindow
  },
  methods: {
    getData() {
      axios
        .get('http://' + this.$store.state.ip + ':3012/struct')
        .then((response) => (this.struct = response))
        .finally(() => (this.loading = false));
    },
    showModal: function(id) {
      this.activeID = id;
      this.$refs.modal.show = true;
    }
  }
}
</script>

<style lang="scss">
body{
  background: url(../../public/img/backgrnd.jpg);
}
.structurePage{
  width: 100%;
  height: 93vh;
}
.structurePageUpText{
  text-align: center;
  margin-top: 4.7vh;
  font-size: 3.7vw;
  font-family: MontBold;
  line-height: 143.4%;
  color: #fff;
  margin-bottom: 2vh;
}
.forModalStyle{
  display: flex;
  justify-content: center;
}
.structurePageBlock{
  width: 100%;
  height: 80.3vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .forGlava{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .strPart{
    width: 34.4vw;
    height: 16.6vh;
    background-color: #fff;
    border-radius: 3vw;
    .strPartText{
      height: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .UP{
        width: 80%;
        font-size: 2vw;
        font-family: MontSemiBold;
        text-align: center;
      }
      .BT{
        width: 80%;
        font-size: 2.2vw;
        font-family: MontBold;
        text-align: center;
        color: #104CA6;
        margin-top: 1vh;
      }
    }
    .strPartGo{
      width: 100%;
      height: 25%;
      background-color: #104CA6;
      border-radius: 0 0 3vw 3vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 1.8vw;
      font-family: MontSemiBold;
    }
  }
}
</style>