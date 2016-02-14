$(function() {

    var emotion1 = $(".emotion1");
    var backButton = $("#back-icon");
    var emotionCount = $(".emotion-count");

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;

    var month = $("#month");
    month.text(currentMonth);

    ajaxCall();

    emotion1.click(function() {

        for (var i = 0; emotion1.length > i; i++) {

            var tempEmotion = emotion1.eq(i);
            tempEmotion.css("width", "48px");
            tempEmotion.css("height", "48px");
            tempEmotion.removeClass("active");
        }


        $(this).css("width", "74px");
        $(this).css("height", "74px");
        $(this).addClass("active");

        var curIdx = emotion1.index($(this));
        console.log(curIdx);
        var tempNum = curIdx+1;
         ajaxCallCategory(tempNum);
    });

    backButton.click(function() {
        var url = "/"
        $(location).attr('href', url);
    });




    function ajaxCall(){
      var dataUrl = "http://godong9.com:3001/posts";
      $.get(dataUrl,function(data){
        var tempList;

        $(".list-group li").remove();

        for(var i = 0 ; data.posts.length > i ; i++){
          var dt = new Date(data.posts[i].openDate);

          var openDate = moment(dt);
          var currentMomentDate = moment(currentDate);

          var diffResult = openDate.diff(currentMomentDate);
          var result = moment.utc(diffResult);
          // var openDate = moment(dt,"MM-DD-YYYY");
          console.log(data.posts[i].openDate +" - "+ currentDate + " : " +result);

          var duration = moment.duration(diffResult);
          var hours = duration.asDays();

          var resultTime = (result/24)+1;
          if(result < 0){
            var tempPic = data.posts[i].emotionStatus;
            tempList = "<li data-value=\""+data.posts[i]._id+"\" class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 text-group\"><div class=\"list-font-item1\">"+ data.posts[i].subject+"</div><div class=\"list-font-item2\">"+ openDate.format("YY/MM/DD")+"</div></div><div class=\"emotion-icon col-xs-2\" style=\"background:url(./img/pre_face_0"+tempPic+".png) no-repeat center center;background-size: 48px 48px;\"></div></div></li>";

          }
          else{
            tempList = "<li class=\"list-group-item\"><div style = \"text-align: center;\"><span id=\"lock-icon\"></span><span id=\"lock-date\">"+ Math.floor(hours) + " 일 후</span></div></li>";
          }
          $(".list-group").append(tempList);

          emotionCount.eq(i).text(data.count[i+1]);

          $(".list-group-item").unbind('click').bind('click', function(){
            var value = $(this).data('value');
            var url = "/post/"+value;
            if (!value) {
              return;
            }
            $(location).attr('href',url);
          });
        }
      });
    }

    function ajaxCallCategory(num){
      var dataUrl = "http://godong9.com:3001/posts?emotionStatus="+num;
      $.get(dataUrl,function(data){
        console.log(data)
        var tempList;

        $(".list-group li").remove();


        for(var i = 0 ; data.posts.length >= i ; i++){
          var dt = new Date(data.posts[i].openDate);

          var openDate = moment(dt);
          var currentMomentDate = moment(currentDate);

          var diffResult = openDate.diff(currentMomentDate);
          var result = moment.utc(diffResult);
          // var openDate = moment(dt,"MM-DD-YYYY");
          console.log(data.posts[i].openDate +" - "+ currentDate + " : " +result);

          var duration = moment.duration(diffResult);
          var hours = duration.asDays();

          var resultTime = (result/24)+1;
          if(result < 0){
            var tempPic = data.posts[i].emotionStatus;

            tempList = "<li value=\""+data.posts[i]._id+"\" class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 text-group\"><div class=\"list-font-item1\">"+ data.posts[i].subject+"</div><div class=\"list-font-item2\">"+ openDate.format("YY/MM/DD")+"</div></div><div class=\"emotion-icon col-xs-2\" style=\"background:url(./img/pre_face_0"+tempPic+".png) no-repeat center center;background-size: 48px 48px;\"></div></div></li>";

          }
          else{
            tempList = "<li class=\"list-group-item\"><div style = \"text-align: center;\"><span id=\"lock-icon\"></span><span id=\"lock-date\">"+ Math.floor(hours) + " 일 후</span></div></li>";
          }
          $(".list-group").append(tempList);
          // emotionCount.index(i).text(data.count[i]);
        }
      });
    }
});
