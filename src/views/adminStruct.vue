<template>
  <div class="changeStruct" v-if="this.$store.state.is_admin == true">
    <modalChangeStruct
      class="forModalStyle"
      ref="modalChangeStruct"
      :actstruct="activeStruct"
    ></modalChangeStruct>
    <router-link to="/admin" class="adminBack">← Назад</router-link>
    <span class="changeStructUPText">Страница структуры администрации</span>

    

    <div class="demoAndForm">
      <div class="modalFrontLayoutUP">
        <span class="BT_text">{{ glavaName }}</span>
        <span class="UP_text">{{ structName }}</span>
        <span class="napr_text" v-if="naprArray.length != 0">Направления деятельности:</span>
        <div class="naprList" v-for="napr in naprArray" :key="napr._id">
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
            <span v-if="napr.contacts != null">Контакты:</span>
            <span v-if="napr.contacts != null"> {{ napr.contacts }} </span>
          </div>
        </div>
      </div>

      <form>
        <span>ФИО:</span>
        <input type="text" v-model="glavaName">
        <span>Должность:</span>
        <input type="text" v-model="structName">
        <span>Направления:</span>
        <div class="naprAndFuncBlock">
          <div class="inputNaprRow">
            <textarea cols="30" rows="2" type="text" v-model="naprName"></textarea>
            <span class="spanClick" @click="addNapr(naprName)"> Добавить направление </span>
          </div>
          <div v-for="napr in naprArray" :key="napr.naprID">
            <span> {{ napr.napr }} </span>
            <div class="inputNaprRow">
              <textarea cols="30" rows="2" type="text" v-model="napr.funcName"></textarea>
              <span class="spanClick" @click="addFunc(napr.funcName, napr )"> Добавить функцию </span>
            </div>
            <span>Контакты:</span>
            <input type="text" v-model="napr.contacts">
          </div>
        </div>
        
        <input type="button" value="Добавить структуру" @click="createStruct" />
      </form>
    </div>

    <div v-if="loading">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <table v-else>
      <tr>
        <th>Должность</th>
        <th>ФИО</th>
        <th>Направления</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      <tr v-for="struct in struct.data" :key="struct._id">
        <td> {{ struct.structName }} </td>
        <td> {{ struct.glavaName }} </td>
        <td v-if="struct.napr === null"> Направлений: 0 </td>
        <td v-else>Направлений: {{ struct.napr.length }}</td>
        <td><button class="btChange" @click="showModalChangeStruct(struct)"><img src="../../public/img/other/change.png"></button></td>
        <td><button class="btDelete" @click="deleteStruct(struct._id)"><span>✖</span></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import modalChangeStruct from "../components/modalChangeStruct.vue";

export default {
  data() {
    return {
      _id: '',
      structName: '',
      glavaName: '',
      naprName: '',
      funcName: '',
      activeStruct: null,
      naprArray: [],
      naprID: 0,
      funcID: 0,
      struct: [],
      loading: true
    }
  },
  components: {
    modalChangeStruct
  },
  mounted() {
    this.getData();
    this.checkAdmin();
  },
  methods: {
    getData() {
      axios
        .get("http://" + this.$store.state.ip + ":3012/struct")
        .then((response) => (this.struct = response))
        .finally(() => (this.loading = false));
    },
    createStruct() {
      axios
        .post("http://" + this.$store.state.ip + ":3012/struct", {
          structName: this.structName,
          glavaName: this.glavaName,
          napr: this.naprArray
        })
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
      this.structName = '';
      this.glavaName = '';
      this.naprArray = [];
    },
    deleteStruct(_id) {
      axios
        .delete("http://" + this.$store.state.ip + ":3012/struct/" + _id)
        .then(response => {
          this.getData()
        })
        .catch((error) => {});
    },
    showModalChangeStruct: function (struct) {
      this.activeStruct = struct;
      this.$refs.modalChangeStruct.showModalChangeStruct = true;
    },
    addNapr(napr) {
      if (napr == '') {
        return;
      } else {
        this.naprArray.push({ naprID: this.naprID, napr, funcArray: [] });
        this.naprName = '';
        this.naprID++;
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
        this.funcID++;
      }
    },
    deleteNapr(naprID) {
      for (let id in this.naprArray) {
        if (this.naprArray[id].naprID === naprID) {
          this.naprArray.splice(id, 1);
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
    },
    checkAdmin() {
      if (this.$store.state.is_admin == false) {
        this.$router.push('/Login');
      }
    }
  }
};

</script>

<style lang="scss">
button, input, textarea {
  background-color: #fff;
}
.changeStruct{
  display: flex;
  flex-direction: column;
  align-items: center;
  .changeStructUPText{
    font-family: MontBold;
    color: #fff;
    font-size: 2vw;
    margin-top: 2vh;
    text-align: center;
  }
  .demoAndForm{
    margin-top: 1vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 90vw;
    .modalFrontLayoutUP{
      width: 30vw;
      height: 100%;
      background: #fff;
      border-radius: 1.5vw;
      display: flex;
      flex-direction: column;
      color: #000000;
      padding: 2.5vw;
      .BT_text{
        font-family: MontBold;
        font-size: 1.5vw;
      }
      .UP_text{
        font-family: MontSemiBold;
        font-size: 1.15vw;
        margin-top: 1vh;
      }
      .napr_text{
        font-family: MontBold;
        font-size: 1.15vw;
        margin-top: 2vh;
      }
      .naprList{
        display: flex;
        flex-direction: column;
        margin-left: 1vw;
        ul{
          font-size: 0.9vw;
          font-family: MontSemiBold;
          padding-left: 1vw;
          margin: 0.5vh 0; 
        }
        span{
          margin-left: 1.4vw;
          font-size: 0.7vw;
          font-family: MontSemiBold;
        }
        .spanClick{
          cursor: pointer;
          margin-left: 3%;
        }
        .funcList{
          ul{
            font-size: 0.7vw;
            font-family: MontSemiBold;
            padding-left: 3vw;
            li{
              margin: 0.2vh 0 !important; 
            }
          }
        }
      }
    }
    form {
      display: flex;
      flex-direction: column;
      width: 40vw;
      *{
        margin-top: 0.5vh;
      }
      span{
        font-family: MontSemiBold;
        color: #fff;
      }
      .spanClick{
        cursor: pointer;
        margin-left: 3%;
      }
      input, textarea{
        outline: none;
        font-family: MontSemiBold;
      }
      input[type = button] {
        margin-top: 1vh;
      }
      .naprAndFuncBlock{
        display: flex;
        flex-direction: column;
      }
      .inputNaprRow{
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }
  table {
    width: 85vw;
    margin-top: 2vh;
    border: 1px solid #000;
    th {
      border: 1px solid #000;
    }
    td {
      text-align: center;
      border: 1px solid #000;
      white-space: pre-line;
      img{
        margin: 5px;
        width: 5vw;
      }
      .btChange{
        width: 3vh;
        height: 3vh;
        background-color: green;
        outline: none;
        img{
          width: 2vh;
          height: 2vh;
          filter: invert(100%);
        }
      }
      .btDelete{
        width: 3vh;
        height: 3vh;
        background-color: red;
        color: #fff;
        border-radius: 2vw;
        outline: none;
      }
    }
  }
}
</style>