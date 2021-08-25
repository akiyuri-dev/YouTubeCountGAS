function YouTubeCount() {

    var Nowymdhms = new Date();
    var NowMin = Nowymdhms.getMinutes();

    //トリガーを分ベースかつ1分おきに設定し、この条件式の数字を変更することでn分で割り切れる分数で記録
    if (NowMin % 5 == 0) {

        //スプレッドシートのURLからキーを抜く https://docs.google.com/spreadsheets/d/ここがスプレッドシートのキー/edit#gid=0
        var spreadsheet = SpreadsheetApp.openById('スプレッドシートのキーをここにコピー');
        var sheet = spreadsheet.getActiveSheet();

        //リクエストを送る時に付与するパラメータ
        var params = {
            "method": "get"
        };

        //YouTube動画の再生回数を取得するためのリクエストURL
        //動画URLからIDを抜く https://www.youtube.com/watch?v=ここが動画ID
        //YouTube APIキーについて https://qiita.com/shinkai_/items/10a400c25de270cb02e4
        var requestUrl = 'https://www.googleapis.com/youtube/v3/videos?id=ここに動画IDをコピー&key=ここにYouTube APIキーをコピー&part=statistics';

        //再生回数とコメント数取得
        var res = UrlFetchApp.fetch(requestUrl, params);
        var json = JSON.parse(res.getContentText());
        var viewCount = json["items"][0]["statistics"]["viewCount"];
        var commentCount = json["items"][0]["statistics"]["commentCount"];

        //現在時刻取得
        var date = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');

        //スプレッドシートの末尾行に追記
        var lastLow = sheet.getRange(sheet.getMaxRows(), 1).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
        sheet.getRange(lastLow + 1, 1).setValue(date);
        sheet.getRange(lastLow + 1, 2).setValue(viewCount);
        sheet.getRange(lastLow + 1, 3).setValue(commentCount);
    }

}
