import MainPage from "./components/views/MainPage.js";
import LoginPage from "./components/views/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage.js";
import ProductsPage from "./components/views/ProductsPage.js";
import ModalWindow from "./components/ModalWindow.js";

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
            headerSearch: "",
            modalVisible: false,
            categoryModalVisible: false,
            usersModalVisible: false,
        }
    },
    components: {MainPage, LoginPage, RegisterPage, ProductsPage, ModalWindow},
    methods: {
        confirm() {
            window.location.href = '/admin/products/' + this.$options.currentProductId + '/delete';
        },
        deleteCategory(categoryId) {
            this.$options.currentCategoryId = categoryId;
            this.categoryModalVisible = true;

        },
        deleteUser(userId) {
            this.$options.currentUserId = userId;
            this.usersModalVisible = true;
        },
        confirmUser() {
            window.location.href = '/admin/users/' + this.$options.currentUserId + '/delete';
        },
        confirmCategory() {
            window.location.href = '/admin/category/' + this.$options.currentCategoryId + '/delete';
        },
        openPopup(productId) {
            this.modalVisible = true;
            this.$options.currentProductId = productId;
        },
        changePage(newPageName) {
            this.currentPage = newPageName;
        },
        checkToken() {
            const user = JSON.parse(localStorage.getItem('user'));

            return !!user?.token;
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
        }
    },
    mounted() {
        this.getApiToken();
    }
});

app.mount('#app')
