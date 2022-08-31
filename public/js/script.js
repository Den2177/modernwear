import HeaderBlock from '/public/js/components/HeaderBlock.js';
import FooterBlock from "./components/FooterBlock.js";
import MainBlock from './components/MainBlock.js';
import ProductsBlock from "./components/ProductsBlock.js";
const {createApp} = Vue;

window.imageLink = 'http://modernwear/public/images/';

const app = createApp({
    data() {
        return {
            componentName: 'main-block',
        }
    },
    methods: {
        changePage(newPageName) {
            this.componentName = newPageName;
        }
    }
});

app
    .component('header-block', HeaderBlock)
    .component('footer-block', FooterBlock)
    .component('main-block', MainBlock)
    .component('products-block', ProductsBlock)

app.mount('#app')
