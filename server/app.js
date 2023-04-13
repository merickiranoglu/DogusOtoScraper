const fs = require("fs")
const express = require("express");
const cors = require('cors');
var request = require('request');
const app = express();
const cars = require('./cars.json')
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors({
  origin: '*'
}))


var CronJob = require('cron').CronJob;
var job = new CronJob(
	'* * * * *',
	scrape,
	null,
	true,
	'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
job.start()



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const indexPage = fs.readFileSync("../web/index.html");

app.get("/", (req, res) => {
  res.write(indexPage);
  res.end();
});

app.get("/cars", async (req, res) => {
  
  const car = req.body.car
  const model = req.body.model


});

async function scrape() {
  await getResults('Volkswagen', 'Polo')
  await getResults('Volkswagen', 'Yeni Taigo')
  await getResults('Volkswagen', 'T-Cross')
  await getResults('Volkswagen', 'Golf')
  await getResults('Volkswagen', 'Passat')
  await getResults('Volkswagen', 'Passat Variant')
  await getResults('Volkswagen', 'Tiguan')
  await getResults('Volkswagen', 'Tiguan Allspace')
  await getResults('Volkswagen', 'Yeni T-Roc')
  await getResults('Volkswagen', 'Touareg')
}

async function getResults(car, model) {
  request({
    'rejectUnauthorized': false,
    'url': `https://www.dogusoto.com.tr/api/vehicle/getvehiclelist/${cars[car][model]}`,
    'method': "GET",
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body).data
      for (const carData of results) {
        const car = parseCar(carData)
        console.log(car)
      }
    }
    if (error) { console.log(error) }
  })
}

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function parseCar(data) {
  const baseUrl = 'https://www.dogusoto.com.tr'
  const car = {
    id: data.code,
    img: baseUrl +  data.listimagepath,
    brand: data.brandname,
    model: data.modelname,
    submodel: data.submodelname,
    color: data.colorname,
    colorHex: data.colorhexcode,
    permalink: data.permalink,
    year: data.year,
    price: data.price,
    hiddenpriceforbrandbyadmin: data.hiddenpriceforbrandbyadmin,
  }
  car.dealers = []

  data.vehiclereservedealer.map((dealer) => {
    car.dealers.push({
      isoptiontocustomer: dealer.isoptiontocustomer,
      dealername: dealer.dealername 
    })
  })

  return car;
}