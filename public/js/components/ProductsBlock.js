export default {
    data() {
        return {
            products: [],
            categories: [],
            sizes: [],
            filterConfig: {
                categories: [],
                sizes: [],
                priceFrom: 0,
                priceTo: 0,
            },
            isAscSortRule: true,
        }
    },
    methods: {
        getProducts() {
            fetch('/api/products').then(res => res.json()).then(res => {
                this.products = res.data;
                this.filteredProducts = this.products;
                const maxPrice = res.data.reduce((saved, current) => {
                    if (current.price > saved) {
                        return current.price;
                    }
                    return saved;
                }, 0);

                this.filterConfig.priceTo = maxPrice;
            });
        },
        getCategories() {
            fetch('/api/cats').then(res => res.json()).then(res => {
                const data = res.data;
                this.categories = data;
                this.filterConfig.categories = data.map(category => category.id);
            });
        },
        getSizes() {
            fetch('/api/sizes').then(res => res.json()).then(res => {
                const data = res;
                this.sizes = data;
                this.filterConfig.sizes = data.map(size => size.id)
            });
        },
    },
    computed: {
        filteredProducts() {
            return this.products
                .filter(product => {
                    const categoryIds = product.categories.map(category => category.id);
                    const needIds = this.filterConfig.categories;

                    return categoryIds.some(id => needIds.includes(id));
                })
                .filter(product => {
                    return product.price >= this.filterConfig.priceFrom && product.price <= this.filterConfig.priceTo;
                })
                .filter(product => {
                    const sizeIds = product.sizes.map(size => size.id);
                    const needIds = this.filterConfig.sizes;

                    return sizeIds.some(id => needIds.includes(id));
                })
                .sort((a, b) => {
                    if (this.isAscSortRule) {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });

        },

    },
    template: `
        <main class="main">
        <div class='container'>
            <div class='products-block-body'>
                <div class="left-panel">
                    <div class="sort-block box">
                        <h3>Отсортировать по цене</h3>
                        <div class="vertical">
                            <label>
                                <input type="radio" name="sort" :value="true" v-model="isAscSortRule">
                                <span>По возрастанию</span>
                            </label>
                            <label>
                                <input type="radio" name="sort" :value="false" v-model="isAscSortRule">
                                <span>По убыванию</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter box">
                        <h3 class="mb10">Фильтры</h3>
                        <form action="#" class="filter-form">
                            <div class="vertical">
                                <h4>Категории</h4>

                                <label v-for="cat in categories">
                                    <input type="checkbox" checked name="categories[{{cat.id}}]"
                                           v-model="filterConfig.categories" :value="cat.id">
                                    <span>{{ cat.name }}</span>
                                </label>
                            </div>

                            <div class="price-filter">
                                <h4>Цена</h4>
                                <div>
                                    <input type="number" placeholder="От" class="input" v-model="filterConfig.priceFrom">
                                </div>
                                <div>
                                    <input type="number" placeholder="До" class="input" v-model="filterConfig.priceTo">
                                </div>
                            </div>
                            <div class="filter-sizes vertical">
                                <h4>Размеры</h4>

                                <label v-for="size in sizes" >
                                    <input type="checkbox" checked name="categories[{{cat.id}}]" v-model="filterConfig.sizes" :value="size.id">
                                    <span>{{ size.size_unit }}</span>
                                </label>
                            </div>
                        </form>
                    </div>

                </div>

                <div class='products'>
                    <div v-for='product in filteredProducts' class='card box'>
                        <div class='image'><img :src="product.image" alt='image'></div>
                        <div class="padding-wrap">
                            <h3>{{ product.name }}</h3>
                            <div class="product-categories">
                                <div class="product-cat" v-for="category in product.categories">
                                    {{ category.name }}
                                </div>
                            </div>
                            <div class="product-description text">
                                {{ product.description }}
                            </div>
                            <div class="product-price">
                                {{ product.price }}
                            </div>
                            <div class="product-sizes">
                                <div v-for="size in product.sizes" class="product-size">
                                    {{ size.size_unit }}
                                </div>
                            </div>
                            <button class="btn">Добавить в корзину</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </main>`,
    mounted() {
        this.getProducts();
        this.getCategories();
        this.getSizes();
    },
    watch: {
        products() {
            console.log(this.products);
        }
    }

}
