
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
    $('.myAge').each(function(i) {
        $(this).html(`I am ${seconds} seconds old at the moment.`);
    })
}
getMyAge();
setInterval(getMyAge, 1000);

$(document).ready(function() { 
    initializeFadeIn();
});

function initializeFadeIn() {
    /* Every time the window is scrolled ... */
    $(window).scroll( function() {

        let offset = 150;

        /* Check the location of each desired element */
        $('.hide').each( function(i) {
            
            
            let top_of_object = $(this).position().top;
            let most_of_window = $(window).scrollTop() + $(window).height() - offset;
            
            /* If the object is completely visible in the window, fade it it */
            if( top_of_object < most_of_window) {
                $(this).animate({'opacity':'1'},1500); 
            }
        }); 
    });
}
