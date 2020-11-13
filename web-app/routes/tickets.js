var axios = require('axios');
var ejs = require('ejs');

function tickets(req, res) {

  if (req.params.pageNo === undefined) 
    req.params.pageNo = 1;
    
  /* Setting Authorization to send along with the http request*/
  var config = {
    auth: {
      username: "singh.kajal940@gmail.com",
      password: process.env.PASSWORD
    }
  };
 
  /* Sending http get request using axios */
  axios
    .get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets.json?page=' + req.params.pageNo + '&per_page=25', config)
    .then(function (response) {

      var lastPage = Math.ceil(response.data.count / 25);
      response.data.pageNo = req.params.pageNo;
      response.data.bPrevious = (req.params.pageNo > 1
        ? ""
        : "disabled");
      response.data.bNext = (req.params.pageNo < lastPage
        ? ""
        : "disabled");

        /* Using the response form get Request and rendering it into the ticket.ejs page  */

      ejs.renderFile('./views/tickets.ejs', response.data, function (err, result) {
        if (!err) {
          res
            .status(200)
            .send(result       // render or error
            );

            /* If File not found throwing error 404 */ 
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
                    400 invalid page requested or API not available
                </h1>'`);
    });
}

exports.tickets = tickets;