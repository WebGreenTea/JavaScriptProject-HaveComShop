<template>
  <div class="container mt-5" v-if="cart">
    <div class="row">
      <div class="col-md d-flex justify-content-center align-self-center">
        เลือกสินค้าที่ <br />
        จะชำระเงิน
      </div>
      <div class="col-md"></div>
      <div class="col-md d-flex justify-content-center align-self-center">
        ชื่อสินค้า
      </div>
      <div class="col-md d-flex justify-content-center align-self-center">
        ราคาต่อชิ้น
      </div>
      <div class="col-md d-flex justify-content-center align-self-center">
        จำนวน(ชิ้น)
      </div>
      <div class="col-md d-flex justify-content-center align-self-center">
        ราคารวม
      </div>
      <div class="col-md"></div>
    </div>

    <div
      v-for="(CartList, index) in CartProductList"
      :key="index"
      class="border-bottom"
    >
      <!--v-for in this-->
      <div class="row">
        <div class="col-md d-flex justify-content-center align-self-center">
          <input
            type="checkbox"
            class="checkbox-lg"
            :disabled="
              !checkCount(
                CartList.count,
                CartList.countInStock,
                CartList.IDinDBcart
              )
            "
            :value="index"
            v-model="Listcheckeds"
            @change="totalPrice"
          />
        </div>

        <div class="col-md">
          <img :src="CartList.img" alt="" class="img-fluid max-width: 100px;" />
        </div>

        <div class="col-md d-flex justify-content-center align-self-center">
          {{ CartList.ProductName }}
        </div>

        <div class="col-md d-flex justify-content-center align-self-center">
          <div>
            {{ CartList.price.toLocaleString() }}฿ <br />
            ({{ priceInBTC(CartList.price) }}
            <img
              src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
              style="max-width: 20px"
            />)
          </div>
        </div>

        <div class="col-md d-flex justify-content-center align-self-center">
          <div>
            <div class="d-flex justify-content-center">
              <input
                type="number"
                min="1"
                max="99"
                v-model="CartList.count"
                @blur="saveCountInCart(CartList.count, index)"
                v-on:keyup="totalPrice"
                @click="saveCountInCart(CartList.count, index)"
              />
            </div>

            <p
              v-if="CartList.count > CartList.countInStock"
              class="text-danger font-weight-bold"
            >
              *สินค้าไม่เพียงพอ <br />
              มีสินค้านี้เหลือเพียง {{ CartList.countInStock }} ชิ้น
            </p>
          </div>
        </div>
        <div class="col-md d-flex justify-content-center align-self-center">
          <div>
            {{ (CartList.price * CartList.count).toLocaleString() }}฿ <br />
            ({{ priceInBTC(CartList.price * CartList.count) }}
            <img
              src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
              style="max-width: 20px"
            />
            )
          </div>
        </div>

        <div class="col-md d-flex justify-content-center align-self-center">
          <button
            class="btn btn-danger"
            @click="delFromCart(CartList.IDinDBcart)"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
    <!--------------------------------->
    <div class="row mt-3">
      <div class="col-md-3">
        <div class="d-flex justify-content-center">
          <p>ต้องการชำระเงินด้วย</p>
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
        <div class="d-flex justify-content-center" v-if="paymentType == 'THB'">
          <h3>
            ราคารวมสินค้าที่ต้องการชำระ
            {{ totalPriceOfSelect.toLocaleString() }}฿
          </h3>
        </div>
        <div class="d-flex justify-content-center" v-else>
          <h3>
            ราคารวมสินค้าที่ต้องการชำระ
            {{ totalPriceOfSelectbtc }}
            <img
              src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
              style="max-width: 30px"
            />
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
    <!--------------------------------->

    <div
      class="container d-flex justify-content-center"
      v-if="totalPriceOfSelect"
    >
      <div v-if="paymentType == 'THB'">
        <div class="d-flex justify-content-center mt-3">
          <img
            src="https://drive.google.com/uc?export=view&id=1mMBmVCRDmlRmyt9g7guiQRzyA8pw6vXO"
            style="max-width: 200px"
          />
        </div>
        <div class="d-flex justify-content-center">
          <img :src="promptpayQRlink" />
        </div>
      </div>
      <div v-else class="container d-flex justify-content-center">
        <div v-if="!(totalPriceOfSelectbtc == 0)">
          <div class="d-flex justify-content-center mt-3">
            <img :src="BtcQRlink" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="totalPriceOfSelect">
      <div class="container d-flex justify-content-center mt-2 mb-5">
        <button class="btn btn-success" @click="confirmPayment">
          ยืนยันการชำระเงิน
        </button>
      </div>
    </div>
  </div>
  <div class="container d-flex justify-content-center mt-5" v-else>
    <h2 class="mt-5 font-weight-bold text-info">ยังไม่มีสินค้าในรถเข็น</h2>
  </div>
</template>

<script>
import axios from "axios";
import { MainURL } from "./js/MainUrl";
import { checklogin } from "./js/verify.js";
import { BTCprice } from "./js/BTCprice";
import { promPayID } from "./js/prompPayID";
import { BTCaddress } from "./js/bitcoinAddress";

