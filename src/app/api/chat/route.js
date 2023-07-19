import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

//Le decimos a vercel donde queremos ejecutar este endpoint

export const  runtime = 'edge'

//-> edge tiene mejor rendimiento y soporta streaming de datos
//-> No puede durar tanto tiempo ña request usando la CPU
//-> Reques  de ms
//-> Defualt tiene peor rendimiento, no soporta streaming de datos pero tiene mayor compatibilidad con paquetes de Node
//-> Request de seg

// Crear el cliente de OpenAi
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(Req){     
   
    const {messages} =await Req.json()
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        max_tokens: 200,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
        messages:messages
        /* [
            {
                role: 'system',
                content: 'Comportate como un asistente virtual inteligente que pueda responder preguntas sobre una amplia variedad de temas. Debe ser capaz de comprender y procesar preguntas en lenguaje natural y proporcionar respuestas precisas y relevantes. Debe tener un amplio conocimiento en áreas como ciencia, historia, cultura, deportes, tecnología, salud, entretenimiento y cualquier otro tema de interés general. Utiliza técnicas de procesamiento del lenguaje natural y acceso a fuentes de información confiables para ofrecer respuestas actualizadas y verificadas. El objetivo es que seas un asistente versátil y confiable que pueda proporcionar información útil y resolver las dudas de los usuarios en cualquier área temática'
            },
            {
                role: 'user',
                content:'Hola, ¿quién eres?'
            },
            {
                role: 'assistant',
                content: 'Soy una IA creada por OpenAI. ¿Cómo puedo ayudarte hoy?'
            },
         
            {
                role: 'user',
                content: 'Cuando se creo bogota?'
            },
            
        ] */
    })
    //Transformar la respuesta de OpenAi en un Text-stream
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

}