<template>
  <div class="changeProj" v-if="this.$store.state.is_admin == true">
    <modalChangeNew
      class="forModalStyle"
      ref="modalChangeNew"
      :actNew="activeNew"
    ></modalChangeNew>
    <router-link to="/admin" class="adminBack">← Назад</router-link>
    <span class="changeProjUPText">Страница новостей кадров</span>
    <form>
      <span>Заголовок</span>
      <input v-model="Title" />
      <span>Описание</span>
      <textarea v-model="Description" cols="30" rows="10"></textarea>
      <span>Изображения</span>
      <input type="file" @change="handleImage" multiple>
      <input type="button" value="Добавить новость" @click="createNew" />
    </form>


    <div v-if="loading" class="nacProjectsLoader">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <table v-else>
      <tr>
        <th>Заголовок</th>
        <th>Описание</th>
        <th>Изображения</th>
        <th>Дата</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      <tr v-for="news in newsKadr" :key="news._id">
        <td>{{ news.Title }}</td>
        <td>{{ news.Description }}</td>
        <td> <div v-if="news.imgs != ''"> <img :src="news.imgs[0].img" alt=""></div></td>
        <td>{{ news.date }}</td>
        <td>
          <button class="btChange" @click="showmodalChangeNew(news)"><img src="../../public/img/other/change.png"></button>
        </td>
        <td><button class="btDelete" @click="deleteNew(news._id)"><span>✖</span></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import modalChangeNew from "../components/modalChangeNew.vue";
import moment from 'moment';

export default {
  data() {
    return {
      _id: "",
      Title: "",
      Description: "",
      newsKadr: [],
      activeNew: null,
      imgsArray: [],
      loading: true
    }
  },
  components: {
    modalChangeNew,
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
      .get('http://' + this.$store.state.ip + ':3012/newsKadr')
      .then((response) => (this.newsKadr = response.data))
      .finally(() => (this.loading = false));
    },
    createNew() {
      axios
        .post("http://" + this.$store.state.ip + ":3012/newsKadr", {
          Title: this.Title,
          Description: this.Description,
          imgs: this.imgsArray,
          date: moment(Date.now()).format('DD.MM.YYYY HH:mm')
        })
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
      this.Title = '';
      this.Description = '';
      this.imgsArray = [];
    },
    deleteNew(_id) {
      axios
        .delete("http://" + this.$store.state.ip + ":3012/newsKadr/" + _id)
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
    },
    showmodalChangeNew: function (news) {
      this.activeNew = news;
      this.$refs.modalChangeNew.showModalChangeNew = true;
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
.changeProj{
  display: flex;
  flex-direction: column;
  align-items: center;
  .changeProjUPText{
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