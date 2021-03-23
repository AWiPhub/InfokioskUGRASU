<template>
  <div class="loginPage">
    <form class="loginForm">
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Логин"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Пароль"
        hint=""
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        class="mr-4 Login"
        @click="submit"
      >
        Войти
      </v-btn>
      <v-btn @click="clear()" class="Clear">
        Очистить
      </v-btn>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, password } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      password: { required, password },
    },

    data: () => ({
      name: '',
      password: '',
      show1: false,
      rules: {
        required: value => !!value || 'Обязательное поле.',
        min: v => v.length >= 8 || 'Минимум 8 символов',
      },
      needLogin: 'Adminkiosk',
      needPass: 'infokiosk'
    }),

    computed: {
      nameErrors () {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength && errors.push('Максимум 10 символов');
        !this.$v.name.required && errors.push('Обязательное поле.');
        return errors;
      },
    },

    methods: {
      submit () {
        if (this.name === this.needLogin && this.password === this.needPass) {
          this.$store.commit('isAdmin')
          this.$router.push('/admin');
        } else {
          
        }
      },
      clear () {
        this.name = '';
        this.password = '';
      },
    },
  }
</script>

<style lang="scss">
.loginPage{
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000, $alpha: .5);
}
.loginForm{
  width: 40vw;
  height: auto;
  background-color: #fff;
  padding: 3vw;
  font-size: 2vw;
  border-radius: 1vw;
  font-family: MontSemiBold;
  .Login{
    background-color: orange !important;
  }
  .Clear{
    background-color: gray !important;
  }
}
.v-btn:not(.v-btn--round).v-size--default {
  margin-top: 1vh;
  margin-right: 1vh;
}

</style>