export default {
  props: ["cart", "Inlogin", "userID"],
  emits: ["set-nav", "update-cart"],
  data() {
    return {
      //username: "",
      //IDuser: "",
      login: false,
      address: "",
      CartProductList: [],
      lawCart: [],
      btc: null,
      Listcheckeds: [],
      totalPriceOfSelect: 0,
      totalPriceOfSelectbtc: 0,
      paymentType: "THB",
      promptpayQRlink: "",
      BtcQRlink: "",
    };
  },
  async created() {
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }

    //get address
    await axios
      .get(MainURL + `/user/getAddress/${this.userID}`)
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

    //get list in cart
    let apiURL = MainURL + `/cart/list/${this.userID}`;
    await axios.get(apiURL).then((res) => {
      this.lawCart = res.data;
    });
    if (this.lawCart.length) {
      for (let lawCarts of this.lawCart) {
        apiURL = MainURL + `/product/getPD/${lawCarts.productID}`;
        await axios.get(apiURL).then((res) => {
          this.CartProductList.push({
            IDinDBcart: lawCarts._id,
            ProductID: lawCarts.productID,
            count: lawCarts.count,
            countInStock: res.data.count,
            ProductName: res.data.PDname,
            price: res.data.price,
            img: res.data.img,
          });
        });
      }
    }

    //get BTC rate price
    this.btc = await BTCprice();
  },
  methods: {
    async delFromCart(ListIDinCart) {
      //this.CartProductList.splice(index,1)
      let apiURL = MainURL + `/cart/delFromCart/${ListIDinCart}`;
      //console.log(apiURL)
      let indexOfArray = this.CartProductList.findIndex(
        (i) => ListIDinCart === i.IDinDBcart
      );

      await axios
        .delete(apiURL)
        .then(() => {
          this.CartProductList.splice(indexOfArray, 1);
          this.$emit("update-cart");
        })
        .catch((err) => {
          console.log(err);
        });
      this.Listcheckeds = [];
      this.totalPrice();
    },
    async saveCountInCart(currentCount, index) {
      if (currentCount == "" || currentCount == 0) {
        this.CartProductList[index].count = 1;
      } else if (currentCount > 99) {
        this.CartProductList[index].count = 99;
      }
      let apiURL =
        MainURL + `/cart/updateCount/${this.CartProductList[index].IDinDBcart}`;
      await axios
        .put(apiURL, { count: this.CartProductList[index].count })
        .then(() => {
          this.$emit("update-cart");
        })
        .catch((err) => {
          console.log(err);
        });
      this.totalPrice();
    },
    checkCount(inCart, inStock, IDinDBcart) {
      //console.log(inCart+"-"+inStock)
      //console.log(inStock >= inCart)
      if (inStock >= inCart) {
        //console.log(this.Listchecked)
        //console.log(IDinDBcart)
        //
        return true;
      } else {
        let countloop = 0;
        for (let i of this.Listcheckeds) {
          if (this.CartProductList[i].IDinDBcart === IDinDBcart) {
            this.Listcheckeds.splice(countloop, 1);
          }
          countloop++;
        }
        /*for(let i = 0;i<this.Listcheckeds.length;i++){
          if(this.Listcheckeds[i] === IDinDBcart){
            this.Listcheckeds.splice(i,1)
            break;
          } 
        }*/
        //this.totalPrice()
        return false;
      }

      //
    },
    priceInBTC(thb) {
      return (thb / this.btc).toFixed(7);
    },
    totalPrice() {
      let sum = 0;
      for (let i of this.Listcheckeds) {
        sum += this.CartProductList[i].count * this.CartProductList[i].price;
      }
      this.totalPriceOfSelect = sum;
      this.totalPriceOfSelectbtc = this.priceInBTC(sum);
      this.promptpayQRlink = `https://qrmango.com/promptpay/qr?pp_no=${promPayID}&amount=${this.totalPriceOfSelect}&size=300`;
      this.BtcQRlink = `https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&amount=${this.totalPriceOfSelectbtc}&address=${BTCaddress}`;
    },
    async confirmPayment() {
      //add data to history DB
      let total = 0;
      if (this.paymentType == "THB") {
        total = this.totalPriceOfSelect;
      } else {
        total = this.totalPriceOfSelectbtc;
      }

      let detail = [];

      for (let i of this.Listcheckeds) {
        let price = 0;
        if (this.paymentType == "THB") {
          price = this.CartProductList[i].price;
        } else {
          price = this.priceInBTC(this.CartProductList[i].price);
        }
        let objDetail = {
          productID: this.CartProductList[i].ProductID,
          productName: this.CartProductList[i].ProductName,
          count: this.CartProductList[i].count,
          price: price,
        };
        detail.push(objDetail);
      }

      let apiUrl = MainURL + `/buy_history/addHistory/`;
      let history = {};
      history.userID = this.userID;
      history.detail = detail;
      history.total = total;
      history.paymentType = this.paymentType;
      history.address = this.address;

      let delcart = true;
      await axios
        .post(apiUrl, history)
        .then((res) => {
          console.log(res.data.msg);

          alert("การสั่งซื้อเสร็จสิ้น");
        })
        .catch((err) => {
          console.log(err);
          delcart = false;
          alert("!การสั่งซื้อไม่สำเร็จ เกิดข้อผิดพลาดบางอย่าง");
        });

        //del product from cart and update count in Stock
      if (delcart) {
        
        for (let i of this.Listcheckeds) {
          //del product from cart
          apiUrl =
            MainURL +
            `/cart/delFromCart/${this.CartProductList[i].IDinDBcart}/`;
          await axios
            .delete(apiUrl)
            .then(() => {
              this.$emit("update-cart");
            })
            .catch((err) => {
              console.log(err);
            });

          //updte count i Stock
          apiUrl = MainURL + `/product/updateCount/${this.CartProductList[i].ProductID}`
          let minusCount  = ((this.CartProductList[i].count)-((this.CartProductList[i].count)*2))
          console.log(minusCount)
          await axios.put(apiUrl,{count: minusCount}).then(() =>{}).catch((err)=>{
            console.log(err)
          });

        }
        
        
      }
      this.$router.push("/");
    },
    GoToAddressSetting(){
        this.$router.push("/addressSetting")
    },
  },
};
</script>
