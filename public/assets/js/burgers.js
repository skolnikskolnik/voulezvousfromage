$(function () {
    //We want to populate the devour list with all entries that have devour = false
//Defining html elements

const devourList = $("#devourList");
const deleteList = $("#deleteList");

    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {

        for (let i = 0; i < data.burgers.length; i++) {
            let isDevoured = data.burgers[i].devoured;
            let burgerName = data.burgers[i].burger_name;

            if(!isDevoured){
                
                devourList.append(`<li>${burgerName}</li>`);
            }
            else{
                deleteList.append(`<li>${burgerName}</li>`);
            }

        }
    });
});