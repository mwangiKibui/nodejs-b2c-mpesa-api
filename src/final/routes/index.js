const express = require("express");

const router = express.Router();

const Business = require("../controllers/Business");

router.get('/access-token', 
    (req,res,next) => new Business().getAccessToken(req,res,next)
);

router.post('/account-balance',
    (req,res,next) => new Business().getAccessToken(req,res,next),
    (req,res,next) => new Business().accountBalance(req,res,next) 
);

router.post('/c2b',
    (req,res,next) => new Business().getAccessToken(req,res,next),
    (req,res,next) => new Business().c2b(req,res,next)
);

router.post('/b2c', 
    (req,res,next) => new Business().getAccessToken(req,res,next),
    (req,res,next) => new Business().b2c(req,res,next)
);

router.post('/register-url',
    (req,res,next) => new Business().getAccessToken(req,res,next),
    (req,res,next) => new Business().registerUrl(req,res,next)
);

router.post('/validation', 
    (req,res,next) => new Business().validation(req,res,next),
);

router.post('/confirmation',
    (req,res,next) => new Business().confirmation(req,res,next)
);3

router.post('/cb', 
    (req,res,next) => new Business().cb(req,res,next)
);

router.post('/timeout',
    (req,res,next) => new Business().timeOut(req,res,next)
);

module.exports = router;