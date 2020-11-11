var axios = require('axios');
var ejs = require('ejs');


function tickets(req, res) {

    if (req.params.pageNo === undefined)
        req.params.pageNo = 1;

    var config = {
        auth: {
            username: process.env.USERNAME,
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
                    res.status(404).send('404 Page Not Found');
                }
            });

        })
        .catch(function (error) {
            res.status(404).send('400 invalid page requested or API not available');
        });
}

exports.tickets = tickets;