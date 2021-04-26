<template>
  <div class="container mt-5 p-0">
    <h2>ประวัติการสั่งซื้อทั้งหมดของคุณ</h2>
    เรียงจาก <br>
    <input name="order" type="radio" id="last" checked @click="reverseHistory('last')"/>
    <label for="last" class="form-check-label" > ล่าสุด-เก่าสุด</label><br>
    <input name="order" type="radio" id="old" @click="reverseHistory('old')"/>
    <label for="old" class="form-check-label"> เก่าสุด-ล่าสุด</label>
    <p>{{order}}</p>
    <div class="mt-5" v-for="(history, index) in allHistory" :key="index">
      <div class="row">
        <div class="col-md-12 bg-dark text-light">
          {{ dateNormalFormat(history.date) }}
          <div class="float-right">
            ชำระเงินด้วย:
            <a v-if="history.paymentType == 'THB'">เงินบาท</a>
            <a v-else>Bitcoin</a>
          </div>
        </div>
      </div>
      <div class="row bg-info text-light" v-if="history.build">
        <div class="col-md-12 d-flex justify-content-center border">
          มีการใช้บริการประกอบเครื่องฟรี
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-md-6 d-flex justify-content-center border">
            ชื่อสินค้า
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            ราคาต่อชิ้น
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            จำนวนที่สั่งซื้อ
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            ราคารวม
          </div>
        </div>
        <div
          class="row"
          v-for="(product, indexPD) in history.detail"
          :key="indexPD"
        >
          <div class="col-md-6 border">
            <router-link :to="'/productDetail/' + product.productID">{{
              product.productName
            }}</router-link>
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            <a v-if="history.paymentType == 'THB'">
              {{ product.price.toLocaleString() }} บาท</a
            >
            <a v-else>{{ product.price }} Bitcoin</a>
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            {{ product.count }}
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            <a v-if="history.paymentType == 'THB'">
              {{ (product.price * product.count).toLocaleString() }} บาท</a
            >
            <a v-else>{{ product.price * product.count }} Bitcoin</a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 border"></div>
          <div class="col-md-2 d-flex justify-content-end border">
            ราคารวมทั้งสิ้น:
          </div>
          <div class="col-md-2 d-flex justify-content-center border">
            <a v-if="history.paymentType == 'THB'">
              {{ history.total.toLocaleString() }} บาท
            </a>
            <a v-else>{{ history.total }} Bitcoin</a>
          </div>
        </div>
        <div class="row border">
          <div class="col-md-12">
            ที่อยู่ในการจัดส่ง
            <div>
              {{ history.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { checklogin } from "./js/verify.js";
import { MainURL } from "./js/MainUrl";

export default {
  props: ["Inlogin", "userID", "cart"],
  data() {
    return {
      allHistory: [],
      sort:'last',
    };
  },
  methods: {
    dateNormalFormat(date) {
      let newDate = new Date(date);
      let day = String(newDate.getDate()).padStart(2, "0");
      let month = String(newDate.getMonth() + 1).padStart(2, "0");
      let year = newDate.getFullYear();
      let housr = String(newDate.getHours()).padStart(2, "0");
      let min = String(newDate.getMinutes()).padStart(2, "0");
      newDate =
        day + "/" + month + "/" + year + " | " + housr + ":" + min + " น.";
      return newDate;
    },
    reverseHistory(sort){
        if(this.sort != sort){
            this.allHistory.reverse()
            this.sort = sort
        }
        
    },
  },
  async created() {
    //login check
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }

    //get history
    let apiURL = MainURL + `/buy_history/getHistory/${this.userID}`;
    await axios
      .get(apiURL)
      .then((res) => {
        this.allHistory = res.data;
        this.allHistory.reverse()
        console.log(this.allHistory);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>