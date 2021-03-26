require("dotenv").config();
const axios = require("axios");

class Business {

    constructor(){
    };

    //get access token.
    async getAccessToken(req,res,next){

        let consumer_key = process.env.CONSUMER_KEY;
        let consumer_secret = process.env.CONSUMER_SECRET;
        let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credential";

        let buf = new Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");
        let auth = `Basic ${buf}`;

        let response = await axios.default.get(url,{
            headers:{
                "Authorization":auth
            }
        }).catch(console.log);

        //set access-token.
        req.access_token = response.data.access_token;

        return next();
    };

    

    //b2c.
    async b2c(req,res,next){

        let access_token = req.access_token;
        let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
        let ngrok_url = process.env.NGROK_URL;
        let auth = `Bearer ${access_token}`;

        let response = await axios.default.post(url,{
            "InitiatorName": "testapi",
            "SecurityCredential":"DGjymbSJOUFtJ/HH4uuIgMeU1cFBIxgmnMrYDJikrR21FCAVfXW1U3oUzZc8EaRT9x7mA9jjGbmN2vFCM3JfrrrWCSAV68T/J3f/CLnTGzxk8jPPLES6nIVrWZDEdACcVfy+EHTawsqjtppEAU12GvpzWdaTTwsdXDAf7csFad7rSYS79RLdomY5ZIshtrmey8u4mRvqUo8yrRJ/oOZyuPtobu8Z80ysk6nYSkkUJd28mHVEwOBzSG+IHp5S1G+LGWX63fg6cbKuDg8C8ke7OQpnbleUHFE3hWec40J/Ybn1V6d0I09EgvgBTW5K2MxCx19GnKe/pO4I5DRrwooetQ==",
            "CommandID": "CommissionPayment",
            "Amount": "50",
            "PartyA": "600868",
            "PartyB": "254708374149",
            "Remarks": "MarchSalary",
            "QueueTimeOutURL": `${ngrok_url}/timeout`,
            "ResultURL": `${ngrok_url}/cb`,
            "Occasion": "MarchSalary"
        },{
            headers:{
                "Authorization":auth
            }
        }).catch(console.log);

        return res.send({
            result:response.data
        });

    };

    //time-out.
    async timeOut(req,res,next){

        console.log("--- request timeout ----");

        console.dir(req.body);

        console.log("--- end of request timeout ---");

    };
    
    //callback.
    async cb(req,res,next){

        console.log("--- callback request ----");

        let response = req.body.Result;

        if(response.ResultParameters) {

            response.ResultParameters = response.ResultParameters.ResultParameter;

        }

        if(response.ReferenceData) {

            response.ReferenceData = response.ReferenceData.ReferenceItem;

        };

        console.log(response)

        console.log("--- end of callback request ---");

    };

    

};

module.exports = Business;