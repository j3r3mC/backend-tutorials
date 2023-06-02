const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// for purge db
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/


// simple route
app.get("/login", (req, res) =>{
    res.send({
        token : "test123" 
    });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/login.`);
});