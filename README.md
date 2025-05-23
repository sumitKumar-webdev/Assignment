📝 Offline-First Notes App (React + Vite)

Hey! 👋  
This is a lightweight, offline-first notes app built with **React + Vite**. You can take notes, even when you're offline — and everything syncs with a mock backend when you're back online. Markdown support and a polished UI are coming soon!


🚀 Features (So Far)

 ✅ Add, edit, and delete notes
 ✅ Offline storage using **IndexedDB** via **Dexie**
 ✅ Detects online/offline status in real-time
 ✅ Syncs with a mock backend when you're back online
 ✅ State Mangment using Redux
 ✅ Autosave while typing

 🔧 Currently Working On

 📝 Markdown editing & preview (with `react-markdown` / `react-mde`)
 🎨 Improved UI and responsiveness
 🔍 Search notes by title/content
 🔄 Sync status indicators ("Synced", "Unsynced", "Syncing…")
 🏷️ Tags / categories
 ⚔️ Conflict resolution UI
 📱 PWA support with service worker
 🧪 Unit & integration tests

 🛠 Tech Stack

 ⚛️ React (with Hooks & Context)
 ⚡ Vite (super fast dev server)
 🗃 Dexie.js (IndexedDB)
 🧰 json-server (for mock REST API)
 🎨 Tailwind CSS (styling)
 📝 react-markdown / react-mde (coming soon for Markdown)



 📁 Note Structure


{
  id: string,        // UUID
  title: string,     // Note title
  content: string,   // Markdown text
  updatedAt: string, // ISO timestamp
  syncedStatus: string //status of sync
  synced: boolean    // true if synced with backend
}
