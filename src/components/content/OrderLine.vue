<template>
  <div class="card">
    <h5 class="card-title">Order {{ this.index + 1 }}</h5>
    <button class="btn btn-outline-danger" @click="openModalWithContent(('Order ' + (+this.index + 1)))">Details</button>
    <teleport to="body">
      <GenericModal :title="this.modalHeader" v-if="modalIsOpen">
        <template #default>
          <ul>
            <li v-for="line in orderLines" :key="line.id">
              <div class="liRow">
                <div class="content">
                  <h5>
                    {{ getProductName(line.productId) }}
                  </h5>
                  <div class="override">
                    <p>
                      &euro;{{ getProductPrice(line.productId) / 100 }} - x{{ line.amount }}
                    </p>
                  </div>
                </div>
                <hr>
              </div>
            </li>
          </ul>
          <div class="content">
            <h4>Subtotal: </h4>
            <p>
              &euro;{{ getSubTotal() }}
            </p>
          </div>
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
  name: "OrderLine",
  components: {GenericModal},
  props: ['order', 'index'],
  created() {
    this.getOrderLines();
  },
  computed: {
    products(){
      return this.$store.getters.products;
    },
  },
  data () {
    return {
      orderLines: [],
      modalIsOpen: false,
      modalHeader: '',
    }
  }, methods: {
    async getOrderLines() {
      const requestOptions = {
        method: "GET",
        headers: {"Authorization": "Bearer " + this.$store.getters.token},
      };

      const response = await fetch(this.$store.getters.apiUrl + "order/" + this.order + "/lines", requestOptions);
      const data = await response.json();
      this.orderLines = data;
    },
    openModalWithContent(header){
      this.modalHeader = header;
      this.modalIsOpen = true;
    },
    getProductName(productId){
      for (let i = 0; i < this.products.length; i++){
        if (this.products[i].id === productId){
          return this.products[i].name;
        }
      }
    },
    getSubTotal(){
      let totalPrice = 0;
      for (let i = 0; i < this.orderLines.length; i++){
        totalPrice = totalPrice +
            (this.getProductPrice(this.orderLines[i].productId) * this.orderLines[i].amount);
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
  }
}
</script>

<style scoped>
.card{
  width: 100%;
  margin-bottom: 1rem;
}
h5{
  text-align: center;
  padding: 0.5rem;
}
button{
  margin: 0.25rem auto;
  width: 100px;
}
ul{
  list-style: none;
  padding-left: 0;
}
.liRow{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.liRow hr{
  width: 100%;
}
.content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
override{
  display: flex;
  flex-wrap: nowrap;
}
</style>