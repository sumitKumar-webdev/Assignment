import React, { useEffect, useState } from 'react'

export default function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    
    useEffect(()=>{
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', ()=> setIsOnline(true))
        window.addEventListener('offline', ()=> setIsOnline(false))
        return () =>{
            window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        }
    },[])    
    return isOnline
}
