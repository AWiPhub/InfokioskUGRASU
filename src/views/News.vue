<template>
  <div class="newsPage">
    <div v-if="showNews" class="modal-shadow" @click.self="closeModal">
      <div class="modalBackLayout">
        <div class="modalFrontLayoutUP">
          <span class="TitleNews"> {{ selectNews.title }} </span>
          <div class="selectImgsNews">
            <img class="selectNewsPhoto" :src="selectNews.photo">
          </div>
          <span class="DescriptionNews" v-for="(descript, index) in selectNews.description" :key="descript.id">
            <span v-for="des in descript" :key="des.id">
              <strong v-if="index == 0">{{ des }}</strong>
              <span v-else>{{ des }}</span>
            </span>
          </span>
        </div>
        <div class="modalFrontLayoutBT" @click="closeModal">
          <span>Закрыть окно</span>
        </div>
      </div>
    </div>

    <div class="newsPageUpText">
      <span>Новости Сургутского района</span>
    </div>
    <div class="newsPageBlock">
      <div class="newsPartBlolck"
        v-for="(news, index) in paginatedNews" :key="index"
        @click="showNew(news)">
        <div class="photo">
          <img
              v-if="news.photo != null && news.photo != 'https://www.vestniksr.ru'"
              :src="news.photo">
          <img v-else src="../../public/img/other/nophoto.svg">
        </div>
        <div class="text">
          <span>{{ news.title }}</span>
        </div>
        <div class="date">
          {{ news.date_upload }}
        </div>
      </div>
    </div>

    <div class="listingPages">
      <button class="nextPrevPageKp" @click="prevPage()">
        <img src="../../public/img/other/nextPrevPageKp.svg" alt="">
      </button>
      <div class="pages">
        <button
          v-for="pag in getMaxPages"
          :key="pag.page"
          @click="pageClick(pag)"
          :class="{'pageSelected': pag === pageNumber}">
          {{ pag }}
        </button>
      </div>
      <button class="nextPrevPageKp" @click="nextPage()">
        <img style="transform: matrix(-1, 0, 0, 1, 0, 0)" src="../../public/img/other/nextPrevPageKp.svg" alt="">
      </button>
    </div>

    <router-link to="/" class="goBack">
      <div class="pointBack">
        <img src="../../public/img/icons/pointerBack.svg" alt="pointerBack">
      </div>
      <span>Вернуться назад</span>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      newsData: [],
      pageNumber: 1,
      newsPerPage: 6,
      showNews: false,
      selectNews: null
    }
  },
  mounted() {
    this.updateNews();
  },
  methods:{
    nextPage(){
      if (this.pageNumber < this.getMaxPages) {
        this.pageNumber++;
      }
    },
    prevPage(){
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    },
    pageClick(page) {
      this.pageNumber = page;
    },
    showNew(news) {
      this.selectNews = news;
      this.showNews = true;
    },
    closeModal: function () {
      this.showNews = false;
    },
    async updateNews() {
      let res = await axios.get('/surgut_news.json?time=' + Date.now());
      this.newsData = res.data.sort(function(a, b) {
        return ('' + a.date_upload).localeCompare(b.date_upload);
      }).reverse();
    }
  },
  
  
  computed: {
    getMaxPages: function () {
      return Math.ceil(this.newsData.length / 6)
    },
    paginatedNews() {
      let from = (this.pageNumber - 1) * this.newsPerPage;
      let to = from + this.newsPerPage;
      return this.newsData.slice(from, to);
    }
  }
}
</script>

<style lang="scss">
body{
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.newsPage{
  width: 100%;
  height: 93vh;
}
.newsPageUpText{
  text-align: center;
  margin-top: 4.7vh;
  font-size: 3.7vw;
  font-family: MontBold;
  line-height: 143.4%;
  color: #fff;
  margin-bottom: 2vh;
}
.newsPageBlock{
  width: 100%;
  height: 74.95vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.listingPages{
  width: 100%;
  height: 8.4vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  .nextPrevPageKp{
    width: 11.2vw;
    height: 3vh;
    background-color: #fff;
    background: #387EE8;
    box-shadow: 5px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2vw;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    img{
      width: 2.5vw;
    }
  }
  .pages{
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button{
      width: 5.38vw;
      height: 5.38vw;
      background: #185077;
      border-radius: 2vw;
      border: none;
      outline: none;
      color: #fff;
      font-family: MontBold;
      font-size: 2.5vw;
      margin: 0 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pageSelected{
      background: #2871a5;
    }
  }
}

.newsPartBlolck{
  width: 40vw;
  height: 20vh;
  margin: 1vh 0;
  .photo{
    width: 100%;
    height: 60%;
    padding: 1vh 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 3vw;
    img{
      width: 100%;
    }
  }
  .text{
    color: #fff;
    font-size: 2.2vw;
    width: 100%;
    height: 35%;
    line-height: 143.4%;
    overflow: hidden;
    font-family: MontBold;
    margin-top: 1vh;
  }
  .date{
    color: #A7C7E3;
    font-size: 2vw;
    width: 100%;
    height: 30px;
    font-family: MontReg;
    margin-top: 0.5vh;
  }
}

.modal-shadow{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .modalBackLayout{
    background: #fff;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    max-height: 70vh;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      padding: 4vw;
      width: 98%;
      height: auto;
      background: #fff;
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      overflow-y: scroll;
      margin-top: 3vw;
      .TitleNews{
        font-family: MontBold;
        font-size: 3vw;
        margin-top: -1.5vh;
      }
      .DescriptionStrongNews{
        margin-top: 1.5vh;
        font-family: MontSemiBold;
        font-size: 2.3vw;
        white-space: pre-line;
      }
      .DescriptionNews{
        margin-top: 1.5vh;
        font-family: MontReg;
        font-size: 2.3vw;
        white-space: pre-line;
      }
      .ImgsNews{
        width: 100%;
        height: 10vh;
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: auto;
        margin-top: 1.5vh;
      }
      .selectImgsNews{
        width: 100%;
        margin-top: 1vh;
        .selectNewsPhoto{
          width: 100%;
          height: auto;
        }
      }
    }
    .modalFrontLayoutBT{
      width: 100%;
      min-height: 6.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vw;
      background: #E0E0E0;
      color: #818181;
      font-family: MontBold;
      border-radius: 0 0 3vw 3vw;
    }
  }
}
</style>
