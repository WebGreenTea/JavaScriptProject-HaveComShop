<template>
  <!-- Nav bar -->
  <!--<nav
    class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand float-left"
        >HaveCOM SHOP</router-link
      >
      <div class="collapse navbar-collapse topnav-right" id="navbarDropdown">
        <ul class="nav navbar-nav ml-auto" v-if="Inlogin">
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
  </nav>-->

  <div class="container-fulid bg-overlay">
    <div class="text-center">
      <h1>จัดสเปคคอมของคุณเอง พร้อมบริการประกอบฟรี</h1>
      <router-link to="computerDIY"
        ><button type="button" class="btn btn-primary btn-lg bg-info">
          เริ่มจัดสเปค
        </button></router-link
      >
    </div>
  </div>

  <ul class="nav nav-pills nav-fill bg-dark">
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-info text-light"
        id="all-product"
        @click="changeMenu('all-product')"
        >สินค้าทั้งหมด</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="cpu-product"
        @click="changeMenu('cpu-product')"
        >CPU</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="ram-product"
        @click="changeMenu('ram-product')"
        >RAM</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="vga-product"
        @click="changeMenu('vga-product')"
        >VGA</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="mainboard-product"
        @click="changeMenu('mainboard-product')"
        >MainBoard</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="storage-product"
        @click="changeMenu('storage-product')"
        >HDD/SSD</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="psu-product"
        @click="changeMenu('psu-product')"
        >PSU</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="case-product"
        @click="changeMenu('case-product')"
        >Case</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="cooler-product"
        @click="changeMenu('cooler-product')"
        >Cooler</a
      >
    </li>
    <li class="nav-item">
      <a
        href="#"
        class="nav-link bg-dark text-light"
        id="more-product"
        @click="changeMenu('more-product')"
        >อืนๆ</a
      >
    </li>
  </ul>

  <component v-bind:is="productMenu"></component>
</template>




<script>
import allProduct from "./productMenu/allProduct.vue";
import cpuProduct from "./productMenu/CPU.vue";
import ramProduct from "./productMenu/RAM.vue";
import vgaProduct from "./productMenu/VGA.vue";
import mbProduct from "./productMenu/Mainboard.vue";
import storageProduct from "./productMenu/HDD-SSD.vue";
import psuProduct from "./productMenu/PSU.vue";
import caseProduct from "./productMenu/Case.vue";
import coolerProduct from "./productMenu/cooler.vue";
import moreProduct from "./productMenu/more.vue";
//import {MainURL} from './js/MainUrl';
//import axios from "axios";
//import allProduct from './productMenu/allProduct.vue'

export default {
  emits: ["set-nav", "update-cart"],
  props: ["Inlogin", "userID", "cart"],
  components: {
    "all-product": allProduct,
    "cpu-product": cpuProduct,
    "ram-product": ramProduct,
    "vga-product": vgaProduct,
    "mainboard-product": mbProduct,
    "storage-product": storageProduct,
    "psu-product": psuProduct,
    "case-product": caseProduct,
    "cooler-product": coolerProduct,
    "more-product": moreProduct,
  },
  data() {
    return {
      productMenu: "all-product",
    };
  },
  methods: {
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    changeMenu(menu) {
      let old_menu = this.productMenu;
      document.getElementById(old_menu).className =
        "nav-link bg-dark text-light";
      document.getElementById(menu).className =
        "nav-link bg-info text-light active ";

      this.productMenu = menu;
    },
  },
  created() {
    this.$emit("set-nav", true);
  },
};
</script>




