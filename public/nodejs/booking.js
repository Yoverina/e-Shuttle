//console.log(req);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // var path = url.parse(req.url).pathname;
    // console.log("post req of booking");
    // renderHTML('./public/html/booking.html', res);
	// res.end("a");
	
    // var express = require('express');
    
var firebaseJS = require('./firebase');
var app = require('../../app');
var nodemailer = require('nodemailer');

module.exports = {
saveToDatabase: function(req, res){
    var data = {
	userID: '',
	from: '',
	to: '',
	date: '',
	status: ''
  } 
//   module.exports.data = data;
 //get html element & move input to variable -> booking.html
 //function saveToDatabase() {
 	var inpAsal = "";
  	var inpTujuan = "";
	var route = req.body.route;
	var tanggal = req.body.tanggal;
	// console.log(tanggal);
	  

 	if (route.selectedIndex == 1) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Wisma Asia";
 	} else if (route.selectedIndex == 2) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bogor";
 	} else if (route.selectedIndex == 3) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Alsut";
 	} else if (route.selectedIndex == 4) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Kelapa Gading";
 	} else if (route.selectedIndex == 5) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bekasi";
 	} else if (route.selectedIndex == 6) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Pondok Indah";
 	} else if (route.selectedIndex == 7) {
 		inpAsal = "Wisma Asia";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 8) {
 		inpAsal = "Bogor";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 9) {
 		inpAsal = "Alsut";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 10) {
 		inpAsal = "Kelapa Gading";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 11) {
 		inpAsal = "Bekasi";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 12) {
 		inpAsal = "Pondok Indah";
 		inpTujuan = "BCA Learning Institute";
 	}
	 
	 data.userID = firebaseJS.userId;
	 data.from = inpAsal;
	 data.to = inpTujuan;
	 data.date = tanggal;
	 data.status = "Not Used";
	 var currBookingCode;
//reference database to specific tree -> history & push data to history
	var ref = firebaseJS.database.ref('history/users');
	ref.push(data);
	ref.limitToLast(1).on('child_added', function(data){
		console.log(data.key);
		currBookingCode = data.key;	
	}); 


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // secure: false,
        // port: 465,
        
        auth: {
            user: 'shuttle.management.bca@gmail.com',
            pass: 'pedj04ng.Ejhail'
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });
    

    var mailOptions = {
        
        from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
        to: 'aldonovendi@gmail.com',
        subject: 'Verification',
        html:   '<p> Tujukkan email ini ke petugas shuttle <p>' +
                '<img src = "https://chart.googleapis.com/chart?cht=qr&chl=' + app.myHost + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2">',
        attachments: [{
            filename: 'image.png',
            path: 'https://chart.googleapis.com/chart?cht=qr&chl=' + app.myHost + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2'
        }]
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("Error woy!" + error);
        } else {
			console.log('Email sent: ' + info.response);
			transport.close();
        }
    });
}
}