<template>
  <div v-if="show" class="modal-shadow-structureModal" @click.self="closeModal">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
        <span class="BT_text">{{ struct.data[strID].glavaName }}</span>
        <span class="UP_text">{{ struct.data[strID].structName }}</span>
        <span class="napr_text">Направления деятельности:</span>
        <v-expansion-panels
          :flat="flat"
          :multiple="multiple">
          <v-expansion-panel
            v-for="napr in struct.data[strID].napr" :key="napr.naprID"
            class="naprList"
          >
            <v-expansion-panel-header>
              <span>{{ napr.napr }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span v-if="napr.funcArray.length != 0">Функции:</span>
              <div class="funcList" v-for="func in napr.funcArray" :key="func.funcID">
                <ul>
                  <li class="funcNapr">{{ func.func }}</li>
                </ul>
              </div>
              <span v-if="napr.contacts != null && napr.contacts != ''">Контакты: {{ napr.contacts }} </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="modalFrontLayoutBT" @click="closeModal">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "structureModal",
  props: ['strID'],
  data: function () {
    return {
      show: false,
      showFuncs: false,
      struct: [],
      flat: true,
      multiple: true
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get('http://' + this.$store.state.ip + ':3012/struct')
        .then((response) => (this.struct = response));
    },
    closeModal: function () {
      this.show = false;
    }
  }
};
</script>

<style lang="scss">
.modal-shadow-structureModal{
  margin-top: -4.7vh;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(11, 8, 8, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modalBackLayout{
    background: #E0E0E0;
    box-shadow: 0px 4px 156px rgba(0, 0, 0, 0.25);
    width: 82vw;
    height: auto;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      height: auto;
      background: #fff;
      border-radius: 3vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      padding: 5vw;
      .BT_text{
        font-family: MontBold;
        font-size: 3.5vw;
      }
      .UP_text{
        font-family: MontSemiBold;
        font-size: 2.63vw;
        margin-top: 1vh;
      }
      .napr_text{
        font-family: MontBold;
        font-size: 2.63vw;
        margin-top: 2vh;
      }
      .naprList{
        display: flex;
        flex-direction: column;
        button{
          span{
            font-size: 2vw;
            font-family: MontSemiBold;
            padding-left: 1vw;
            line-height: 143.4%;
            text-align: left;
            order: 3;
          }
        }
        span{
          padding-left: 4vw;
          font-size: 2vw;
          font-family: MontSemiBold;
        }
        .funcList{
          ul{
            font-size: 2vw;
            font-family: MontSemiBold;
            padding-left: 7vw;
            li{
              margin: 0.5vh 0;
              line-height: 143.4%;
              &::marker{
                display: inline-block;
                content: '';
              }
              &::before{
                border-style: solid;
                content: '';
                display: inline-block;
                position: relative;
                vertical-align: middle;
                width: 1vw;
                margin-right: 1vw;
              }
            }
          }
        }
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

.mdi-chevron-down::before {
  content: "";
  background-color: #104CA6;
  width: 2vw;
  height: 0.4vh;
}
.v-icon.v-icon {
  transition: 0.3s cubic-bezier(0.47, 0, 0.745, 0.715), visibility 0s;
}
.theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: rgba(16, 76, 166, 1) !important;
}
.v-expansion-panel--active > .v-expansion-panel-header--active .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate) .v-icon::before {
  background-color: #fff;
}
.v-expansion-panel--active > .v-expansion-panel-header--active .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate) .v-icon {
  transform: rotate(0deg) !important;
  display: inline-block;
  &::before{
    border-style: solid;
    border-width: 0.8vw 0.8vw 0 0;
    content: '';
    display: inline-block;
    height: 2vw;
    position: relative;
    transform: rotate(135deg);
    vertical-align: top;
    width: 2vw;
    margin-top: -0.5vw;
  }
}
</style>