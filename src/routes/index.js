const express = require("express");

const router = express.Router();

const Mpesa = require("../controllers/Mpesa");

router.get('/access-token', 
    (req,res,next) => new Mpesa().getAccessToken(req,res,next)
);

router.post('/b2c',
    (req,res,next) => new Mpesa().b2c(req,res,next)
);

router.post('/cb', 
    (req,res,next) => new Mpesa().cb(req,res,next)
);

router.post('/timeout',
    (req,res,next) => new Mpesa().timeOut(req,res,next)
);

module.exports = router;