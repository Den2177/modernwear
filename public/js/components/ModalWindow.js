export default {
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('confirm');
        }
    },
    template: `
        <div class="box" @click.prevent>
        <h3>
            <slot name="message"></slot>
        </h3>
        <div class="buttons">
            <button class="btn black" @click="cancel">Отмена</button>
            <button class="btn" @click="confirm">Да</button>
        </div>
        </div>`
}
