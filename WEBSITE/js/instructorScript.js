$('document').ready(function () {
    var newSurname = $('#surname').val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getInstructor.php",
        data: {surname: newSurname, what: "generic"},
        success: function (response) {
            $('title').html('Genesis Gym | ' + response[0].name + ' ' + response[0].surname);
            $('#name').html('<h1 class="title-2">' + response[0].name + '<br><span>' + response[0].surname + '</span></h2>');
            $('#bio').html(response[0].bio);
            $('#imagediv').html('<img src="' + response[0].imgurl + '">');
        }
    });
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getInstructor.php",
        data: {surname: newSurname, what: "relation"},
        success: function (response) {
            var data = '<b>My Courses:</b> <ul class="list-3">';
            for (var i=0; i<response.length; i++) {
                data += '<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>';
            }
            data += '</ul>';
            $('#courses').append(data);
        }
    })
})