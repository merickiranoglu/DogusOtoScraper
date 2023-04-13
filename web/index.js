let url = "https://www.dogusoto.com.tr/api/vehicle/getvehiclelist/golf-cd1";
axios
.get(url)
.then((response) => {
  console.log(response)
})