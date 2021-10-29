var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12 && hrs >= 4)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs < 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs < 20)
        greet = 'Good Evening';
    else
        greet = 'Good Night';

    document.getElementById('lblGreetings').innerHTML =
        '<b>' + greet + '</b>!';