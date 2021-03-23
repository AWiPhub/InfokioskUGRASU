<template>
  <div class="adminPanel">
    <div class="goAdmin" @click="go(0)">
      <span>Города</span>
    </div>
    <div class="goAdmin" @click="go(1)">
      <span>Национальные проекты</span>
    </div>
    <div class="goAdmin" @click="go(2)">
      <span>Структура администрации</span>
    </div>
    <div class="goAdmin" @click="go(3)">
      <span>Новости управления кадров</span>
    </div>
    <div class="goAdmin" @click="go(4)">
      <span>Приветствие</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkAdmin()
  },
  methods: {
    go(index) {
      switch (index) {
        case 0:
          if (this.$store.state.is_admin == true) {
            this.$router.push('/adminCities');
          }
          break;
        case 1:
          if (this.$store.state.is_admin == true) {
            this.$router.push('/adminNacProjects');
          }
          break;
        case 2:
          if (this.$store.state.is_admin == true) {
            this.$router.push('/adminStruct');
          }
          break;
        case 3:
          if (this.$store.state.is_admin == true) {
            this.$router.push('/adminNewsKadr');
          }
          break;
        case 4:
          if (this.$store.state.is_admin == true) {
            this.$router.push('/adminHello');
          }
          break;
      }
    },
    checkAdmin() {
      if (this.$store.state.is_admin == false) {
        this.$router.push('/Login');
      }
    }
  }
}
</script>

<style lang="scss">
  .adminPanel{
    height: 100vh;
    font-family: MontSemiBold;
    font-size: 3vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    div{
      text-decoration: none;
      color: #fff;
      width: 75vw;
      height: 12vh;
      background: #66af43;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer
    }
  }
</style>