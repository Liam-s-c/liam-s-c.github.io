var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12 && hrs >= 5)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    else if (hrs >= 0 && hrs <= 5)
        greet = 'Good Night';

    document.getElementById('lblGreetings').innerHTML =
        '<b>' + greet + '</b>!';