"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useEffect, useState } from "react"
import { Category } from "@/model/Category"

const CategoryTable = () => {
    const [category, setCategory] = useState<Category[]>([]); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => { 
        const fetchCategory = async () => {
            try {
                const res = await fetch('/api/v1/category')
                const data = await res.json()
                console.log(data)
                setCategory(data.categories); 
            } catch (error: any) {
                setError(error.message || 'Something went wrong'); 
            } 
        }; 
        fetchCategory(); 
    }, [])
    return (
        <div>
            <DataTable columns={columns} data={category}/> 
        </div>
    )
}

export default CategoryTable; 
