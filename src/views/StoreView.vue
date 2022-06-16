<template>
  <div class="flexcontainer">
    <header>
      <h2>Welcome to the FS-Webshop online store!</h2>
      <h4>FS-Webshop has all you could possibly want in terms of flight-simulator equipment!</h4>
    </header>
    <main>
      <div class="productContainer">
        <ProductList></ProductList>
      </div>
      <div class="cartContainer">
        <CartDisplay>
        </CartDisplay>
      </div>
    </main>
  </div>
</template>

<script>
import ProductList from "@/components/content/ProductList";
import CartDisplay from "@/components/content/CartDisplay";
export default {
  name: "StoreView",
  components: {CartDisplay, ProductList}

}
</script>

<style scoped>
.flexcontainer{
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto 0;
}
header{
  text-align: center;
  width: 100%;
}
.cartContainer{
  width: 25%;
}
.productContainer{
  width: 75%;
}
main{
  width: 100%;
  display: flex;
}
</style>