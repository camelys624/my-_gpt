import Markdown from "react-markdown";
import humanIcon from "@/assets/icons/human.svg"
import gptIcon from "@/assets/icons/gpt.svg"

const Card = ({role, content}) => {
    const isHuman = role === "user";
    return (<div className={`flex gap-4 items-start p-3 ${isHuman && 'flex-row-reverse max-w-[60%] self-end'}`}>
        <img src={isHuman ? humanIcon : gptIcon} alt="head" width="40px" height="40px"/>
        <div className={`${isHuman && 'bg-gray-100 p-3 rounded-lg'}`}>
            <Markdown>{content}</Markdown>
        </div>
    </div>)
}

export default Card;