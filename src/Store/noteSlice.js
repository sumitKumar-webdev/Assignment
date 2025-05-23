import { createSlice } from "@reduxjs/toolkit";
import { deleteNote, fetchNotes, loadNotes, saveNote, SyncToServer } from "./asyncFeature/noteThunks";
import { db } from "../Service/dataBase";

const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        noteList: [],
        activeNote : null
    },
    reducers : {
        setActiveNote : (state, action) => {
            state.activeNote = action.payload
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(loadNotes.fulfilled, (state,action)=>{
            state.noteList = action.payload;
        })
        .addCase(saveNote.fulfilled, (state, action) => {
            const newNote = action.payload;
            const indexOfNote = state.noteList.findIndex((n)=>n.id === newNote.id)
            if (indexOfNote>-1) {
                state.noteList[indexOfNote] = newNote
            }else{
                state.noteList.push(newNote)
            }
        }) 
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.noteList = state.noteList.filter((note)=>note.id !== action.payload)
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            const fetchedNotes = action.payload;
          fetchedNotes.forEach(async ( note ) => {
                const existingNote = state.noteList.find((n)=>n.id === note.id)
                if (!existingNote) {
                    state.noteList.push(note);
                    await db.notes.put(note)
                }
            });
        })
        .addCase(SyncToServer.pending, (state, action)=>{
            const notes = action.payload;
            
            notes.forEach((note) => {
                note.syncedStatus = 'syncing'
            })
        })
        .addCase(SyncToServer.fulfilled, (state, action)=>{
            const notes = action.payload;
            notes.forEach((note)=>{
                note.syncedStatus = 'synced',
                note.synced = true
        })
        })        
    }
})

export const {setActiveNote } = noteSlice.actions;
export default noteSlice.reducer;