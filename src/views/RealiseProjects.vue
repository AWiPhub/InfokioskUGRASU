<template>
  <div class="RealiseProjectsPage">
    <div class="RealiseProjectsPageUpText">
      <span>Инвестиционные проекты <br> (Инвестпортал)</span>
    </div>

    <div class="RealiseProjectsPageBlock">
      <div class="FirstBlockRealiseProjects">
        <div class="leftFirstBlockRealise">
          <div class="BlueBlockForText">
            <span>Путеводитель инвестора</span>
          </div>
          <ul>
            <li>Инвестиционные площадки</li>
            <li>Инвестиционные проекты</li>
            <li>Инвестиционный атлас</li>
            <li>Индустриальные парки</li>
          </ul>
        </div>
        <div class="rightFirstBlockRealise">
          <img src="../../public/img/qrs/qr1.svg" alt="qr1">
        </div>
      </div>
      <div class="SecondBlockRealiseProjects">
        <div class="leftFirstBlockRealise">
          <div class="BlueBlockForText">
            <span>Инвестиционные предложения</span>
          </div>
          <ul>
            <li>Калькулятор процедур</li>
            <li>Предоставление земельных участков</li>
            <li>Получение градостроительного плана, разрешения на строительство, ввод объекта в эксплуатацию</li>
            <li>Получение технических условий и подключение к инженерной инфраструктуре</li>
            <li>Получение разрешения на движение по автомобильным дорогам</li>
          </ul>
        </div>
        <div class="rightFirstBlockRealise">
          <img src="../../public/img/qrs/qr1.svg" alt="qr1">
        </div>
      </div>
      <div class="ThirdBlockRealiseProjects">
        <div class="leftFirstBlockRealise">
          <div class="BlueBlockForText">
            <span>Поддержка предпринимательства</span>
          </div>
          <ul>
            <li>Финансовая поддержка</li>
            <li>Имущественная поддержка</li>
            <li>Иные виды поддержки</li>
          </ul>
        </div>
        <div class="rightFirstBlockRealise">
          <img src="../../public/img/qrs/qr1.svg" alt="qr1">
        </div>
      </div>
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
export default {
  
}
</script>

<style lang="scss">
.RealiseProjectsPage{
  width: 100%;
  height: 93vh;
}
.RealiseProjectsPageUpText{
  text-align: center;
  margin-top: 4.7vh;
  font-size: 3.7vw;
  font-family: MontBold;
  line-height: 143.4%;
  color: #fff;
  margin-bottom: 2vh;
}
.BlueBlockForText{
  width: 100%;
  height: 5vh;
  background-color: #104CA6;
  display: flex;
  align-items: center;
  font-family: MontBold;
  color: #fff;
  font-size: 3vw;
  padding-left: 8.4vw;
}
.RealiseProjectsPageBlock{
  width: 100%;
  height: 80.3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .FirstBlockRealiseProjects{
    width: 100%;
    height: 17.8vh;
    display: flex;
    flex-direction: row;
  }
  .SecondBlockRealiseProjects{
    width: 100%;
    height: 35vh;
    display: flex;
    flex-direction: row;
  }
  .ThirdBlockRealiseProjects{
    width: 100%;
    height: 16vh;
    display: flex;
    flex-direction: row;
  }
}
.leftFirstBlockRealise{
  width: 73vw;
  ul{
    width: 81%;
    margin-left: 9vw;
    li{
      color: #fff;
      font-size: 2.8vw;
      font-family: MontReg;
      list-style-image: url(../../public/img/other/line.svg);
      padding-inline-start: 2vw;
      line-height: 183.9%;
    }
  }
}
.rightFirstBlockRealise{
  img{
    margin-top: 5.5vh;
    border-radius: 7%;
    width: 18.704vw;
    margin-left: 2vw;
  }
}
</style>