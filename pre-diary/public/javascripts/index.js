$(function() {

    //Keep track of last scroll
    var lastScroll = 0;
    var header = $("#index-header");
    var headerContent = $("#index-header-content");
    var content = $("#content");
    var emotion = $("#emotion");
    var showEmtion = $("#show-emtion");
    var seletor = $("#seletor");
    var indexTitle = $("#index-title");
    var filter = $("#filter");
    var month = $("#month");

    var showBtn = $("#show");
    var notShowBtn = $("#notshow");

    var listItem = $(".list-group-item");

    var showCount = 0;
    var notShowCount = 0;

    var tempValue = 1;

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();


    //set 현재 월
    month.text(currentMonth);
    ajaxCall();


    $(window).scroll(function(event) {

        //Sets the current scroll position
        var st = $(this).scrollTop();


        var headerHeight = header.height();


        //Determines up-or-down scrolling
        if (st > lastScroll) {


            header.animate({

                height: "50px"
            }, 200, function() {
                header.css("position", "fixed");
                header.css("top", "0px");

            });

            content.animate({


            }, 100, function() {
                content.css("margin-top", "50px");
                content.css("height", "500px");
                content.css("overflow-y", "auto");
                content.scrollTop(1);
            });

            tempValue = 1;

            emotion.animate({

                height: "30px",
                width: "30px"
            }, 100, function() {
                showEmtion.css("visibility", "hidden");
                seletor.css("visibility", "hidden");
                indexTitle.css("font-size", "20px");
                indexTitle.css("height", "24px");
                indexTitle.css("letter-spacing", "-0.7px");
                indexTitle.css("font-size", "20px");

                headerContent.css("margin", "4px 2px");
                emotion.css("margin","8px 0px");
                emotion.css("background-size","40px 40px");

            });


        } else {
            /* header.animate({

                 height: "350px"
             }, 200, function() {
                 header.css("position","relative");
                 header.css("top","0px");
             });

             content.animate({

                 // margin-top : "350px"
             }, 100, function() {
                 content.css("margin-top","0px");
                 content.css("height","500px");
                 content.css("overflow-y","visible");
                 content.scrollTop(0);
             });*/
        }
        //Updates scroll position
        lastScroll = st;
    });




    content.scroll(function(event) {
        var st = $(this).scrollTop();

        if (st == 0) {


            header.animate({

                height: "185px"
            }, 200, function() {
                header.css("position", "relative");
                header.css("top", "0px");
            });

            content.animate({

                // margin-top : "350px"
            }, 100, function() {
                content.css("margin-top", "0px");
                content.css("height", "500px");
                content.css("overflow-y", "visible");
                content.scrollTop(0);
            });

            emotion.animate({

                height: "100px",
                width: "100px"
            }, 100, function() {
                showEmtion.css("visibility", "visible");
                seletor.css("visibility", "visible");
                headerContent.css("margin", "60px 30px");
                indexTitle.css("font-size", "30px");
                emotion.css("margin","0px 0px");
                emotion.css("background-size","110px 110px");

                showEmtion.css("margin-top","30px");
            });

            tempValue = 1;
        } else if (st < 20) {


            header.animate({

                height: "50px"
            }, 200, function() {
                header.css("position", "fixed");
                header.css("top", "0px");
            });

            content.animate({


            }, 100, function() {
                content.css("margin-top", "50px");
                content.css("height", "500px");
                content.css("overflow-y", "auto");
                content.scrollTop(1);
            });

            emotion.animate({

                height: "30px",
                width: "30px"
            }, 100, function() {
                showEmtion.css("visibility", "hidden");
                seletor.css("visibility", "hidden");
                headerContent.css("margin", "4px 2px");
                indexTitle.css("font-size", "20px");
                indexTitle.css("height", "24px");
                indexTitle.css("letter-spacing", "-0.7px");
                indexTitle.css("font-size", "20px");
                emotion.css("margin","8px 0px");
                emotion.css("background-size","40px 40px");
            });

            tempValue = 0
        }



    });

    showBtn.click(function(){
      if(showCount == 0){

        showBtn.css("background-color","#1e7cd3")
        showBtn.css("color","#ffffff")
        showCount=1;
      }else{

        showBtn.css("background-color","#ffffff")
        showBtn.css("color","#1e7cd3")
        showCount=0;

      }
    });

    notShowBtn.click(function(){
      if(notShowCount == 0){

        notShowBtn.css("background-color","#1e7cd3")
        notShowBtn.css("color","#ffffff")

        notShowCount = 1;
      }else{

        notShowBtn.css("background-color","#ffffff")
        notShowBtn.css("color","#1e7cd3")

        notShowCount = 0;
      }
    });

     header.click(function(){
         var url = "/user/emotion/"+$('#user_main').data('user');
         $(location).attr('href',url);
     });

     /*
     listview
      */

     listItem.click(function(){
        var value = $(this).value();
        console.log(value);
     });
    /*filter.click(function(){

    })*/


    /* statics.html*/

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
            tempList = "<li value=\""+data.posts[i]._id+"\"class=\"list-group-item\"><div class=\"row\"><div class=\"col-xs-10 text-group\"><div class=\"list-font-item1\">"+ data.posts[i].subject+"</div><div class=\"list-font-item2\">"+ openDate.format("YY/MM/DD")+"</div></div><div class=\"emotion-icon col-xs-2\" style=\"background:url(./img/pre_face_0"+tempPic+".png) no-repeat center center;background-size: 48px 48px;\"></div></div></li>";

          }
          else{
            tempList = "<li class=\"list-group-item\"><div style = \"text-align: center;\"><span id=\"lock-icon\"></span><span id=\"lock-date\">"+ Math.floor(hours) + " 일 후</span></div></li>";
          }
          $(".list-group").append(tempList);
        }
      });
    }



});
