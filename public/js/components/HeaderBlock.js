export default {
    data() {
        return {

        }
    },
    methods: {
        changePage(pageName) {
            this.$emit('changePage', pageName);
        }
    },
    template: "<header class=\"header\">\n" +
        "            <div class=\"container\">\n" +
        "                <a href=\"#\" class=\"logo\">\n" +
        "                    <img src=\"http://modernwear/public/images/logo2.png\" alt=\"logo\">\n" +
        "                </a>\n" +
                        "<input type=\"text\" class='input' placeholder='Search...' />\n" +
        "                <div class=\"buttons\">\n" +
        "                    <button class=\"btn black\">Вход</button>\n" +
        "                    <button class=\"btn black\">Регистрация</button>\n" +
        "                    <button class=\"btn black\">Выйти</button>\n" +
        "                </div>\n" +
        "                <div class=\"buttons\">\n" +
        "                    <button class=\"btn black\">Корзина</button>\n" +
        "                </div>\n" +
        "                <a href=\"/products\" class=\"link\" @click.prevent='changePage(\"products-block\")'>Все товары</a>\n" +
        "                <div class=\"category-links\">\n" +
        "                    <a href=\"/\" class=\"link\">category 1</a>\n" +
        "                    <a href=\"/\" class=\"link\">category 2</a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </header>",
}
