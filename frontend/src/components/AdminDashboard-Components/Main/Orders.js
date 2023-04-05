import React from "react"
import { useEffect} from "react"


const Orders = () => {
    useEffect(() => {
        document.querySelector(".orders").classList.add("active")
        return () => {
            document.querySelector(".orders").classList.remove("active")
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Orders