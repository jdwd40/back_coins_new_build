const db = require('../db/connection');
const { selectCurrentEvent } = require('../models/eventModels');

exports.check_game_event = async () => {
  // Step 1: Query the database for active events
  //
  const currentEvent = await selectCurrentEvent();
  console.log('currentEvent: ', currentEvent);

  // Step 2: Handle the case where an event is active
  if (currentEvent) {
    // You might want to return, log, or do something else with the active event here
    console.log('Active event found: ', currentEvent.type);
    return 'Active event found';
  }

  // Step 3: Handle the case where no event is active

  // Step 4: Determine the type of the new event
  const eventTypes = ['boom', 'bust', 'stagnate'];
  const randomIndex = Math.floor(Math.random() * eventTypes.length);
  const eventType = eventTypes[randomIndex];

  // Step 5: Determine the duration of the new event
  const duration = Math.floor(Math.random() * (5 - 1 + 1)) + 5; // Random number between 5 and 20 (1 , 5)

  // Step 6: Determine the start and end times of the new event
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + duration * 60000); // Add duration minutes to start time

  // Step 7: Create the new event
  const newEvent = await db.query(
    'INSERT INTO events (type, start_time, end_time) VALUES ($1, $2, $3) RETURNING *',
    [eventType, startTime, endTime]
  );
  console.log('newEvent: ', newEvent);
  // Log the new event
  return 'New event created';
};
