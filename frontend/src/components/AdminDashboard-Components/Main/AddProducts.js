import React from "react"
import { useEffect} from "react"


const AddProducts = () => {
    useEffect(() => {
        document.querySelector(".addProducts").classList.add("active")
        return () => {
            document.querySelector(".addProducts").classList.remove("active")
        }
    }, [])

    return (
        <>
        </>
    )
}

export default AddProducts