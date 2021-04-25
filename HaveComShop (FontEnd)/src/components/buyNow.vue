<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3 border">
        <img :src="img" alt="" class="img-fluid" />
      </div>
      <div class="col-md-3 border">
        <h4>
          ชื่อสินค้า <br /><br />
          {{ name }}
        </h4>
      </div>
      <div class="col-md-3 border">
        <h4>
          ราคาต่อชิ้น <br />
          <br />
          {{ price.toLocaleString() }} ฿ <br />
          ({{ BTCprice }}
          <img
            src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
            style="max-width: 20px"
          />)
        </h4>
      </div>
      <div class="col-md-3">
        <h4>จำนวนที่ต้องการสั่งซื้อ</h4>
        <br />
        <input
          type="number"
          class="form-control"
          style="font-size: 25px"
          v-model="countToBuy"
        />
        <h5 style="color: red" v-if="countToBuy > countInStock">
          *สินค้าไม่เพียงพอ มีสินค้านี้เหลือเพียง {{ countInStock }} ชิ้น
        </h5>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="d-flex justify-content-center">
          <h5>ต้องการชำระเงินด้วย</h5>
        </div>
        <div class="d-flex justify-content-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="PaymentType"
              id="PaymentType"
              checked
              value="THB"
              v-model="paymentType"
            />

            <label class="form-check-label" for="PaymentType"> เงินบาท </label>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="PaymentType"
              id="PaymentType2"
              value="BTC"
              v-model="paymentType"
            />
            <label class="form-check-label" for="PaymentType2"> Bitcoin </label>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="paymentType == 'THB'">
          <h3>
            ยอดเงินที่ต้องชำระทั้งหมด<br />
            {{ totalprice("THB") }} ฿
          </h3>
        </div>
        <div v-else>
          <h3>
            ยอดเงินที่ต้องชำระทั้งหมด<br />
            {{ totalprice("BTC") }} ฿
          </h3>
        </div>
      </div>
      <div class="col-md-5">
        <div class="border">
          <div class="d-flex justify-content-center">
            <h4>ที่อยู่ในการจัดส่ง</h4>
          </div>
          <div>
            <p>
              {{ address }}
            </p>
            <button class="btn btn-info float-right" @click="GoToAddressSetting">เปลี่ยนที่อยู่</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="readyToPay()">
      <div v-if="paymentType == 'THB'">
        <div class="d-flex justify-content-center">
          <img
            src="https://drive.google.com/uc?export=view&id=1mMBmVCRDmlRmyt9g7guiQRzyA8pw6vXO"
            style="max-width: 200px"
          />
        </div>
        <div class="d-flex justify-content-center">
          <img :src="promptpayQRlink" />
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-content-center">
          <img :src="BtcQRlink" />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-success" @click="confirmPayment">
          ยืนยันการชำระเงิน
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MainURL } from "./js/MainUrl";
import { BTCprice } from "./js/BTCprice";
import { promPayID } from "./js/prompPayID";
import { BTCaddress } from "./js/bitcoinAddress";
import { checklogin } from "./js/verify.js";

export default {
  props: ["Inlogin", "userID", "cart"],
  data() {
    return {
      login: false,
      btc: null,
      productID: this.$route.params.id,
      name: "",
      price: 0,
      BTCprice: 0,
      img: "",
      countInStock: 0,
      countToBuy: 1,
      paymentType: "THB",

      totalpriceTHB: null,
      totalpriceBTC: null,

      address: "",

      promptpayQRlink: "",
      BtcQRlink: "",
    };
  },
  methods: {
    totalprice(type) {
      this.totalpriceTHB = this.price * this.countToBuy;
      this.totalpriceBTC = this.priceInBTC(this.totalpriceTHB);
      this.promptpayQRlink = `https://qrmango.com/promptpay/qr?pp_no=${promPayID}&amount=${this.totalpriceTHB}&size=300`;
      this.BtcQRlink = `https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&amount=${this.totalpriceBTC}&address=${BTCaddress}`;
      if (type === "THB") {
        return this.totalpriceTHB;
      } else {
        return this.totalpriceBTC;
      }
    },
    priceInBTC(thb) {
      return (thb / this.btc).toFixed(7);
    },
    readyToPay() {
      if (this.countToBuy <= this.countInStock && this.countToBuy > 0) {
        return true;
      }
      return false;
    },
    async confirmPayment() {
      //add to history DB
      let total = 0;
      let price = 0;
      if (this.paymentType == "THB") {
        total = this.totalpriceTHB;
        price = this.price;
      } else {
        total = this.totalpriceBTC;
        price = this.BTCprice;
      }

      let objOfdetail = {};
      objOfdetail.productID = this.productID;
      objOfdetail.productName = this.name;
      objOfdetail.count = this.countToBuy;
      objOfdetail.price = price;

      let detail = [objOfdetail];

      let history = {};
      history.userID = this.userID;
      history.detail = detail;
      history.total = total;
      history.paymentType = this.paymentType;
      history.address = this.address;

      let updatecount = true;
      let apiUrl = MainURL + "/buy_history/addHistory/";
      await axios
        .post(apiUrl, history)
        .then((res) => {
          console.log(res.data.msg);
          alert("การสั่งซื้อเสร็จสิ้น");
        })
        .catch((err) => {
          console.log(err);
          alert("!การสั่งซื้อไม่สำเร็จ เกิดข้อผิดพลาดบางอย่าง");
          updatecount = false;
        });

      //update count in Stock
      if (updatecount) {
        apiUrl = MainURL + `/product/updateCount/${this.productID}`;
        let minusCount = this.countToBuy - this.countToBuy * 2;
        await axios
          .put(apiUrl, { count: minusCount })
          .then(() => {})
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
      this.$router.push("/");
    },
    GoToAddressSetting(){
        this.$router.push("/addressSetting")
    }
  },
  async created() {
    //login check
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }

    //get product data
    let apiUrl = MainURL + `/product/getPD/${this.productID}`;
    await axios
      .get(apiUrl)
      .then((res) => {
        this.name = res.data.PDname;
        this.price = res.data.price;
        this.img = res.data.img;
        this.countInStock = res.data.count;
      })
      .catch((err) => {
        this.$route.push("/");
        console.log(err);
      });

    //get Btc rate
    this.btc = await BTCprice();
    this.BTCprice = (this.price / this.btc).toFixed(7);

    //get address of user
    apiUrl = MainURL + `/user/getAddress/${this.userID}`;
    await axios
      .get(apiUrl)
      .then((res) => {
        this.address += res.data.first_name + " " + res.data.last_name + " " + res.data.number;
        if (res.data.road !== "") {
          this.address += " ถ."+res.data.road;
        }
        if (res.data.moo !== "") {
          this.address += " หมู่"+res.data.moo;
        }
        this.address +=
          " ต." +
          res.data.tumbon +
          " อ." +
          res.data.aumper +
          " จ." +
          res.data.city +
          " " +
          res.data.code +
          " เบอร์โทร " +
          res.data.phone;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
