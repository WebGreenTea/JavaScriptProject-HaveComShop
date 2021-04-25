import { createWebHistory, createRouter } from "vue-router";
import mainPage from "@/components/mainPage.vue";
import register from "@/components/register.vue";
import login from "@/components/login.vue";
//import helloworld from "@/components/HelloWorld.vue";
import addPD from "@/components/admin/addPD.vue";
import productDetail from "@/components/productDetail.vue";
import cart from "../components/cart.vue";
import computerDIY from "../components/computerDIY.vue";
import buyNow from '@/components/buyNow.vue';
import addressSetting from '@/components/addressSetting.vue';
import passwordSetting from '@/components/passwordSetting.vue';
import history from '@/components/history.vue';


const routes = [
  {
    path: "/",
    name: "mainPage",
    component: mainPage,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  /*{
    path: "/helloworld",
    name: "helloworld",
    component: helloworld,
  },*/
  {
    path: "/addPD",
    name: "addPD",
    component: addPD,
  },
  {
    path: "/productDetail/:id",
    name: "productDetail",
    component: productDetail,
  },
  {
    path: "/buyNow/:id",
    name: "buyNow",
    component: buyNow,
  },
  {
    path: "/cart",
    name: "cart",
    component: cart,
  },
  {
    path: "/computerDIY",
    name: "computerDIY",
    component: computerDIY,
  },
  {
    path: "/addressSetting",
    name: "addressSetting",
    component: addressSetting,
  },
  {
    path: "/passwordSetting",
    name: "passwordSetting",
    component: passwordSetting,
  },
  {
    path: "/history",
    name: "history",
    component: history,
  },

  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;