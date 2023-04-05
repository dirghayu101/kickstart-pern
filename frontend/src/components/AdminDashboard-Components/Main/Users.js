import React from "react"
import { useEffect} from "react"


const Users = () => {
    useEffect(() => {
        document.querySelector(".users").classList.add("active")
        return () => {
            document.querySelector(".users").classList.remove("active")
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Users