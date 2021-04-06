module.exports = {
    post:{
        tags:['Mpesa B2C'],
        description:"B2C",
        operationId:"b2cTransaction",
        parameters:[
            {
                name:"AccessToken",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/accessToken"
                },
                description:"Generated access token"
            },
            {
                name:"InitiatorName",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/InitiatorName"
                },
                description:"Credential to authenticate the transaction request"
            },
            {
                name:"SecurityCredential",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/SecurityCredential"
                },
                description:"Base64 encoded string of B2C shortcode as password"
            },
            {
                name:"CommandID",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/CommandID"
                },
                description:"Unique command for the transaction"
            },
            {
                name:"Amount",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/Amount"
                },
                description:"Amount to transact"
            },
            {
                name:"PartyA",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/PartyA"
                },
                description:"Organization short code initiating the transaction"
            },
            {
                name:"PartyB",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/PartyB"
                },
                description:"Phone number receiving the transaction"
            },
            {
                name:"Remarks",
                in:"header",
                required:true,
                schema:{
                    $ref:"#/components/schemas/Remarks"
                },
                description:"Comment to send along with the transaction"
            }
        ],
        responses:{
            '200':{
                description:"Transaction completed successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/resultResponse"
                        }
                    }
                }
            },
            '400':{
                description:"Error occurred",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/errorMessage"
                        }
                    }
                }
            }
        }
    }
}