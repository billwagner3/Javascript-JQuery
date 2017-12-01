

url = "https://api.nasa.gov/planetary/apod?api_key=3JFWVzG4pPH9coGZA6o13J2QyqZrdTEx2chp4CFj";

$(document).ready(function() {


    var api_key = '3JFWVzG4pPH9coGZA6o13J2QyqZrdTEx2chp4CFj';
    var dateobj = new Date();
    var month = dateobj.getMonth() + 1;
    var day = dateobj.getDate();

    var day_today = dateobj.getDate();
    var year = dateobj.getFullYear();


    callnew(url);
    var date_ent = year+'-'+month+'-'+day;
    function playImg() {
        //make callnew(url) change date by -1 each time
        setInterval(function () {
            if (day > 1) {
                day--;
                url = "https://api.nasa.gov/planetary/apod?date="
                    +year+"-"+month+"-"+day+"&api_key="+api_key;

                console.log("test"+day);
                playImg(url);
                console.log(day);
            }
        }, 3000);
    }

    $('#play').on('click', function () {
         console.log('play btn hit');
         url = "https://api.nasa.gov/planetary/apod?date="+year+"-"+month+"-"
             +day+"&api_key="+api_key;
         playImg();

    });

    // setInterval(console.log('cycle thru day '+day), 5000);

    $('#next').on('click', function() {
        if (day < day_today) {
            day++;
            console.log(day);
            url = "https://api.nasa.gov/planetary/apod?date="+year+"-"
                +month+"-"+day+"&api_key="+api_key;

            console.log(url);
            callnew(url);
        } else {
            console.log('not more than '+day_today);
        }

    });

    $('#back').on('click', function () {
        if (day > 1) {
            day--;
            console.log(day);

            url = "https://api.nasa.gov/planetary/apod?date="+year+"-"
                +month+"-"+day+"&api_key="+api_key;
            console.log(url);

            callnew(url);
        } else {
            day--;
            console.log('not less than 1');
            url = "https://api.nasa.gov/planetary/apod?date="+year+"-"+month+"-"+day+"&api_key="+api_key;
            console.log(url);
            callnew(url);
        }
    });


    function callnew(url) {

        $.ajax({
            url: url,
            success: function (result) {
                if ("copyright" in result) {
                    /** @namespace result.copyright */
                    $("#copyright").text("Image Credits: " + result.copyright);
                }
                else {
                    $("#copyright").text("Image Credits: " + "Public Domain");
                }

                /** @namespace result.media_type */
                if (result.media_type === "video") {
                    $("#apod_img_id").css("display", "none");
                    $("#apod_vid_id").attr("src", result.url);
                    $("#apod_vid_id").css("display", "block");

                }
                    /** @namespace result.media_type */
                if (result.media_type === "image")
                    {
                        $("#apod_vid_id").css("display", "none");
                        $("#apod_img_id").attr("src", result.url);
                        $("#apod_img_id").css("display", "block");
                    }

                else {
                    $("#apod_vid_id").attr("src", result.url);
                    $("#apod_img_id").css("display", "none");
                     }



                $("#reqObject").text(url);
                $("#returnObject").text(JSON.stringify(result, null, 4));
                /** @namespace result.explanation */
                $("#apod_explanation").text(result.explanation);
                $("#apod_title").text(result.title);
            }

        });
    }
});
