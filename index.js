const ics = require('ics');
const fs = require('fs');
const schedule = require('./schedule.json');

const events = schedule.schedule.flatMap((day) =>
  day.matches.map((match) => {
    const date = new Date(day.date);
    const [hour, minute] = match.time.split(':').map(Number);
    const start = [date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute];
    const title = `${match.teams} (${match.channel})`;
    const description = `Runda: ${day.round}`;
    const startTime = match.start_time ? `Start Time: ${match.start_time}` : '';

    return {
      start,
      duration: { hours: 2 },
      title,
      description: `${description} ${startTime}`,
      location: 'Europe',
    };
  })
);

ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }
  fs.writeFileSync('euro_cup_schedule.ics', value);
  console.log('ICS file created successfully.');
});
