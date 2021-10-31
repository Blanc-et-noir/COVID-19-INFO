$(document).ready(function(){
    $("#fullpage").initialize({
        dragSensitivity : 0.1,
        swipeSensitivity : 0.1,
    });

    function leapYear(Y){
        if((Y%4==0&&Y%100!=0)||Y%400==0){
            return true;
        }else{
            return false;
        }
    }
    
    function setInfectionTable(){
        var dates =[31,31,28,31,30,31,30,31,31,30,31,30,31];
        var Y = $("#infectionYear").val();
        var M = $("#infectionMonth").val();
        var D = $("#infectionDate").val();

        var param = (Y+""+(M<=9&&M>=1?"0":"")+(M)+""+(D<=9&&D>=1?"0":"")+D);
        var STATE_DT_TODAY;
        var STATE_TIME_TODAY;
        
        var DECIDE_CNT_TODAY,DECIDE_CNT_YESTERDAY;
        var CLEAR_CNT_TODAY,CLEAR_CNT_YESTERDAY;
        var EXAM_CNT_TODAY, EXAM_CNT_YESTERDAY;
        var RESULT_NEG_CNT_TODAY,RESULT_NEG_CNT_YESTERDAY;
        var DEATH_CNT_TODAY, DEATH_CNT_YESTERDAY;
        var CARE_CNT_TODAY, CARE_CNT_YESTERDAY;
        var ACC_EXAM_CNT_TODAY, ACC_EXAM_CNT_YESTERDAY;
        var ACC_DEF_RATE_TODAY, ACC_DEF_RATE_YESTERDAY;
        
        $.ajax({
            url:"../php/infection.php?date="+param,
            type:"GET",
            async:false,
            data:{
                "date":param
            },
            dataType:"xml",
            "success":function(result){
                DECIDE_CNT_TODAY = $(result).find("decideCnt").text();
                CLEAR_CNT_TODAY = $(result).find("clearCnt").text();
                EXAM_CNT_TODAY = $(result).find("examCnt").text();
                RESULT_NEG_CNT_TODAY = $(result).find("resutlNegCnt").text();
                DEATH_CNT_TODAY = $(result).find("deathCnt").text();
                CARE_CNT_TODAY  = $(result).find("careCnt").text();
                ACC_EXAM_CNT_TODAY = $(result).find("accExamCnt").text();
                ACC_DEF_RATE_TODAY = $(result).find("accDefRate").text();
                STATE_TIME_TODAY = $(result).find("stateTime").text();
                STATE_DT_TODAY = $(result).find("stateDt").text();
            },
            "error":function(request,status,error){

            },"complete":function(){

            }
        });
        
        var newD=D, newM=M, newY = Y;

        if(D==1){
            newM--;
            if(newM == 0){
                newM = 12;
                newY--;
            }
            if(M==3&&leapYear(Y)){
                newD = 29;
            }else{
                newD = dates[newM];
            }
        }else{
            newD--;
        }

        param = (newY+""+(newM<=9&&newM>=1?"0":"")+(newM)+""+(newD<=9&&newD>=1?"0":"")+newD);


        $.ajax({
            url:"../php/infection.php?date="+param,
            type:"GET",
            async:false,
            data:{
                "date":param
            },
            timeout:3000,
            dataType:"xml",
            "success":function(result){
                DECIDE_CNT_YESTERDAY = $(result).find("decideCnt").text();
                CLEAR_CNT_YESTERDAY = $(result).find("clearCnt").text();
                EXAM_CNT_YESTERDAY = $(result).find("examCnt").text();
                RESULT_NEG_CNT_YESTERDAY = $(result).find("resutlNegCnt").text();
                DEATH_CNT_YESTERDAY = $(result).find("deathCnt").text();
                CARE_CNT_YESTERDAY  = $(result).find("careCnt").text();
                ACC_EXAM_CNT_YESTERDAY = $(result).find("accExamCnt").text();
                ACC_DEF_RATE_YESTERDAY = $(result).find("accDefRate").text();
            },
            "error":function(request,status,error){
                alert("에러"+request+"-"+status+"-"+error);
            },"complete":function(){

            }
        });

        $("#infectionFigure #infectionTable").remove();
        $("#infectionFigure").append("<table id='infectionTable'/>");
        $("#infectionTable").append("<tr><td>목록</td><td>수치</td><td>증감량</td></tr>");
        $("#infectionTable").append("<tr><td>누적 검사</td><td>"+(ACC_EXAM_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(ACC_EXAM_CNT_TODAY-ACC_EXAM_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(ACC_EXAM_CNT_TODAY-ACC_EXAM_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>누적 음성 판정</td><td>"+(RESULT_NEG_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(RESULT_NEG_CNT_TODAY-RESULT_NEG_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(RESULT_NEG_CNT_TODAY-RESULT_NEG_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>누적 확진</td><td>"+(DECIDE_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(DECIDE_CNT_TODAY-DECIDE_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(DECIDE_CNT_TODAY-DECIDE_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>누적 격리해제</td><td>"+(CLEAR_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(CLEAR_CNT_TODAY-CLEAR_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(CLEAR_CNT_TODAY-CLEAR_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>누적 사망</td><td>"+(DEATH_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(DEATH_CNT_TODAY-DEATH_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(DEATH_CNT_TODAY-DEATH_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>검사중</td><td>"+(EXAM_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(EXAM_CNT_TODAY-EXAM_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(EXAM_CNT_TODAY-EXAM_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
        $("#infectionTable").append("<tr><td>격리중</td><td>"+(CARE_CNT_TODAY-0).toLocaleString()+"</td><td style='color:" +(CARE_CNT_TODAY-CARE_CNT_YESTERDAY>=0?'#6C63FF':'#EE3F5C')+"'>"+(CARE_CNT_TODAY-CARE_CNT_YESTERDAY).toLocaleString()+"</td></tr>");
    }

    function setVaccineLocationTable(){
        var URL = "../php/vaccineLocation.php";
        $.ajax({
            url:URL,
            type:"GET",
            dataType:"json",
            "success":function(result){
                var obj = result.data;
                var SIDO = $("#vaccineLocation").val();
                $("#vaccineLocationFigure table").remove();
                $("#vaccineLocationFigure").append("<table id='vaccineLocationTable'></table>");
                $("#vaccineLocationTable").append("<tr><td>주소</td><td>기관명</td><td>전화번호</td></tr>")
                for(i=0; i<284; i++){
                    if(obj[i].sido == SIDO){
                        $("#vaccineLocationTable").append("<tr><td>"+obj[i].address+"</td>"+"<td>"+obj[i].centerName+"</td>"+"<td>"+obj[i].phoneNumber+"</td></tr>");
                    }
                }
            },
            "error":function(request,status,error){
                alert("에러"+request+"-"+status+"-"+error);
            },"complete":function(){

            }
        })
    }

    function setScreeningCenterTable(){
        var URL = "../php/screeningCenter.php";
        $.ajax({
            url:URL,
            type:"GET",
            dataType:"json",
            "success":function(result){
                var obj = result.screeningCenter;
                var SIDO = $("#screeningCenter").val();
                $("#screeningCenterFigure table").remove();
                $("#screeningCenterFigure").append("<table id='screeningCenterTable'></table>");
                $("#screeningCenterTable").append("<tr><td>주소</td><td>기관명</td><td>전화번호</td></tr>")
                for(i=0; i<625; i++){
                    if(obj[i].sido == SIDO){
                        $("#screeningCenterTable").append("<tr><td>"+obj[i].address+"</td>"+"<td>"+obj[i].centerName+"</td>"+"<td>"+obj[i].phoneNumber+"</td></tr>");
                    }
                }
            },
            "error":function(request,status,error){
                alert("에러"+request+"-"+status+"-"+error);
            },"complete":function(){

            }
        })
    }

    $(document).on("change","#infectionMonth",function(){
        var dates =[31,31,28,31,30,31,30,31,31,30,31,30,31];
        var Y = $("#infectionYear").val();
        var M = $("#infectionMonth").val();
        var max=0;
        if((Y%4==0&&Y%100!=0)||Y%400==0){
            if(M==2){
                max = 29;
            }else{
                max = dates[M];
            }
        }else{
            max = dates[M];
        }
        $("#infectionDate").remove();
        $("#infectionForm").append("<select id='infectionDate' name=' infectionDate'/>");
        for(i=1; i<=max; i++){
            if(i!=1){
                $("#infectionDate").append("<option label='"+i+"일' value= '"+i+"'/>");
            }else{
                $("#infectionDate").append("<option label='"+i+"일' value= '"+i+"' selected/>");
            }

        }
    });
    $(document).on("change","#infectionYear",function(){
        var dates =[31,31,28,31,30,31,30,31,31,30,31,30,31];
        var Y = $("#infectionYear").val();
        var M = $("#infectionMonth").val();
        var max=0;
        if((Y%4==0&&Y%100!=0)||Y%400==0){
            if(M==2){
                max = 29;
            }else{
                max = dates[M];
            }
        }else{
            max = dates[M];
        }
        $("#infectionDate").remove();
        $("#infectionForm").append("<select id='infectionDate' name=' infectionDate'/>");
        for(i=1; i<=max; i++){
            if(i!=1){
                $("#infectionDate").append("<option label='"+i+"일' value= '"+i+"'/>");
            }else{
                $("#infectionDate").append("<option label='"+i+"일' value= '"+i+"' selected/>");
            }

        }
    });

    $(document).on("click","#infectionButton",setInfectionTable);
    $(document).on("click","#vaccineLocationButton",setVaccineLocationTable);
    $(document).on("click","#screeningCenterButton",setScreeningCenterTable);
});