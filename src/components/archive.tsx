'use client'
import { ApiItemUser } from '@/api/user'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import LabelIcon from '@mui/icons-material/Label';
import { useSearchParams } from 'next/navigation';
import Pagination from './pagination';
type Props = {
    archive: string
}

export type ItemType = {
    id: number,
    archive: string,
    name: string,
    mean: string,
    example?: string,
    book?: string,
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

    const useSearch = useSearchParams()
    const page = useSearch.get("page") || "1"

    const [_items, set_items] = useState<ItemType[]>([])
    const _limit = 20
    const getItem = async (archive: string, page: number, limit: number) => {
        const result = await ApiItemUser({ position: "user", archive: archive, skip: page * limit, limit: limit })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(archive, page ? Number(page) - 1 : 0, _limit)
    }, [_limit, page, archive])
    const toPage = useRouter()

    return (
        <div className='flex flex-col gap-1'>
            <div className="h-11  bg-white px-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/-1")}>
                <div className="flex">
                    <AddIcon className='!w-11 !h-11 p-2' />
                    <div className='flex flex-col justify-center'>new {archive}</div>
                </div>
            </div>
            {_items.length ?
                _items.map((_item, index) =>
                    <div key={index} className="  bg-white px-2 pb-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + _item.id)}>
                        <div className="flex">
                            <div className='!w-11 !h-11 p-2 font-bold text-xl' >W</div>
                            <div className='flex flex-col justify-center'>{_item.name}</div>
                        </div>
                        {_item.book ? <p className='py-2'>{_item.book}</p> : null}
                    </div>) : null}
            <Pagination page={Number(page) - 1} next={() => toPage.push("/" + archive + "?page=" + (Number(page) + 1))} prev={() => toPage.push("/" + archive + "?page=" + (Number(page) - 1))} end={_items.length < _limit} ></Pagination>
        </div>
    )

}

export const Archive = ({ archive }: Props) => {
    const useSearch = useSearchParams()
    const page = useSearch.get("page") || "1"
    const _limit = 20

    const [_items, set_items] = useState<QuestionType[]>([])
    const getItem = async (archive: string, page: number, limit: number) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive, skip: page * limit, limit })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(archive, page ? Number(page) - 1 : 0, _limit)
    }, [archive, page])
    const toPage = useRouter()


    return (
        <div className='flex flex-col gap-1'>
            <div className="h-11  bg-white px-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/-1")}>
                <div className="flex">
                    <AddIcon className='!w-11 !h-11 p-2' />
                    <div className='flex flex-col justify-center'>new question of {archive}</div>
                </div>
            </div>
            {_items.length ?
                _items.map((_item, index) =>
                    <div key={index} className="  bg-white p-2  shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/" + _item.id)}>
                        <div className="flex">
                            <LabelIcon className='!w-11 !h-11 p-2' />
                            <div className={` h-18 py-0 line-clamp-4 `} dangerouslySetInnerHTML={{ __html: _item.question }}></div>
                        </div>
                    </div>) : null}
            <Pagination page={Number(page) - 1} next={() => toPage.push("/" + archive + "?page=" + (Number(page) + 1))} prev={() => toPage.push("/" + archive + "?page=" + (Number(page) - 1))} end={_items.length < _limit} ></Pagination>

        </div>
    )
}