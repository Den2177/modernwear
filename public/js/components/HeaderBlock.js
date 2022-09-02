export default {
    data() {
        return {

        }
    },
    methods: {
        changePage(pageName) {
            this.$emit('changePage', pageName);
        },
        leave() {
            localStorage.removeItem('api_token');
            this.$root.changePage('login-page');
        }
    },
    template: `<header class="header">
                    <div class="container">
                        <a href=# class="logo" @click.prevent="this.$root.changePage('main-page')">
                            <img src=http://modernwear/public/images/logo2.png alt=logo>
                        </a>
                        <input type=text class="input" placeholder='Search...' />
                        <div class="buttons">
                            <button class="btn black" v-if="!this.$root.checkToken()" @click="this.$root.changePage('login-page')">Вход</button>
                            <button class="btn black" v-if="!this.$root.checkToken()" @click="this.$root.changePage('register-page')">Регистрация</button>
                            <button class="btn black" v-if="this.$root.checkToken()" @click.prevent="leave">Выйти</button>
                        </div>
                        <div class="buttons">
                            <button class="btn black">Корзина</button>
                        </div>
                        <a href="#" class="link" @click.prevent='this.$root.changePage("products-page")'>Все товары</a>
                        <div class="category-links">
                            <a href="" class="link">category 1</a>
                            <a href="" class="link">category 2</a>
                        </div>
                    </div>
                </header>`,
}
