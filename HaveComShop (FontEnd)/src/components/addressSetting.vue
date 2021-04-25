<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <h2>ตั้งค่าชื่อและที่อยู่</h2>
    </div>
    <form @submit.prevent="saveData">
      <div class="form-group">
        <div class="row mt-5">
          <div class="col-md-6">
            <label for="firstname" class="font-25">ชื่อ</label>
            <input
              type="text"
              id="firstname"
              class="form-control"
              v-model="first_name"
              maxlength="35"
              required
            />

            <label for="phone" class="font-25 mt-3">เบอร์โทรศัพท์</label>
            <input
              type="number"
              id="phone"
              class="form-control"
              maxlength="10"
              min="0"
              required
              v-model="phone"
            />
          </div>

          <div class="col-md-6">
            <label for="lastname" class="font-25">นามสกุล</label>
            <input
              type="text"
              id="lastname"
              class="form-control"
              v-model="last_name"
              maxlength="35"
              required
            />
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <div class="row">
          <div class="col-md-4">
            <label for="homenumber" class="font-25">บ้านเลขที่</label>
            <input
              type="text"
              id="homenumber"
              maxlength="35"
              required
              class="form-control"
              v-model="address.number"
            />
          </div>
          <div class="col-md-4">
            <label for="moo" class="font-25">หมู่</label>
            <input
              type="number"
              id="moo"
              maxlength="35"
              class="form-control"
              v-model="address.moo"
            />
          </div>
          <div class="col-md-4">
            <label for="road" class="font-25">ถนน</label>
            <input
              type="text"
              id="road"
              maxlength="35"
              class="form-control"
              v-model="address.road"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            <label for="tumbon" class="font-25">ตำบล</label>
            <input
              type="text"
              required
              id="tumbon"
              maxlength="35"
              class="form-control"
              v-model="address.tumbon"
            />
          </div>
          <div class="col-md-4">
            <label for="aumper" class="font-25">อำเภอ</label>
            <input
              type="text"
              required
              id="aumper"
              maxlength="35"
              class="form-control"
              v-model="address.aumper"
            />
          </div>
          <div class="col-md-4">
            <label for="city" class="font-25">จังหวัด</label>
            <input
              type="text"
              required
              id="city"
              maxlength="35"
              class="form-control"
              v-model="address.city"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="code" class="font-25">รหัสไปรษณีย์</label>
          <input
            type="number"
            required
            id="code"
            maxlength="35"
            class="form-control"
            v-model="address.code"
          />
        </div>
      </div>
      <div class="form-group mt-4">
        <div class="d-flex justify-content-center">
          <button class="btn btn-info" type="submit">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { checklogin } from "./js/verify.js";
import { MainURL } from "./js/MainUrl";
import axios from "axios";

export default {
  props: ["Inlogin", "userID", "cart"],
  data() {
    return {
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
    };
  },
  methods: {
    saveData() {
        let data = {}
        data.first_name = this.first_name;
        data.last_name = this.last_name;
        data.address = this.address
        let apiUrl = MainURL + `/user/updateAddress/${this.userID}`
        console.log(data)
        axios.post(apiUrl,data).then((res)=>{
            if(res.data.status == 'success'){
                alert('บันทึกข้อมูลใหม่เสร็จสิ้น')
            }
        }).catch(err =>{            
            console.log(err)
        })
    },
  },

  async created() {
    //login check
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }

    //get current address
    let apiUrl = MainURL + `/user/getAddress/${this.userID}`;

    await axios
      .get(apiUrl)
      .then((res) => {
        //console.log(res.data);
        this.first_name = res.data.first_name;
        this.last_name = res.data.last_name;
        this.address.number = res.data.number;
        this.phone = res.data.phone;
        if (res.data.road !== "") {
          this.address.road = res.data.road;
        }
        if (res.data.moo !== "") {
          this.address.moo = res.data.moo;
        }

        this.address.tumbon = res.data.tumbon;
        this.address.aumper = res.data.aumper;
        this.address.city = res.data.city;
        this.address.code = res.data.code;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>