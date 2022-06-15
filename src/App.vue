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
  components: {TheHeader}
}
</script>