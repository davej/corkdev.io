$(function() {

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function replaceURLWithHTMLLinks(text) {
		    var exp = /(\b(http|ftp|https):\/\/([\w-]+\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/ig;
		    return text.replace(exp,"<a href='$1'>$3</a>");
		}

  // Meetup

  var getEventsUrl = "https://api.meetup.com/2/events?offset=0&format=json"+
          "&limited_events=False&group_id=12225002&photo-host=public&page=20&fields="+
          "&order=time&status=past%2Cupcoming&desc=true"+
          "&callback=?";

  $.getJSON(getEventsUrl, function(data) {
    var events = data.results;

    var event = events[0];
    var currentTime = new Date();
    var eventTime = new Date(event.time);

    var lastOrNext = (currentTime > eventTime) ? "Our last meetup" : "Our next meetup";
    var eventDate = days[eventTime.getDay()] + ", " + eventTime.getDate() + " " + months[eventTime.getMonth()] + " " + eventTime.getFullYear();

    $("#event-description").html(event.description);
    $("#event-title").text(event.name);
    $("#last-or-next").text(lastOrNext);
    $("#event-date").text(eventDate);
    $("#event-attendees").text(event.yes_rsvp_count + " Attending");
    $(".event-url").attr('href', event.event_url);
  });

  // Youtube
  var apiKey = 'AIzaSyB3ceb6zzls1m5HWl9WGieHwjQCarYCsGs';
  var videosUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?'+
        'part=snippet&maxResults=6&playlistId=PLWPNy8uJbLcvgP__TCrOUDscdFbjJVKo9&key='+apiKey;


  $.getJSON(videosUrl, function(data) {
    var videos = data.items;



    $(videos).each(function(i, video) {
      var videoDate = new Date(video.snippet.publishedAt);
      var videoDateStr = days[videoDate.getDay()] + ", " + videoDate.getDate() + " " + months[videoDate.getMonth()] + " " + videoDate.getFullYear();
      var videoImg = video.snippet.thumbnails.high;
      var videoTitle = video.snippet.title;
      var author = video.snippet.channelTitle;
      var description = replaceURLWithHTMLLinks(video.snippet.description).replace('\n','<br><br>');
      var videoUrl = "https://www.youtube.com/watch?v=" + video.snippet.resourceId.videoId;

      if (videoTitle.toLowerCase().indexOf('corkdev: ') === 0) {
        videoTitle = videoTitle.slice(9);
      }

      var strVar="";
      strVar += "<article role=\"article\" class=\"blog-post\">";
      strVar += "  <div class=\"blog-post__date illustrative-heading\"><span class=\"illustrative-heading__line\"><\/span><span class=\"illustrative-heading__text\">";
      strVar += "      <time>"+videoDateStr+"<\/time><\/span><\/div>";
      strVar += "  <div class=\"blog-post__image\"><a href=\""+videoUrl+"\" target=\"_blank\"><img src=\""+videoImg.url+"\" alt=\"October 9th Meetup — Videos\" class=\"img-responsive\"\/><\/a><\/div>";
      strVar += "  <div class=\"blog-post__content\">";
      strVar += "    <h3 itemprop=\"name\" class=\"blog-post__heading\"><a href=\""+videoUrl+"\" target=\"_blank\">"+videoTitle+"<\/a><\/h3>";
      strVar += "    <h5 class=\"blog-post__author\">Video by "+author+"<\/h5>";
      strVar += "    <div itemprop=\"description\" class=\"description\"><p>"+description+"<\/p><\/div>";
      strVar += "    <p><a href=\""+videoUrl+"\" target=\"_blank\">Watch on Youtube &rarr;<\/a><\/p>";
      strVar += "  <\/div>";
      strVar += "<\/article>";

      $('#youtube-videos').append(strVar);


    });

  });

});
