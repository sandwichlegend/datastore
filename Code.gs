function onEdit(e) {
  // Get the sheet where the edit occurred.
  var sheet = e.range.getSheet();
  
  // Proceed only if the edit occurred on the "People" tab (case sensitive)
  if (sheet.getName() === "People") {
    
    // Check if the edited cell is in column C (column index 3) and contains a value.
    if (e.range.getColumn() === 3 && e.value) {

      // Get the row number of the edited cell.
      var rowNumber = e.range.getRow();
      
      // The value comes from the "Title" column; we now map it to the key "original"
      var payload = {
        original: e.value,
        row: rowNumber
      };

      // Configure the POST request options.
      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload)
      };

      // Replace with your actual n8n webhook URL.
      var webhookURL = "<your_webhook_url>";

      // Send the POST request to the webhook URL and log the outcome.
      try {
        UrlFetchApp.fetch(webhookURL, options);
        Logger.log("Webhook sent successfully with original: " + e.value);
      } catch (error) {
        Logger.log("Error sending webhook: " + error);
      }
    }
  }
}
