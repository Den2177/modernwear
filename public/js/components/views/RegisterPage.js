import RegisterBlock from "../RegisterBlock.js";

export default {
    data() {
        return {
            isLogin: true,
        }
    },
    components: {RegisterBlock},
    methods: {
        changeAuthPage(boolean) {
            this.isLogin = boolean
        }
    },
    template: `
        <div class="auth-wrap">
        <register-block></register-block>
        </div>
    `
}
