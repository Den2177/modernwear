import AuthPage from "./components/views/AuthPage.js";
import MainPage from "./components/views/MainPage.js";
const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            isAuth: true,
            notification: {
                visible: false,
                message: '',
                isSuccess: true,
            },
        }
    },
    components: { MainPage, AuthPage },
    imageLink: 'http://modernwear/public/images/',
    methods: {
        changePage(newPageName) {
            this.componentName = newPageName;
        },
        displayNotification(content) {
            if (typeof content === 'object') {
                let message = '';

                for (let fieldName in content) {
                    if (Array.isArray(content[fieldName])) {
                        message += content[fieldName].join("<br>");
                    } else if (content.isString) {
                        message += fieldName;
                    }
                    message += "<br>";
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
        }
    }
});

app.mount('#app')
