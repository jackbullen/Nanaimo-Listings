const Actors = ['Marlon Brando','Meryl Streep','Morgan Freeman','Jack Nicholson','Audrey Hepburn','Al Pacino','Clint Eastwood','Katherine Hepburn','Johnny Depp','Robin Williams']

const Scientists = 
["Albert Einstein", "Isaac Newton", "Marie Curie", "Charles Darwin", "Nikola Tesla", "Galileo Galilei", "James Clerk Maxwell", "Jane Goodall", "Rosalind Franklin", "Stephen Hawking"]

const Athletes =
["Michael Jordan", "Serena Williams", "Cristiano Ronaldo", "Usain Bolt", "Muhammad Ali", "Michael Phelps", "Simone Biles", "Tom Brady", "Lionel Messi", "Maria Sharapova"]

const Poets =
["Maya Angelou", "Robert Frost", "Emily Dickinson", "Langston Hughes", "William Shakespeare", "Rumi", "Sylvia Plath", "Edgar Allan Poe", "Walt Whitman", "Pablo Neruda"]

const Historical =
["Cleopatra", "Julius Caesar", "Genghis Khan", "Leonardo da Vinci","Joan of Arc", "Galileo Galilei", "William Shakespeare", "Catherine the Great", "Nelson Mandela","Mahatma Gandhi"]

const Names = [Actors, Scientists, Athletes, Poets, Historical];

// Put your openAI secret key into GAS -> Project Settings -> Script Properties
const g = {
  folderId: 'GOOGLE_SHEETS_FOLDER_NAME',
};
function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}
 function getCellAddress(row, col) {
    var columnLetter = String.fromCharCode(65+col); // Convert column number to letter
    var cellAddress = columnLetter + row.toString();
    return cellAddress;
  }

function callChatGPT(features) {
  const apiUrl = 'https://api.openai.com/v1/completions';
  const scriptProps = PropertiesService.getScriptProperties();
  g.apiKey = scriptProps.getProperty('apiKey')
  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${g.apiKey}`,
      'Content-Type': 'application/json',
    },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      prompt: `${features}`,
      model: 'text-davinci-003',
      temperature: 1.23,
      max_tokens: 300,
    }),
  };
  const response = UrlFetchApp.fetch(apiUrl, options);
  const content = response.getContentText();
  if (!response.getResponseCode().toString().startsWith('2')) {
    console.log(content);
    return null;
  }
  const jsn = JSON.parse(content);
  if (!jsn.choices || jsn.choices.length === 0) {
    console.log(jsn);
    return null;
  }
  return jsn.choices[0].text;
}

function createSummaries() {
  const scriptProps = PropertiesService.getScriptProperties();
  g.apiKey = scriptProps.getProperty('apiKey');
  if (!g.apiKey) {
    throw new Error(`ChatGPT API Key script property is missing`);
  }
  var sheetName = "Nanaimo"; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  

  // Cannot do all records because GAS will timeout given we need to wait 21000 ms between OpenAI API calls
  for (var i=1; i<data.length; i++){
    var type = getRandomInt(0,6)
    var actor = getRandomInt(0,9);

    features = "Rewrite a summary of this description stylistically as "+Names[type][actor]+"in 2-3 sentences. "+data[i][5];
    console.log(features);
    
    const text = callChatGPT(features);
    var addr = getCellAddress(i+1,9);
    sheet.getRange(addr).setValue(text+"\n\n"+Names[type][actor]);

// So can continue to call OpenAI api.
    Utilities.sleep(21000);
  }

createSummaries();
