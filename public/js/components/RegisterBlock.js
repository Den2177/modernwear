export default {
    data() {
        return {
            userFields: {
                login: "",
                password: "",
                passwordConfirmation: "",
            }
        }
    },
    methods: {
      sendForm() {
          fetch('/api/register',{
              method: 'POST',
              body: JSON.stringify(this.userFields),
              headers: {
                  'Content-Type': 'application/json',
              },
          })
              .then(res => res.json())
              .then(res => {
                  if (res.errors) {
                      this.$root.displayNotification(res.errors);
                  } else if (res.message) {
                      this.$emit('change-page', true);
                  }
              })
              .catch(err => {
                  console.log(err);
              })
      }
    },
    template: `
    <div class="box auth-block">
    <form class="fdc" @submit.prevent="sendForm">
        <input type="text" class="input" placeholder="Логин" v-model="userFields.login">
        <input type="password" class="input" placeholder="Пароль" v-model="userFields.password">
        <input type="password" class="input" placeholder="Повторите пароль" v-model="userFields.passwordConfirmation">
        <button class="btn black">Отправить</button>
        <div class="bottom-link">
            <a href="#" class="link" @click.prevent="this.$emit('changePage', true)">Войти</a>
        </div>
    </form>
    </div>
    `,
}
