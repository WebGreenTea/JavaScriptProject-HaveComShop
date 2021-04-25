<template>
  <div class="container mt-5">
    <div class="container pl-5 pr-5 pb-5 d-flex justify-content-center">
      <h2>เปลี่ยนรหัสผ่าน</h2>
    </div>
    <div class="d-flex justify-content-center">
      <div style="width: 50%" class="">
        <form @submit.prevent="saveNewPass">
          <div class="form-group">
            <p style="color:red;">{{ error }}</p>
            <label for="currentPass" class="font-25">รหัสผ่านปัจจุบัน</label>
            <input
              id="currentPass"
              type="password"
              required
              maxlength="35"
              class="form-control"
              v-model="currentPass"
            />
          </div>
          <div class="form-group">
            <label for="newPass" class="font-25">รหัสผ่านใหม่</label>
            <input
              id="newPass"
              type="password"
              required
              maxlength="35"
              class="form-control"
              pattern=".{8,}"
              title="8 characters minimum"
              v-model="newPass"
            />
            <label for="newPassCon" class="font-25">ยืนยันรหัสผ่านใหม่</label>
            <input
              id="newPassCon"
              type="password"
              required
              maxlength="35"
              class="form-control"
              v-model="ConNewPass"
            />
            <div
              class="d-flex justify-content-end"
              v-if="!checkConfirm() && newPass != '' && ConNewPass != ''"
            >
              <p style="color: red">*ยืนยันรหัสผ่านผิด</p>
            </div>
          </div>
          <div class="form-group d-flex justify-content-center">
            <button
              type="submit"
              class="btn btn-info"
              :disabled="!checkConfirm()"
            >
              ตกลง
            </button>
          </div>
        </form>
      </div>
    </div>
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
      currentPass: "",
      newPass: "",
      ConNewPass: "",
      error: null,
    };
  },
  methods: {
    checkConfirm() {
      if (this.newPass === "" || this.newPass != this.ConNewPass) {
        return false;
      } else {
        return true;
      }
    },
    async saveNewPass() {
      let apiURL = MainURL + `/user/changePassword/${this.userID}`;
      await axios
        .put(apiURL, {
          currentPassword: this.currentPass,
          newPassword: this.newPass,
        })
        .then((res) => {
          if (res.data.status == "success") {
            alert("เปลี่ยนรหัสผ่านเสร็จสิ้น");
          } else {
            this.error = "*รหัสผ่านผิด";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    //login check
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }
  },
};
</script>