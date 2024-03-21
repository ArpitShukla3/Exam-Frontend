import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function InputTile({ array, arrayIndex, setFunction }: {
  array: any[],
  arrayIndex: number,
  setFunction: React.Dispatch<React.SetStateAction<any[]>>
}) {
    const [question , setQuestion ] = useState( {
        question:array[arrayIndex].question, 
        image : array[arrayIndex].image, 
        optionA :array[arrayIndex].optionA, 
        optionB :array[arrayIndex].optionB, 
        optionC :array[arrayIndex].optionC ,
        optionD :array[arrayIndex].optionD
    })
 
  const onChange = ( e ) =>  {
    const {name , value }  = e.target;
     setQuestion({
        ...question , 
        [name] : value
     }) ;
    
  }
  useEffect(()=>{
    let newArr= array;
   newArr= newArr.map((item,index)=>{
        console.log(index,arrayIndex);
        if(index==arrayIndex)
        {
            return question;
        }
        return item;
    })
    setFunction(newArr);
    console.log(newArr);
  },[question])
  return (
    <div className="flex flex-col gap-2">
      <Input type="text" placeholder="Enter question text here ..." value={question.question} onChange={onChange} name="question"  />
      <Input type="text" placeholder="Enter question image link here ..." onChange={onChange}  value={question.image} name="image"   />
      <Input type="text" placeholder="Enter option a here ..."  onChange={onChange}  value={question.optionA} name="optionA"    />
      <Input type="text" placeholder="Enter option b here ..."  onChange={onChange}  value={question.optionB}  name="optionB"   />
      <Input type="text" placeholder="Enter option c here ..."  onChange={onChange}  value={question.optionC}  name="optionC"   />
      <Input type="text" placeholder="Enter option d here ..."  onChange={onChange}  value={question.optionD}  name="optionD"  />
      
    </div>
  );
}
