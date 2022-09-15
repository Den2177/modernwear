export default {
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {

    },
    computed: {
        categories() {
            return this.$root.apiData.categories;
        }
    },
    template: `<main class="main">
                   <div class="catblock">
                       <div class="container">
                           <div class="categories">
                               <div class="card box" v-for="cat in categories">
                                   <div class="cat-image image">
                                       <img :src="cat.image" alt="cat image">
                                   </div>
                                   <div class="padding-wrap">
                                       <h3 class="cat-name">
                                           {{ cat.name }}
                                       </h3>
                                       <button class="btn">Перейти</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </main>`,
}
