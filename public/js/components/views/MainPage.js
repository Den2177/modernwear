import HeaderBlock from "../HeaderBlock.js";
import FooterBlock from "../FooterBlock.js";
import MainBlock from "../MainBlock.js";
import ProductsBlock from "../ProductsBlock.js";

export default {
    data() {
        return {
            message: 'yo',
        }
    },
    methods: {

    },
    components: {HeaderBlock, FooterBlock, MainBlock, ProductsBlock},
    template: `
        <div class="wrapper">
        <header-block></header-block>
        <main-block></main-block>
        <footer-block></footer-block>
        </div>`,
}

