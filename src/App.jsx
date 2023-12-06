import {useState,useRef,useEffect } from 'react'
import { Shoes } from './Shoes'
import ListSale from './ListSale'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Navbar from 'react-bootstrap/Navbar';
import InsertForm from './InsertForm';
import { Sales } from "./Sales";
import TimerShow from './TimerShow';
import { ButtonGroup } from 'react-bootstrap';
import UploadWidget from './components/UploadWidget';
import Cloundin from './Cloundin';


function App() {
  const [todoText, settodoText] = useState("")
  const [listTodo, setlistTodo] = useState(Shoes)
  const [buyList, setbuyList] = useState([])
  const [sumCost, setSumCost] = useState(0)
  const [salesList, setSaleList] = useState(Sales);


  useEffect(()=>{
    if (buyList.length > 0){
      const ssm = buyList.reduce((total, current) => {
        // console.log(current.price, total)
        return total + current.price
      },0);
      setSumCost(ssm)
    }
    else{
      setSumCost(0)
    }
  },[buyList])

  function handleAdd(art){
    let found = listTodo.find((item)=>{
      return item.articul === art
    })

    if (found){
      const idm = Math.floor(Math.random() * 100);
      setbuyList([...buyList, {name:found.name,category:found.category,date_sale:found.date_sale, articul:found.articul, idm:idm, url:found.url,price:found.price}])
    }
  }
  
  function handleBuy(){
    const idm = Math.floor(Math.random() * 100);
    setSaleList([...salesList, ...buyList])
    setbuyList([])
    // setbuyList([...buyList, {name:found.name, articul:found.articul, idm:idm, url:found.url,price:found.price}])
  }

  function handleDel(idm){
    setbuyList(current => {
      return current.filter(todo => todo.idm !== idm)
    })
  }

  function handleSortAsc(){
    setlistTodo([...listTodo].sort((a, b) => a.price - b.price))
  }

  function handleSortDsc(){
    setlistTodo([...listTodo].sort((a, b) => b.price - a.price))
  }
  
  const filtered = listTodo.filter((item)=>{
      return item.name.toLowerCase().includes(todoText.toLowerCase())
  })
    
  return (
    <>
      <Container >
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
          </Container>
        </Navbar>
        <Row>
          <Col xs={12}>
            <UploadWidget />
            {/* <Cloundin /> */}
            <h1>Shoes</h1>
            <TimerShow/>
            <ButtonGroup>
              <Button  variant='light' onClick={handleSortAsc}>Asce</Button>
              <Button  variant='light' onClick={handleSortDsc}>Desc</Button>
            </ButtonGroup>
            <input value={todoText} onChange={(e)=>{settodoText(e.target.value)}} placeholder='Filter'/>
          </Col>
        </Row>
      <Row className='py-4'>
        {
          filtered.map((item)=>{
            return(
              <Col key={crypto.randomUUID()} className='my-2'>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.url} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle>{item.price}тг</Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button onClick={()=>handleAdd(item.articul)} variant="primary">Add</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      
      </Row>
      <Row>
        <Col>
          <h3>Total cost: {sumCost}</h3>
          <Stack direction='horizontal'>
              {
                buyList.map((item,index)=>{
                  return(
                    <div key={crypto.randomUUID()} className="p-2">
                       <Figure>
                        <Figure.Image
                          width={100}
                          height={100}
                          alt="171x180"
                          src={item.url}
                        />
                        <Figure.Caption>
                        {item.name} - {item.price}
                        <Button variant='light' size='xs' onClick={()=>handleDel(item.idm)}>Delete</Button>
                        </Figure.Caption>
                      </Figure>
                    </div>
                  )
                })
              }  
            </Stack>
            <Button size='md' variant='success' onClick={handleBuy}>Buy all</Button>
          </Col>
          <Col md={6} xs={12}>
            <ListSale salesList={salesList} setSaleList={setSaleList}/>
          </Col>
      </Row>
      <InsertForm changeList={setlistTodo} showList={listTodo}/>
    </Container>
    </>
  )
}

export default App