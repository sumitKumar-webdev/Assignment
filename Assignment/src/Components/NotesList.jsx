import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../Store/noteSlice';
import Card from './Card';
import { deleteNote } from '../Store/asyncFeature/noteThunks';

export default function NotesList() {
  const dispatch = useDispatch()
 const noteList = useSelector((state)=>state.notes.noteList)
 
 if (!noteList.length) return <p>Please Create A Note</p>
 return (
    <div className='mx-auto py-3 px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
      {noteList.map((note)=>(
        <div key={note.id}>
          <Card 
         note={note}
          onclick={()=>dispatch(setActiveNote(note))}
          onDelete={()=>dispatch(deleteNote(note.id))}/>
        </div>
      ))}
    </div>
    
  )
}
