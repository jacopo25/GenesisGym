$('document').ready(function () {
    var newData = $('#genericList').val();
    
    if (newData == "categories") {
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "http://genesisgym.altervista.org/php/getCategories.php",
            data: {name: "categories", what: "list"},
            success: function (response) {
                for (var i=0; i<response.length; i++) {
                    $('#categoriesList').append('<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>');
                }
            }
        })
        
    } else if (newData == "allInstructor") {
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "http://genesisgym.altervista.org/php/getInstructor.php",
            data: {surname: "all", what: "list"},
            success: function (response) {
                for (var i=0; i<response.length; i++) {
                    $('#instructorList').append('<li><a href="' + response[i].page + '">' + response[i].name + ' ' + response[i].surname + '</a></li>');
                }
            }
        })
    
    } else if (newData == "allCourses") {
        //Default action
        loadAlphabetList();
        $('#loadabc').on("click", loadAlphabetList);
        //Load by difficulty
        $('#loaddiff').on("click", function () {
            $('#loaddiff').addClass('active');
            $('#loadabc').removeClass('active');
            $('#loadcat').removeClass('active');
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "http://genesisgym.altervista.org/php/getCoursesBy.php",
                data: {order: "level"},
                success: function (response) {
                    var data = '';
                    $('#list').html("");
                    data += '<b>' + response[0].difficulty + '</b><br><ul class="list-3"><li><a href="' + response[0].page + '">' + response[0].name + '</a></li>';
                    for (var i=1; i<response.length; i++) {
                        if(response[i].difficulty != response[i-1].difficulty) {
                            data += '</ul><br><b>' + response[i].difficulty + '</b><br><ul class="list-3">';
                        }
                        data += '<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>';
                    }
                    $('#list').append(data);
                }
            })
        });
        //load by category
        $('#loadcat').on("click", function () {
            $('#loadabc').removeClass('active');
            $('#loadcat').addClass('active');
            $('#loaddiff').removeClass('active');
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "http://genesisgym.altervista.org/php/getCoursesBy.php",
                data: {order: "category"},
                success: function (response) {
                    var data = '';
                    $('#list').html("");
                    data += '<b>' + response[0].category + '</b><br><ul class="list-3"><li><a href="' + response[0].page + '">' + response[0].name + '</a></li>';
                    for (var i=1; i<response.length; i++) {
                        if(response[i].category != response[i-1].category) {
                            data += '</ul><br><b>' + response[i].category + '</b><br><ul class="list-3">';
                        }
                        data += '<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>';
                    }
                    $('#list').append(data);
                }
            })
        });       
    }
    
    function loadAlphabetList() {
        $('#loadabc').addClass('active');
        $('#loadcat').removeClass('active');
        $('#loaddiff').removeClass('active');
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "http://genesisgym.altervista.org/php/getCourse.php",
            data: {name: "all", what: "list"},
            success: function (response) {
                var data = '';
                $('#list').html('');
                for (var i=0; i<response.length; i++) {
                    data += '<li><a href="' + response[i].page + '">' + response[i].name + '</a></li>';
                }
                $('#list').append('<ul class="list-3">' + data + '</ul>');
            }
        })
    }
})