export default {
    data() {
        return {
            filterConfig: {
                categories: [],
                sizes: [],
                priceFrom: 0,
                priceTo: 0,
            },
            paginator: {
                startProduct: 0,
                productCount: 8,
                lastProduct: 8,
            },
            currentPage: 0,
            showProductsWithoutCategory: true,
            isAscSortRule: true,
        }
    },
    methods: {
        changePaginationPage(idx) {
            if (idx < 0 || idx > this.linksCount - 1) return;

            this.currentPage = idx;

            this.paginator.startProduct = idx * this.paginator.productCount;
            this.paginator.lastProduct = this.paginator.startProduct + this.paginator.productCount;
        },
        showProduct(product) {
            this.$root.visionProduct = product;
            this.$root.changePage('product-page');
        }
    },
    computed: {
        filteredProducts() {
            return this.products
                .filter(product => {
                    const categoryIds = product.categories.map(category => category.id);
                    const needIds = this.filterConfig.categories;

                    return categoryIds.some(id => needIds.includes(id));
                })
                .concat(this.products.filter(product => {
                    if (!this.showProductsWithoutCategory) return false;

                    return !product.categories.length;
                }))
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
        searchedProducts() {
            return this.filteredProducts.filter(product => product.name.toLowerCase().includes(this.$root.headerSearch.toLowerCase()));
        },
        paginatedProducts() {
            return this.searchedProducts.slice(this.paginator.startProduct, this.paginator.lastProduct);
        },
        linksCount() {
            return Math.ceil(this.searchedProducts.length / 8);
        },
        products() {
            const products = this.$root.apiData.products;

            if (products.length) {
                const maxPrice = products.reduce((saved, current) => {
                    if (current.price > saved) {
                        return current.price;
                    }

                    return saved;
                }, 0);

                this.filterConfig.priceTo = maxPrice;
            }
            return products;
        },
        categories() {
            const categories = this.$root.apiData.categories;
            if (!categories) return;

            this.filterConfig.categories = categories.map(category => category.id);
            return categories;
        },
        sizes() {
            const sizes = this.$root.apiData.sizes;

            if (!sizes) return;

            this.filterConfig.sizes = sizes.map(size => size.id);
            return sizes;
        }
    },
    mounted() {
        console.log('working');
        this.filterConfig.categories = this.categories.map(category => category.id);

        this.filterConfig.sizes = this.sizes.map(size => size.id);

        if (this.products.length) {
            const maxPrice = this.products.reduce((saved, current) => {
                if (current.price > saved) {
                    return current.price;
                }

                return saved;
            }, 0);

            this.filterConfig.priceTo = maxPrice;
        }

    },
    watch: {
        products(newValue, oldValue) {
        },
        categories(newValue) {
        },
        sizes(newValue) {
        }
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
                                <label>
                                    <input type="checkbox" checked
                                           v-model="showProductsWithoutCategory">
                                    <span>Показывать продукты без категории</span>
                                </label>
                                <label v-for="cat in categories">
                                    <input type="checkbox" checked name="categories[{{cat.id}}]"
                                           v-model="filterConfig.categories" :value="cat.id">
                                    <span>{{ cat.name }}</span>
                                </label>
                            </div>

                            <div class="price-filter">
                                <h4>Цена</h4>
                                <div>
                                    <input type="number" placeholder="От" class="input"
                                           v-model="filterConfig.priceFrom">
                                </div>
                                <div>
                                    <input type="number" placeholder="До" class="input" v-model="filterConfig.priceTo">
                                </div>
                            </div>
                            <div class="filter-sizes vertical">
                                <h4>Размеры</h4>

                                <label v-for="size in sizes">
                                    <input type="checkbox" checked name="categories[{{cat.id}}]"
                                           v-model="filterConfig.sizes" :value="size.id">
                                    <span>{{ size.size_unit }}</span>
                                </label>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="products-wrap">
                    <div class='products'>
                        <div v-for='product in paginatedProducts' class='card box'>
                            <div class='image'><img :src="product.image" alt='image'></div>
                            <div class="padding-wrap">
                                <h3>{{ product.name }}</h3>
                                <div class="product-categories" v-if="product.categories.length">
                                    <div class="product-cat" v-for="category in product.categories">
                                        {{ category.name }}
                                    </div>
                                </div>
                                <div class="empty-cats" v-else>без категории</div>
                                <div class="product-description text">
                                    {{ product.description }}
                                </div>
                                <div class="product-price">
                                    {{ product.price }}
                                </div>

                                <button class="btn" @click="showProduct(product)">Посмотреть</button>
                            </div>
                        </div>
                    </div>
                    <nav class="nav links paginator">
                        <div v-if="linksCount" class="link" @click="changePaginationPage(currentPage - 1)">&lt;</div>

                        <div class="link" v-for="(link, idx) in linksCount" @click="changePaginationPage(idx)">
                            {{ idx + 1 }}
                        </div>

                        <div v-if="linksCount" class="link" @click="changePaginationPage(currentPage + 1)">&gt;</div>
                    </nav>
                </div>
            </div>
        </div>
        </main>`,


}
