export default {
    data() {
        return {
            cats: [],
        }
    },
    methods: {
        getProducts() {
            fetch('/api/cats').then(res => res.json()).then(res => this.cats = res.data);
        },
    },
    mounted() {
        this.getProducts()
    },
    template: `<main class="main">
                   <div class="catblock">
                       <div class="container">
                           <div class="categories">
                               <div class="card box" v-for="cat in cats">
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
