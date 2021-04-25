<template>
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




