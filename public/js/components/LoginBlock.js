export default {
    data() {
        return {
            userFields: {
                login: "",
                password: "",
            }
        }
    },
    methods: {
        sendForm() {
            fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(this.userFields),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.errors) {
                        this.$root.displayNotification(res.errors)

                        return null
                    }

                    if (res.message) {
                        if (res.message.isAdmin) {
                            window.location.href = '/admin'
                        } else {
                            this.$root.changePage('main-page');
                        }

                        localStorage.setItem("api_token", res.message.token)

                        return true
                    }

                    return false
                })
                .catch(res => console.log(res))
        }
    },
    template: `
        <div class="box auth-block">
        <form action="#" class="fdc" @submit.prevent="sendForm">
            <input type="text" class="input" placeholder="Логин" v-model="userFields.login">
            <input type="text" class="input" placeholder="Пароль" v-model="userFields.password">
            <button class="btn black">Отправить</button>
            <div class="bottom-link">
                <a href="#" class="link" @click.prevent="this.$root.changePage('register-page')">Зарегистрироваться</a>
            </div>
        </form>
        </div>
    `,
}
