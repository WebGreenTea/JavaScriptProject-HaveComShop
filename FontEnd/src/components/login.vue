<template>
  <!-- Nav bar
  <nav
    class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand float-left"
        >HaveCOM SHOP</router-link
      >
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
      </ul>
    </div>
  </nav> -->

  <div class="container-fulid pt-5 pb-5">
    <div class="container pt-5 pl-5 pr-5 bg-dark text-light border-custom">
      <div
        class="d-flex justify-content-center mb-5 bg-info text-light rounded-pill"
      >
      <router-link to="/" class="text-light"><h1>HaveCOM SHOP</h1></router-link>
        
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group ml-5 mr-5 pl-5 pr-5">
          <h3 class="text-warning">{{error}}</h3>
          <label for="username" class="font-18">Username</label>
          <input
            class="form-control"
            type="text"
            id="username"
            v-model="login.username"
          />
        </div>

        <div class="form-group ml-5 mr-5 pl-5 pr-5">
          <label for="password" class="font-18">Password</label>
          <input
            class="form-control"
            type="password"
            id="password"
            v-model="login.password"
          />
          <div class="d-flex justify-content-end mt-2">
          <p >ยังไม่มีบัญชี? <router-link to="/register">Register</router-link> </p>
        </div>
        </div>
        
        <div class="d-flex justify-content-center  pb-4">
          <button class="btn btn-info" type="submit" name="login">Login</button>
        </div>
      </form>
    </div>
  </div>

  <!--<div class="container mt-5">
    <div>
      <p>{{ error }}</p>
    </div>
    <form @submit.prevent="handleLogin">
      <input
        type="text"
        placeholder="Username"
        v-model="login.username"
      /><br />
      <input
        type="password"
        placeholder="Password"
        v-model="login.password"
      /><br />
      <input type="submit" value="Login" />
    </form>
  </div>-->
</template>
<script>
import axios from "axios";
import { MainURL } from "./js/MainUrl";

export default {
  emits: ["set-nav", "update-cart"],
  props: ["Inlogin", "userID"],
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    handleLogin() {
      let apiURL = MainURL + "/user/login";
      axios
        .post(apiURL, this.login)
        .then((res) => {
          if (res.data.error) {
            this.error = "*" + res.data.error;
          } else {
            localStorage.setItem("token", res.data.data);
            //this.$router.push("/");
            location.reload();
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$emit("set-nav", false);

    let token = localStorage.getItem("token");

    if (token) {
      //alert('don\'t have token')
      this.$router.push("/");
    }
  },
};
</script>