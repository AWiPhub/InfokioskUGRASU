<template>
  <div v-if="showModalHistory" class="modal-shadowHistory" @click.self="closeModalHistory">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <span class="actHistory">{{ actHistory }}</span>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModalHistory">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['actHistory'],
  data() {
    return {
      cities: [],
      showModalHistory: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/cities')
      .then((response) => (this.cities = response.data));
    },
    closeModalHistory() {
      this.showModalHistory = false;
    }
  }
}
</script>

<style lang="scss">
.modal-shadowHistory{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 104.7vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modalBackLayout{
    background: #fff;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      margin-top: 1vh;
      width: 98%;
      height: auto;
      max-height: 75vh;
      background: rgba($color: #fff, $alpha: .4);
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      padding: 5vw;
      overflow-y: auto;
      .actHistory {
        margin-top: -1vh;
        font-family: MontSemiBold;
        font-size: 2.5vw;
        white-space: pre-line;
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