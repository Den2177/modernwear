import LoginBlock from "../LoginBlock.js";

export default {
    data() {
        return {
            isLogin: true,
        }
    },
    components: {LoginBlock},
    methods: {
        changeAuthPage(boolean) {
            this.isLogin = boolean
        }
    },
    template: `
        <div class="auth-wrap">
        <login-block></login-block>
        </div>
    `
}
