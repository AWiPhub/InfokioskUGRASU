<template>
  <div class="newsPage">
    <ModalKadrNews
      class="forModalKadrNews"
      ref="modalChangeKadrNews"
      :KadrNewsID="activeKadrNews"
    ></ModalKadrNews>

    <div class="newsPageUpText">
      <span>Новости управления кадров</span>
    </div>
    <div v-if="loading" class="newsPageBlockLoader">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else class="newsPageBlock">
      <div class="news" v-for="news in paginatedNews" :key="news._id" @click="showModalKadrNews(news)">
        <div class="photo">
          <img v-if="news.imgs != null && news.imgs.length != 0" :src="news.imgs[0].img" :alt="news.Title">
          <img v-else src="https://www.vestniksr.ru/templates/basic_news/img/nophoto.svg">
        </div>
        <div class="text">
          <span maxlength="12">{{ news.Title }}</span>
        </div>
        <div class="date">
          {{ news.date }}
        </div>
      </div>
    </div>

    <div class="listingPages">
      <button class="nextPrevPageKp" @click="prevPage()">
        <img src="../../public/img/other/nextPrevPageKp.svg" alt="">
      </button>
      <div class="pages">
        <button
          v-for="pag in pages"
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
import ModalKadrNews from '../components/ModalKadrNews.vue';

export default {
  data(){
    return {
      newsKadr: [],
      pageNumber: 1,
      activeKadrNews: null,
      newsPerPage: 6,
      pageRange: 2,
      loading: true
    }
  },
  components: {
    ModalKadrNews
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      axios
      .get('http://' + this.$store.state.ip + ':3012/newsKadr')
      .then((response) => (this.newsKadr = response.data.reverse()))
      .finally(() => (this.loading = false));
    },
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
    showModalKadrNews(id) {
      this.activeKadrNews = id;
      this.$refs.modalChangeKadrNews.showModalKadrNews = true;
    },
    pageClick(page) {
      this.pageNumber = page;
    }
  },
  computed: {
    getMaxPages: function () {
      return Math.ceil(this.newsKadr.length / this.newsPerPage);
    },
    paginatedNews() {
      let from = (this.pageNumber - 1) * this.newsPerPage;
      let to = from + this.newsPerPage;
      return this.newsKadr.slice(from, to);
    },
    rangeStart() {
      let start = this.pageNumber - this.pageRange;
      return (start > 0) ? start : 1;
    },
    rangeEnd() {
      let end = this.pageNumber + this.pageRange;
      return (end < this.getMaxPages) ? end : this.getMaxPages;
    },
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
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
.newsPageBlockLoader{
  width: 100%;
  height: 74.9vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newsPageBlock{
  width: 100%;
  height: 74.9vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .news{
    width: 40vw;
    height: 20vh;
    margin: 1vh 0;
    .photo{
      width: 100%;
      height: 60%;
      padding: 1vh 0;
      display: flex;
      align-items: center;
      overflow-y: hidden;
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

</style>
