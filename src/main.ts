import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

declare var global: any;

global.doPost = (e) => {
    const event = JSON.parse(e.postData.contents).events[0];

    spreadsheet('A1', event);

    if (event.type == 'message') {
        reply(event);
    }
}

const reply = (e) => {
    const message = {
        "replyToken" : e.replyToken,
        "messages" : [
            {
                "type" : "text",
                "text" : e.message.text
            }
        ]
    };

    const replyData: URLFetchRequestOptions = {
        "method" : "post",
        "headers" : {
            "Content-Type" : "application/json; charset=UTF-8",
            "Authorization" : "Bearer " + process.env.LINE_CHANNEL_ACCESS_TOKEN
        },
        "payload" : JSON.stringify(message)
    };

    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", replyData);
}

const spreadsheet = (range: string, text: string) => {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    spreadsheet.getSheetByName('シート1').getRange(range).setValue(text);
}

const getUser = (userId: string) => {

}
