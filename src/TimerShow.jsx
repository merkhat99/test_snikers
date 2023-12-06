import React, { useEffect, useRef, useState, useCallback } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';


function TimerShow (){
    const [showTimer, setshowTimer] = useState(0);
    const intervalRef = useRef(0);
    const [data, setData] = useState([])


    function handleStopClick() {
        const intervalId = intervalRef.current;
        setshowTimer(0)
        if(intervalId > 0){
          clearInterval(intervalId);
          // console.log('Unmount: ',intervalId)
          intervalRef.current = 0
        }
      }

      const fetchData = () => {
        // console.log('Fetch Start')
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=> res.json())
        .then(jsonData =>{
            // console.log(jsonData)
            setData(jsonData)
            // setTimeout(handleStopClick,1000)
            handleStopClick()
            // console.log('Fetch Finish')
          })
          
      }
    
    useEffect(()=>{
        // console.log('Effect');
        const intervalId = setInterval(() => {
          // console.log('iter')
          setshowTimer((prev)=> prev + 10)
        }, 200);
        // console.log('interval:',intervalId)
        intervalRef.current = intervalId;
        fetchData()

        return ()=>{
          // console.log('Unmount: ',intervalId)
          return clearInterval(intervalId)}
        
    },[])

    return(
        <div>
            <ProgressBar animated now={showTimer}/>
        </div>
    )

}

export default TimerShow;