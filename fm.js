var express=require('express')
var app=express()
var mongojs=require('mongojs')
var db=mongojs('mongodb://VishnuPriya:srikrishna3@ds121105.mlab.com:21105/nsedata',['schematest'])
app.use(express.static('static'));
app.set('view engine','ejs')


// app.get('/insert',function(req,res){
// 	let options = {
//   date: {
//     start: "2018-01-12",
//     end: "2018-01-16"
//   }
// };
// const nseHistoricalData = require("nse-historical-data");
// db.historical_data.insert({"key":"value"},function(err,data){
// 	console.log("inserted static data")
// })
// nseHistoricalData
//   .default(options)
//   .then(function(data) {
//    //console.log(JSON.stringify(data.2018-01-12.length));
//    data = JSON.parse(JSON.stringify(data).split('"Turnover (Rs. Cr.)"').join('"TurnOver"'));

//     res.send(data.length)

//   })
//   .catch(function(err) {
//     console.error(err);
//   });
// })
app.get('/insert',function(req,res){
      let options = {
  date: {
    start: "2018-01-12",
    end: "2018-01-16"
  		}
		};
const nseHistoricalData = require("nse-historical-data");
nseHistoricalData
  .default(options)
  .then(function(data) {
   
 //    var dateFormat = require('dateformat');
	// var now = new Date("2018-02-28");
	// now = dateFormat(now, "dd-mm-yyyy");
	 var objs = Object.keys(data)
	 Object.keys(data).forEach(function(key) {
  		//var val = key;
  		var arrob=data[key];
  		for(var i=0;i<arrob.length;i++){
  			console.log("values is"+arrob[i])
  		}
  		//res.send("task completed")
		});
    
  })
  .catch(function(err) {
    console.error(err);
  });

})
app.get('/retrieve',function(req,res){
 	db.schematest.find(
    {"script":"xyz","daterange.date": "02-02-2019"}, 
    {_id: 0, daterange: {$elemMatch: {date: "02-02-2019"}}},function(err,data){
    	if(!err){
    		res.send(data)
    	}
    	else{
    		res.send(err)
    	}
    });

