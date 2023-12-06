import React, { useRef, useState,useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

let toastText = ''

function InsertForm({changeList, showList}){
    const [showA, setShowA] = useState(false);
    const text1 = useRef()
    const [text2,setText2] = useState("")
    const toggleShowA = () => setShowA(!showA);
    const [sdacha,setSdacha] = useState(0)
    const [card, setCard] = useState(false)

    const handleAdd = (e)=>{
            e.preventDefault()
            const r = Math.floor(Math.random() * 100);
            const data = {name:text1.current.value, price:Number(text2), category:'Classic', date_sale:'12-12-2020', articul:r, idm:r, url:'https://cdn.lovellsports.com/products/zoom/1504306_2.jpg'}
            changeList([...showList,data])
            toastText = text1.current.value
            text1.current.value=''
            text2.current.value=''
            toggleShowA()
        }
    useEffect(()=>{
        if(text2>4500){
            console.log("4500-",text2)
            setSdacha(text2-4500)
            setCard(false)
        }
        else{
            setSdacha(4500-text2)
            setCard(true)
        }
    },[text2])

    const changeHandle = (e)=>{
        const digit = Number(e)
        try {
            // !Number.isNaN(e) ? setText2(""): null
            console.log('Number',digit)
            if (digit > 0){
                setText2(digit)
            }
            else{
                setText2("")
            }
        }
        catch{
            console.log('not number')
            setText2(0)
        }
    }
        
    return(
        <section>
            <Row>
                <Col md={6} className="mb-2">
                    <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">Товар Добавлен</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{toastText}</Toast.Body>
                    </Toast>
                </Col>
        </Row>
            <Row>
                <Col md={4} className="pb-4">
                    <h5 className="py-3">Добавить</h5>
                    <hr/>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" ref={text1} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="number" value={text2} onChange={(e)=>changeHandle(e.target.value)} placeholder="Price" />
                        <Form.Label>{card ? "Карта":"сдача"} {sdacha}</Form.Label>
                        </Form.Group>
                        
                        <Button variant="success" type="submit" onClick={handleAdd}>Принять</Button>
                    </Form>
                </Col>
            </Row>
        </section>
    )
}

export default InsertForm