<template>
  <div v-if="showModalChangeStruct" class="modal-shadowChangeStruct" @click.self="closeModalChangeStruct">
    <div class="modalBackLayout">
      <div class="modalFrontLayoutUP">
          <div class="demoAndForm">
            <div style="width: 35%; margin-left: -10vw" class="modalFrontLayoutUP">
              <span class="BT_text">{{ actstruct.glavaName }}</span>
              <span class="UP_text">{{ actstruct.structName }}</span>
              <span class="napr_text">Направления деятельности:</span>
              <div class="naprList" v-for="napr in actstruct.napr" :key="napr._id">
                <ul>
                  <li>{{ napr.napr }} <span class="spanClick" @click="deleteNapr(napr.naprID)">X</span> </li>
                </ul>
                <span v-if="napr.funcArray.length != 0">Функции:</span>
                <div class="funcList" v-for="func in napr.funcArray" :key="func.funcID">
                  <ul>
                    <li class="funcNapr">{{ func.func }} <span class="spanClick" @click="deleteFunc(func.funcID, napr)">X</span> </li>
                  </ul>
                </div>
                <div>
                  <span v-if="napr.contacts != '' && napr.contacts != null">Контакты:</span>
                  <span v-if="napr.contacts != '' && napr.contacts != null"> {{ napr.contacts }} </span>
                </div>
              </div>
            </div>

            <form style="width: 35%; margin-left: -10vw">
              <span>ФИО:</span>
              <input type="text" v-model="actstruct.glavaName">
              <span>Должность:</span>
              <input type="text" v-model="actstruct.structName">
              <span>Направления:</span>
              <div class="naprAndFuncBlock">
                <div class="inputNaprRow">
                  <textarea cols="30" rows="2" type="text" v-model="actstruct.naprName"></textarea>
                  <span class="spanClick" @click="addNapr(actstruct.naprName)"> Добавить направление </span>
                </div>
                <div v-for="napr in actstruct.napr" :key="napr.naprID">
                  <span> {{ napr.napr }} </span>
                  <div class="inputNaprRow">
                    <textarea cols="30" rows="2" type="text" v-model="napr.funcName"></textarea>
                    <span class="spanClick" @click="addFunc(napr.funcName, napr )"> Добавить функцию </span>
                  </div>
                  <span>Контакты:</span>
                  <input type="text" v-model="napr.contacts">
                </div>
              </div>
            </form>
          </div>
          <input style="margin-top: 2vw" type="button" value="Применить изменения" @click="changeStruct(actstruct._id)">
      </div>
      <div class="modalFrontLayoutBT" @click="closeModalChangeStruct">
        <span>Закрыть окно</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "modalChangeStruct",
  props: {
    actstruct: {
      type: Object,
      requered: true
    }
  },
  data() {
    return {
      _id: '',
      structName: '',
      glavaName: '',
      showModalChangeStruct: false,
      napr: [],
      struct: []
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get("http://" + this.$store.state.ip + ":3012/struct")
        .then((response) => (this.struct = response));
    },
    closeModalChangeStruct: function () {
      this.showModalChangeStruct = false;
    },
    changeStruct(id) {
      axios.put('http://' + this.$store.state.ip + ':3012/struct/'+ id, { 
          _id: id,
          structName: this.actstruct.structName,
          glavaName: this.actstruct.glavaName,
          napr: this.actstruct.napr
        })
        .then(response => this.struct = response.data)
        .catch(error => {});
      this.showModalChangeStruct = false;
    },
    addNapr(napr) {
      if (napr == '') {
        return;
      } else {
        this.actstruct.napr.push({ naprID: this.naprID, napr, funcArray: [] });
        this.actstruct.naprName = '';
        this.actstruct.naprID++;
      }
    },
    addFunc(func, napr) {
      if (napr.funcName == '') {
        return;
      } else {
        napr.funcArray.push({
          funcID: this.funcID,
          func: func
        });
        napr.funcName = '';
        this.actstruct.funcID++;
      }
    },
    deleteNapr(naprID) {
      for (let id in this.actstruct.napr) {
        if (this.actstruct.napr[id].naprID === naprID) {
          this.actstruct.napr.splice(id, 1);
          break;
        }
      }
    },
    deleteFunc(funcID, napr) {
      for (let id in napr.funcArray) {
        if (napr.funcArray[id].funcID === funcID) {
          napr.funcArray.splice(id, 1);
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss">
button, input, textarea {
  background-color: #fff;
}
.modal-shadowChangeStruct{
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
    width: 82vw;
    height: auto;
    border-radius: 2vw;
    display: flex;
    flex-direction: column;
    .modalFrontLayoutUP{
      height: auto;
      background: rgba($color: #104ca6, $alpha: .4);
      border-radius: 2vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      padding: 2vw;
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
          ul{
            font-size: 2vw;
            font-family: MontSemiBold;
            padding-left: 0vw;
            margin: 0.5vh 0; 
          }
          span{
            padding-left: 0vw;
            font-size: 2vw;
            font-family: MontSemiBold;
          }
          .funcList{
            ul{
              font-size: 2vw;
              font-family: MontSemiBold;
              padding-left: 0vw;
              li{
                margin: 0.2vh 0 !important; 
              }
            }
          }
        }
      }
    .demoAndForm{
      form{
        width: 30vw;
        *{
          margin-top: 0.5vh;
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
</style>