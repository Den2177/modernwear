export default {
    data() {
        return {
            products: [],
        }
    },
    template: `
        <main>
        <div class='container'>
            <div class='body'>
                <div class='products'>
                    <div v-for='product in products' class='card box'>
                        <div class='image'><img :src="this.$root.$options.imageLink + product.image" alt=''></div>
                        <h3>{{product.name}}</h3>
                        <div class="product-cat">
                          {{ product.category.name }}
                        </div>
                        <div class="product-description">
                            {{product.description}}
                        </div>
                        <div class="product-price">
                            {{product.price}}
                        </div>
                        <div class="product-sizes">
                            <div v-for="size in product.sizes" class="product size">
                                {{size.size_unit}}
                            </div>
                        </div>
                        <button class="btn">Добавить в корзину</button>
                    </div>

                </div>
            </div>
        </div>
        </main>`,
    methods: {
        getProducts() {
            fetch('/api/products').then(res => res.json()).then(res => this.products = res.data);
        },
    },
    mounted() {
        this.getProducts();
    },
    watch: {
        products() {
            console.log(this.products);
        }
    }

}
