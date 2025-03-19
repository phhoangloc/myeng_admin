'use client'
import React from 'react'
import { useParams } from 'next/navigation'

import { Detail, DetailWord } from '@/components/detail'


const Page = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive
    const slug = params.slug

    switch (archive) {
        case "word":
            return <DetailWord archive={archive} slug={slug} />
        default: return <Detail archive={archive} slug={slug} />
    }
}

export default Page