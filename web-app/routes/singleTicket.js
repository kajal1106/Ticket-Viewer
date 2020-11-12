var axios = require('axios');
var ejs = require('ejs');

function singleTicket(req, res) {

  var config = {
    auth: {
      // username: process.env.USERNAME,
      username: "singh.kajal940@gmail.com",
      password: process.env.PASSWORD
    }
  };

  axios
    .get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets/' + req.params.ticketId, config)
    .then(function (response) {

      ejs
        .renderFile('./views/singleTicket.ejs', response.data, function (err, result) {
          if (!err) {
            res
              .status(200)
              .send(result // render or error
              );
          } else {
            res
              .status(404)
              .send(`'<link rel=\'stylesheet\' href=\'/css/style.css\'/>
                        <h1 class="error-heading">
                         404 Page Not Found
                        </h1> '`);
          }
        });
    })
    .catch(function (error) {
      res
        .status(404)
        .send(`'<link rel=\'stylesheet\' href=\'/css/style.css\' >
                <h1 class="error-heading">
                    400 invalid ticket id requested or API not available
                </h1>'`);
    });
}
exports.singleTicket = singleTicket;