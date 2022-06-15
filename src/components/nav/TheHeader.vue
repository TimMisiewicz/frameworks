<template>
  <div class="navBar">
    <div class="title">
      <h1 class="red">
        FS-
      </h1>
      <h1 class="white">Webshop</h1>
    </div>
    <div class="products">
      <p>
        Products
      </p>
    </div>
    <div class="orders">
      <p>
        Orders
      </p>
    </div>
    <div class="login">
      <p>
        Login
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
.navBar{
  width: 100%;
  height: 75px;
  margin: 0;
  background-color: #2f2f2f;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.title{
  display: flex;
}
.title:hover{
  cursor: pointer;
}

.products, .orders, .login{
  display: flex;
  color: red;
  font-size: 150%;
}
.red {
  color: red;
}
.white{
  color: white;
}
h1, p{
  margin: auto;
  transition: 0.2s;
}
p:hover{
  cursor: pointer;
  color: white;
  transition: 0.2s;
}

</style>