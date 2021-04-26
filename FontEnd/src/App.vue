<template>
  <nav
    v-if="nav"
    class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand float-left"
        >HaveCOM SHOP</router-link
      >
      <div class="collapse navbar-collapse topnav-right" id="navbarDropdown">
        <ul class="nav navbar-nav ml-auto" v-if="Inlogin">
          <li class="nav-item dropdown">
            <router-link to="/cart" class="nav-link"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                /></svg
              >({{ cart }})</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              href=""
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenu"
              data-toggle="dropdown"
              >{{ username }}</a
            >
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenu">
              <li>
                <router-link to="/history" class="dropdown-item"
                  >ประวัติการสั่งซื้อ</router-link
                >
              </li>
              <li>
                <router-link to="/addressSetting" class="dropdown-item"
                  >ตั้งค่าชื่อและที่อยู่</router-link
                >
              </li>
              <li>
                <router-link to="/passwordSetting" class="dropdown-item"
                  >เปลี่ยนรหัสผ่าน</router-link
                >
              </li>
              <li>
                <a href="" @click="Logout" class="dropdown-item">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav ml-auto" v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link pr-3">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link pr-3"
              >Register</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Router view -->

  <router-view
    :Inlogin="Inlogin"
    :userID="userID"
    :cart="cart"
    @set-nav="SetNav"
    @update-cart="updateCart"
  ></router-view>
</template>
<script>
import axios from "axios";
import { MainURL } from "./components/js/MainUrl.js";
import { checklogin } from "../src/components/js/verify";
export default {
  data() {
    return {
      nav: true,
      username: "",
      Inlogin: false,
      userID: null,
      cart: 0,
    };
  },
  methods: {
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    SetNav(set) {
      this.nav = set;
    },
    async updateCart() {
      let apiURL = MainURL + `/cart/totalInCart/${this.userID}`;
      await axios.get(apiURL).then((res) => {
        this.cart = res.data.totalInCart;
      });
    },
  },
  async created() {
    const loingdata = await checklogin();
    this.username = loingdata.username;
    this.userID = loingdata.id;
    this.Inlogin = loingdata.login;
    /*let apiURL = MainURL + "/user/verify-token";
    let token = localStorage.getItem("token");
    if (token) {
      let data = { token: token };
      await axios.post(apiURL, data).then((res) => {
        this.username = res.data.username;
        this.userID = res.data.id;
        this.Inlogin = res.data.login;
      });
    }*/

    //get total product in cart
    let apiURL = MainURL + `/cart/totalInCart/${this.userID}`;
    await axios.get(apiURL).then((res) => {
      this.cart = res.data.totalInCart;
    });
  },
};
</script>
<style>
@import "./css/Main.css";
</style>