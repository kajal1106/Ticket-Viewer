var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");


describe("When loading home page. i.e. 1st page of list of tickets",function(){

  it("return page with previousButton nextButton and list of tickets",function(done){

    server
    .get("/")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('btnPrevious')).should.be.equal(true);
        (res.text.includes('btnNext')).should.be.equal(true);
        done();
    });
  });
});

describe("When user clicks next button from current page",function(){

  it("return page with previousButton nextButton and list of tickets for next pagination section",function(done){

    server
    .get("/2")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('btnPrevious')).should.be.equal(true);
        (res.text.includes('btnNext')).should.be.equal(true);
        done();
    });
  });
});

describe("When user clicks previous button from current page",function(){

  it("return page with previousButton nextButton and list of tickets for previous pagination section",function(done){

    server
    .get("/1")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('btnPrevious')).should.be.equal(true);
        (res.text.includes('btnNext')).should.be.equal(true);
        done();
    });
  });
});


describe("When user clicks detail view button to view single ticket details for ticket id 5",function(){

  it("return page with that ticket's detail information.",function(done){

    server
    .get("/ticket/5")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('Subject')).should.be.equal(true);
        (res.text.includes('Description')).should.be.equal(true);
        (res.text.includes('Status')).should.be.equal(true);
        (res.text.includes('Tags')).should.be.equal(true);
        done();
    });
  });
});



// Test Cases for ZenDesk Ticket Viewer
describe("Test Cases: Ticket List View - Direct URL Access.",function(){

  it("GET /  base url should respond 200 OK with list of tickets",function(done){

    server
    .get("/")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('btnPrevious')).should.be.equal(true);
        (res.text.includes('btnNext')).should.be.equal(true);
        done();
    });
  });

  it("GET /2  get 2st page for ticket list. should respond 200 OK with list of tickets",function(done){

    server
    .get("/1")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('btnPrevious')).should.be.equal(true);
        (res.text.includes('btnNext')).should.be.equal(true);
        done();
    });
  });

  it("GET /8989  get 8989th page which does not exists. should respond 404 Not Found",function(done){

    server
    .get("/8989")    
    .expect("Content-type",/html/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){                    
        (res.text.includes('Page Not Found')).should.be.equal(true);      
        done();
    });
  });

  it("GET /ramdom-text  Write invalid url. should respond 404 Not Found",function(done){

    server
    .get("/ramdom-text")    
    .expect("Content-type",/html/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){                    
        (res.text.includes('API not available or invalid page requested.')).should.be.equal(true);      
        done();
    });
  });

});



describe("Test Cases: Single Ticket View - Direct URL Access",function(){

  it("GET /ticket/1  request details of ticket id 1. respond 200 OK with ticket info",function(done){

    server
    .get("/ticket/1")    
    .expect("Content-type",/html/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Ticket Id:')).should.be.equal(true);
        (res.text.includes('Subject')).should.be.equal(true);
        (res.text.includes('Description')).should.be.equal(true);
        (res.text.includes('Status')).should.be.equal(true);
        (res.text.includes('Tags')).should.be.equal(true);
        done();
    });
  });

  it("GET /ticket/7000  request details of ticket id 7000 which does not exists. respond 404 Not Found",function(done){

    server
    .get("/ticket/7000")    
    .expect("Content-type",/html/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('Invalid Ticket Id Requested.')).should.be.equal(true);        
        done();
    });
  });

  it("GET /ticket  invalid path starting with /ticket no ticket id provided. respond 404 Not Found",function(done){

    server
    .get("/ticket")    
    .expect("Content-type",/html/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){            
        (res.text.includes('invalid page requested.')).should.be.equal(true);        
        done();
    });
  });

});