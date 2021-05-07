import {Card, CardColumns, CardDeck, CardGroup, Button, Badge, ProgressBar, Spinner, ListGroup, Jumbotron, Container, Row, Col, Accordion, ToggleButtonGroup, ToggleButton, ButtonGroup, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { ChatLeftFill, ClockFill, FileCode, Github, PeopleFill, PersonFill, TagsFill } from 'react-bootstrap-icons';
import Moment from 'moment';
import './App.css';

function App() {
  useEffect(() => {
    console.log('EFFFEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECCCT');
    async function start() {
      let list = await getBoardList();
      let firstlist = await getBoardInfo(list[0].id);
      setBoard(firstlist);
      setBoardList(list);
    }
    start()
  }, []);
  const [board, setBoard] = useState("");
  const [boardList, setBoardList] = useState("");
  Moment.locale('de');
  
  
  async function getBoardInfo(id) {
    let result = '';
    console.log('Call BoardInfo')
    var config = {
      method: 'get',
      url: '/boards/'+id,    
    };
    try {
      let response = await axios(config)
      result = response.data
    } catch (error) {
      console.log(error)
    }
    console.log(result)
    return result;      
  }

  async function getBoardList() {
    let result = '';
    console.log('I am called')
    var config = {
      method: 'get',
      url: '/boards',    
    };
    try {
      let response = await axios(config)
      result = response.data
    } catch (error) {
      console.log(error)
    }
    console.log(result)
    return result;
  }

  const Deckcard = props => {
    return (
    <Card style={{ width: '18rem', flex: 1, marginBottom: '10px'}} key={props.key}>
      <Card.Header>{props.title}</Card.Header>
      <ListGroup variant="flush">
        <Meta labels={props.labels} usernames={props.usernames} duedate={props.duedate}/>
        <Description description={props.description}/>
      </ListGroup>
    </Card>
    );
  }

  const Description = props => {
    if (props.description !== "") {
      return (
        <ListGroup.Item>
          <Markdown>{props.description}</Markdown>
        </ListGroup.Item>
      )
    } else {
      return (null)
    }
  }
  
  const Meta = props => {
    return (
      <ListGroup.Item>
        {props.labels.length !== 0 ? (
          <Card.Subtitle>
            <TagsFill style={{marginRight: '0.25rem'}}/>
            {props.labels.map(l => (
              <Badge pill style={{backgroundColor: '#' + l.color, marginRight: '5px', marginBottom: '5px', marginTop: '5px'}} as='div'>{l.title}</Badge> 
            ))}
          </Card.Subtitle>
        ) : (null)}
        <Assigned usernames={props.usernames}/>
        <Due duedate={props.duedate}/>
      </ListGroup.Item>
    );
  }

  const Assigned = props => {
    if (props.usernames.length !== 0) {
      return (
        <Card.Subtitle style={{marginBottom: '5px'}}>
          <PeopleFill style={{marginRight: '5px'}}/>
          {props.usernames.map(user => (
            <Badge className='bg-secondary' style={{marginRight: '0.25rem'}}>{user}</Badge>
          ))}
        </Card.Subtitle>
      )
    } else {
      return (null)
    }
  }

  const Due = props => {
    console.log('Duedate: ', props.duedate)
    if (props.duedate !== null) {
      let dt = props.duedate
      return (
        <Card.Subtitle>
          <ClockFill style={{marginRight: '5px'}}/>
          <span>{Moment(dt).format('d MMM')}</span>
        </Card.Subtitle>
      )
    } else {
      return (null)
    }
  }

  const Deckstack = props => {
    return (
      <Col>      
        <ListGroup className='h-75 overflow-hidden' style={{flex: 1, borderRadius: '1rem'}} key={props.key}>
          <ListGroup.Item active>
          <h3>{props.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item className='overflow-auto'>
            {props.cards.map(carde => (
            <Deckcard title={carde.title} description={carde.description} key={carde.id} labels={carde.labels} usernames={carde.usernames} duedate={carde.duedate}/>
            ))}
          </ListGroup.Item>      
        </ListGroup>
      </Col>
    );
  }

  const handleDeckSwitch = async id => {
    console.log('button pressed with id: ', id);
    setBoard("");
    let newBoard = await getBoardInfo(id);
    setBoard(newBoard);
  }

  const Board = props => {
    return (
      <div className='h-auto w-100 overflow-hidden mb-0 pb-5' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 8, paddingLeft: '8rem', paddingRight: '8rem'}}>
            <Container fluid style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1rem', borderRadius: '2rem'}}>
              <Row>
              {board.stacks.map(stack => (
                  <Deckstack title={stack.title} cards={stack.cards} key={stack.id} />
                ))}
              </Row>
            </Container>
      </div>
    )
  }

  const TopContainer = props => {
    return (
      <Container className='h-auto overflow-auto mt-3 d-flex flex-column p-2 justify-content-space-between'>
        <Container className='overflow-auto d-flex'>
          <Container className='d-flex flex-column'>
            <h3 className='display-3'>Deck Display</h3>
            <hr className='mt-0 mb-1'/>
            <span>
              <span>
                <Github style={{marginRight: '0.25rem'}}/>
                <a href='https://github.com/thisni1s/deck-display' rel='nofollow'>Source</a>
              </span>
            </span>
            
          </Container>
          <Container style={{borderRadius: '1rem'}} className='overflow-auto bg-primary text-white border d-flex align-self-center justify-content-center'>
            {<h4 className='display-4'> {board.title ?? <Spinner animation="border"/>}</h4>}
          </Container>        
        </Container>
        {boardList.length > 1 ? (
          <Container className='align-self-end d-flex justify-content-end'>
          {boardList.filter(b => b.id !== board.id).map(bd => (
                        <Button style={{marginRight: '0.25rem'}} variant='outline-dark' onClick={() => handleDeckSwitch(bd.id)}>{bd.title}</Button>
          ))}
          </Container>
        ) : (null)}
      </Container>
      
    );
  } 

  return (
    <>
      <div className='vh-100 vw-100 overflow-hidden d-flex flex-column'>
        <TopContainer/>
        {board !== "" ? (
          <Board/>
        ) : (
          <Container className='h-75 overflow-visible d-flex flex-row justify-content-center align-items-center'>
            <Spinner animation="border"/>
          </Container>
        )}    
      </div>    
    </> 
  );
}





export default App;
