<template>
  <div class="CitiesPage">
    <div class="CitiesPageUpText">
      <span>Городские и сельские поселения <br> Сургутского района</span>
    </div>

    <div v-if="loading" class="CitiesBlockLoader">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>

    <div v-else class="CitiesBlock">
      <router-link
        class="city"
        v-for="(city, index) in cities.data" :key="city._id"
        :to="{ name: 'CityPage', params: { cityID: index }}"
      >
        <img v-if="city.emblem.length != 0" :src="city.emblem[0].imgEmblem">
        <img v-else src="../../public/img/cities/default.svg" alt="default.svg">
        <span>{{ city.city }}</span>
      </router-link>
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

export default{
  data() {
    return {
      cities: [],
      loading: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get("http://" + this.$store.state.ip + ":3012/cities")
        .then((response) => (this.cities = response))
        .finally(() => (this.loading = false));
    }
  }
}
</script>

<style lang="scss">
.CitiesPageUpText{
  text-align: center;
  margin-top: 4.7vh;
  font-size: 3.7vw;
  font-family: MontBold;
  line-height: 143.4%;
  color: #fff;
  margin-bottom: 2vh;
}
.CitiesBlockLoader{
  width: 100%;
  height: 80.3vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.CitiesBlock{
  width: 100%;
  height: 80.3vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .city{
    width: 30vw;
    display: flex;
    flex-direction: column;
    font-size: 3vw;
    text-align: center;
    font-family: MontBold;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    img{
      width: 14.2vw;
    }
    span{
      margin-top: 1vh;
    }
  }
}
</style>