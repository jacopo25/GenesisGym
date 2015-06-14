$('document').ready(function () {
    var newCourse = $('#course').val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getCourse.php",
        data: {name: newCourse, what: "generic"},
        success: function (response) {
            $('title').html('Genesis Gym | ' + response[0].name);
            if(response[0].name.indexOf(" ") > 0) {
            	$('#name').html('<h1 class="title-2">' + response[0].name.substr(0, response[0].name.indexOf(" ")) + '<span> ' + response[0].name.substr(response[0].name.indexOf(" ")+1) + '</span></h1>');
            } else {
            	$('#name').html('<h1 class="title-2">' + response[0].name + '</h1>');
            }
            $('#coursedescription').html(response[0].description);
            $('#video').html('<iframe width="320" height="240" src="' + response[0].videourl + '" frameborder="0" allowfullscreen></iframe>');
        }
    });
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getCourse.php",
        data: {name: newCourse, what: "relation"},
        success: function (response) {
            var data = '<b>Instructors for this Course:</b> <ul class="list-3">';
            for (var i=0; i<response.length; i++) {
                data += '<li><a href="' + response[i].page + '">' + response[i].name + ' ' + response[i].surname + '</a></li>';
            }
            data += '</ul>';
            $('#instructors').append(data);
        }
    })
})