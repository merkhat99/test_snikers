import React, { useEffect, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Sales } from "./Sales";


const URL = 'https://api.cloudinary.com/v1_1/dbdyyzatb/resources/image'
const URL2 = 'https://657395363678234:_YEE3fZb9cxDDWchVZA-Dx1UIog@api.cloudinary.com/v1_1/dbdyyzatb/resources/image'


function ListSale({salesList, setSaleList}){
    const [profit, setProfit] = useState(0);

    const handleButton = (name) =>{
        if (name.length==0){
            setSaleList(Sales)
        }
        else{
            const result = salesList.filter((item)=>{
                return item.category == name
            })
            // console.log(result)
            setSaleList(result)
        }
    }

    const handleEdit = (item)=>{
        const [value, idm] = item
        // console.log(value,idm)
        let t1 = salesList
        const newList = t1.map((item)=>{
            if(item.idm == idm){
                item.price = Number(value)
            }
            return item
        })
        setSaleList(newList)
    }


    useEffect(()=>{
        const resProfit = salesList.reduce((total,current)=>{
            return total+current.price
        },0);

        setProfit(resProfit)

    },[salesList])

    return(
    <>
        <Table striped hover bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Category</th>
            </tr>
            </thead>
            <tfoot>
                <tr>
                <th></th>
                <th></th>
                <th>{profit}</th>
                <th></th>
                <th><Button variant="success" onClick={(e)=>handleButton('')}>Show all</Button></th>
                </tr>
            </tfoot>
            <tbody>
            {
                salesList.map((item,index)=>{
                    return(
                        <tr key={crypto.randomUUID()}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.date_sale}</td>
                            <td><Button variant="secondary" onClick={(e)=>handleButton(item.category)}>{item.category}</Button></td>
                        </tr>
                    )
                })

            }
            </tbody>
        </Table>
    </>
    )
}

export default ListSale