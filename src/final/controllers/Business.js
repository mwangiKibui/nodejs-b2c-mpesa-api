require("dotenv").config();
const axios = require("axios");

class Business {

    constructor(){
    };

    //get access token.
    async getAccessToken(req,res,next){

        let consumer_key = process.env.CONSUMER_KEY;
        let consumer_secret = process.env.CONSUMER_SECRET;
        let url = process.env.ACCESS_TOKEN_URL;

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

    //Account balance.
    async accountBalance(req,res,next){

        let ngrok_url = process.env.NGROK_URL;
        let url = process.env.ACCOUNT_BALANCE_URL;

        let access_token = req.access_token;
        let auth = `Bearer ${access_token}`;

        let response = await axios.default.post(
            url,
            {
                "Initiator":"testapi",
                "SecurityCredential":"DGjymbSJOUFtJ/HH4uuIgMeU1cFBIxgmnMrYDJikrR21FCAVfXW1U3oUzZc8EaRT9x7mA9jjGbmN2vFCM3JfrrrWCSAV68T/J3f/CLnTGzxk8jPPLES6nIVrWZDEdACcVfy+EHTawsqjtppEAU12GvpzWdaTTwsdXDAf7csFad7rSYS79RLdomY5ZIshtrmey8u4mRvqUo8yrRJ/oOZyuPtobu8Z80ysk6nYSkkUJd28mHVEwOBzSG+IHp5S1G+LGWX63fg6cbKuDg8C8ke7OQpnbleUHFE3hWec40J/Ybn1V6d0I09EgvgBTW5K2MxCx19GnKe/pO4I5DRrwooetQ==", // remember that the sec credential has to be encrypted
                "CommandID":"AccountBalance",
                "PartyA":"600868",
                "IdentifierType":"4",
                "Remarks":"MarchAccountBal",
                "QueueTimeOutURL":`${ngrok_url}/timeout`,
                "ResultURL":`${ngrok_url}/cb`
            },
            {
                headers:{
                    "Authorization" : auth
                }
            }
        ).catch(console.error);

        return res.send({
            message:response.data
        })

    };

    //b2c.
    async b2c(req,res,next){

        let access_token = req.access_token;
        let url = process.env.B2C_URL;
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

    //register url
    async registerUrl(req,res,next){

        let access_token = req.access_token;
        let url = process.env.REGISTER_URL;
        let auth = `Bearer ${access_token}`;
        let ngrok_url = process.env.NGROK_URL;

        let response = await axios.default.post(url,{
            "ShortCode": "600868",
            "ResponseType": "Timeout",
            "ConfirmationURL": `${ngrok_url}/confirmation`,
            "ValidationURL": `${ngrok_url}/validation`
        },{
            headers:{
                "Authorization" : auth
            }
        }).catch(console.log);

        return res.send({
            result:response.data
        });

    };

    //c2b
    async c2b(req,res,next){

        let access_token = req.access_token;
        let url = process.env.C2B_URL;
        let auth = `Bearer ${access_token}`;

        let response = await axios.default.post(url,{
            "ShortCode":"600868",
            "CommandID":"CustomerPayBillOnline",
            "Amount":"5",
            "Msisdn":"254708374149",
            "BillRefNumber":"5638265"
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

    }

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

    //validation
    async validation(req,res,next){

        console.log("--- validation ----");

        let response = req.body.Result;

        if(response && response.ResultParameters) {

            response.ResultParameters = response.ResultParameters.ResultParameter;

        }

        if(response && response.ReferenceData) {

            response.ReferenceData = response.ReferenceData.ReferenceItem;

        };

        console.log(req.body)

        console.log("--- end of validation ---");

    };

    //confirmation
    async confirmation(req,res,next){

        console.log("--- confirmation ----");

        let response = req.body.Result;

        if(response && response.ResultParameters) {

            response.ResultParameters = response.ResultParameters.ResultParameter;

        }

        if(response && response.ReferenceData) {

            response.ReferenceData = response.ReferenceData.ReferenceItem;

        };

        console.log(req.body)

        console.log("--- end of confirmation ---");

    };

};

module.exports = Business;