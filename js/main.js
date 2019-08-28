function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}


// function loadClient() {
//     gapi.client.setApiKey("AIzaSyD1Ej0tLQoT3TnhoWcVLlXaQlrULtzQwdQ");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// };

$(function() {
    $("#search2").on("click", function(e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            videoCategoryId: 28,
            q: "Javascript|Python -basics",
            maxResults: 15,
            order: "date",
            publishedAfter: "2019-04-08T00:00:00Z"
        });
        request.execute(function(response) {
            var results = response.result;
            // console.log(results);
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("tpl/item.html", function(data) {
                    let date = moment(item.snippet.publishedAt).format('YYYY-MM-DD, h:mm:ss');
                    // let Newdate = date.replace(/\.\w*/g,"");
                    console.log(date);
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title,  "videoid":item.id.videoId, "date":date}]));
                });
            });
            resetVideoHeight();
        });
    });
    // \d\:\T\d\:\.\w*/g

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}


function init() {
    gapi.client.setApiKey("AIzaSyD1Ej0tLQoT3TnhoWcVLlXaQlrULtzQwdQ");
    gapi.client.load("youtube", "v3", function() {
        console.log("Api is ready")
    });
}