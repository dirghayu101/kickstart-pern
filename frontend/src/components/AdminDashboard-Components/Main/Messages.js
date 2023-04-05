import React from "react"
import { useEffect} from "react"


const Messages = () => {
    useEffect(() => {
        document.querySelector(".messages").classList.add("active")
        return () => {
            document.querySelector(".messages").classList.remove("active")
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Messages