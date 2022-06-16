<template>
  <the-header></the-header>
  <router-view/>
</template>

<style>
body{
  margin: 0;
}
</style>
<script>
import TheHeader from "@/components/nav/TheHeader";
export default {
  components: {TheHeader},
  created() {
    this.$store.dispatch('getAllProducts');

    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (token != null && role != null && username != null && id != null ){
      this.$store.commit('setId', {id: id});
      this.$store.commit('setUsername', {username: username});
      this.$store.commit('setToken', {token: token});
      this.$store.commit('setRole', {role: role});
    } else {
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    }return;
  }
}
</script>