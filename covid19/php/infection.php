<?php
    $session = curl_init();
    $date = $_GET["date"];
    $URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=8KAf873Q5QnbjxkIu4vO7LYWmH6A7q45SNsZGJQDzjC1WiEHzNV9hrsCWbxEl/p0qO9IDnbDX0F7a2XBOko0Nw==&pageNo=1&numOfRows=10&startCreateDt=".$date."&endCreateDt=".$date;
    curl_setopt($session,CURLOPT_URL,$URL);
    curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($session,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($session,CURLOPT_HEADER,0);
    $result = curl_exec($session);
    curl_close($session);
    echo $result;
?>