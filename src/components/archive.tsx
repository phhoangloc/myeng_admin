'use client'
import { ApiItemUser } from '@/api/user'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import CreateIcon from '@mui/icons-material/Create';
type Props = {
    archive: string
}

export type ItemType = {
    id: number,
    archive: string,
    name: string,
    mean: string,
    useto: string,
    createdAt: Date
}
export type QuestionType = {
    id: 1,
    archive: string,
    question: string,
    choose: string,
    answer: string,
    questionTran: string,
    answerTran: string,
    explain: string,
    createdAt: Date
}
export const ArchiveWord = ({ archive }: Props) => {

    const [_items, set_items] = useState<ItemType[]>([])
    const getItem = async (archive: string) => {
        const result = await ApiItemUser({ position: "user", archive: archive })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(archive)
    }, [archive])
    const toPage = useRouter()

    return (
        <div className='flex flex-col gap-1'>
            <div className="h-11  bg-white px-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/_new")}>
                <div className="flex">
                    <AddIcon className='!w-11 !h-11 p-2' />
                    <div className='flex flex-col justify-center'>new {archive}</div>
                </div>
            </div>
            {_items.length ?
                _items.map((_item, index) =>
                    <div key={index} className="  bg-white px-2 pb-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + _item.id)}>
                        <div className="flex">
                            <CreateIcon className='!w-11 !h-11 p-2' />
                            <div className='flex flex-col justify-center'>{_item.name}</div>
                        </div>
                        <p className='px-2'>{_item.useto.split(_item.name)[0]} <b style={{ textDecoration: "underline" }}>{_item.name}</b> {_item.useto.split(_item.name)[1]}</p>
                    </div>) : null}
        </div>
    )

}

export const Archive = ({ archive }: Props) => {

    const [_items, set_items] = useState<QuestionType[]>([])
    const getItem = async (archive: string) => {
        const result = await ApiItemUser({ position: "user", archive: archive })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(archive)
    }, [archive])
    const toPage = useRouter()


    return (
        <div className='flex flex-col gap-1'>
            <div className="h-11  bg-white px-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/_new")}>
                <div className="flex">
                    <AddIcon className='!w-11 !h-11 p-2' />
                    <div className='flex flex-col justify-center'>new question of {archive}</div>
                </div>
            </div>
            {_items.length ?
                _items.map((_item, index) =>
                    <div key={index} className="  bg-white px-2 pb-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + _item.id)}>
                        <div className="flex">
                            <CreateIcon className='!w-11 !h-11 p-2' />
                            <div className='flex flex-col justify-center' dangerouslySetInnerHTML={{ __html: _item.question }}></div>
                        </div>
                    </div>) : null}
        </div>
    )
}