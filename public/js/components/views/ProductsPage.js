import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";
import ProductsBlock from "../ProductsBlock.js";

export default {
    data() {
        return {
            componentName: 'main-block',
        }
    },
    methods: {
        changePage(newPage) {
            this.componentName = newPage
        }
    },
    components: {HeaderBlock, FooterBlock, ProductsBlock},
    template: `
        <div class="wrapper">
        <header-block></header-block>
        <products-block></products-block>
        <footer-block></footer-block>
        </div>`,
}

