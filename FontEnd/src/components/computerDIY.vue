<template>
  <div class="maindivDIYpage mt-3">
    <h2 class="d-flex justify-content-center">เลือกทุกชิ้นตามที่คุณต้องการ</h2>
    <div class="row">
      <div class="col-md-3">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <!--cpu-->
          <a
            class="nav-link bg-dark text-light active"
            id="v-pills-cpu-tab"
            data-toggle="pill"
            href="#v-pills-cpu"
            role="tab"
            aria-controls="v-pills-cpu"
            aria-selected="true"
            @click="updateShowCPU"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 90px"
            >
              <h3>CPU</h3>
              <img
                v-if="selectCPU"
                :src="selectCPU.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--mainboard-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-Mainboard-tab"
            data-toggle="pill"
            href="#v-pills-Mainboard"
            role="tab"
            aria-controls="v-pills-Mainboard"
            aria-selected="false"
            @click="updateShowMainboard"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>Mainboard</h3>
              <img
                v-if="selectMainboard"
                :src="selectMainboard.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--ram-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-ram-tab"
            data-toggle="pill"
            href="#v-pills-ram"
            role="tab"
            aria-controls="v-pills-ram"
            aria-selected="false"
            @click="updateShowRam"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>Ram</h3>
              <img
                v-if="selectRam"
                :src="selectRam.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--vga-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-vga-tab"
            data-toggle="pill"
            href="#v-pills-vga"
            role="tab"
            aria-controls="v-pills-vga"
            aria-selected="false"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>VGA</h3>
              <img
                v-if="selectVGA"
                :src="selectVGA.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--storage-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-storage-tab"
            data-toggle="pill"
            href="#v-pills-storage"
            role="tab"
            aria-controls="v-pills-storage"
            aria-selected="false"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>Storage</h3>
              <img
                v-if="selectStorage"
                :src="selectStorage.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--PSU-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-psu-tab"
            data-toggle="pill"
            href="#v-pills-psu"
            role="tab"
            aria-controls="v-pills-psu"
            aria-selected="false"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>PSU</h3>
              <img
                v-if="selectPSU"
                :src="selectPSU.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--Case-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-case-tab"
            data-toggle="pill"
            href="#v-pills-case"
            role="tab"
            aria-controls="v-pills-case"
            aria-selected="false"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>Case</h3>
              <img
                v-if="selectCase"
                :src="selectCase.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>

          <!--cooler-->
          <a
            class="nav-link bg-dark text-light mt-1"
            id="v-pills-cooler-tab"
            data-toggle="pill"
            href="#v-pills-cooler"
            role="tab"
            aria-controls="v-pills-cooler"
            aria-selected="false"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 100px"
            >
              <h3>Cooler</h3>
              <img
                v-if="selectCooler"
                :src="selectCooler.img"
                alt=""
                style="width: 80px"
                class="ml-3"
              />
            </div>
          </a>
        </div>
      </div>
      <!--center-->
      <div class="col-md-2">
        <!--CPU-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 106px">
          <div v-if="selectCPU" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delCpu"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectCPU.PDname }}</h6>
            <div class="d-inline-block">
              <h5 class="card-text" id="price">
                {{ selectCPU.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectCPU.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--mainboard-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectMainboard" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delMainboard"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectMainboard.PDname }}</h6>
            <div class="d-inline-block">
              <h5 class="card-text" id="price">
                {{ selectMainboard.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectMainboard.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--ram-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectRam" class="ml-1 " style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delRam"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectRam.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectRam.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectRam.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--vga-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectVGA" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delVga"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectVGA.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectVGA.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectVGA.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--storage-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectStorage" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delStorage"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectStorage.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectStorage.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectStorage.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--psu-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectPSU" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delPsu"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectPSU.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectPSU.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectPSU.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--case-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectCase" class="ml-1 " style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delCase"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectCase.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectCase.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectCase.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
        <!--cooler-->
        <div class="border border-secondary rounded mb-1 overflow-auto" style="height: 116px">
          <div v-if="selectCooler" class="ml-1" style="height: 100%">
            <button
              class="btn btn-danger float-right"
              @click="delCooler"
              style="height: 40px"
            >
              X
            </button>
            <h6 class="card-title mb-1">{{ selectCooler.PDname }}</h6>
            <div class="d-inline-block" >
              <h5 class="card-text" id="price">
                {{ selectCooler.price.toLocaleString() }} THB
              </h5>
              <h6 class="card-text" id="price">
                {{ priceInBTC(selectCooler.price).toLocaleString() }} BTC
              </h6>
            </div>
          </div>
        </div>
      </div>

      <!--SHOW-->
      <div class="col-md-7">
        <div
          class="tab-content border border-info"
          id="v-pills-tabContent"
          style="height: 950px"
        >
          <!--CPU-->
          <div
            style="height: 100%"
            class="tab-pane fade show active overflow-auto"
            id="v-pills-cpu"
            role="tabpanel"
            aria-labelledby="v-pills-cpu-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(cpu, index) in showCPU"
                :key="index"
                
              >
                <div class="card" v-if="cpu.count > 0" @click="selCPU(cpu)">
                  <img :src="cpu.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ cpu.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ cpu.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(cpu.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="cpu.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ cpu.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--mainboard-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-Mainboard"
            role="tabpanel"
            aria-labelledby="v-pills-Mainboard-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(mainboard, index) in showMainboard"
                :key="index"
                
              >
                <div class="card" v-if="mainboard.count > 0" @click="selmainboard(mainboard)">
                  <img :src="mainboard.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ mainboard.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ mainboard.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(mainboard.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="mainboard.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ mainboard.PDname }}</h6>
                   <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--ram-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-ram"
            role="tabpanel"
            aria-labelledby="v-pills-ram-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(ram, index) in showRam"
                :key="index"
                
              >
                <div class="card" v-if="ram.count > 0" @click="selRam(ram)">
                  <img :src="ram.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ ram.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ ram.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(ram.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="ram.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ ram.PDname }}</h6>
                   <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--VGA-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-vga"
            role="tabpanel"
            aria-labelledby="v-pills-vga-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(vga, index) in showVGA"
                :key="index"
                
              >
                <div class="card" v-if="vga.count > 0" @click="selVGA(vga)">
                  <img :src="vga.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ vga.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ vga.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(vga.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="vga.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ vga.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--storage-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-storage"
            role="tabpanel"
            aria-labelledby="v-pills-storage-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(storage, index) in showStorage"
                :key="index"
                
              >
                <div class="card" v-if="storage.count > 0" @click="selStorage(storage)">
                  <img :src="storage.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ storage.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ storage.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(storage.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="storage.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ storage.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--PSU-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-psu"
            role="tabpanel"
            aria-labelledby="v-pills-psu-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(psu, index) in showPSU"
                :key="index"
                
              >
                <div class="card" v-if="psu.count > 0" @click="selPSU(psu)">
                  <img :src="psu.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ psu.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ psu.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(psu.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="psu.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ psu.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Case-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-case"
            role="tabpanel"
            aria-labelledby="v-pills-case-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(Case, index) in showCase"
                :key="index"
                
              >
                <div class="card" v-if="Case.count > 0" @click="selCase(Case)">
                  <img :src="Case.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ Case.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ Case.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(Case.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="Case.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ Case.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--cooler-->
          <div
            style="height: 100%"
            class="tab-pane fade overflow-auto"
            id="v-pills-cooler"
            role="tabpanel"
            aria-labelledby="v-pills-cooler-tab"
          >
            <div class="row">
              <div
                class="col-lg-3"
                v-for="(cooler, index) in showCooler"
                :key="index"
                
              >
                <div class="card" v-if="cooler.count > 0" @click="selCooler(cooler)">
                  <img :src="cooler.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ cooler.PDname }}</h6>
                    <h5 class="card-text" id="price">
                      {{ cooler.price.toLocaleString() }} THB
                    </h5>
                    <h6 class="card-text" id="price">
                      {{ priceInBTC(cooler.price) }}
                      <img
                        src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                        style="max-width: 12%"
                      />
                    </h6>
                  </div>
                </div>
                <div class="card" v-else>
                  <img :src="cooler.img" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{{ cooler.PDname }}</h6>
                    <h4 class="card-text text-danger" id="price">สินค้าหมด</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-4 mb-5">
        <div class="row">
          <div class="col-md-3">
            <div v-if="paymentType == 'THB'">
              <h2>
                ราคารวมทั้งสิ้น {{ totalPrice("THB").toLocaleString() }} ฿
              </h2>
            </div>
            <div v-else>
              <h2>
                ราคารวมทั้งสิ้น {{ totalPrice("BTC").toLocaleString() }}
                <img
                  src="https://drive.google.com/uc?export=view&id=1ldi5YT6pk21W3SBj1dr0zggtlwPcKV3m"
                  style="max-width: 28px"
                />
              </h2>
            </div>
          </div>
          <div class="col-md-3" >
            <div>
              <h4 class="d-flex justify-content-center">ต้องการชำระด้วย?</h4>
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

                  <label class="form-check-label" for="PaymentType">
                    เงินบาท
                  </label>
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
                  <label class="form-check-label" for="PaymentType2">
                    Bitcoin
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div v-if="readyToPay()" class="col-md-6 border">
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
    </div>
    <div class="container mt-1 mb-5" v-if="readyToPay()">
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
  <!--<div>
    <p>/*test*/</p>
    <h4>CPU socket{{ CPUsocket }}</h4>
    <h4>mainboard socket{{ MBsocket }}</h4>
    <h4>mainboard DIMM{{ mbDIMM }}</h4>
    <h4>ram DIMM{{ ramDIMM }}</h4>
  </div>
  -->
