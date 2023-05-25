import Table from 'react-bootstrap/Table';
import tripData from './trip-data';

function fmtTime(t) {
    return t.toLocaleTimeString('en-US', { hour12: false });
}
function fmtInterval(t) {
    return `${Math.floor(t/3600)}:${Math.round((t%3600)/60).toString().padStart(2,'0')}`;
}
function fmtDistance(d) {
    return d.toFixed(2);
}
function TripTable() {
    return (<Table striped bordered hover>
      <thead>
        <tr>
        <th colSpan={2} className="text-center">Vehicle</th>
        <th colSpan={3} className="text-center">Trip Start</th>
        <th colSpan={3} className="text-center">Trip End</th>

        <th rowSpan={2} className="text-center">Distance</th>

        <th colSpan={4}  className="text-center">Trip Durations</th>
        </tr>
        <tr>
        <th>ID</th>
        <th>Category</th>

        <th>Location</th>
        <th>In</th>
        <th>Out</th>
        
        <th>Location</th>
        <th>In</th>
        <th>Out</th>
        
        <th>Total</th>
        <th>Running</th>
        <th>Halt</th>
        <th>Detention</th>
        </tr>
      </thead>
      <tbody>
        {tripData.map(row => (<tr key={row.key}>
            <td>{row.id}</td>
            <td>{row.category}</td>

            <td>{row.start.location}</td>
            <td>{fmtTime(row.start.in)}</td>
            <td>{fmtTime(row.start.out)}</td>

            <td>{row.end.location}</td>
            <td>{fmtTime(row.end.in)}</td>
            <td>{fmtTime(row.end.out)}</td>

            <td className='text-end'>{fmtDistance(row.distance)}</td>

            <td className="text-end">{fmtInterval(row.duration)}</td>
            <td className="text-end">{fmtInterval(row.runtime)}</td>
            <td className="text-end">{fmtInterval(row.halttime)}</td>
            <td className="text-end">{fmtInterval(row.detention)}</td>
        </tr>))}
      </tbody>
    </Table> )
}
export default TripTable;
