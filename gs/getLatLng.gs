 function getCellAddress(row, col) {
    var columnLetter = String.fromCharCode(65+col); // Convert column number to letter
    var cellAddress = columnLetter + row.toString();
    return cellAddress;
  }

function insertLatLng() {
  var sheetName = "Nanaimo"; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return {
      error: "Sheet not found."
    };
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  for (var i = 41; i < data.length; i++) {
    console.log(i);
    var row = data[i];

    var rowObject = {};

        for (var j = 0; j < 7; j++) {
      rowObject[headers[j]] = row[j];
    }

    Utilities.sleep(100);
    console.log(rowObject['addr']);
    var geo = Maps.newGeocoder().geocode(rowObject['addr']).results[0]['geometry'];

    var addr_lat = getCellAddress(i+1,7);
    sheet.getRange(addr_lat).setValue(geo.location.lat);

    var addr_long = getCellAddress(i+1,8);
    sheet.getRange(addr_long).setValue(geo.location.lng);

  }
}
