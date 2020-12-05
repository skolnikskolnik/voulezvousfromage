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
            let burgerId = data.burgers[i].id;

            if (!isDevoured) {

                devourList.append(`<li>${burgerName}<button type=button class="devourButton" data-burgerId="${burgerId}">Devour</button></li>`);
            }
            else {
                deleteList.append(`<li>${burgerName}<button type=button class="deleteButton" data-burgerId="${burgerId}">Delete</button></li>`);
            }

        }
    });

    //Want to add to the list when user hits the submit button
    $(document).on("click", ".submit", function(event){
        event.preventDefault();
        
        let newBurger = {
            burger_name: $("#newBurger").val().trim()
        };

        $.ajax("/burgers", {
            type: "POST", 
            data: JSON.stringify(newBurger),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function(){
            console.log("test");
            location.reload();
        });
        })
});