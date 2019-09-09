function getWeather() {
  
  //大阪の天気を取得
  var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=270000'; //URL+cityID
  var res = UrlFetchApp.fetch(url);
  var data = JSON.parse(res.getContentText());

  //日本時間を取得
  var publicTime = Utilities.formatDate(new Date(data.publicTime), 'JST', 'yyyy/MM/dd hh時発表の天気予報');
  
  //今日の天気を取得
  var forecast = data.forecasts[0].telop; 
  
  //Slackに送る文章
  var strBody = publicTime + 'は' + forecast;
  
  postSlack(strBody);
  
}


function postSlack(text) {
 
  var url = '自分のWebhook URLを入力';
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({text: text})
 
  };
 
  UrlFetchApp.fetch(url, params);
}