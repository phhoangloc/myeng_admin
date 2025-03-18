'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    const toPage = useRouter()
    switch (archive) {
        case "word":
            return (
                <div className='flex flex-col gap-1'>
                    <div className="h-11  bg-white px-2 shadow-md rounded" onClick={() => toPage.push("/" + archive + "/_new")}>
                        <div className="flex">
                            <AddIcon className='!w-11 !h-11 p-2' />
                            <div className='flex flex-col justify-center'>new {archive}</div>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className='flex flex-col gap-1'>
                    <div className="h-11 flex flex-col justify-center bg-white px-2 shadow-md rounded">
                        {archive}
                    </div>
                </div>
            )
    }

}

export default Page