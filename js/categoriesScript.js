$('document').ready(function () {
    var newCategory = $('#categories').val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getCategories.php",
        data: {name: newCategory, what: "generic"},
        success: function (response) {
            $('title').html('Genesis Gym | ' + response[0].name);
            if(response[0].name.indexOf(" ") > 0) {
            	$('#name').html('<h1 class="title-2">' + response[0].name.substr(0, response[0].name.indexOf(" ")) + '<span> ' + response[0].name.substr(response[0].name.indexOf(" ")+1) + '</span></h1>');
            } else {
            	$('#name').html('<h1 class="title-2">' + response[0].name + '</h1>');
            }
            $('#categorydescription').html(response[0].description);
        }
    });
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "http://genesisgym.altervista.org/php/getCategories.php",
        data: {name: newCategory, what: "relation"},
        success: function (response) {
            var data = '<b>Related Courses:</b> <ul class="list-3">';
            for (var i=0; i<response.length; i++) {
                data += '<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>';
            }
            data += '</ul>';
            $('#courses').append(data);
        }
    })
})