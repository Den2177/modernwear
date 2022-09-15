import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";

export default {
    data() {
        return {

        }
    },
    methods: {
        addToCart(product) {
            this.$root.addToCart(product);
        },
        minusCount() {
            if (this.product.count <= 1) return;

            this.product.count--;
        },
        plusCount() {
            this.product.count++;
        },
        choiceSize(size) {
            this.product.sizes.forEach(size => {
                size.isActive = false;
            });

            size.isActive = true;
            this.product.activeSize = size;
        }
    },
    components: { HeaderBlock, FooterBlock },
    computed: {
        product() {
            const product = this.$root.visionProduct
            product.count = 1

            return product
        }
    },
    template: `
        <div class="wrapper">
        <header-block></header-block>
        <div class="product-show">
            <div class="container">
                <div class="double">
                    <div class="full-image">
                        <img :src="product.image" alt="image">
                    </div>
                    <div class="content">
                        <h3 class="product-title">{{product.name}}</h3>
                        <div class="product-description text">{{product.description}}</div>
                        <div class="product-price">{{product.price}}</div>
                        <div class="product-sizes">
                            <div v-for="size in product.sizes" class="product-size" :class="{active: size.isActive}" @click="choiceSize(size)">
                                {{ size.size_unit }}
                            </div>
                        </div>
                        <div class="product-categories" v-if="product.categories.length">
                            <div class="product-cat" v-for="category in product.categories">
                                {{ category.name }}
                            </div>
                        </div>
                        <div class="product-counter">
                            <a href="#" class="link" @click.prevent="minusCount">-</a>
                            <div class="count">
                                {{product.count}}
                            </div>
                            <a href="#" class="link" @click.prevent="plusCount">+</a>

                        </div>
                        <button class="btn" v-if="$root.checkToken()" @click="addToCart(product)">Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </div>
        <footer-block></footer-block>
        </div>

    `,
}
