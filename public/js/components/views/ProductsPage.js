import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";
import ProductsBlock from "../ProductsBlock.js";

export default {
    data() {
        return {

        }
    },
    methods: {
        filter() {

        }
    },
    components: { HeaderBlock, FooterBlock, ProductsBlock },
    template: `
        <div class="wrapper">
        <header-block ref="header"></header-block>
        <products-block ref="products-block"></products-block>
        <footer-block></footer-block>
        </div>`,
}

