export default function Navbar() {
  return (
    <div className='bg-gray-900 w-full fixed top-0 z-10'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-start'>
            <div className='flex flex-shrink-0 items-center'></div>
            <div className='ml-6'>
              <div className='flex space-x-2 sm:space-x-4'>
                <div className='px-3 py-2 text-gray-300'>
                  <iframe
                    src='https://ghbtns.com/github-btn.html?user=ykhli&repo=local-ai-stack&type=star&count=true'
                    frameBorder='0'
                    scrolling='0'
                    width='150'
                    height='20'
                    title='GitHub'
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
