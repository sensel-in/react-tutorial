import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TripTable from './trip-table';
import ChartDashboard from './chart-dashboard';
import TopNavBar from './top-navbar';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import logo from './logo.svg';
import './App.css';

function App() {
  const colStyle = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'red'
  }
  return (
    <Container fluid>
      <Row><TopNavBar /></Row>
      <Row className="justify-content-center">
        <Col lg={8} >
          <Tabs defaultActiveKey="table">
            <Tab eventKey="table" title="Table">
              <TripTable />
            </Tab>
            <Tab eventKey="graph" title="Graph">
              <ChartDashboard />
            </Tab>
            <Tab eventKey="map" title="Map">
              TBD
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
export default App;
