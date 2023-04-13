var request = require('request');

async function run() {
  request({
    'rejectUnauthorized': false,
    'url': `https://www.g2.com/products/crisp/reviews.html?focus_review=5266520&page=1&product_id=crisp`,
    'method': "GET",
  }, function (error, response, body) {
    console.log(body)
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body).data
      console.log(results)
    }
    if (error) { console.log(error) }
  })
}


run()