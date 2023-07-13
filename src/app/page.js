import Image from 'next/image'
import { Chat } from './components/Chat'

export default function Home() {
  return (
    <main className="grid place-content-center h-screen">
      Chat Bot Ai
      <Chat/>
    </main>
  )
}
