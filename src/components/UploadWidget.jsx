import {useRef, useEffect } from "react";

// const dd ="https://657395363678234:_YEE3fZb9cxDDWchVZA-Dx1UIog@api.cloudinary.com/v1_1/dbdyyzatb/folders/bonaFide"

const UploadWidget = ()=>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:"dbdyyzatb",
            uploadPreset:"tv7ipynm",
            folder:"bonaFide"
        }, (error, result)=>{
            // console.log(result)
        })
    },[])

    return(
        <>
            <button onClick={()=>widgetRef.current.open()} >Upload</button>
        </>
    )
}

export default UploadWidget;