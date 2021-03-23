<template>
  <div class="cityPage">
    <div v-if="loading" class="CityBlockLoader">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>

    <div v-else class="city">

      <div class="CityName">
        <span> {{ cities.data[cityID].city }} </span>
      </div>
      <div class="CityBorn">
        <span> Основан в  {{ cities.data[cityID].founded }} году </span>
      </div>
      <div class="historyBlock">
        <div class="historyBlockUP">
          <img v-if="cities.data[cityID].emblem != null && cities.data[cityID].emblem.length != 0" :src="cities.data[cityID].emblem[0].imgEmblem" alt="">
          <img v-else src="../../public/img/cities/default.svg">
          <span> {{ cities.data[cityID].history }} </span>
        </div>
        <div
          class="historyBlockBT"
          @click="showModalHistory(cities.data[cityID].history)"
        >
          <span>Читать историю</span>
        </div>
      </div>
      <div class="nacProjectsBlock">
        <div class="nacProjectsDostoprText">
          <span>Реализуемые проекты</span>
        </div>
        <div v-if="loadingProjects" class="nacProjectsLoader">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div v-else class="nacProjects">
          <div
            class="Proj"
            v-for="Proj in nacProjects.data" :key="Proj._id"
            v-if="cities.data[cityID].city == Proj.city"
            @click="showNacProject(Proj)"
          >
            <div class="ProjectImages" v-if="Proj.imgs.length != 0">
              <img :src="Proj.imgs[0].img">
            </div>
            <span class="ProjectSpan"> {{ Proj.name }} </span>
          </div>
        </div>
      </div>
      <div class="dostoprBlock">
        <div class="nacProjectsDostoprText">
          <span>Достопримечательности</span>
        </div>
        <div class="attracts">
          <div
            class="dostopr"
            v-for="attract in cities.data[cityID].attracts" :key="attract.imgID"
            @click="openAttract(attract.img)"
          >
            <div class="dostoprImages" v-if="cities.data[cityID].attracts.length != 0">
              <img :src="attract.img">
            </div>
            <span class="dostoprSpan"> {{ attract.name }} </span>
          </div>
        </div>
      </div>
    </div>

    <modalHistoryCity
      class="forModalStyle"
      ref="modalHistory"
      :actHistory="activeHistory"
    >
    </modalHistoryCity>

    <modalNacProject
      class="forModalStyle"
      ref="modalProj"
      :activeProj="actProj"
    >
    </modalNacProject>

    <div v-if="showAttract" class="modal-shadowAttract" @click.self="closeAttract">
      <div class="modalBackLayout">
        <div class="modalFrontLayoutUP">
          <img class="showImg" :src="activeAttract">
        </div>
        <div class="modalFrontLayoutBT" style="min-height: 6.3vh;" @click="closeAttract">
          <span>Закрыть окно</span>
        </div>
      </div>
    </div>

    <router-link to="/cities" class="goBack">
      <div class="pointBack">
        <img src="../../public/img/icons/pointerBack.svg" alt="pointerBack">
      </div>
      <span>Вернуться назад</span>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import modalHistoryCity from '../components/modalHistoryCity.vue';
import modalNacProject from '../components/modalNacProject.vue';


export default {
  props: ['cityID'],
  data(){
    return {
      nacProjects: [],
      cities: [],
      activeHistory: null,
      actProj: null,
      activeAttract: null,
      showAttract: false,
      loading: true,
      loadingProjects: true
    }
  },
  components: {
    modalHistoryCity,
    modalNacProject
  },
  mounted() {
    axios
      .get("http://" + this.$store.state.ip + ":3012/nacProjects")
      .then((response) => (this.nacProjects = response))
      .finally(() => (this.loadingProjects = false));
      
    axios
      .get("http://" + this.$store.state.ip + ":3012/cities")
      .then((response) => (this.cities = response))
      .finally(() => (this.loading = false));
  },
  methods: {
    showModalHistory(id) {
      this.activeHistory = id;
      this.$refs.modalHistory.showModalHistory = true;
    },
    showNacProject(proj) {
      this.actProj = proj;
      this.$refs.modalProj.showNacProjectModal = true;
    },
    openAttract(img) {
      this.activeAttract = img;
      this.showAttract = true;
    },
    closeAttract() {
      this.showAttract = false;
    }
  }
}
</script>

<style lang="scss">
.modal-shadowAttract{
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .modalBackLayout{
    background: #E0E0E0;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      border-radius: 3vw;
      height: auto;
      background: #fff;
      display: flex;
      flex-direction: column;
      color: #000000;
      max-height: 70vh;
      img{
        border-radius: 3vw;
      }
    }
    .modalFrontLayoutBT{
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
.cityPage{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.CityBlockLoader{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.CityName{
  text-align: center;
  margin-top: 4.7vh;
  font-size: 4vw;
  font-family: MontBold;
  line-height: 143.4%;
  color: #fff;
}
.CityBorn{
  text-align: center;
  font-size: 1.8vw;
  font-family: MontSemiBold;
  color: #fff;
  margin-top: 0.8vh;
}
.historyBlock{
  height: 16vh;
  width: 88vw;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .historyBlockUP{
    display: flex;
    flex-direction: row;
    height: 11vh;
    img{
      width: 15vw;
    }
    span{
      color: #fff;
      font-size: 2.2vw;
      font-family: MontSemiBold;
      line-height: 150%;
      margin-left: 5vw;
      overflow-y: hidden;
    }
  }
  .historyBlockBT{
    width: 100%;
    height: 4.22vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #104CA6;
    border-radius: 2vw;
    font-family: MontSemiBold;
    font-size: 2.2vw;
    margin-top: 1vh;
  }
}
.nacProjectsDostoprText{
  color: #fff;
  font-size: 2.7vw;
  font-family: MontBold;
}
.nacProjectsBlock{
  width: 88vw;
  height: 28vh;
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nacProjectsLoader{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.5vh;
    align-items: center;
    height: 15vh;
  }
  .nacProjects{
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    margin-top: 1.5vh;
    .Proj{
      width: 34vw;
      height: 18vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 1vh;
      .ProjectImages{
        img{
          width: 34vw;
          height: 12vh;
          border-radius: 3vw;
        }
      }
      .ProjectSpan{
        font-family: MontSemiBold;
        font-size: 2vw;
        color: #fff;
        margin-top: 1vh;
      }
    }
  }
}
.dostoprBlock{
  width: 88vw;
  height: 31vh;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .attracts{
    display: flex;
    width: 100%;
    height: 25vh;
    flex-direction: row;
    overflow-x: auto;
    margin-top: 1.5vh;
    .dostopr{
      display: flex;
      flex-direction: column;
      width: 34vw;
      height: 22vh;
      margin: 0 1vh;
      .dostoprImages{
        width: 34vw;
        height: 18.5vh;
        img{
          border-radius: 3vw;
          width: 100%;
          height: 100%;
        }
      }
      .dostoprSpan{
        font-family: MontSemiBold;
        font-size: 2vw;
        color: #fff;
        margin-top: 1vh;
        width: 100%;
        word-wrap: break-word;
      }
    }
  }
}
.showImg{
  width: 100%;
  height: auto;
}
</style>