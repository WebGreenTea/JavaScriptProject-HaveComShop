<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div
        class="col-lg-2"
        v-for="(product, index) in products"
        :key="index"
        @click="viewProduct(product._id)"
      >
        <div class="card" id="productArea">
          <img :src="product.img" alt="" />
          <div class="card-body" v-if="product.count > 0">
            <h6 class="card-title">{{ product.PDname }}</h6>
            <h5 class="card-text" id="price">
              {{ product.price.toLocaleString() }} THB
            </h5>
            <h6 class="card-text" id="price">
              {{ priceInBTC(product.price) }}
              <img
                src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                style="max-width: 9%"
              />
            </h6>
          </div>
          <div class="card-body" v-else>
            <h6 class="card-title">{{ product.PDname }}</h6>
            <h4 class="card-text" id="price">สินค้าหมด</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MainURL } from "../js/MainUrl";
import axios from "axios";
export default {
  data() {
    return {
      btc: null,
      products: null,
    };
  },
  async created() {
    //get product data
    const apiURL = MainURL + "/product/getPD/HDD-SSD";
    await axios.get(apiURL).then((res) => {
      this.products = res.data;
    });
    //get BTC price
    await axios.get("https://api.bitkub.com/api/market/ticker").then((res) => {
      this.btc = res.data.THB_BTC.last;
    });
  },
  methods: {
    priceInBTC(thb) {
      return (thb / this.btc).toFixed(7);
    },
    viewProduct(id) {
      this.$router.push({ name: "productDetail", params: { id: id } });
    },
  },
};
</script>