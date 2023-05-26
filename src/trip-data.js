import data from './data.json';
let dateRange = [new Date(3000, 0, 1), new Date(1970, 0, 1)];
const cleanedData = data.map((row) => {
    const newRow = {
        key: row['Trip-No']+'-'+Math.floor(Math.random() * 1000000),
        id: row['Vehicle'],
        category: row['Vehicle-Category'],
        start: {
            location: row['Trip-Start-Location'],
            in: parseTime(row['Trip-Start-In-Time']),
            out: parseTime(row['Trip-Start-Out-Time']),
        },
        end: {
            location: row['Trip-End-Location'],
            in: parseTime(row['Trip-End-In-Time']),
            out: parseTime(row['Trip-End-Out-Time']),
        },
        distance: row['Distance'],
        duration: parseInterval(row['Time-Duration']),
        runtime: parseInterval(row['Running-Time']),
        halttime: parseInterval(row['Halt-Hours']),
        detention: parseInterval(row['Dest-Detention-Time']),
    };
    if (newRow.start.in < dateRange[0]) {
        dateRange[0] = newRow.start.in;
    }
    if (newRow.end.out > dateRange[1]) {
        dateRange[1] = newRow.end.out;
    }
    return newRow;
});
function parseTime(localTimeString) {
    // 8/5/2023 10:32
      // Split the time string into its components
  const [date, time, meridian] = localTimeString.split(' ');
  const [day, month, year] = date.split('/');

  // Extract hours and minutes from the time string
  const [hours, minutes] = time.split(':');

  // Convert hours to 24-hour format if PM
  let hours24 = parseInt(hours, 10);
  if (meridian === 'PM' && hours24 !== 12) {
    hours24 += 12;
  }

  // Create a new Date object with the parsed components
  const ret = new Date(year, month - 1, day, hours24, minutes);

  return ret;
}
function parseInterval(durationString) {
    // Format nnhr nnmin
    // Return in seconds
    const [hours, minutes] = durationString.split(' ');
    return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
}

export default cleanedData;
export { dateRange };
