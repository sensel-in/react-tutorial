import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import tripData ,{dateRange} from './trip-data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ChartDashboard() {
    const [dateFilterState, setDateFilterState] = useState(dateRange);
    const handleDateFilter = (evt, field) => {
        setDateFilterState((prevState) => {
            const newDate = new Date(evt.target.value);
            return { ...prevState, [field]: newDate };
        });
    };
    const aggByDate = tripData.filter(r => r.start.in >= dateFilterState[0] && r.end.out <= dateFilterState[1])
        .reduce((acc, cur) => {
            const date = cur.start.in.toLocaleDateString('en-CA');
            const day = cur.start.in.toLocaleDateString('en-CA', { weekday: 'short' });
            const dno = cur.start.in.getDay();
            if (!acc[date]) 
                acc[date] = { dno, date: date, day, distance: 0, runtime: 0, halttime: 0, detention: 0, count: 0 };
            acc[date].distance += cur.distance;
            acc[date].runtime += cur.runtime/3600;
            acc[date].halttime += cur.halttime/3600;
            acc[date].detention += cur.detention/3600;
            acc[date].count += 1;
            return acc;
        }, {});
    //console.log(aggByDate);
    const aggByDateArr = Object.values(aggByDate).sort((a,b) => a.date.localeCompare(b.date));
    const [aggByDOW, setAgg] = useState(false);
    const aggByDOWArr = aggByDateArr.reduce((acc, cur) => {
        const dno = cur.dno;
        if (!acc[dno])
            acc[dno] = { day: cur.day, distance: 0, runtime: 0, halttime: 0, detention: 0, count: 0 };
        acc[dno].distance += cur.distance;
        acc[dno].runtime += cur.runtime;
        acc[dno].halttime += cur.halttime;
        acc[dno].detention += cur.detention;
        acc[dno].count += cur.count;
        return acc;
    }, []);
    const toggle = (e) => {
        console.log(e.target.checked);
        setAgg(!aggByDOW);
    }    
    return (
        <Container fluid>
            <Row>
                <Col>
                <p>From: <Form.Control type="date" value={dateFilterState[0].toLocaleDateString('en-CA')} onChange={e => handleDateFilter(e, 0)}></Form.Control></p>
                <p>To: <Form.Control type="date"  value={dateFilterState[1].toLocaleDateString('en-CA')} onChange={e => handleDateFilter(e, 1)}></Form.Control></p>
                <p><Button onClick={() => setDateFilterState(dateRange)}>Reset</Button></p>
                <p><ToggleButton type="checkbox" variant="success" checked={aggByDOW}
                            onClick={toggle}>Aggregate by day-of the week</ToggleButton></p>
                </Col>
            </Row>
            <Row>
                <ResponsiveContainer width="100%" height={400}><LineChart  data={aggByDOW?aggByDOWArr:aggByDateArr}>
                  <CartesianGrid stroke="#ccc" />
                    <Line name="No. of trips (left axis)" type="monotone" dataKey="count" stroke="#000000" yAxisId="left" />
                    <YAxis orientation="left" dataKey="count" yAxisId="left" />
                    <Line name="Distance covered (kms, right axis)" type="monotone" dataKey="distance" stroke="#8884d8" yAxisId="right" />
                    <YAxis yAxisId="right" orientation="right" dataKey="distance" />
                    <XAxis dataKey={aggByDOW?"day":"date"} />
                    <Legend verticalAlign="top" height={36}/>
                    <Tooltip />
                </LineChart></ResponsiveContainer>
            </Row>
            <Row>
                <ResponsiveContainer width="100%" height={400}><BarChart  data={aggByDOW?aggByDOWArr:aggByDateArr}>
                    <CartesianGrid stroke="#ccc" />
                    <Bar name="Runtime (hrs)" type="monotone" dataKey="runtime" fill="#000000" yAxisId="left" stackId="a" />
                    <Bar name="Halttime (hrs)" type="monotone" dataKey="halttime" fill="#8884d8" yAxisId="left" stackId="a" />
                    <Bar name="Detention (hrs)" type="monotone" dataKey="detention" fill="#82ca9d" yAxisId="left" stackId="a" />
                    <XAxis dataKey={aggByDOW?"day":"date"} />
                    <Legend verticalAlign="top" height={36}/>
                    <Tooltip />
                </BarChart></ResponsiveContainer>
            </Row>
        </Container>
    )
}