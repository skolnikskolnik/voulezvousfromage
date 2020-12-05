// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

//Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
const burger = {
    selectAll: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        })
    },
    insertOne: function(cols,vals,cb){
        orm.insertOne("burgers", cols, vals, function(res, err){
            if (err) {
                return false;
            }
            else{
                return true;
            }
        })
    },
    updateOne: function(objColVals, condition, cb){
        orm.updateOne("burgers", objColVals, condition, function(res){
            cb(res);
        })
    },
    deleteOne: function(condition,cb){
        orm.deleteOne("burgers", condition, function(res){
            cb(res);
        })
    }
}
// Export the database functions for the controller (catsController.js).
module.exports = burger;