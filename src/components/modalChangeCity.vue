<template>
  <div v-if="showModalChangeCity" class="modal-shadowChangeCity" @click.self="closeModalChangeCity">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <form>
          <span>Город</span>
          <input v-model="actcity.city" />
          <span>Год основания</span>
          <input v-model="actcity.founded" />
          <span>Герб</span>
          <input class="uploadImgs" type="file" @change="handleImageEmblem">
          <span>История города</span>
          <textarea v-model="actcity.history" cols="30" rows="10"></textarea>
          <span>Достопримечательности</span>
          <input class="uploadImgs" type="file" @change="handleImageAttract" multiple>
          <input class="apply" type="button" value="Применить изменения" @click="changeCity(actcity._id)">
        </form>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModalChangeCity">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "modalChangeCity",
  props: {
    actcity: {
      type: Object,
      requered: true
    }
  },
  data() {
    return {
      _id: '',
      formCity: '',
      formFounded: '',
      formHistory: '',
      emblem: [],
      cities: [],
      activeCity: null,
      imgsAttract: [],
      showModalChangeCity: false,
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get('http://' + this.$store.state.ip + ':3012/cities')
        .then(response => {this.cities = response.data});
    },
    closeModalChangeCity: function () {
      this.showModalChangeCity = false;
    },
    changeCity(id) {
      axios.put('http://' + this.$store.state.ip + ':3012/cities/'+ id, { 
          _id: id,
          city: this.actcity.city,
          founded: this.actcity.founded,
          emblem: this.emblem,
          history: this.actcity.history,
          attracts: this.imgsAttract,
        })
        .then(response => {
          this.getData()
        })
        .catch(error => {});
      this.showModalChangeCity = false;
    },
    handleImageEmblem(e){
      this.emblem = []
      for (let i = 0; i < e.target.files.length; i++){
        let file = e.target.files[i];
        let reader = new FileReader();
        reader.onloadend = (file) => {
          this.emblem.push({ imgEmblemID: i, imgEmblem: reader.result });
        }
        this.emblem.push({ imgEmblemID: i, imgEmblem: reader.readAsDataURL(file) });
      }
      this.emblem.splice(0, e.target.files.length);
    },
    handleImageAttract(e){
      this.imgsAttract = []
      for (let i = 0; i < e.target.files.length; i++){
        let file = e.target.files[i];
        let reader = new FileReader();
        reader.onloadend = (file) => {
          this.imgsAttract.push({ imgID: i, img: reader.result, name: e.target.files[i].name.slice(0, -4) });
        }
        this.imgsAttract.push({ imgID: i, img: reader.readAsDataURL(file), name: e.target.files[i].name.slice(0, -4) });
      }
      this.imgsAttract.splice(0, e.target.files.length);
    }
  }
};
</script>

<style lang="scss">
button, input, textarea {
  background-color: #fff;
}
.modal-shadowChangeCity{
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
    background: #E0E0E0;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: auto;
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