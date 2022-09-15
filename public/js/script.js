import MainPage from "./components/views/MainPage.js";
import LoginPage from "./components/views/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage.js";
import ProductsPage from "./components/views/ProductsPage.js";
import ProductPage from "./components/views/ProductPage.js";
import CartPage from "./components/views/CartPage.js";

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
            apiData: {
                products: [],
                categories: [],
                sizes: [],
            },
            visionProduct: null,
            productsFromCart: [],
        }
    },
    components: {MainPage, LoginPage, RegisterPage, ProductsPage, ProductPage, CartPage},
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
        getProducts() {
            fetch('/api/products').then(res => res.json()).then(res => {
                this.apiData.products = res.data;
            });
        },
        getCategories() {
            fetch('/api/cats').then(res => res.json()).then(res => {
                const data = res.data;
                this.apiData.categories = data;
            });
        },
        getSizes() {
            fetch('/api/sizes').then(res => res.json()).then(res => {
                const data = res;
                this.apiData.sizes = data;
            });
        },
        getApiToken() {

        },
        getProductsFromCart() {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            console.log(userId);
            fetch(`/api/cart/${userId}`)
                .then(res => res.json())
                .then(res => this.productsFromCart = res.data);
        },
        addToCart(product) {
            const userId = JSON.parse(localStorage.getItem('user')).id;

            fetch(`/api/cart/${userId}/add/${product.id}?count=${product.count}`)
                .then(res => res.json())
                .then(res => this.productsFromCart.push(res.product));
        },
        removeFromCart(product) {
            console.log(product);
            fetch(`/api/cart/delete/${product.id}`).then(res => res.json())
                .then(res => {
                    this.productsFromCart = this.productsFromCart.filter(i => i.id !== product.id);
                });
        }
    },
    mounted() {
        this.getApiToken();
        this.getProducts();
        this.getCategories();
        this.getSizes();
        this.getProductsFromCart();
    }
});

app.mount('#app')
