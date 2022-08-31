export default {
    data() {
        return {
            cats: [],
            imageLink: window.imageLink,
        }
    },
    methods: {
        getProducts() {
            fetch('/api/cats').then(res => res.json()).then(res => this.cats = res.data);
        },
    },
    mounted() {
        this.getProducts();
    },
    template: "<main class=\"main\">\n" +
        "            <div class=\"catblock\">\n" +
        "                <div class=\"container\">\n" +
        "                    <div class=\"categories\">\n" +
        "\n" +
        "                        <div class=\"card box\" v-for=\"cat in cats\">\n" +
        "                            <div class=\"cat-image image\">\n" +
        "                                <img :src=\"imageLink + cat.image\" alt=\"cat image\">\n" +
        "                            </div>\n" +
        "                            <h3 class=\"cat-name\">\n" +
        "                                {{ cat.name }}\n" +
        "                            </h3>\n" +
        "                            <button class=\"btn\">Перейти</button>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </main>",
}
