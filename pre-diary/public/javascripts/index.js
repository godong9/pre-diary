$(function(){
    
      //Keep track of last scroll
    var lastScroll = 0;
    var header = $("#index-header");
    var content = $("#content");
    var emotion = $("#emotion");
    var showEmtion = $("#show-emtion");
    var seletor = $("#seletor");
   
    var tempValue = 1;;
          
          
      $(window).scroll(function(event){
          //Sets the current scroll position
          var st = $(this).scrollTop();
         
          
          var headerHeight = header.height(); 
          
          
          //Determines up-or-down scrolling
          if (st > lastScroll ){
              
            header.animate({
                
                height: "100px"
            }, 200, function() {
                header.css("position","fixed");
                header.css("top","0px");
            });
    
            content.animate({
                
                
            }, 100, function() {
                content.css("margin-top","100px");
                content.css("height","500px");
                content.css("overflow-y","auto");
                content.scrollTop(1);
            });
            
            tempValue = 1;
            
            emotion.animate({
                
                height: "100px"
            }, 100, function() {
               showEmtion.css("visibility","hidden");
               seletor.css("visibility","hidden");
            });
  
        
          }
          else {
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
      
      
      
     content.scroll(function(event){
          var st = $(this).scrollTop();
         
         if(st == 0){
             header.animate({
                
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
            });
            
             emotion.animate({
                
                height: "200px"
            }, 100, function() {
               showEmtion.css("visibility","visible");
               seletor.css("visibility","visible");
            });
            
            tempValue = 1;
         }else if(st < 20){
             header.animate({
                
                height: "100px"
            }, 200, function() {
                header.css("position","fixed");
                header.css("top","0px");
            });
    
            content.animate({
                
                
            }, 100, function() {
                content.css("margin-top","100px");
                content.css("height","500px");
                content.css("overflow-y","auto");
                content.scrollTop(1);
            });
            
            emotion.animate({
                
                height: "100px"
            }, 100, function() {
               showEmtion.css("visibility","hidden");
               seletor.css("visibility","hidden");
            });
            
            tempValue  = 0
         }
         
         
       
     });
     
     header.click(function(){
         var url = "/view/statics"
         $(location).attr('href',url);
     });
     
     
     
     
     /* statics.html*/
     
     var emotion = $(".emotion1");
     var backButton = $("#back-icon");
     
     emotion.click(function(){
         
         for(var i = 0;emotion.length > i;i++){
             console.log(emotion.length);
             var tempEmotion = emotion.eq(i);
             tempEmotion.css("width","48px");
             tempEmotion.css("height","48px");
         }
         
         $(this).css("width","74px");
         $(this).css("height","74px");
     });
     
     backButton.click(function(){
         var url = "../../#"
         $(location).attr('href',url);
     });
     
     
     
});