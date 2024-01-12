function buildSuccessMsg(urlList) {
    var response = `<h1><a href="/">Click to go to Home page</a><br></h1><hr>`;
    for (var i = 0; i < urlList.length; i++) {
        response += "File uploaded successfully.<br><br>";
        response += `FILE URL: <a href="${urlList[i]}">${urlList[i]}</a>.<br><br>`;
        response += `<img src="${urlList[i]}" /><br><hr>`;
    }
    response += `<br><p>Now you can store this URL in the database or do anything with it based on the use case.</p>`;
    return response;
}

module.exports = {
    buildSuccessMsg,
};
