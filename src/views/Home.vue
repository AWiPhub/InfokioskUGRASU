<template>
  <div class="home">
    <div class="allKps">
      <div class="upKps">
        <router-link to="/Structure">
          <div class="goKp">
            <div class="leftSide">
              <span>Структура администрации Сургутского района</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/structure.svg" alt="structure" />
            </div>
          </div>
        </router-link>

        <router-link to="/realise-projects">
          <div class="goKp">
            <div class="leftSide">
              <span>Инвестиционные проекты (Инвестпортал)</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/invest.svg" alt="invest" />
            </div>
          </div>
        </router-link>

        <router-link to="/News">
          <div class="goKp">
            <div class="leftSide">
              <span>Новости Сургутского района</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/newsSur.svg" alt="newsSur" />
            </div>
          </div>
        </router-link>

        <router-link to="/NewsKadr">
          <div class="goKp">
            <div class="leftSide">
              <span>Новости управления кадров</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/newsUpr.svg" alt="newsUpr" />
            </div>
          </div>
        </router-link>

        <router-link to="/Cities">
          <div class="goKp">
            <div class="leftSide">
              <span>Городские и сельские поселения Сургутского района</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/cities.svg" alt="cities" />
            </div>
          </div>
        </router-link>

        <router-link to="/Map">
          <div class="goKp">
            <div class="leftSide">
              <span>Реализация нацпроектов</span>
            </div>
            <div class="rightSide">
              <img src="../../public/img/icons/nacPrj.svg" alt="nacPrj" />
            </div>
          </div>
        </router-link>
      </div>
      <router-link to="/Hello" class="dnKp">
        <span>Приветствие</span>
      </router-link>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
.home {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.allKps {
  width: 84%;
  height: 84.4%;
  // opacity: .5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .upKps {
    height: 81.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a {
      text-decoration: none;
      font-family: MontBold;
      text-align: center;
      .goKp {
        width: 100%;
        height: 7.5vh;
        display: flex;
        .leftSide {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #66af43;
          width: 76%;
          height: 100%;
          color: #fff;
          font-size: 3vw;
        }
        .rightSide {
          background: #659b4b;
          width: 24%;
          height: 100%;
          display: flex;
          justify-content: center;
          img{
            width: 13vw;
          }
        }
      }
    }
  }
  .dnKp {
    display: flex;
    width: 100%;
    height: 7.6%;
    color: #fff;
    background: #104ca6;
    border-radius: 3vw;
    font-size: 3vw;
    font-family: MontBold;
    text-decoration: none;
    justify-content: center;
    align-items: center;
  }
}
</style>