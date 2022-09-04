export default {
    data() {
        return {
            categories: [],
            searchInput: this.$root.headerSearch,
        }
    },
    methods: {
        changePage(pageName) {
            this.$emit('changePage', pageName);
        },
        getCategories() {
            fetch('/api/cats').then(res => res.json()).then(res => this.categories = res.data);
        },
        leave() {
            localStorage.removeItem('user');
            this.$root.changePage('login-page');
        },
        showProductsFrom(categoryId) {
            this.$root.changePage('products-page');

            this.$nextTick(() => {
                setTimeout(() => this.$root
                    .$refs['main-window']
                    .$refs['products-block']
                    .filterConfig.categories = [categoryId], 500);
            });
        }
    },
    computed: {
        filteredCats() {
            return this.categories.filter(category => category.header_visible);
        }
    },
    watch: {
      searchInput(newValue, oldValue) {
          this.$root.changePage('products-page');
      }
    },
    mounted() {
        this.getCategories();
    },
    template: `
        <header class="header">
        <div class="container">
            <a href=# class="logo" @click.prevent="this.$root.changePage('main-page')">
                <img src=http://modernwear/public/images/logo2.png alt=logo>
            </a>
            <input type=text class="input" placeholder='Search...' v-model="searchInput"/>
            <div class="buttons">
                <button class="btn black" v-if="!this.$root.checkToken()" @click="this.$root.changePage('login-page')">
                    Вход
                </button>
                <button class="btn black" v-if="!this.$root.checkToken()"
                        @click="this.$root.changePage('register-page')">Регистрация
                </button>
                <button class="btn black" v-if="this.$root.checkToken()" @click.prevent="leave">Выйти</button>
            </div>
            <div class="buttons">
                <button class="btn black">Корзина</button>
            </div>
            <a href="#" class="link" @click.prevent='this.$root.changePage("products-page")'>Все товары</a>
            <div class="category-links">
                <a href="" class="link" v-for="category in filteredCats" @click.prevent="showProductsFrom(category.id)">{{ category.name }}</a>
            </div>
        </div>
        </header>`,
}
