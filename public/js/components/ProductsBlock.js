export default {
    data() {
        return {
            products: [],
            imageLink: window.imageLink,
        }
    },
    template: "<main class=\"main\">\n" +
        "            <div class=\"container\">\n" +
        "                <div class=\"body\">\n" +
        "                    <div class=\"products\">\n" +
        "                        <div class=\"card box\" v-for=\"product in products\">\n" +
        "                            <div class=\"image\">\n" +
        "                                <img :src=\"imageLink + product.image\" alt=\"product image\">\n" +
        "                            </div>\n" +
        "                            <h3>{{product.title}}</h3>\n" +
        "                            <div class=\"product-cat\">{{product.category.name}}</div>\n" +
        "                            <div class=\"product-description\">{{product.description}}</div>\n" +
        "                            <div class=\"product-price\">{{product.price}}</div>\n" +
        "                            <div class=\"product-sizes\">\n" +
        "                                <div class=\"product-size\" v-for=\"size in sizes\">\n" +
        "                                    {{size.size_unit}}\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <button class=\"btn\">Добавить в корзину</button>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </main>",
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
