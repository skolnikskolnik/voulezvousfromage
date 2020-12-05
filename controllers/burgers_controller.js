var express = require("express");
const orm = require("../config/orm.js");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../model/burger.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//We want to populate the devour list with all entries that have devour = false
//Start by getting all the burgers
router.get("/burgers", function (req, res) {
    burger.selectAll(function (data) {
        res.json({ burgers: data });
    });
});

// //When user hits submit, a new burger is added
router.post("/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function (result) {
        res.json(result);
    });
});

//When a devour button is hit, change "devoured" from false to true
router.put("/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    })
})

// Export routes for server.js to use.
module.exports = router;