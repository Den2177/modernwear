import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";

export default {
    data() {
        return {}
    },
    components: {HeaderBlock, FooterBlock},
    computed: {
        productsInCard() {
            return this.$root.productsFromCart;
        },
        totalPrice() {
            return this.productsInCard.reduce((sum, current) => sum += current.product.price * current.count, 0);
        },
    },
    methods: {
        deleteFromCart(product) {
            this.$root.removeFromCart(product);
        },
        minusCount(product) {
            if (product.count <= 1) return;

            product.count--;
        },
        plusCount(product) {
            product.count++;
        },
        priceWithCount(product) {
            return product.product.price * product.count;
        }
    },
    template: `
        <header-block></header-block>
        <main class="main">
        <div class="container">
            <div class="cart-body">

                <div class="box">
                    <div class="buy-panel">
                        <h3>Total Price: {{ totalPrice }} ₽</h3>
                        <button class="btn">Перейти к оплате</button>
                    </div>
                </div>

                <div class="cart-items">
                    <div class="cart-item box" v-for="product in productsInCard">
                        <div class="cart-image">
                            <img :src="product.product.image" alt="product image">
                        </div>
                        <div class="vertical">
                            <div class="name">
                                {{ product.product.name }}
                            </div>
                            <div class="product-categories" v-if="product.product.categories.length">
                                <div class="product-cat" v-for="category in product.product.categories">
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>
                        <div class="price-per-one">
                            {{ product.product.price }} ₽
                        </div>

                        <div class="vertical">
                            <div class="product-counter">
                                <a href="#" class="link" @click.prevent="minusCount(product)">-</a>
                                <div class="count">
                                    {{ product.count }}
                                </div>
                                <a href="#" class="link" @click.prevent="plusCount(product)">+</a>

                            </div>

                            <div class="price-with-counter">
                                {{ priceWithCount(product) }} ₽
                            </div>
                        </div>

                        <button class="btn" @click="deleteFromCart(product)">Удалить</button>
                    </div>
                </div>

            </div>
        </div>
        </main>
        <footer-block></footer-block>
    `,

}
