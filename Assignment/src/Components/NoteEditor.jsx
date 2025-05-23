import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveNote } from '../Store/asyncFeature/noteThunks';
import { setActiveNote } from '../Store/noteSlice';

export default function NoteEditor() {
    const textAreaRef = useRef()
    const dispatch = useDispatch();
    const activeNote = useSelector((state)=> state.notes.activeNote)
    console.log(activeNote);
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(()=>{
        setTitle(activeNote?.title)
        setContent(activeNote?.content)
    },[activeNote])

    useEffect(()=>{
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    },[content])
    
    const handleSave = () => {
        if (!activeNote) return;
        dispatch(saveNote({
            ...activeNote,
            title: title,
            content: content
        }))
        dispatch(setActiveNote(null))
    }

    if (!activeNote) {
        return <p>Please Create or Select a New Note</p>
    }
  return (
    <div className='max-w-3xl mx-auto p-4'>
        <div className='bg-white shadow-md rounded-lg p-6 space-y-4'>
        <input type="text"
        placeholder='Title'
        value={title || ''}
        onChange={(e)=> setTitle(e.target.value)} 
        className='w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>
        <textarea
        ref={textAreaRef}
        value={content}
        aria-rowcount={5}
        placeholder='Content'
        onChange={(e)=>setContent(e.target.value)}
         className='w-full overflow-y-hidden border border-gray-300 resize-none rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>
         <div className='flex justify-center'>
            <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
         </div>
         
        </div>
       
          
        
      
    </div>
  )
}
