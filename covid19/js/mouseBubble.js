$.fn.extend({
    mouseBubble:function(settings){
        if(settings.bubbleColors == undefined || settings.bubbleColors.length == 0){settings.bubbleColors = ["#7BC6BF","#B3E6EC","#DDF7F7","#E4E6EE","#376C6D"];}
        if(settings.bubbleDiameter == undefined){settings.bubbleDiameter = 20;}
        if(settings.bubbleBorder == undefined){settings.bubbleBorder = settings.bubbleDiameter*0.1;}
        if(settings.bubbleDistance == undefined){settings.bubbleDistance = 100;}
        if(settings.bubbleDuration == undefined){settings.bubbleDuration = 500;}
        if(settings.bubbleEasing == undefined){settings.bubbleEasing = "linear";}

        $(document).on("mousedown",".mouseBubble",function(e){

        })
        $(document).on("mousemove",".mouseBubble",function(e){
            var y = e.clientY - $(this).offset().top;
            var x = e.clientX - $(this).offset().left;
            var d1 = settings.bubbleDistance/2;//사인30, 코사인60의 값
            var d2 = settings.bubbleDistance/2*1.731;//사인60, 코사인30의 값
            var dir = [[settings.bubbleDistance*(-1),0],[d2*(-1),d1],[d1*(-1),d2],[0,settings.bubbleDistance],[d1,d2],[d2,d1],[settings.bubbleDistance,0],[d2,d1*(-1)],[d1,d2*(-1)],[0,settings.bubbleDistance*(-1)],[d1*(-1),d2*(-1)],[d2*(-1),d1*(-1)]];//12방위

            //기본설정거리의 +-50%의 거리를 적용함 
            var dif = Math.floor(Math.random()*(settings.bubbleDistance/2));
            if(dif %2==0){
                dif = dif*(-1);
            }
            
            //설정에 맞게 버블 생성
            var bubble;
            var bubbleIndex = Math.floor(Math.random()*2);
            var colorIndex = Math.floor(Math.random()*settings.bubbleColors.length);
            var dirIndex = Math.floor(Math.random()*dir.length);
            if(bubbleIndex == 0){
                bubble = $("<div class='bubble' style='background-color:"+settings.bubbleColors[colorIndex]+"; width:"+settings.bubbleDiameter+"px; height:"+settings.bubbleDiameter+"px; position:absolute; border-radius:50%; top: "+y+"px; left: "+x+"px; box-sizing:border-box; transform:translate(-50%,-50%);'></div>");
            }else{
                bubble = $("<div class='bubble' style='border:"+settings.bubbleBorder+"px solid "+settings.bubbleColors[colorIndex]+"; width:"+settings.bubbleDiameter+"px; height:"+settings.bubbleDiameter+"px; position:absolute; border-radius:50%; top: "+y+"px; left: "+x+"px; box-sizing:border-box; transform:translate(-50%,-50%);'></div>");
            }
            $(".mouseBubble").eq(0).append(bubble);

            //버블을 움직임
            bubble.animate({
                "top":"+="+(dir[dirIndex][0]+dif)+"px",
                "left":"+="+(dir[dirIndex][1]+dif)+"px",
                "width":0,
                "height":0
            },settings.bubbleDuration,settings.bubbleEasing,function(){
            //버블 애니메이션이 종료되면 버블제거
                $(".mouseBubble").eq(0).children(".bubble").eq(0).remove();
            })
        })
    }
});