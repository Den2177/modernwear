export default {
    data() {
        return {

        }
    },
    methods: {
        changePage(pageName) {
            this.$emit('changePage', pageName);
        }
    },
    template: `<header class="header">
                    <div class="container">
                        <a href=# class="logo">
                            <img src=http://modernwear/public/images/logo2.png alt=logo>
                        </a>
                        <input type=text class="input" placeholder='Search...' />
                        <div class="buttons">
                            <button class="btn black">Вход</button>
                            <button class="btn black">Регистрация</button>
                            <button class="btn black" @click.prevent="this.$root.isAuth = true">Выйти</button>
                        </div>
                        <div class="buttons">
                            <button class="btn black">Корзина</button>
                        </div>
                        <a href="#" class="link" @click.prevent='changePage("products-block")'>Все товары</a>
                        <div class="category-links">
                            <a href="" class="link">category 1</a>
                            <a href="" class="link">category 2</a>
                        </div>
                    </div>
                </header>`,
}
