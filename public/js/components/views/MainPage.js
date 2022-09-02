import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";
import MainBlock from "../MainBlock.js";
import ProductsBlock from "../ProductsBlock.js";

export default {
    data() {
        return {
            componentName: 'main-block',
        }
    },
    methods: {
        changePage(newPage) {
            this.componentName = newPage;
        }
    },
    components: {HeaderBlock, FooterBlock, MainBlock, ProductsBlock},
    template: `
        <div class="wrapper">
        <header-block @change-page="changePage"></header-block>
        <component class="main" :is="componentName"></component>
        <footer-block></footer-block>
        </div>`,
}

