import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TripTable from './trip-table';
import TopNavBar from './top-navbar';

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
          <TripTable />
        </Col>
      </Row>
    </Container>
  );
}
export default App;
