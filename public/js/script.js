import MainPage from "./components/views/MainPage.js";
import LoginPage from "./components/views/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage.js";
import ProductsPage from "./components/views/ProductsPage.js";

const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            currentPage: 'main-page',
            notification: {
                visible: false,
                message: '',
                isSuccess: true,
            },
        }
    },
    components: { MainPage, LoginPage, RegisterPage, ProductsPage },
    imageLink: 'http://modernwear/public/images/',
    methods: {
        changePage(newPageName) {
            this.currentPage = newPageName;
        },
        checkToken() {
            return !!localStorage.getItem('api_token');
        },
        displayNotification(content) {
            if (typeof content === 'object') {
                let message = ''

                for (let fieldName in content) {
                    if (Array.isArray(content[fieldName])) {
                        message += content[fieldName].join("<br>");
                    } else if (content.isString) {
                        message += fieldName;
                    }
                    message += "<br>"
                }

                this.notification = {
                    isSuccess: true,
                    message: message,
                    visible: true,
                }

                setTimeout(() => {
                    this.notification = {
                        isSuccess: true,
                        message: '',
                        visible: false,
                    }
                }, 5000);
            }
        },
        getApiToken() {
            const apiToken = localStorage.getItem('api_token');
            this.$root.isAuth = apiToken === '';
        }
    },
    mounted() {
        this.getApiToken();
    }
});

app.mount('#app')
