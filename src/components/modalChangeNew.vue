<template>
  <div v-if="showModalChangeNew" class="modal-shadowChangeNew" @click.self="closeModalChangeNew">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <form>
          <span>Заголовок</span> <input v-model="actNew.Title">
          <span>Описание</span> <textarea v-model="actNew.Description" cols="30" rows="10"></textarea>
          <input class="uploadImgs" type="file" @change="handleImage" multiple>
          <input class="apply" type="button" value="Применить изменения" @click="changeNew(actNew._id)">
        </form>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModalChangeNew">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "modalChangeNew",
  props: {
    actNew: {
      type: Object,
      requered: true
    }
  },
  data() {
    return {
      Title: '',
      Description: '',
      showModalChangeNew: false,
      newsKadr: [],
      imgsArray: []
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/newsKadr')
      .then((response) => (this.newsKadr = response.data));
    },
    closeModalChangeNew: function () {
      this.showModalChangeNew = false;
    },
    changeNew(id) {
      axios.put('http://' + this.$store.state.ip + ':3012/newsKadr/'+ id, { 
          _id: id,
          Title: this.actNew.Title,
          Description: this.actNew.Description,
          imgs: this.imgsArray,
        })
        .then(response => {
          this.getData()
        })
        .catch(error => {});
      this.showModalChangeNew = false;
    },
    handleImage(e){
      this.imgsArray = []
      for (let i = 0; i < e.target.files.length; i++){
        let file = e.target.files[i];
        let reader = new FileReader();
        reader.onloadend = (file) => {
          this.imgsArray.push({ imgID: i, img: reader.result });
        }
        this.imgsArray.push({ imgID: i, img: reader.readAsDataURL(file) });
      }
      this.imgsArray.splice(0, e.target.files.length);
    }
  }
};
</script>

<style lang="scss">
button, input, textarea {
  background-color: #fff;
}
.modal-shadowChangeNew{
  background-color: rgba(11, 8, 8, .3);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .modalBackLayout{
    width: auto;
    background: #E0E0E0;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    height: auto;
    border-radius: 2vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      height: auto;
      background: rgba(16, 76, 166, 0.4);
      border-radius: 2vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      padding: 2vw;
      form{
        span{
          margin-top: 1vh;
        }
        .uploadImgs{
          margin-top: 1vh;
        }
        .apply{
          margin-top: 2vh;
          padding: 0.5vh;
        }
      }
    }
    .modalFrontLayoutBT{
      width: 100%;
      height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5vw;
      color: #818181;
      font-family: MontBold;
    }
  }
}
</style>