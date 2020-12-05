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

                devourList.append(`<li>${burgerName} <button type=button class="btn btn-primary devourButton" data-burgerId="${burgerId}">Devour</button></li><br>`);
            }
            else {
                deleteList.append(`<li>${burgerName} <button type=button class="btn btn-danger deleteButton" data-burgerId="${burgerId}">Delete</button></li><br>`);
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

    //When a devour button is hit, change "devoured" from false to true
    $(document).on("click", ".devourButton", function(event){
        event.preventDefault();

        let id = $(this).data("burgerid");

        let newDevouredState = {
            devoured: true
        }

        $.ajax(`/burgers/${id}`, {
            type: "PUT",
            data: JSON.stringify(newDevouredState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function(){
            location.reload();
        })
    });

    //When delete button is hit, burger is deleted
    $(document).on("click", ".deleteButton", function(event){
        event.preventDefault();
        
        var id = $(this).data("burgerid");
        
        $.ajax(`/burgers/${id}`,{
            type: "DELETE"
        }).then(function(){
            location.reload();
        })
    })
});