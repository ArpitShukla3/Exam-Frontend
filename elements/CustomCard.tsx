import { useEffect } from "react"
import "./customStyles.css"
export default function CustomCards({details}:{details:{
    Name:String,
    hashID:String,
    endTime:String,
    StartTime:String
    TimeLimit:String
}[]})
{
    useEffect(()=>{
console.log(details);
    },[])
    return (
    <>
    <div className="cards">
   {
   details && details.map((item,index)=>{
        return  <div className="card red" key={index}>
        <p className="tip">{item.Name}</p>
        <p className="second-text">
            <h3>Start Time : {item.StartTime}</h3>
            <h3>End Time : {item.endTime}</h3>
        </p>
    </div>
    })
   }
   </div>
    </>
    )
}