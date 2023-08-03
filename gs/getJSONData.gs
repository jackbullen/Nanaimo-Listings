function doGet() {
  var sheetName = "Nanaimo"; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return {
      error: "Sheet not found."
    };
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var jsonData = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowObject = {};

    for (var j = 0; j < 7; j++) {
      rowObject[headers[j]] = row[j];
    }
    jsonData.push(rowObject);
  }

  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
