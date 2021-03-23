<template>
  <div class="changeHello" v-if="this.$store.state.is_admin == true">
    <router-link to="/admin" class="adminBack">← Назад</router-link>
    <form>
      <span>Имя</span>
      <input v-model="hello[0].name" />
      <span>Текст приветствия</span>
      <textarea v-model="hello[0].helloText" />
      <span>Фотография</span>
      <input type="file" @change="handleImage">
      <input type="button" value="Сохранить" @click="save" v-if="hello.length > 1" />
      <input type="button" value="Изменить" @click="saveNew(hello[0]._id)" v-if="hello.length == 1" />
      <span v-if="saved" style="color: yellow">Сохранено успешно</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hello: [],
      img: [],
      name: '',
      helloText: '',
      saved: false
    }
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
      .get('http://' + this.$store.state.ip + ':3012/hello')
      .then((response) => (this.hello = response.data));
    },
    save() {
      axios
        .post('http://' + this.$store.state.ip + ':3012/hello', {
          img: this.img,
          name: this.hello[0].name,
          helloText: this.hello[0].helloText
        })
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
    },
    handleImage(e){
      this.img = []
      for (let i = 0; i < e.target.files.length; i++){
        let file = e.target.files[i];
        let reader = new FileReader();
        reader.onloadend = (file) => {
          this.img.push({ img: reader.result });
        }
        this.img.push({ img: reader.readAsDataURL(file) });
      }
      this.img.splice(0, e.target.files.length);
    },
    saveNew(id) {
      axios.put('http://' + this.$store.state.ip + ':3012/hello/'+ id, { 
          _id: id,
          img: this.img,
          name: this.hello[0].name,
          helloText: this.hello[0].helloText
        })
        .then(response => {
          this.getData()
        })
        .catch(error => {})
        .finally(() => (this.saved = true));
    }
  }
};
</script>

<style lang="scss">
button, input, textarea {
  background-color: #fff;
}
.changeHello{
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    width: 50vw;
    span{
      font-family: MontSemiBold;
      color: #fff;
      margin-top: 1vh;
    }
    input, textarea{
      outline: none;
      font-family: MontSemiBold;
    }
    input[type = button] {
      margin-top: 1vh;
    }
  }
}
</style>