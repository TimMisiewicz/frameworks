<template>
  <div class="orderContainer">
    <h2>My Orders</h2>
    <hr>
    <OrderLine v-for="(order, index) in orders" :key="order.id" :order="order.id" :index="index"></OrderLine>
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
import OrderLine from "@/components/content/OrderLine";

export default {
  name: "OrderView",
  components: {
    GenericModal,
    OrderLine
  },
  created() {
    this.getAllOrders();
  },
  data () {
    return {
      orders: [],
      modalIsOpen: false,
      modalHeader: '',
      modalBody: ''
    }
  },
  methods: {
    async getAllOrders(){
      const requestOptions = {
        method: "GET",
        headers: {"Authorization": "Bearer " + this.$store.getters.token},
      };

      const response = await fetch(this.$store.getters.apiUrl + "order/user", requestOptions);
      const data = await response.json();

      if (!response.ok){
        this.openModalWithContent("Could not fetch orders", "Please try again later!")
      }
      this.orders = data;
    },
    openModalWithContent(header, body){
      this.modalHeader = header;
      this.modalBody = body;
      this.modalIsOpen = true;
    }
  }
}
</script>

<style scoped>
.orderContainer{
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto 0;
}
h2{
  text-align: center;
  width: 100%;
}
hr{
  width: 100%;
}
</style>