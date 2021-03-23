<template>
  <div v-if="showModalChangeProj" class="modal-shadowChangeProj" @click.self="closeModalChangeProj">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <form>
          <span>Город</span>
          <input v-model="actproj.city">
          <span>Координаты метки для Яндекс Карты</span>
          <div>
            <input v-model="actproj.coords[0]" />
            <input v-model="actproj.coords[1]"  style="margin-left: 1vw" />
          </div>
          <span>Название</span>
          <input v-model="actproj.name">
          <span>Тэги</span>
          <input v-model="modalFormTags" v-on:keyup.enter="onEnterTags(modalFormTags)">
          <div class="tagsBlock" v-if="actproj.tags.length != 0">
            <div class="tag" v-for="tag in actproj.tags" :key="tag.tagID">
              <span>{{ tag.tag }}</span>
              <input type="button" value="X" @click="deleteTag(tag.tagID)">
            </div>
          </div>
          <span>Описание</span> <textarea v-model="actproj.description" cols="30" rows="10"></textarea>
          <span>Статус</span> <input v-model="actproj.status">
          <input class="uploadImgs" type="file" @change="handleImage" multiple>
          <input class="apply" type="button" value="Применить изменения" @click="changeProj(actproj._id)">
        </form>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModalChangeProj">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "modalChangeProj",
  props: {
    actproj: {
      type: Object,
      requered: true
    }
  },
  data() {
    return {
      modalFormTags: [],
      showModalChangeProj: false,
      nacProjects: [],
      tagsArray: [],
      tagID: 0,
      imgsArray: [],
      coords: []
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/cities')
      .then((response) => (this.cities = response.data));
    },
    closeModalChangeProj: function () {
      this.showModalChangeProj = false;
    },
    changeProj(id) {
      axios.put('http://' + this.$store.state.ip + ':3012/nacProjects/'+ id, { 
          _id: id,
          city: this.actproj.city,
          coords: this.actproj.coords,
          name: this.actproj.name,
          tags: this.actproj.tags,
          description: this.actproj.description,
          status: this.actproj.status,
          imgs: this.imgsArray,
        })
        .then(response => {
          this.getData()
        })
        .catch(error => {});
      this.showModalChangeProj = false;
    },
    onEnterTags(tag){
      if (tag == '') return;
      else{
        let nextTagID = [];
        for (let i = 0; i < this.actproj.tags.length; i++) {
          nextTagID.push(this.actproj.tags[i].tagID)
        }
        let nextID = Math.max.apply(null, nextTagID) + 1;
        if (nextID === -Infinity) {
          this.actproj.tags.push({tagID: 0, tag});
          this.modalFormTags = '';
        } else {
          this.actproj.tags.push({tagID: nextID, tag});
          this.modalFormTags = '';
        }
      }
    },
    deleteTag(tagID){
      for (let id in this.actproj.tags) {
        if (this.actproj.tags[id].tagID === tagID) {
          this.actproj.tags.splice(id, 1);
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
.modal-shadowChangeProj{
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
        .tagsBlock{
          padding: 1vh;
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