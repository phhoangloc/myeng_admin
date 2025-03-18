'use client'
import React from 'react'
import { useParams } from 'next/navigation'
const Page = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive
    const slug = params.slug
    return (

        <div className="min-h-full  bg-white px-2 shadow-md rounded">
            <div>{archive}</div>
            <div>{slug}</div>
        </div>

    )
}

export default Page