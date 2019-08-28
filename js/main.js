// function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
//
//
// $(function() {
//     $("#search2").on("click", function(e) {
//         e.preventDefault();
//         // prepare the request
//         var request = gapi.client.youtube.search.list({
//             part: "snippet",
//             type: "video",
//             q: "Javascript|Python -basics",
//             // videoCategoryId: 28,            //27- Образование, 28- Наука и техника
//             maxResults: 15,
//             order: "date",
//             publishedAfter: "2019-04-08T00:00:00Z"
//         });
//         request.execute(function(response) {
//             var results = response.result;
//             $("#results").html("");
//             $.each(results.items, function(index, item) {
//                 $.get("tpl/item.html", function(data) {
//                     $("#results").append(tplawesome(data, [{"title":item.snippet.title, "date":item.snippet.publishedAt}]));
//                     // console.log(date[0]);
//                 });
//             });
//             resetVideoHeight();
//         });
//     });
//
//     $(window).on("resize", resetVideoHeight);
// });
//
// function resetVideoHeight() {
//     $(".video").css("height", $("#results").width() * 9/16);
// }
//
//
//         function init() {
//     gapi.client.setApiKey("AIzaSyD1Ej0tLQoT3TnhoWcVLlXaQlrULtzQwdQ");
//     gapi.client.load("youtube", "v3", function() {
//     });
// }
//



function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}


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
                    let date = item.snippet.publishedAt;
                    // console.log(date.replace(/.(?=y)/g,""));
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title,  "videoid":item.id.videoId, "date":item.snippet.publishedAt}]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}


function init() {
    gapi.client.setApiKey("AIzaSyD1Ej0tLQoT3TnhoWcVLlXaQlrULtzQwdQ");
    gapi.client.load("youtube", "v3", function() {
    });
}