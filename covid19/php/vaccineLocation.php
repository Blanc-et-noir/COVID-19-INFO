<?php
    $session = curl_init();
    $URL = "https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=8KAf873Q5QnbjxkIu4vO7LYWmH6A7q45SNsZGJQDzjC1WiEHzNV9hrsCWbxEl/p0qO9IDnbDX0F7a2XBOko0Nw==";
    curl_setopt($session,CURLOPT_URL,$URL);
    curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($session,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($session,CURLOPT_HEADER,0);
    $result = curl_exec($session);
    curl_close($session);
    echo $result;
?>