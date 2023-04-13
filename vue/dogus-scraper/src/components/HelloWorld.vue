<template>
  <div>
  <div class="input">
    <select v-model="selected">
      <option v-for="(brand,i) in brands" :key="i" v-bind:value="brand.value">
        {{ brand }}
      </option>
    </select>
    <button @click="fetchCars()"> Listele </button>
  </div>
  <div v-if="results.length > 0">
    <h1>Sonuçlar</h1>
    <div class="cars">
    <div class="car" v-for="(car,i) in results" :key="i">
      <div><img alt="Vue logo" :src=getImgPath(car)></div>
      <div class="carInfo">
        <h2>{{car.submodelname}}</h2>
        <div v-for="(dealer,i) in car.vehiclereservedealer" :key="i">
          <div v-if="dealer.isoptiontocustomer"> 
            <p class="green">REZERVE EDİLEBİLİR.</p>
          </div>
          <div v-else> 
            <p class="red">OPSİYONLU</p> 
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      brands: ['Volkswagen'],
      car: 'VW Golf',
      results: []
    }
  },
  methods: {
    fetchCars() {
      // let url = "https://www.dogusoto.com.tr/api/vehicle/getvehiclelist/golf-cd1";
      let url = "http://localhost:8000/cars"
      axios.get(url).then((response) => {
        console.log(response)
        // this.results = response.data.data
      })
    },
    getImgPath(car) {
      return `https://www.dogusoto.com.tr${car.listimagepath}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  margin: 2rem;
}
.cars {
  display:flex;
  flex-wrap:wrap;
}
.car {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
}
p {
  text-align:start;
}

.green {
color: green;
}

.red {
color: red;
}
</style>
