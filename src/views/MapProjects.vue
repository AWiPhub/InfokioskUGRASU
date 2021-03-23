<template>
  <div class="mapPage">
    <div v-if="shownacProjectModal" class="modal-shadowMap" @click.self="closeProjModal">
      <div class="modalBackLayout">
        <div class="modalFrontLayoutUP">
          <div class="Tags" v-if="activeProj.tags.length != 0 && activeProj.tags != null">
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
          <div class="Images" v-if="activeProj.imgs.length != 0">
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
    </div>

    <div v-if="showImg" class="modal-shadowimg" @click.self="closeImg">
      <div class="modalBackLayoutImg">
        <div class="modalFrontLayoutUPimg">
          <img class="showImg" :src="activeImg">
        </div>
        <div class="modalFrontLayoutBTimg" style="min-height: 6.3vh;" @click="closeImg">
          <span>Закрыть окно</span>
        </div>
      </div>
    </div>

    <button style="display: none" @click="showProjModal" class="button"></button>

    <yandex-map 
      :coords="coords"
      :zoom="10"
      style="width: 100%; height: 93vh"
      :cluster-options="clusterOptions"
    >
      <ymap-marker
        v-for="proj in nacProjects" :key="proj._id"
        :coords="proj.coords"
        marker-id="123"
        cluster-name="1"
        @balloonopen="balloonLog(proj)"
        :balloon="{header: proj.name}"
        marker-type="placemark"
        :icon="{
          layout: 'default#image',
          imageHref: 'img/other/iconMap.png',
          imageSize: [40, 40],
          imageOffset: [-15, -30]
        }"
      >
        <div slot="balloon" class="infoBlock">
          <div class="infoBlockContent">
            <span class='nameProj'>{{proj.name}}</span>
            <span class='descProj'>{{proj.description}}</span>
            <div class="kpGoProj">
              <button class="kp" onclick="javascript: document.querySelector('.button').click();">Подробнее о проекте</button>
            </div>
          </div>
        </div>
      </ymap-marker>
    </yandex-map>

    <router-link to="/" class="goBack">
      <div class="pointBack">
        <img src="../../public/img/icons/pointerBack.svg" alt="pointerBack">
      </div>
      <span>Вернуться назад</span>
    </router-link>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import axios from 'axios';

export default {
  data() {
    return {
      settings: {
        lang: 'ru_RU',
        coordorder: 'latlong'
      },
      coords: [ 61.25, 73.41667 ],
      nacProjects: [],
      activeID: null,
      shownacProjectModal: false,
      showImg: false,
      activeImg: null,
      activeProj: null,
      clusterOptions: {
        1: {
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: true,
          hideIconOnBalloonOpen: false,
          clusterBalloonContentLayout: "cluster#balloonCarousel",
          clusterBalloonCycling: false,
          clusterBalloonPagerType: "marker",
          iconLayout: 'cluster#icon',
          clusterIcons: [
            {
              href: 'img/other/iconMapCluster.png',
              size: [45, 45],
              offset: [-15, -30]
            }
          ],
          clusterNumbers: [2],
          clusterBalloonLayout: [
            '<h3>Проекты:</h3>',
            '<ul class=list>',
            '{% for geoObject in properties.geoObjects %}',
            '<li><h4>{{ geoObject.properties.balloonContentHeader|raw }}</h4></li>',
            '{% endfor %}',
            '</ul>',
          ].join(''),
        },
      },
    }
  },
  components: { yandexMap, ymapMarker },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get("http://" + this.$store.state.ip + ":3012/nacProjects")
        .then((response) => (this.nacProjects = response.data));
    },
    closeProjModal: function () {
      this.shownacProjectModal = false;
    },
    balloonLog(param) {
      this.activeProj = param;
    },
    showProjModal(id) {
      this.activeID = id;
      this.shownacProjectModal = true;
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
.infoBlock{
  width: 36vw;
  height: 12.9vh;
  background-color: #fff;
  border-radius: 1vw;
  box-shadow: 4px 4px 23px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  .infoBlockContent{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nameProj{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 33%;
      font-family: MontBold;
      width: 95%;
    }
    .descProj{
      display: flex;
      justify-content: center;
      height: 33%;
      width: 95%;
      font-family: MontSemiBold;
      overflow-y: hidden;
    }
    .kpGoProj{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 33%;
      width: 100%;
      .kp{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #104CA6;
        width: 95%;
        height: 50%;
        border: none;
        border-radius: 1vw;
        color: #fff;
        font-family: MontSemiBold;
        cursor: pointer;
      }
    }
  }
}
.modal-shadowMap{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 104.7vh;
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
      margin-top: 1vh;
      width: 98%;
      height: auto;
      background: #fff;
      border-radius: 3vw;
      color: #000000;
      padding: 2vw 5vw;
      max-height: 70vh;
      overflow-y: auto;
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
  height: 10vh;
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
.showImg{
  width: 100%;
  height: auto;
}
.modal-shadowimg{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 97.7vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .modalBackLayoutImg{
    background: #E0E0E0;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUPimg{
      height: auto;
      background: #fff;
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      max-height: 70vh;
      overflow-y: auto;
    }
    .modalFrontLayoutBTimg{
      width: 100%;
      height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vw;
      color: #818181;
      font-family: MontBold;
      
    }
  }
}
</style>