import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function QuestionTile({ item, index }: { item: any, index: number }) {
    const path =usePathname();
    const [value, setValue] = useState("");
    const [submitBtnStyle,setSubmitBtnStyle] = useState("bg-gray-600");
    const [imageUrl, setImageUrl] = useState(item.image);
    const [reloadCount, setReloadCount] = useState(0);
    const data =useAuth();
    const examID =useSelector((state)=>state.examBank.selectedExam._id);
    const handleImageError = () => {
        if (reloadCount < 1) {
            // Increment reload count and attempt to reload the image
            setReloadCount(reloadCount + 1);
            setImageUrl(item.image + `?reload=${reloadCount + 1}`);
        } else {
            console.error("Failed to load image after retrying.");
            toast.error("Failed to load image after retrying."); // Show error toast
        }
    };
    function update(e) {
        setValue(e.target.value);
        setSubmitBtnStyle("bg-green-500");
    }

    async function Reset() {
        setValue(""); // Clear the selected value
        const doc={
            hash:item.hashID,
            questionId : item._id,
            examID:examID
        }
        const url =(path.split('/')[1]=='uploadAnswer')?"https://exambackend-kok8.onrender.com/exam/resetKey":"https://exambackend-kok8.onrender.com/exam/resetAnswer"
        try {
            const response = await axios.post(url,{doc},{
                headers: {
                Authorization: data.userId,
                },
            })
            setSubmitBtnStyle("bg-gray-600");
            toast.success('Reset successful!'); // Show success toast
        } catch (error) {
            console.error('Reset failed:', error);
            toast.error('Reset failed.'); // Show error toast
        }
    }
    async function Submit() {
        if(!value)
        {
            toast.error('No answer selected.'); // Show error toast if no answer selected
            return;
        }
        const doc={
            questionId : item._id,
            hash: item.hashID,
            answer: value,
            examID:examID
           }
        const url =(path.split('/')[1]=='uploadAnswer')?"https://exambackend-kok8.onrender.com/exam/saveKey":"https://exambackend-kok8.onrender.com/exam/saveAnswer"
        try {
            const response =await axios.post(url,{doc},{
                headers: {
                Authorization: data.userId,
                },
            })
            setSubmitBtnStyle("bg-gray-600");
            toast.success('Answer saved successfully!'); // Show success toast
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Save failed.'); // Show error toast
        }
    }
    async function downloadAnswerForThisQuestion()
    {
        const doc={
            hash:item.hashID,
            questionId : item._id,
            doc:{examID:examID}
        }
        const url =(path.split('/')[1]=='uploadAnswer')? "https://exambackend-kok8.onrender.com/exam/getKeyForOne":"https://exambackend-kok8.onrender.com/exam/getAnswerForOne";
        try {
            const response = await axios.post(url,doc,{
                headers: {
                Authorization: data.userId,
                },
            })
            if(response && response.data &&response.data.data && response.data.data.answer)
            {
                setValue(response.data.data.answer)
            }
            else if(response && response.data && response.data.response&& response.data.response.answer)
            {
                setValue(response.data.response.answer);
            }
            toast.success('Answer downloaded successfully!'); // Show success toast
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed.'); // Show error toast
        }
    }
    useEffect(() => {
        downloadAnswerForThisQuestion();
    }, []);
    return (
        <div>
            <h1>Question {index + 1} </h1>
            <br />
            <h4>
                {item.question}
            </h4>
            <img src={imageUrl} onError={handleImageError} className="object-cover object-center h-40 w-70" alt="Question" />
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
                <Button className={submitBtnStyle} onClick={Submit}>Save</Button>
                <Button variant="destructive" onClick={Reset}>Reset</Button>
            </div>
            <Toaster/>
        </div>
    )
}
