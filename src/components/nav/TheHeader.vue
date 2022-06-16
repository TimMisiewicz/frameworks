<template>
  <div class="navBar">
    <teleport to="body">
      <GenericModal title="Logged out" v-if="modalIsOpen">
        <template #default>
          <h4>You have been successfully logged out of your account.</h4>
        </template>
        <template #actions>
          <button class="btn btn-close" @click="this.modalIsOpen = false"></button>
        </template>
      </GenericModal>
    </teleport>
    <div class="title">
      <h1 class="red">
        FS-
      </h1>
      <h1 class="white">Webshop</h1>
    </div>
    <div class="products">
      <p>
        <router-link
            style="text-decoration: none; color: inherit;"
            to="/store">
          Store
        </router-link>
      </p>
    </div>
    <div class="orders">
      <p>
        Orders
      </p>
    </div>
    <div v-if="!isLoggedIn" class="login">
      <p>
        <router-link
            style="text-decoration: none; color: inherit;"
            to="/login">
          Log in
        </router-link>
      </p>
    </div>
    <div v-if="isLoggedIn" class="login" @click="logOut">
      <p>
        Log Out
      </p>
    </div>
  </div>
</template>

<script>
import GenericModal from "@/components/modal/GenericModal";

export default {
  components: {GenericModal},
  name: "TheHeader",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logOut() {
      this.$store.commit('logOut');
      this.modalIsOpen = true;
    }
  },
  data() {
    return {
      modalIsOpen: false
    }
  }
}
</script>

<style scoped>
.navBar {
  width: 100%;
  height: 75px;
  margin: 0;
  background-color: #2f2f2f;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.title {
  display: flex;
}

.title:hover {
  cursor: pointer;
}

.products, .orders, .login {
  display: flex;
  color: red;
  font-size: 150%;
}

.red {
  color: red;
}

.white {
  color: white;
}

h1, p {
  margin: auto;
  transition: 0.2s;
}

p:hover {
  cursor: pointer;
  color: white;
  transition: 0.2s;
}

</style>