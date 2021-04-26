<template>
  <div class="container">
    <h2>Add new Product</h2>
    <form @submit.prevent="newPD">
      <input placeholder="name" type="text" required v-model="product.name" />
      <input
        placeholder="price"
        type="number"
        required
        v-model="product.price"
      />
      <input
        placeholder="count"
        type="number"
        required
        v-model="product.count"
      />
      <input
        placeholder="imageURL"
        type="text"
        
        v-model="product.url"
      />
      <br>
      <input type="text" placeholder="Review Link" v-model="product.review">
      <br>
      <select name="type" id="" v-model="product.type">
        <option value="CPU">CPU</option>
        <option value="RAM">RAM</option>
        <option value="Mainboard">Mainboard</option>
        <option value="VGA">VGA</option>
        <option value="HDD-SSD">HDD-SSD</option>
        <option value="PSU">PSU</option>
        <option value="Case">Case</option>
        <option value="cooler">Cooler</option>
        <option value="more">อื่นๆ</option>
      </select>
      <input type="text" placeholder="(cpu,mainboard)socket" v-model="product.more.socket">
      <input type="number" placeholder="(ram,,mainboard)DIMM" v-model="product.more.DIMM">
      <br>
      <input type="submit" value="add product" />
    </form>
  </div>
  <div><h1>{{error}}</h1></div>
</template>
<script>
import axios from "axios";
import { MainURL } from "../js/MainUrl";

export default {
  data() {
    return {
      product: {
        name: "",
        price: "",
        count: "",
        url: "",
        type:'',
        more:{socket:'',DIMM:''},
        review:''
      },
      error: ''
    };
  },
  methods: {
    newPD() {
      let apiURL = MainURL + "/product/addPD";
      axios
        .post(apiURL, this.product)
        .then((res) => {
          if (res.data.status == "error") {
            this.error = res.data.status
          } else {
            this.error = ''
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>