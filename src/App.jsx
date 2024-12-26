import {useState} from 'react'
import {Textarea} from "@/components/ui/textarea";
import {Send} from "lucide-react";
import {Button} from "@/components/ui/button";
import {request} from "@/api/index.js";
import Card from "@/components/Card.jsx";
import Loader from '@/assets/loader.gif'

function App() {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [chatMessages, setChatMessages] = useState([
        {role: 'assistant', content: '姚局好，请您指示！！！如果你不是姚局，请在心中默念姚局好。'}
    ])

    const handleSubmit = async () => {
        const postMessage = {
            role: 'user',
            content: query
        }
        setChatMessages((prevState) => [...prevState, postMessage])
        setQuery('')
        setLoading(true)

        const [_, ...messages] = chatMessages

        const res = await request("query", {messages: [...messages, postMessage]})

        const {message} = res
        setChatMessages((prevState) => [...prevState, {
            role: 'assistant',
            content: message.content
        }])
        setLoading(false)
    }
    return (
        <>
            <div className="flex h-screen w-full p-5 flex-col max-w-[1300px] m-auto">
                <div className="flex flex-1 overflow-auto flex-col">
                    {chatMessages.map(({role, content}, index) => (
                        <Card key={'card' + index} role={role} content={content}/>))}
                    {loading && <div className="flex justify-center"><img src={Loader} alt="loading" height={120} width={120}/> </div>}
                </div>
                <div className="w-full h-[100px] flex gap-5 items-center">
                    <Textarea value={query} className="h-[60px] resize-none flex-1"
                              onChange={e => setQuery(e.target.value)}/>
                    <Button variant="outline" size='icon' className="h-[60px] w-[60px]" onClick={handleSubmit}>
                        <Send size={48} className="!h-7 !w-7"/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default App
