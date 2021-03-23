<template>
  <div class="changeProj" v-if="this.$store.state.is_admin == true">
    <modalChangeProj
      class="forModalStyle"
      ref="modalChangeProj"
      :actproj="activeProj"
    ></modalChangeProj>
    <router-link to="/admin" class="adminBack">← Назад</router-link>
    <span class="changeProjUPText">Страница нац проектов</span>
    <form>
      <span>Город</span>
      <input v-model="formCity" />
      <span>Координаты метки для Яндекс Карты</span>
      <div>
        <input v-model="coords[0]" />
        <input v-model="coords[1]"  style="margin-left: 1vw" />
      </div>
      <span>Название</span>
      <input v-model="formName" />
      <span>Тэги</span>
      <input v-model="formTags" v-on:keyup.enter="onEnterTags(formTags)" />
      <div class="tagsBlock">
        <div class="tag" v-for="tag in tagsArray" :key="tag.tagID">
          <span>{{ tag.tag }}</span>
          <input type="button" value="X" @click="deleteTag(tag.tagID)" />
        </div>
      </div>
      <span>Описание</span>
      <textarea v-model="formDescription" cols="30" rows="10"></textarea>
      <span>Статус</span> <input v-model="formStatus" />
      <span>Изображения</span>
      <input type="file" @change="handleImage" multiple>
      <input type="button" value="Добавить проект" @click="createProj" />
    </form>

    <div v-if="loading">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <table v-else>
      <tr>
        <th>Город</th>
        <th>Название проекта</th>
        <th>Тэги</th>
        <th>Описание</th>
        <th>Статус</th>
        <th>Изображения</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      <tr v-for="proj in nacProjects" :key="proj._id">
        <td>{{ proj.city }}</td>
        <td>{{ proj.name }}</td>
        <td>
          <span v-for="tag in proj.tags" :key="tag.tagID">{{ tag.tag }}, </span>
        </td>
        <td>{{ proj.description }}</td>
        <td>{{ proj.status }}</td>
        <td> <div v-if="proj.imgs != ''"> <img :src="proj.imgs[0].img" alt=""></div></td>
        <td>
          <button class="btChange" @click="showModalChangeProj(proj)"><img src="../../public/img/other/change.png"></button>
        </td>
        <td><button class="btDelete" @click="deleteProj(proj._id)"> <span>✖</span></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import modalChangeProj from "../components/modalChangeProj.vue";

export default {
  data() {
    return {
      _id: "",
      formCity: "",
      formName: "",
      formTags: "",
      formDescription: "",
      formStatus: "",
      nacProjects: [],
      activeProj: null,
      tagsArray: [],
      tagID: 0,
      imgsArray: [],
      coords: [],
      loading: true
    }
  },
  components: {
    modalChangeProj,
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
      .get('http://' + this.$store.state.ip + ':3012/nacProjects')
      .then((response) => (this.nacProjects = response.data))
      .finally(() => (this.loading = false));
    },
    createProj() {
      axios
        .post("http://" + this.$store.state.ip + ":3012/nacProjects", {
          city: this.formCity,
          coords: this.coords,
          name: this.formName,
          tags: this.tagsArray,
          description: this.formDescription,
          status: this.formStatus,
          imgs: this.imgsArray,
        })
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
      this.formCity = '';
      this.coords[0] = '';
      this.coords[1] = '';
      this.formName = '';
      this.formTags = '';
      this.tagsArray = [];
      this.formDescription = '';
      this.formStatus = '';
      this.imgsArray = [];
      this.tagID = 0;
    },
    deleteProj(_id) {
      axios
        .delete("http://" + this.$store.state.ip + ":3012/nacProjects/" + _id)
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
    },
    showModalChangeProj: function (proj) {
      this.activeProj = proj;
      this.$refs.modalChangeProj.showModalChangeProj = true;
    },
    onEnterTags(tag) {
      if (tag == '') {
        return;
      } else {
        this.tagsArray.push({ tagID: this.tagID, tag });
        this.formTags = "";
        this.tagID++;
      }
    },
    deleteTag(tagID) {
      for (let id in this.tagsArray) {
        if (this.tagsArray[id].tagID === tagID) {
          this.tagsArray.splice(id, 1);
          break;
        }
      }
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
    .tagsBlock {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 1vh 0 0 -1vh;
      .tag {
        border: 2px #fff solid;
        padding: 0.5vh 1vh;
        border-radius: 1vw;
        margin: 0 0 1vh 1vh;
        span{
          margin-left: 1vh;
        }
        input{
          color: #fff;
          background: none;
          border: none;
          cursor: pointer;
          margin-top: 0;
          margin-left: 1vh;
        }
      }
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