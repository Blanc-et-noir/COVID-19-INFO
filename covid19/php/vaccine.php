<?php
    $session = curl_init();
    $URL = "https://nip.kdca.go.kr/irgd/cov19stats.do?list=sido";
    curl_setopt($session,CURLOPT_URL,$URL);
    curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($session,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($session,CURLOPT_HEADER,0);
    $result = curl_exec($session);
    curl_close($session);
    echo $result;
?>