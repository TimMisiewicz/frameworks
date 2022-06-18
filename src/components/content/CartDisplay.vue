<template>
  <div class="card">
    <h2>Shopping Cart</h2>
    <hr>
    <ul>
      <li v-for="ol in orderLines" :key="ol.product">
        <div class="liWrapper">
          <p>{{ getProductName(ol.product) }}</p>
          <div class="amountActions">
            <button
                class="btn btn-outline-primary"
                @click="increment(ol.product)">
              +
            </button>
            <h5>{{ ol.amount }}x</h5>
            <button
                class="btn btn-outline-danger"
                @click="decrement(ol.product)">
              -
            </button>
          </div>
        </div>
        <hr>
      </li>
    </ul>
    <div class="hasItemsInCart" v-if="!cartIsEmpty">
      <div class="subTotal">
        <p>Subtotal: &euro;{{ getSubTotal() }}</p>
      </div>
      <button type="button" class="btn btn-outline-primary"
              @click="order()"
      >Order</button>
      <button type="button" class="btn btn-outline-danger"
              @click="emptyCart"
      >Empty Cart
      </button>
    </div>
    <div class="hasItemsInCart" v-if="cartIsEmpty">
      <p>Your cart is empty!</p>
    </div>
    <teleport to="body">
      <GenericModal :title="this.modalHeader" v-if="modalIsOpen">
        <template #default>
          <h4>{{ this.modalBody }}</h4>
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
  name: "CartDisplay",
  components: {
    GenericModal
  },
  data() {
   return {
     modalIsOpen: false,
     modalBody: "",
     modalHeader: ""
   }
  },
  computed: {
    orderLines(){
      return this.$store.getters.orderLines;
    },
    products(){
      return this.$store.getters.products;
    },
    cartIsEmpty(){
      return (this.orderLines.length === 0);
    }
  },
  methods: {
    getProductName(productId){
      for (let i = 0; i < this.products.length; i++){
        if (this.products[i].id === productId){
          return this.products[i].name;
        }
      }
    },
    decrement(id){
      this.$store.commit('decrementProduct', {givenId: id});
    },
    increment(id){
      this.$store.commit('incrementProduct', {givenId: id});
    },
    emptyCart(){
      this.$store.commit('clearCart');
    },
    getSubTotal(){
      let totalPrice = 0;
      for (let i = 0; i < this.orderLines.length; i++){
        totalPrice = totalPrice +
            (this.getProductPrice(this.orderLines[i].product) * this.orderLines[i].amount);
      }
      return totalPrice / 100;
    },
    getProductPrice(productId){
      for (let i = 0; i < this.products.length; i++){
        if (this.products[i].id === productId){
          return this.products[i].priceInCents;
        }
      }
    },
    openModalWithMessage(header, body){
      this.modalHeader = header;
      this.modalBody = body;
      this.modalIsOpen = true;
    },
    async order(){
      if (!this.$store.getters.isAuthenticated){
        this.openModalWithMessage("Not logged in", "You need to be logged in to order your shopping cart! Please log in on the login page!");
        return;
      }

      let requestOptions = {
        method: "POST",
        headers: {"Authorization": "Bearer " + this.$store.getters.token},
      };

      fetch(this.$store.getters.apiUrl + "order", requestOptions)
      .then(async (val) => {
        const response = await val.json();
        let correctedOrderLines = this.orderLines.slice();
        for (let i = 0; i < correctedOrderLines.length; i++){
          correctedOrderLines[i].order = response.id;
        }

        requestOptions = {
          method: "POST",
          headers: {"Authorization": "Bearer " + this.$store.getters.token,
            "Content-Type": "application/json"},
          body: JSON.stringify(correctedOrderLines),
        }

        fetch(this.$store.getters.apiUrl + "order/" + response.id + "/lines", requestOptions)
        .then(() => {
          this.openModalWithMessage("Cart ordered", "The order has been completed! Your products will arrive shortly!");
          this.$store.commit('clearCart');
        }). catch(() => {
          this.openModalWithMessage("Could not complete order", "The order could not be completed, please try again later");
        })
      }).catch(() => {
        this.openModalWithMessage("Could not complete order", "The order could not be completed, please try again later");
      })
    }
  },

}
</script>

<style scoped>
h2{
  text-align: center;
}
ul{
  list-style: none;
  padding-left: 0;
  width: 90%;
  margin: 0 auto;
}
.liWrapper{
  display: flex;
  justify-content: space-between;
}
.liWrapper h5 {
  margin: 0;
  padding: 0 5px;
}
.amountActions{
  display: flex;
}
.amountActions button{
font-size: 150%;
  padding: 0;
  width: 35px
}
.hasItemsInCart{
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.subTotal{
  width: 100%;
}
</style>