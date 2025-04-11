# datastore
## Overview
datastore is a simple method for storing data that has been normalized by an LLM, then calling a database of matches prior to querying the LLM.

For example, I would like to clean this input, so it matches the title naming convention in my CRM.

Input:
```
[
  {
    "job title": "director, it"
  }
]
```

I can run this title through an LLM to normalize it to `Director of IT`. But if another record in our CRM has the same title, I don't want to waste money running the record again. We solve this with datastore's matching database, storing values like this:
```
[
  {
    "original": "director, it",
    "normalized": "Director of IT"
  }
]
```

Calling the matching database prior to engaging the LLM keeps costs down and ensures more predictable outputs.

## Setup
Follow these steps to install this project in Google Sheets + n8n

### Sheets
1. Upload the sheets.xlsx file to your google drive & convert to sheets format
2. In the menu bar, select Extensions → Apps Script
3. Copy the Code.gs javascript into your pre-populated Code.gs file
4. In the sidebar, select the Triggers tab (cock icon) → Add Trigger with settings:
  - Choose which function to run: onEdit
  - Choose which deployment should run: Head
  - Select event source: From spreadsheet
  - Select event type: On edit
5. The first time you run the script, it will prompt you to authorize the app
6. If you have issues triggering the script:
  - Select Project Settings in the sidebar
  - Enable the option: Show "appsscript.json" manifest file in editor
  - Paste the contents of appsscript.json from this repo into your file

Your sheet will now trigger the webhook when you make edits to column C.

### n8n
1. Create a new n8n project
2. Upload the json file
3. Copy your webhook url
4. Paste it into the webhook section of Code.gs (in Google Apps Script)
5. Connect your Google Sheets nodes to the account (ensure you point the nodes to the right file)
6. Connect your Anthropic account to the AI node

Congratulations, your workflow should be operational!
