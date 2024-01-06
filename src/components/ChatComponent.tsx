import { useEffect, useRef, useState } from 'react'
import { useCompletion } from 'ai/react'

interface Message {
  content: string
  user: 'User' | 'LLM'
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesRef = useRef<HTMLDivElement>(null)

  const {
    completion,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/qa-pg-vector',

    onFinish: (prompt: string, completion: string) => {
      console.log(messages)
      setMessages((previousMessage) => {
        previousMessage[previousMessage.length - 1].content == 'Thinking...'
          ? previousMessage.pop()
          : null
        return [...previousMessage, { content: completion, user: 'LLM' }]
      })
    },
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
    setMessages((previousMessage) => [
      ...previousMessage,
      { content: input, user: 'User' },
      { content: 'Thinking...', user: 'LLM' },
    ])
  }

  // scroll to bottom on user input
  useEffect(() => {
    if (messagesRef.current && isLoading) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div className='mt-20 h-96 flex flex-col items-center justify-center'>
      <div
        ref={messagesRef}
        className='w-full h-96 max-w-3xl scroll-auto flex-1 overflow-y-auto bg-slate-700 text-sm leading-6 text-slate-900 shadow-md dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7'
      >
        {messages.map((message, i) => (
          <div key={i}>
            {message.user === 'User' ? (
              <UserMessage content={message.content} />
            ) : (
              <LLMMessage content={message.content} />
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit(e)
          setInput('')
        }}
        className='flex w-full max-w-3xl items-center rounded-md bg-gray-800 p-2 '
      >
        <textarea
          id='prompt'
          className='mx-2 flex min-h-full w-full rounded-md border  bg-slate-300 p-2 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-300/20 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-blue-600 dark:focus:ring-blue-600'
          placeholder='Will AI take all our jobs?'
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              const form = (e.target as HTMLTextAreaElement).form
              form?.requestSubmit()
            }
          }}
        ></textarea>
        <div>
          <button
            className='inline-flex hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-600 sm:p-2'
            type='submit'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              aria-hidden='true'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <path d='M10 14l11 -11'></path>
              <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'></path>
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
      </form>
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          Ask questions about{' '}
          <a
            href='https://a16z.com/2023/06/06/ai-will-save-the-world/'
            className='underline'
          >
            Why AI Will Save the World
          </a>
        </p>
      </div>
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className='flex flex-row px-4 py-8 sm:px-6 bg-slate-800'>
      <img
        className='mr-2 flex h-8 w-8 rounded-full sm:mr-4'
        src='https://dummyimage.com/256x256/363536/ffffff&text=U'
      />

      <div className='flex max-w-3xl items-center text-slate-50'>
        <p>{content}</p>
      </div>
    </div>
  )
}

function LLMMessage({ content }: { content: string }) {
  return (
    <div className='flex px-4 py-8 sm:px-6 bg-slate-700'>
      <img
        className='mr-2 flex h-8 w-8 rounded-full sm:mr-4'
        src='https://dummyimage.com/256x256/354ea1/ffffff&text=LLM'
      />

      <div className='flex w-full flex-col items-start lg:flex-row lg:justify-between text-slate-50'>
        <p className='max-w-3xl'>{content}</p>
      </div>
    </div>
  )
}
