
function getMyAge() {
    let startDate = new Date();
    startDate.setDate(10);
    startDate.setFullYear(1998);
    startDate.setMonth(0);
    startDate.setHours(18);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    // Do your operations
    let endDate  = new Date();
    let seconds = parseInt((endDate.getTime() - startDate.getTime()) / 1000);
    document.getElementById('myAge').innerHTML = `I am ${seconds} seconds old`;
}
getMyAge();
setInterval(getMyAge, 1000);

$(document).ready(function() { 
    initializeFadeIn();
});

function initializeFadeIn() {
    /* Every time the window is scrolled ... */
    $(window).scroll( function() {

        /* Check the location of each desired element */
        $('.hide').each( function(i) {
            
            let top_of_object = $(this).position().top;
            let middle_of_object = $(this).position().top + $(this).height()/2;
            let most_of_window = $(window).scrollTop() + $(window).height()*3/4;
            let bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( top_of_object < most_of_window && middle_of_object < bottom_of_window) {
                $(this).animate({'opacity':'1'},1500); 
            }
        }); 
    });
}
