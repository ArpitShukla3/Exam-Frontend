import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function QuestionTile({ item, index }: { item: any, index: number }) {
    const [value, setValue] = useState("");
    const [imageUrl, setImageUrl] = useState(item.image);
    const [reloadCount, setReloadCount] = useState(0);
    const data =useAuth();
    const handleImageError = () => {
        if (reloadCount < 1) {
            // Increment reload count and attempt to reload the image
            setReloadCount(reloadCount + 1);
            setImageUrl(item.image + `?reload=${reloadCount + 1}`);
        } else {
            console.error("Failed to load image after retrying.");
        }
    };
    function update(e) {
        setValue(e.target.value);
    }

    function Reset() {
        console.log("Reset");
        setValue(""); // Clear the selected value
        //api call to delete this particular answer
    }

    async function Submit() {
       
        if(!value)
        {
            return;
        }
       
        const doc={
            questionId : item.id,
            // examID: item.exam_id,
        }
        
        // api call to save this particular answer
         
        const response =await axios.post("http://localhost:3001/exam/saveAnswer",doc,{
            headers: {
              Authorization: data.userId,
            },
          })
          console.log("Submit", value,response);
        //save it into redux
    }

    // useEffect(() => {
    //     //download answers for this particular question and set value accordingly
    // }, []);

    return (
        <div>
            <h1>Question {index + 1} </h1>
            <br />
            <h4>
                {item.question}
            </h4>
            <img src={imageUrl} onError={handleImageError} className="object-cover object-center     h-40 w-70" alt="Question" />
            <RadioGroup defaultValue={value} onClick={update} >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.optionA} id="option-one" checked={value === item.optionA} />
                    <label htmlFor="option-one">{item.optionA}</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.optionB} id="option-two" checked={value === item.optionB} />
                    <label htmlFor="option-two">{item.optionB}</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.optionC} id="option-three" checked={value === item.optionC} />
                    <label htmlFor="option-three">{item.optionC}</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.optionD} id="option-four" checked={value === item.optionD} />
                    <label htmlFor="option-four">{item.optionD}</label>
                </div>
            </RadioGroup>
            <div className="flex gap-4 m-2">
                <Button className="bg-green-300" onClick={Submit}>Save</Button>
                <Button variant="destructive" onClick={Reset}>Reset</Button>
            </div>
        </div>
    )
}
