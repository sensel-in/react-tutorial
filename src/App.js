import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <Row>
        <MyCol sm={1}>Home</MyCol>
        <MyCol>Header</MyCol>
      </Row>
      <Row>
      <MyCol sm={1} lg={3} >Menu</MyCol>
      <MyCol sm={10} lg={9 const colStyle = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'red'
  }
 }>Body</MyCol>
      </Row>
    </Container>
  );
}
function MyCol(props) {
  const colStyle = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'red'
  };
  return (
    <Col {...props} style={colStyle}>{props.children}</Col>
  )
}
export default App;
