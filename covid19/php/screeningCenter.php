<?php
    $session = curl_init();
    $URL = "http://jrw9215.dothome.co.kr/covid19/json/screeningCenter.json";
    curl_setopt($session,CURLOPT_URL,$URL);
    curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($session,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($session,CURLOPT_HEADER,0);
    $result = curl_exec($session);
    curl_close($session);
    echo $result;
?>
