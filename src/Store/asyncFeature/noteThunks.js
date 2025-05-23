import { createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "../../Service/dataBase"


const API = 'http://localhost:4000/notes'

export const loadNotes = createAsyncThunk('notes.loadNotes',
    async () => {
        const notes = await db.notes.toArray();
        return notes
    }
)

export const fetchNotes = createAsyncThunk('notes/fetchNotes',
    async () =>{
       const response = await fetch(API);
       const data = await response.json()
       return data;
    }
)
export const SyncToServer = createAsyncThunk('note/SyncToServer', 
    async (_, { rejectWithValue }) =>{
        console.log('syncing');
        
        try {
            const unSyncedNotes = await db.notes.where('synced').equals(false).toArray()
        
        
        await Promise.all(unSyncedNotes.map(async (note)=>{
            let response = await fetch(`${API}/${note.id}`, {
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(note)
            })
            if (response.status === 404) {
                 response = await fetch(`${API}/${note.id}`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(note)
            })
            }
            if (response.ok) {
                await db.notes.update(note.id, {
                    synced : true,
                    syncedStatus: 'synced'
                })
            }else if (!response.ok) {
                console.error('failed to Sync', await response.text())
            }
        }))
        } catch (error) {
             console.error("Error in SyncToServer thunk:", err);
      return rejectWithValue(err.message);
        }
        
    }
)

export const saveNote = createAsyncThunk('note/saveNote', 
    
    async (note, { rejectWithValue }) =>{
        try {
             const existingNote = await db.notes.get(note.id)
        if (existingNote) {
            const editedNote = {
            ...note,
            editTime: new Date().toISOString(),
            synced: false,
            syncedStatus : 'unsynced',
        }
       await db.notes.put(editedNote)
        return editedNote;
    } else { 
       const newNote = await db.notes.put(note)
       
        return note
    }
        } catch (error) {
            console.error('Error saving note:', error);
      return rejectWithValue(error.message)
        }
       
        }
      
)
export const deleteNote = createAsyncThunk('note/deleteNote', 
    async (Id) => {
        await db.notes.delete(Id);
            await fetch(`${API}/${Id}`,{
                method: 'DELETE'
            });
       
        return Id;      
    })

