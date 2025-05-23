export default function Card({note, onclick, onDelete}) {
  const dateFormate = (dateTime) =>{
      return String(dateTime)
      .substr(0,16)
      .replace(/-/g,"/")
      .replace('T', " ")
    }
  return (
   <div 
   onClick={onclick}
   className='max-w-80 min-h-80 bg-gray-400 relative rounded-lg shadow cursor-pointer'>
    <span onClick={(e)=>{onDelete(); e.stopPropagation()}} className="text-xs bg-red-500 text-white px-3 text-center absolute right-0 rounded-b-sm hover:bg-red-700 transition-colors caret-transparent">x</span>
    <div className='flex justify-between items-center px-4 py-2 border-b-2'>
      <h2 className='text-lg font-semibold text-gray-800'>{note?.title}</h2>
      <span className='text-xs text-gray-500'>{note?.syncedStatus}</span>
    </div>
    <p className='text-gray-600 justify-center px-2 my-3'>{note?.content}</p>
    <footer className="text-xs text-gray absolute bottom-2 right-4 mt-auto">
       {(note?.editTime) ? <p>Edited on: {dateFormate(note?.editTime)}</p> : <p className='font-semibold text-gray-800'>Created on: <span className='font-normal'>{dateFormate(note?.createdAt)}</span></p> }
      </footer>
   </div>
  )
}
