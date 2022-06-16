<template>
  <div class="card">
    <img class="card-img" :src="product.image">
    <header>
      <h5 class="card-title">{{ product.name }}</h5>
    </header>
    <main>
      <p class="card-body">&euro;{{ product.priceInCents / 100 }}</p>
      <div class="centerMe">
        <button class="btn btn-outline-primary" @click="this.modalIsOpen = true">Details</button>
        <button class="btn btn-outline-success" @click="addProduct">Add to cart</button>
      </div>
    </main>
    <teleport to="body">
      <GenericModal :title="product.name" v-if="modalIsOpen">
        <template #default>
          <h5>Description</h5>
          <p>{{ product.description }}</p>
        </template>
        <template #actions>
          <button class="btn btn-close" @click="this.modalIsOpen = false"></button>
        </template>
      </GenericModal>
    </teleport>
  </div>
</template>

<script>
import GenericModal from "@/components/modal/GenericModal";

export default {
  components: {
    GenericModal
  },
  name: "ProductItem",
  props: ['product'],
  data () {
    return {
      modalIsOpen: false
    }
  },
  methods: {
    addProduct(){
      this.$store.commit('addProduct',
          {productId: this.product.id,
          amount: 1})
    }
  }
}
</script>

<style scoped>
h5{
  text-align: center;
}
img{
  height: 300px;
}
.card-body{
  margin-bottom: 0;
}
.centerMe{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  width: 100%;
}
</style>