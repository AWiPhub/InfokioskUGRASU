<template>
  <div class="changeCity" v-if="this.$store.state.is_admin == true">
    <modalChangeCity
      class="forModalStyle"
      ref="modalChangeCity"
      :actcity="activeCity"
    ></modalChangeCity>
    <router-link to="/admin" class="adminBack">← Назад</router-link>
    <span class="changeCityUPText">Страница городов</span>
    <form>
      <span>Город</span>
      <input v-model="formCity" />
      <span>Год основания</span>
      <input v-model="formFounded" />
      <span>Герб</span>
      <input type="file" @change="handleImageEmblem">
      <span>История города</span>
      <textarea v-model="formHistory" cols="30" rows="10"></textarea>
      <span>Достопримечательности</span>
      <input type="file" @change="handleImageAttract" multiple accept="image/*">
      <input type="button" value="Добавить город" @click="createCity" />
    </form>

    <div v-if="loading">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <table v-else>
      <tr>
        <th>Город</th>
        <th>Год основания</th>
        <th>Герб</th>
        <th>История</th>
        <th>Достопримечательности</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      <tr v-for="city in cities" :key="city._id">
        <td>{{ city.city }}</td>
        <td>{{ city.founded }}</td>
        <td> <div v-if="city.emblem != ''"> <img :src="city.emblem[0].imgEmblem" alt=""> </div> </td>
        <td>{{ city.history }}</td>
        <td>  <div v-if="city.attracts != ''"> <img :src="city.attracts[0].img"> </div> </td>
        <td>
          <button class="btChange" @click="showModalChangeCity(city)"><img src="../../public/img/other/change.png"></button>
        </td>
        <td><button class="btDelete" @click="deleteCity(city._id)"><span>✖</span></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import modalChangeCity from "../components/modalChangeCity.vue";

export default {
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
      loading: true
    }
  },
  components: {
    modalChangeCity,
  },
  mounted() {
    this.getData();
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      if (this.$store.state.is_admin == false) {
        this.$router.push('/Login');
      }
    },
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/cities')
      .then((response) => (this.cities = response.data))
      .finally(() => (this.loading = false));
    },
    createCity() {
      axios
        .post('http://' + this.$store.state.ip + ':3012/cities', {
          city: this.formCity,
          founded: this.formFounded,
          emblem: this.emblem,
          history: this.formHistory,
          attracts: this.imgsAttract,
        })
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
      this.formCity = ''
      this.formFounded = ''
      this.emblem = []
      this.formHistory = ''
      this.imgsAttract = []
    },
    deleteCity(_id) {
      axios
        .delete('http://' + this.$store.state.ip + ':3012/cities/' + _id)
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
    },
    showModalChangeCity: function (city) {
      this.activeCity = city;
      this.$refs.modalChangeCity.showModalChangeCity = true;
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
      console.log(e);
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
.changeCity{
  display: flex;
  flex-direction: column;
  align-items: center;
  .changeCityUPText{
    font-family: MontBold;
    color: #fff;
    font-size: 2vw;
    margin-top: 2vh;
    text-align: center;
  }
  form {
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    width: 50vw;
    span{
      font-family: MontSemiBold;
      color: #fff;
    }
    input, textarea{
      outline: none;
      font-family: MontSemiBold;
    }
    input[type = button] {
      margin-top: 1vh;
    }
    
  }
  table {
    width: 85vw;
    margin-top: 2vh;
    border: 1px solid #000;
    th {
      border: 1px solid #000;
    }
    td {
      text-align: center;
      border: 1px solid #000;
      white-space: pre-line;
      img{
        margin: 5px;
        width: 5vw;
      }
      .btChange{
        width: 3vh;
        height: 3vh;
        background-color: green;
        outline: none;
        img{
          width: 2vh;
          height: 2vh;
          filter: invert(100%);
        }
      }
      .btDelete{
        width: 3vh;
        height: 3vh;
        background-color: red;
        color: #fff;
        border-radius: 2vw;
        outline: none;
      }
    }
  }
}
</style>