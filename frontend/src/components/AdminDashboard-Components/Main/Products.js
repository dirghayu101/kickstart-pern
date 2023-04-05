import React from "react"
import { useEffect} from "react"


const Products = () => {
    useEffect(() => {
        document.querySelector(".products").classList.add("active")
        return () => {
            document.querySelector(".products").classList.remove("active")
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Products