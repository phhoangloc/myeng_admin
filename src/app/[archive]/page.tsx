'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { Archive, ArchiveWord } from '@/components/archive';
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive

    switch (archive) {
        case "word":
            return <ArchiveWord archive={archive} />
        default:
            return <Archive archive={archive} />
    }

}

export default Page