const isAvalidStandup = (message) => {
    const msg = message.toLowerCase();
    if(msg.includes("yesterday") || msg.includes("today") || msg.includes("blocker"))
      return true;
     return false; 
}
module.exports = isAvalidStandup;