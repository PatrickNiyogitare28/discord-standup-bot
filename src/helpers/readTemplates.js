const fs = require('fs');

const readStandupTemplate = async() => {
    let tempData;
    const template = "src/templates/standup.md";
    try {
      const data = fs.readFileSync(template, 'utf8')
      tempData = data;
    } catch (err) {
      console.error(err)
    }
 return tempData;
};

const readReminderTemplate = async() => {
  let tempData;
  const template = "src/templates/reminder.md";
  try {
    const data = fs.readFileSync(template, 'utf8')
    tempData = data;
  } catch (err) {
    console.error(err)
  }
return tempData;
}; 

export {readStandupTemplate, readReminderTemplate};