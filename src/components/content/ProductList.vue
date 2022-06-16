<template>
  <div class="plistWrapper">
    <div class="productWrapper" v-for="product in products" :key="product.id" >
      <ProductItem :product="product"></ProductItem>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/content/ProductItem";

export default {
  name: "ProductList",
  components: {
    ProductItem
  },
  created() {
    this.getAllProducts()
  },
  data () {
    return {
      products: []
    }
  }, methods: {
    async getAllProducts(){
      const requestOptions = {
        method: "GET"
      };

      const response = await fetch(this.$store.getters.apiUrl + "product/all", requestOptions);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(
            'Failed to fetch products'
        );
        throw error;
      }

      this.products = data;
      this.$store.commit('setProducts', {products: data})
    }
  }

}
</script>

<style scoped>
.plistWrapper{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.productWrapper{
  width: 33%;
}
</style>