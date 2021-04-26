
<template>
  <!-- Nav bar -->
  <!--<nav
    class="navbar navbar-dark bg-primary justify-content-center flex-nowrap flex-row"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand float-left"
        >HaveCOM SHOP</router-link
      >
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link to="/login" class="nav-link pr-3">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>-->
<div class="container-fulid  pt-5 pb-5">
  <div class="container pt-5 pl-5 pr-5 bg-dark text-light  border-custom">
    <div class="d-flex justify-content-center mb-5 bg-info text-light rounded-pill">
      <router-link to="/" class="text-light"><h1>HaveCOM SHOP</h1></router-link>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group ml-5 mr-5 pl-5 pr-5">
        <div class="text-warning"><h3>{{ errorstatus }}</h3></div>
      </div>
      
      <div class="form-group ml-5 mr-5 pl-5 pr-5">
        <label for="email" class="font-18">Email address</label>
        <input
          type="email"
          class="form-control"
          @click="disableErr"
          v-model="user.email"
          placeholder="email"
          maxlength="40"
          id="email"
        />
      </div>
      <div class="form-group ml-5 mr-5 pl-5 pr-5">
        <label for="username" class="font-18">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          @click="disableErr"
          v-model="user.username"
          placeholder="username"
          maxlength="15"
          required
        />
      </div>
      <div class="row">
        <div class="col-sm form-group pl-5 pr-3">
          <label for="name" class="font-18">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="user.first_name"
            placeholder="ชื่อ"
            maxlength="35"
            required
          />
        </div>
        <div class="col-sm form-group pl-3 pr-5">
          <label for="lastname" class="font-18">Last name</label>
          <input
            type="text"
            id="lastname"
            class="form-control"
            v-model="user.last_name"
            placeholder="นามสกุล"
            maxlength="35"
            required
          />
        </div>
      </div>
      <div class="form-group ml-5 mr-5 pl-5 pr-5">
        <label for="phone" class="font-18">Phone number</label>
        <input
          type="number"
          id="phone"
          class="form-control"
          v-model="user.phone"
          placeholder="เบอร์โทรศัพท์"
          maxlength="10"
          min="0"
          required
        />
      </div>
      <div class="form-group ml-5 mr-5 pl-5 pr-5 mt-5">
        <h4>ที่อยู่สำหรับการจัดส่ง</h4>
        <div class="border border-3 rounded-3 d-flex justify-content-center">
          <div class="form-group ml-5 mr-5 pl-5 pr-5 mt-2">
            <div class="mt-3">
              <input
              type="text"
              maxlength="35"
              required
              placeholder="บ้านเลขที่"
              v-model="user.address.number"
            />
            <input
              class="ml-4"
              type="number"
              maxlength="35"
              placeholder="หมู่"
              v-model="user.address.moo"
            />
            <input
              class="ml-4"
              type="text"
              maxlength="35"
              placeholder="ถนน"
              v-model="user.address.road"
            />
            </div>

            <div class="mt-3">
              <input
              type="text"
              maxlength="35"
              required
              placeholder="ตำบล"
              v-model="user.address.tumbon"
            />
            <input
              class="ml-4"
              type="text"
              maxlength="35"
              required
              placeholder="อำเภอ"
              v-model="user.address.aumper"
            />
            <input
              class="ml-4"
              type="text"
              maxlength="35"
              required
              placeholder="จังหวัด"
              v-model="user.address.city"
            />
            </div>
            
            <div class="mt-3">
              <input
              type="number"
              maxlength="6"
              required
              placeholder="รหัสไปรษณีย์"
              v-model="user.address.code"
            />
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-sm form-group pl-5 pr-3">
            <label class="font-18">รหัสผ่าน</label>
            <input
            class="form-control"
            
            type="password"
            pattern=".{8,}"
            title="8 characters minimum"
            v-model="user.password"
            placeholder="รหัสผ่าน"
            maxlength="35"
            required
          />
          </div>
          <div class="col-sm form-group pl-5 pr-3">
            <label class="font-18">ยืนยันรหัสผ่าน</label>
            <input
            class="form-control"
            
            v-model="ConPass"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            maxlength="35"
            required
          /><div class="text-warning" v-if="!checkConfirm() && user.password != '' && ConPass != ''">
            <p >*ยืนยันรหัสผ่านผิด</p>
          </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
          <p >มีบัญชีอยู่แล้ว? <router-link to="/login">Login</router-link> </p>
        </div>

        <div class="d-flex justify-content-center mt-2 pb-5">
          <button class="btn btn-info" type="submit" name="userReg" :disabled="!checkConfirm()">Register</button>
        </div>
        
      </div>
    </form>
  </div>
</div>
 
</template>

<script>
import axios from "axios";
import { MainURL } from "./js/MainUrl";

export default {
  name: "Register",
  emits: ["set-nav"],
  data() {
    return {
      user: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: {
          number: "",
          road: "",
          moo: "",
          tumbon: "",
          aumper: "",
          city: "",
          code: "",
        },
        password: "",
      },
      
      ConPass: "",
      errorstatus: "",
    };
  },
  methods: {
    checkConfirm() {
      if (this.user.password === "" || this.user.password != this.ConPass) {
        return false;
      } else {
        return true;
      }
    },
    
    handleSubmit() {
      let apiURL = MainURL + "/user/register";
      axios
        .post(apiURL, this.user)
        .then((res) => {
          if (res.data.status == "error") {
            this.errorstatus = "username or email already exist";
          } else {
            this.$router.push("login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    disableErr() {
      this.errorstatus = "";
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