</template>
<script>
import { MainURL } from "./js/MainUrl";
import axios from "axios";
import { promPayID } from "./js/prompPayID";
import { BTCaddress } from "./js/bitcoinAddress";
import { checklogin } from "./js/verify.js";

export default {
  emits: ["set-nav", "update-cart"],
  props: ["Inlogin", "userID", "cart"],
  data() {
    return {
      login: false,
      btc: null,

      allCPU: [],
      allMainboard: [],
      allVGA: [],
      allRam: [],
      allStorage: [],
      allPSU: [],
      allCase: [],
      allCooler: [],

      showCPU: [],
      showMainboard: [],
      showVGA: [],
      showRam: [],
      showStorage: [],
      showPSU: [],
      showCase: [],
      showCooler: [],

      selectCPU: null,
      selectMainboard: null,
      selectRam: null,
      selectVGA: null,
      selectStorage: null,
      selectPSU: null,
      selectCase: null,
      selectCooler: null,

      CPUsocket: "",
      MBsocket: "",
      mbDIMM: "",
      ramDIMM: "",

      paymentType: "THB",
      address: "",

      totalPriceTHB: null,
      totalPriceBTC: null,

      promptpayQRlink: "",
      BtcQRlink: "",
    };
  },
  methods: {
    selCPU(select) {
      this.selectCPU = select;
      this.CPUsocket = select.detail.socket;
    },
    selmainboard(select) {
      this.selectMainboard = select;
      this.MBsocket = select.detail.socket;
      this.mbDIMM = select.detail.DIMM;
    },
    selRam(select) {
      this.selectRam = select;
      this.ramDIMM = select.detail.DIMM;
    },
    selVGA(select) {
      this.selectVGA = select;
    },
    selStorage(select) {
      this.selectStorage = select;
    },
    selPSU(select) {
      this.selectPSU = select;
    },
    selCase(select) {
      this.selectCase = select;
    },
    selCooler(select) {
      this.selectCooler = select;
    },

    delCpu() {
      this.selectCPU = null;
      this.CPUsocket = null;
      this.updateShowMainboard();
    },
    delMainboard() {
      this.selectMainboard = null;
      this.MBsocket = null;
      this.mbDIMM = null;
      this.updateShowRam();
      this.updateShowCPU();
    },
    delRam() {
      this.selectRam = null;
      this.ramDIMM = null;
      this.updateShowMainboard();
    },
    delVga() {
      this.selectVGA = null;
    },
    delStorage() {
      this.selectStorage = null;
    },
    delPsu() {
      this.selectPSU = null;
    },
    delCase() {
      this.selectCase = null;
    },
    delCooler() {
      this.selectCooler = null;
    },
    updateShowCPU() {
      if (this.MBsocket) {
        let socket = this.MBsocket;
        let arr = [];
        for (let cpu of this.allCPU) {
          if (cpu.detail.socket === socket) {
            arr.push(cpu);
          }
        }
        this.showCPU = arr;
      } else {
        this.showCPU = this.allCPU;
      }
    },
    updateShowRam() {
      if (this.mbDIMM) {
        let DIMM = this.mbDIMM;
        let arr = [];
        for (let ram of this.allRam) {
          if (ram.detail.DIMM <= DIMM) {
            arr.push(ram);
          }
        }
        this.showRam = arr;
      } else {
        this.showRam = this.allRam;
      }
    },
    updateShowMainboard() {
      let socket = this.CPUsocket;
      let DIMM = this.ramDIMM;
      let arr = [];
      let arr2 = [];
      if (socket && DIMM) {
        for (let mainboard of this.allMainboard) {
          if (mainboard.detail.socket === socket) {
            arr.push(mainboard);
          }
        }
        for (let mainboard of arr) {
          if (mainboard.detail.DIMM >= DIMM) {
            arr2.push(mainboard);
          }
        }
        this.showMainboard = arr2;
      } else if (socket && !DIMM) {
        for (let mainboard of this.allMainboard) {
          if (mainboard.detail.socket === socket) {
            arr.push(mainboard);
          }
        }
        this.showMainboard = arr;
      } else if (!socket && DIMM) {
        for (let mainboard of this.allMainboard) {
          if (mainboard.detail.DIMM >= DIMM) {
            arr.push(mainboard);
          }
        }
        this.showMainboard = arr;
      } else {
        this.showMainboard = this.allMainboard;
      }
    },
    readyToPay() {
      if (
        this.selectCPU &&
        this.selectMainboard &&
        this.selectRam &&
        this.selectVGA &&
        this.selectStorage &&
        this.selectPSU &&
        this.selectCase &&
        this.selectCooler
      ) {
        return true;
      }
      return false;
    },
    priceInBTC(thb) {
      return (thb / this.btc).toFixed(7);
    },
    totalPrice(type) {
      let total = 0;
      if (this.selectCPU) {
        total += this.selectCPU.price;
      }
      if (this.selectMainboard) {
        total += this.selectMainboard.price;
      }
      if (this.selectRam) {
        total += this.selectRam.price;
      }
      if (this.selectVGA) {
        total += this.selectVGA.price;
      }
      if (this.selectStorage) {
        total += this.selectStorage.price;
      }
      if (this.selectPSU) {
        total += this.selectPSU.price;
      }
      if (this.selectCase) {
        total += this.selectCase.price;
      }
      if (this.selectCooler) {
        total += this.selectCooler.price;
      }
      this.totalPriceTHB = total;
      this.totalPriceBTC = this.priceInBTC(total);
      this.promptpayQRlink = `https://qrmango.com/promptpay/qr?pp_no=${promPayID}&amount=${this.totalPriceTHB}&size=300`;
      this.BtcQRlink = `https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&amount=${this.totalPriceBTC}&address=${BTCaddress}`;
      if (type == "THB") {
        return total;
      } else {
        return this.totalPriceBTC;
      }
    },
    async confirmPayment() {
      //add to history DB
      let total = 0;
      if (this.paymentType == "THB") {
        total = this.totalPriceTHB;
      } else {
        total = this.totalPriceBTC;
      }

      let arrOfProduct = [
        this.selectCPU,
        this.selectMainboard,
        this.selectRam,
        this.selectVGA,
        this.selectStorage,
        this.selectPSU,
        this.selectCase,
        this.selectCooler,
      ];
      let detail = [];
      for (let i of arrOfProduct) {
        let price = 0;
        if (this.paymentType == "THB") {
          price = i.price;
        } else {
          price = this.priceInBTC(i.price);
        }
        let objDetail = {
          productID: i._id,
          productName: i.PDname,
          count: 1,
          price: price,
        };
        detail.push(objDetail);
      }

      let history = {};
      history.userID = this.userID;
      history.detail = detail;
      history.total = total;
      history.paymentType = this.paymentType;
      history.build = true;
      history.address = this.address;
      let apiUrl = MainURL + "/buy_history/addHistory/";

      let updatecount = true;
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
        for (let i of detail) {
          apiUrl = MainURL + `/product/updateCount/${i.productID}`;
          await axios
            .put(apiUrl, { count: -1 })
            .then(() => {})
            .catch((err) => {
              if (err) {
                console.log(err);
              }
            });
        }
      }
      this.$router.push("/");
    },
    GoToAddressSetting(){
        this.$router.push("/addressSetting")
    },
  },

  async created() {
    //login check
    const loingdata = await checklogin();
    this.login = loingdata.login;
    if (!this.login) {
      this.$router.push("/login");
    }

    await axios.get("https://api.bitkub.com/api/market/ticker").then((res) => {
      this.btc = res.data.THB_BTC.last;
    });

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

  //get product data
    await axios
      .get(MainURL + "/product/getPD/CPU")
      .then((res) => {
        this.allCPU = res.data;
        this.showCPU = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/Mainboard")
      .then((res) => {
        this.allMainboard = res.data;
        this.showMainboard = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/RAM")
      .then((res) => {
        this.allRam = res.data;
        this.showRam = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/VGA")
      .then((res) => {
        this.allVGA = res.data;
        this.showVGA = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/HDD-SSD")
      .then((res) => {
        this.allStorage = res.data;
        this.showStorage = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/PSU")
      .then((res) => {
        this.allPSU = res.data;
        this.showPSU = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/Case")
      .then((res) => {
        this.allCase = res.data;
        this.showCase = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(MainURL + "/product/getPD/cooler")
      .then((res) => {
        this.allCooler = res.data;
        this.showCooler = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(this.allCPU)
  },
};
</script>
