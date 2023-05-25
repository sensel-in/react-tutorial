import Table from 'react-bootstrap/Table';
import tripData from './trip-data';
import { SortUp, SortDown } from 'react-bootstrap-icons';
import { useState } from 'react';
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
    const baseState = {
        id: 0,
        category: 0,
        start: {
            location: 0,
            in: 0,
            out: 0,
        },
        end: {
            location: 0,
            in: 0,
            out: 0,
        },
        distance: 0,
        duration: 0,
        runtime: 0,
        halttime: 0,
        detention: 0,
    };
    let [sortState, setSortState] = useState(baseState);
    const handleSort = (field) => {
        const flds = field.split('.');
        setSortState((prevState) => {
            if (flds.length === 1)
                return { ...baseState, [field]: prevState[field] ? -prevState[field] : 1 };
            else {
                const [parent, child] = flds;
                return { ...baseState, [parent]: { ...baseState[parent], [child]: prevState[parent][child] ? -prevState[parent][child] : 1 } };
            }
        });
    };
    const SortIcon = (props) => {
        switch (props.dir) {
            case 0: return <div  onClick={() => handleSort(props.field)} style={{ textAlign: 'right' }}><SortUp /></div>;
            case 1: return <div  onClick={() => handleSort(props.field)} style={{ color: 'blue', fontWeight: 'bold', textAlign: 'right' }}><SortUp /></div>;
            case -1: return <div  onClick={() => handleSort(props.field)} style={{ color: 'blue', textAlign: 'right' }}><SortDown /></div>;
        }
        return '??'
    };
    const sortBy = (sortState, data) => {
        const fsf = d => Object.keys(d).find((key) => typeof(d[key]) == 'number' && sortState[key] !== 0) 
        const field = fsf(sortState);
        if (field) {
            const dir = sortState[field];
            const scmp = (typeof(data[0][field]) == 'string');
            return data.sort((a, b) => {
                return dir*(scmp?a[field].localeCompare(b[field]):(a[field] - b[field]));
            });
        }
        let f1, f2;
        if (f2 = fsf(sortState.start)) {
            f1 = 'start';
        } else if (f2 = fsf(sortState.end)) {
            f1 = 'end';
        }
        if (f1 && f2) {
            const dir = sortState[f1][f2];
            const scmp = (typeof(data[0][f1][f2]) == 'string');
            return data.sort((a, b) => {
                return dir*(scmp?a[f1][f2].localeCompare(b[f1][f2]):(a[f1][f2] - b[f1][f2]));
            });
        }
        return data
    }
    //console.log(tripData);
    return (<Table striped bordered hover>
      <thead>
        <tr>
        <th colSpan={2} className="text-center">Vehicle</th>
        <th colSpan={3} className="text-center">Trip Start</th>
        <th colSpan={3} className="text-center">Trip End</th>

        <th rowSpan={2} className="text-center">Distance <SortIcon field="distance" dir={sortState.distance} /></th>

        <th colSpan={4}  className="text-center">Trip Durations</th>
        </tr>
        <tr>
        <th>ID <SortIcon field="id" dir={sortState.id} /></th>
        <th>Category <SortIcon field="category" dir={sortState.category} /></th>

        <th>Location <SortIcon field="start.location" dir={sortState.start.location} /></th>
        <th>In <SortIcon field="start.in" dir={sortState.start.in} /></th>
        <th>Out <SortIcon field="start.out" dir={sortState.start.out} /></th>
        
        <th>Location <SortIcon field="end.location" dir={sortState.end.location} /></th>
        <th>In <SortIcon field="end.in" dir={sortState.end.in} /></th>
        <th>Out <SortIcon field="end.out" dir={sortState.end.out} /></th>
                
        <th>Total <SortIcon field="duration" dir={sortState.duration} /></th>
        <th>Running <SortIcon field="runtime" dir={sortState.runtime} /></th>
        <th>Halt <SortIcon field="halttime" dir={sortState.halttime} /></th>
        <th>Detention <SortIcon field="detention" dir={sortState.detention} /></th>
        </tr>
      </thead>
      <tbody>
        {sortBy(sortState, tripData).map(row => (<tr key={row.key}>
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
