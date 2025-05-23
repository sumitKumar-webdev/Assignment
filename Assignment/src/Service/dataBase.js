import Dexie from 'dexie'

export  const db = new Dexie('NotesDB');
db.version(1).stores({
    notes: 'id, title, content, synced, syncedStatus, updatedAt, createdTime'
})