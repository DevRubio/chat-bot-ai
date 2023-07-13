'use client'
import { useChat } from 'ai/react'

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat()
    return (
        <div className='flex flex-col max-w-xl px-8 mx-auto'>
            {
                messages.map(message =>{
                    const isChatBot = message.role != 'user'
                    return(
                    <div key={message.id}>
                        <p>
                            {isChatBot ? '🤖' : '🧑‍💻'}
                            <span className={`pl-2 ${isChatBot ? 'text-yellow-500' : 'text-blue-500'}`}>
                            {message.content}
                            </span>
                        </p>
                    </div>
                    )
                })
            }
            <form onSubmit={handleSubmit}>
                <input className='fixed w-full max-w-xl px-4 py-2 m-auto mb-8 text-sm border border-gray-400 rounded-full shadow-2xl bottom-4' placeholder='Escribe...' 
                type='text' name='content' value={input} onChange={handleInputChange}/>
            </form>
        </div>
    )
}