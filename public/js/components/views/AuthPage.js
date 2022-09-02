import LoginBlock from "../LoginBlock.js";
import RegisterBlock from "../RegisterBlock.js";

export default {
    data() {
        return {
            isLogin: true,
        }
    },
    components: {LoginBlock, RegisterBlock},
    methods: {
        changeAuthPage(boolean) {
            this.isLogin = boolean;
        }
    },
    template: `
        <div class="auth-wrap">
        <component @change-page="changeAuthPage" :is="isLogin ? 'login-block' : 'register-block'"></component>
        </div>
    `
}
