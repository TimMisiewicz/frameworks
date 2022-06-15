<template>
  <div class="flexwrapper">
    <teleport to="body">
      <GenericModal title="Account successfully created!" v-if="modalIsOpen">
        <template #default>
          <h4>Your account has been successfully created, you can now log in!</h4>
        </template>
        <template #actions>
          <button class="btn btn-close" @click="this.modalIsOpen = false"></button>
        </template>
      </GenericModal>
    </teleport>
    <teleport to="body">
      <GenericModal title="Bad credentials" v-if="badCredentials">
        <template #default>
          <h4>Please check your login credentials and then try again!</h4>
        </template>
        <template #actions>
          <button class="btn btn-close" @click="this.badCredentials = false"></button>
        </template>
      </GenericModal>
    </teleport>
    <teleport to="body">
      <GenericModal title="Successfully logged in!" v-if="successfulLogin">
        <template #default>
          <h4>You have been successfully logged in, you can now order products from us!</h4>
        </template>
        <template #actions>
          <button class="btn btn-close" @click="this.successfulLogin = false"></button>
        </template>
      </GenericModal>
    </teleport>
    <h2>Sign up to FS-Webshop to order your favourite flight-simulator equipment!</h2>
    <div class="signup">
      <form class="form-control" @submit.prevent="validateSignup">
        <h3>Sign Up</h3>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="(case sensitive)" v-model.trim="this.signUp.username">
          <p v-if="this.signUp.usernameHasError">Entered username is not valid!</p>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="(minimum 8 characters)" v-model.trim="this.signUp.password">
          <p v-if="this.signUp.passwordHasError">Entered password is not valid!</p>
        </div>
        <div>
          <label for="passwordC">Confirm Password</label>
          <input type="password" id="passwordC" placeholder="(minimum 8 characters)" v-model.trim="this.signUp.passwordC">
          <p v-if="this.signUp.confirmHasError">Entered passwords are not the same!</p>
        </div>
        <div class="button">
          <button type="submit" class="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
    <div class="login">
      <form class="form-control" @submit.prevent="validateLogin">
        <h3>Login</h3>
        <div>
          <label for="lusername">Username</label>
          <input type="text" id="lusername" placeholder="(case sensitive)" v-model.trim="this.login.username">
          <p v-if="this.login.usernameHasError">Entered username is not valid!</p>
        </div>
        <div>
          <label for="lpassword">Password</label>
          <input type="password" id="lpassword" placeholder="(minimum 8 characters)" v-model.trim="this.login.password">
          <p v-if="this.login.passwordHasError">Entered password is not valid!</p>
        </div>
        <div>
          <label for="lpasswordC">Confirm Password</label>
          <input type="password" id="lpasswordC" placeholder="(minimum 8 characters)" v-model.trim="this.login.passwordC">
          <p v-if="this.login.confirmHasError">Entered passwords are not the same!</p>
        </div>
        <div class="button">
          <button type="submit" class="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GenericModal from "@/components/modal/GenericModal";
export default {
  name: "LoginView",
  components: {GenericModal},
  data () {
    return {
      signUp: {
        usernameHasError: false,
        username: '',
        passwordHasError: false,
        password: '',
        confirmHasError: false,
        passwordC: ''
      },
      login: {
        usernameHasError: false,
        username: '',
        passwordHasError: false,
        password: '',
        confirmHasError: false,
        passwordC: ''
      },
      modalIsOpen: false,
      badCredentials: false,
      successfulLogin: false
    }
  },
  methods: {
    submitSignup(username, password){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username: username, password: password})
      };
      fetch(this.$store.getters.apiUrl + "auth/signup", requestOptions)
        .then(() => {
          this.modalIsOpen = true;
        })
    },
    async submitLogin() {
      this.$store.dispatch('login', {username: this.login.username, password: this.login.password})
      .then(() => {
        this.successfulLogin = true;
      }).catch(() => {
        this.badCredentials = true;
      })

    },
    validateSignup() {
      this.resetSignupErrors();
      if (this.signUp.username.length < 8) {
        this.signUp.usernameHasError = true;
      }
      if (this.signUp.password.length < 8){
        this.signUp.passwordHasError = true;
      }
      if (this.signUp.passwordC != this.signUp.password){
        this.signUp.confirmHasError = true;
      }
      if (this.signupHasErrors()) return;
      this.submitSignup(this.signUp.username, this.signUp.password)
    },
    validateLogin(){
      this.resetLoginErrors();
      if (this.login.username.length < 8) {
        this.login.usernameHasError = true;
      }
      if (this.login.password.length < 8){
        this.login.passwordHasError = true;
      }
      if (this.login.passwordC != this.login.password){
        this.login.confirmHasError = true;
      }
      if (this.loginHasErrors()) return;
      this.submitLogin()
    },
    resetSignupErrors(){
      this.signUp.passwordHasError = false;
      this.signUp.usernameHasError = false;
      this.signUp.confirmHasError = false;
      return;
    },
    signupHasErrors(){
      return(this.signUp.confirmHasError || this.signUp.passwordHasError || this.signUp.usernameHasError);
    },
    resetLoginErrors(){
      this.login.passwordHasError = false;
      this.login.usernameHasError = false;
      this.login.confirmHasError = false;
      return;
    },
    loginHasErrors(){
      return(this.login.confirmHasError || this.login.passwordHasError || this.login.usernameHasError);
    }
  }
}
</script>

<style scoped>
.flexwrapper{
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem auto 0;
  flex-wrap: wrap;
}
h2{
  width: 100%;
  text-align: center;
}
.signup, .login{
  width: 45%;
}
h3{
  text-align: center;
}
label{
  width: 100%;
}
input{
  width: 100%;
}
.button{
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
}

form p {
  color: red;
  margin: 0;
}
</style>