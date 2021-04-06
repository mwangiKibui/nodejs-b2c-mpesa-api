module.exports = {
    get:{
        tags:['Mpesa B2C'],
        description:"Get access token",
        operationId:"getAccessToken",
        parameters:[
            {
                name:"consumerKey",
                in:"header",
                description:"Application's consumer key",
                schema:{
                    $ref:"#/components/schemas/consumerKey"
                },
                required:true
            },
            {
                name:"consumerSecret",
                in:"header",
                description:"Application's consumer secret",
                schema:{
                    $ref:"#/components/schemas/consumerSecret"
                },
                required:true
            }
        ],
        responses:{
            '200':{
                description:"Access token generated successfully",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#/components/schemas/response"
                        }
                    }
                }
            },
            '400':{
                description:"An Error occurred",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#/components/schemas/errorMessage"
                        }
                    }
                }
            }
        }
    }
}