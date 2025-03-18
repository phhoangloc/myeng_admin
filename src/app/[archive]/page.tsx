'use client'
import React from 'react'
import { useParams } from 'next/navigation'


const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    return (
        <div>{archive}</div>
    )
}

export default Page