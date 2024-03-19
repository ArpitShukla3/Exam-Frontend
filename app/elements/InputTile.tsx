"use client"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function InputTile({array,arrayIndex,setFunction}:{
    array:any,
    arrayIndex:number,
    setFunction:any
}){
    function update()
    {
          const arr=array;
          const newObj ={
            question: question,
            image:  image,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD
          }
          arr.splice(arrayIndex,1,newObj);
          setFunction([...arr]);
        //   console.log(array);
    }
    const [question,setName]= useState(array[arrayIndex].question);
    const [image,setLink] =useState(array[arrayIndex].image);
    const [optionA,setOptionA] =useState(array[arrayIndex].optionA);
    const [optionB,setOptionB] = useState(array[arrayIndex].optionB);
    const [optionC,setOptionC] =useState(array[arrayIndex].optionC);
    const [optionD,setOptionD] =useState(array[arrayIndex].optionD);
    return (
        <div className="flex flex-col gap-2">
        <Input type="text" placeholder="Enter question text here ..." value={question}  onChange={(e)=>{setName(e.target.value);  update();}}/>
        <Input type="text" placeholder="Enter question image link here ..." value={image}  onChange={(e)=>{setLink(e.target.value);  update();}}/>
        <Input type="text" placeholder="Enter option a here ..." value={optionA}  onChange={(e)=>{setOptionA(e.target.value);  update();}}/>
        <Input type="text" placeholder="Enter option b here ..." value={optionB}  onChange={(e)=>{setOptionB(e.target.value);  update();}}/>
        <Input type="text" placeholder="Enter option c here ..." value={optionC}  onChange={(e)=>{setOptionC(e.target.value);  update();}}/>
        <Input type="text" placeholder="Enter option d here ..." value={optionD}  onChange={(e)=>{setOptionD(e.target.value);  update();}}/>
        </div>
    )
}