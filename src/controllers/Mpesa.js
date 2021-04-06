require("dotenv").config();
const axios = require("axios");

class Business {

    constructor(){
    };

    //get access token.
    async getAccessToken(req,res,next){

        // The consumer key and consumer secret will also be in the headers
        
        let {consumerkey,consumersecret} = req.headers;
        let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
                        
        let buf = new Buffer.from(`${consumerkey}:${consumersecret}`).toString("base64");
        let auth = `Basic ${buf}`;

        let response;
        
        try {
            
            response = await axios.default.get(url,{
                headers:{
                    "Authorization":auth
                }
            });
        
        } catch (error) {

            let err_code = error.response.status;
            let err_msg = error.response.statusText;

            return res.status(err_code).send({
                message:err_msg
            });

        }

        //get access-token.
        let accessToken  = response.data.access_token;

        res.status(200);

        // this will be returned
        return res.send({
           accessToken
        });

    };

    

    //b2c.
    async b2c(req,res,next){

        //Since we will use swagger, the token will be in the headers.
        let {accesstoken,initiatorname,securitycredential,commandid,amount,partya,partyb,remarks}= req.headers;
        
        
        let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
        let ngrok_url = process.env.NGROK_URL;
        let auth = `Bearer ${accesstoken}`;

        let response;
        
        try{

            response = await axios.default.post(url,{
            "InitiatorName": initiatorname,
            "SecurityCredential":securitycredential,
            "CommandID": commandid,
            "Amount": amount,
            "PartyA": partya,
            "PartyB": partyb,
            "Remarks": remarks,
            "QueueTimeOutURL": `${ngrok_url}/timeout`,
            "ResultURL": `${ngrok_url}/cb`,
            "Occasion": remarks
            },{
                headers:{
                    "Authorization":auth
                }
            })

        }catch(error) {
            
            let err_code = error.response.status;
            let err_msg = error.response.data.errorMessage;

            return res.status(err_code).send({
                message:err_msg
            });
        }

        res.status(200);

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