var axios = require('axios');
var ejs = require('ejs');
// import indexStyle from '/css/style.css';



function tickets(req, res) {

    if (req.params.pageNo === undefined)
        req.params.pageNo = 1;

    var config = {
        auth: {
            // username: process.env.USERNAME,
            username:"singh.kajal940@gmail.com",
            password: process.env.PASSWORD
        }
    };
    //console.log("ok"+config.auth.username);
    //console.log('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets.json?page='+req.params.pageNo+'&per_page=25',config);
    axios.get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets.json?page=' + req.params.pageNo + '&per_page=25', config)
        .then(function (response) {

            var lastPage = Math.ceil(response.data.count / 25);
            response.data.pageNo = req.params.pageNo;
            response.data.bPrevious = (req.params.pageNo > 1 ? "" : "disabled");
            response.data.bNext = (req.params.pageNo < lastPage ? "" : "disabled");

            ejs.renderFile('./views/tickets.ejs', response.data, function (err, result) {
                if (!err) {
                    res.status(200).send(result);
                }
                // render or error
                else {
                    res.status(404).send(

                    `'<link rel=\'stylesheet\' href=\'/css/style.css\' /><div class="container">
                        <div class="container-fluid">
                       
                            404 Page Not Found
                      
                      <div class="copyright">
                      &copy; by <a href="https://www.linkedin.com/in/kajal1106/" target="_blank" class="link">Kajal Singh.</a> Powered
                      by
                      <a href="https://www.zendesk.com/" target="_blank" class="link">Zendesk</a>.
                    </div>
                      </div>'`)
                    };
            });

        })
        .catch(function (error) {
            res.status(404).send(
            `'<link rel=\'stylesheet\' href=\'/css/style.css\' /><div class="container">
            
            400 invalid page requested or API not available

          <div class="copyright">
          &copy; by <a href="https://www.linkedin.com/in/kajal1106/" target="_blank" class="link">Kajal Singh.</a> Powered
          by
          <a href="https://www.zendesk.com/" target="_blank" class="link">Zendesk</a>.
        </div>
          </div>'`
            );
        });
}

exports.tickets = tickets;