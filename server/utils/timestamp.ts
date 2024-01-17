export function findNextNoon() {
    const now = new Date();
    
    // Check if the current time is after 12 PM
    if (now.getHours() >= 12) {
      // If it's after 12 PM, move to the next day
      now.setDate(now.getDate() + 1);
    }
  
    // Set the time to 12 PM
    now.setHours(12, 0, 0, 0);
  
    return now;
  }