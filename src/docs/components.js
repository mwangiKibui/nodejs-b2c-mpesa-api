module.exports = {
    components:{
        schemas:{
            "resultResponse":{
                type:"object",
                properties:{
                    "result":{
                        type:"object",
                        description:"Response from Mpesa API",
                        properties:{
                        ConversationID:{
                            type:"string",
                            description:"random transaction's conversation ID",
                            example:"wret_RT56"
                        },
                        OriginatorConversationID:{
                            type:"string",
                            description:"random transaction's originator conversation ID",
                            example:"wrtYUioP9"
                        },
                        ResponseCode:{
                            type:"string",
                            description:"code for transaction's response",
                            example:"0"
                        },
                        ResponseDescription:{
                            type:"string",
                            description:"short description of a response",
                            example:"Accept for service request successfully"
                        }
                    }}
                }
            },
            "consumerKey":{
                type:"string",
                description:"Application's consumer key",
                example:"werty67yh"
            },
            "consumerSecret":{
                type:"string",
                description:"Application's consumer secret",
                example:"14578yuiokjl9P"
            },
            "response":{
                type:"object",
                properties:{
                    "accessToken":{
                        type:"string",
                        description:"access token",
                        example:"2123hyjUOPkl"
                    }
                }
            },
            "errorMessage":{
                type:"object",
                properties:{
                    message:{
                        type:"string",
                        description:"error",
                        example:"Bad Request: Invalid Credentials"
                    }
                }                
            },
            "accessToken":{
                type:"string",
                description:"Generated access token",
                example:"YGwrKPx8gjdgIoO2dZkdhF7AMq5I"
            },
            "InitiatorName":{
                type:"string",
                description:"Credential to authenticate the transaction request",
                example:"testapi"
            },
            "SecurityCredential":{
                type:"string",
                description:"Base64 encoded string of B2C shortcode as password",
                example:"CCByuipeghtjnkuTYOP"
            },
            "CommandID":{
                type:"string",
                description:"Unique command for the transaction",
                example:"SalaryPayment",
                enum:["SalaryPayment","BusinessPayment","PromotionPayment"]
            },
            "Amount":{
                type:"string",
                description:"Amount to transact",
                example:"50"
            },
            "PartyA":{
                type:"string",
                description:"Organization short code initiating the transaction",
                example:"600868"
            },
            "PartyB":{
                type:"string",
                description:"Phone number receiving the transaction",
                example:"254708374149"
            },
            "Remarks":{
                type:"string",
                description:"Comment to send along with the transaction",
                example:"AprilSalary"
            }
        }
    }
}