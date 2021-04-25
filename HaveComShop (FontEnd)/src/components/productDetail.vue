<template>
  <div class="d-flex justify-content-center">
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-sm">
          <img :src="img" class="img-fluid max-width: 100px;" />
        </div>
        <div class="col-sm pt-5">
          <h1>{{ PDname }}</h1>

          <p>มีสินค้าทั้งหมด {{ count }} ชิ้น</p>
          <div class="container">
            <p class="h2">{{ price.toLocaleString() }} ฿</p>
            <p class="h3">
              {{ btcprice }}
              <img
                src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                style="max-width: 6%"
              />
            </p>
            <br />
            <div v-if="count > 0">
              <button class="btn btn-info mr-3 ml-3" @click="buyNow">ซื้อสินค้า</button>
              <button class="btn btn-secondary" @click="addtoCart">
                เพิ่มไปยังรถเข็น
              </button>
            </div>
            <div v-else>
              <h2 class="display-5 text-danger ml-5">สินค้าหมด</h2>
              <button class="btn btn-info mr-3 ml-3 disabled">
                ซื้อสินค้า
              </button>
              <button class="btn btn-secondary disabled">
                เพิ่มไปยังรถเข็น
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="review" class="mt-5">
        <iframe
          width="100%"
          height="600px"
          :src="'https://www.youtube.com/embed/' + review"
          frameborder="5"
          allowfullscreen
          class="mb-5"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MainURL } from "./js/MainUrl";
import { BTCprice } from "./js/BTCprice";

export default {
  props: ["Inlogin", "userID"],
  emits: ["update-cart"],
  data() {
    return {
      btc: null,
      id: this.$route.params.id,
      price: 0,
      btcprice: null,
      img: null,
      PDname: "",
      count: null,
      review: null,
    };
  },
  async created() {
    const apiURL = MainURL + `/product/getPD/${this.id}`;
    await axios.get(apiURL).then((res) => {
      this.price = res.data.price;
      this.img = res.data.img;
      this.PDname = res.data.PDname;
      this.count = res.data.count;

      let review = res.data.review.split("/")
      this.review = review[review.length-1]
    });
    this.btc = await BTCprice();
    //console.log(this.price);
    this.btcprice = (this.price / this.btc).toFixed(7);
  },
  methods: {
    async addtoCart() {
      if (!this.Inlogin) {
        console.log("test");
        this.$router.push("/login");
      } else {
        const apiURL = MainURL + `/cart/addToCart/`;
        await axios
          .put(apiURL, {
            productID: this.id,
            userID: this.userID,
            count: 1,
          })
          .then((res) => {
            if (res.data.success) {
              this.$emit("update-cart");
            }
          });
      }
    },
    buyNow(){
      this.$router.push({ name: "buyNow", params: { id: this.id } });
    }
  },
};
</script>
