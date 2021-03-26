const express = require("express");

const cors = require("cors");

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 4000;

async function main(){

    app.listen(PORT);

};

main()
.finally( 
    () => console.log(`app started on port ${PORT}`)
)