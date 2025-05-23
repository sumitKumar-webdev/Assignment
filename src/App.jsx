import useOnlineStatus from './useOnlineStatus'
import { Circle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import NotesList from './Components/NotesList'
import NoteEditor from './Components/NoteEditor'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, loadNotes, saveNote, SyncToServer } from './Store/asyncFeature/noteThunks';
import { setActiveNote } from './Store/noteSlice';
import { useEffect } from 'react';

function App() {
  const onlineStatus = useOnlineStatus()
  const activeNote = useSelector((state)=> state.notes.activeNote)
  const dispatch = useDispatch()
  

  const statusIcon = () => {
    if (onlineStatus) {
     return (
      <span className='text-green-800 font-bold flex gap-2'> <Circle color='Green' fill='green'/> Online</span>
     )
    }
    return (
       <span className='text-red-800 font-bold flex gap-2'> <Circle color='red' fill='red'/> Offline</span>
    )
  }
  useEffect(()=>{
    dispatch(loadNotes())
    if (onlineStatus) {
      dispatch(fetchNotes())
    }
  },[])

  useEffect(()=>{
    if (onlineStatus) {
      
      dispatch(SyncToServer())
    }
  },[onlineStatus])

  const handleNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'New Note',
      content : '',
      createdAt : new Date().toISOString(),
      synced : false,
      syncedStatus: 'unsynced'
    };
    dispatch(saveNote(newNote));
    dispatch(setActiveNote(newNote))
    
  }
  

  return (
  <div className='min-h-screen p-6 relative'>
    <h1 className='text-white font-bold text-xl text-center'>Offline-First
Notes App with Sync</h1>
  <div className='flex justify-end'>{statusIcon()}</div>

  <div className='flex justify-end mt-10'>
  <button onClick={()=>handleNewNote()} className='bg-[#FDFBD4] px-3 py-2 font-semibold rounded-xl'>New Note</button>
  {/* force syncing */}
  <button onClick={()=>(dispatch(SyncToServer()))} className='bg-[#FDFBD4] px-3 py-2 font-semibold rounded-xl'>Force Synce</button>
  </div>

  <div className='pt-10 '>
  <NotesList />
  </div>
  {activeNote && <div className='fixed inset-0 z-50 bg-black/50 flex justify-center items-center'>
    <NoteEditor />
  </div>}
  

  </div>
   

  )
}

export default App
