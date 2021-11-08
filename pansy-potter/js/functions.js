/// <reference path="jquery-3.6.0.js" />

jQuery($ => { 
    $("form").on("submit",function (e) {
    e.preventDefault(); //To not refresh the page
    $("form").remove(); //Remove the form
    $('#h2ContactSuccess').text('Thank you for submitting!!');
});
})