'use client'
import { ApiItemUser } from '@/api/user'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import LabelIcon from '@mui/icons-material/Label';
import { useSearchParams } from 'next/navigation';
import Pagination from './pagination';
import { UserType } from '@/redux/reducer/UserReduce';
import store from '@/redux/store';
import { Button } from '@/tool/button/button';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
export type BlogType =
    {
        archive: string
        censor: boolean
        content: string,
        createdAt: Date,
        hostId: number,
        host: { id: number, username: string },
        id: number,
        slug: string,
        updateDate: string
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

    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    const [_items, set_items] = useState<ItemType[]>([])
    const _limit = 20
    const getItem = async (position: string, archive: string, page: number, limit: number) => {
        const result = await ApiItemUser({ position: position, archive: archive, skip: page * limit, limit: limit })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(_currentUser.position, archive, page ? Number(page) - 1 : 0, _limit)
    }, [_limit, page, archive, _currentUser.position])
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
export const ArchiveBlog = ({ archive }: { archive: string }) => {

    const [currentUser, setCurrentUser] = useState<UserType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))

    }
    useEffect(() => {
        update()
    })
    const toPage = useRouter()
    const [items, setItems] = useState<(BlogType)[]>([])

    //page
    const limit: number = 10
    const [_page, set_page] = useState<number>(0)

    //get Item //
    const getItems = async (position: string, archive: string, page: number, limit: number) => {
        const result = await ApiItemUser({ position, archive, skip: page * limit, limit })
        setItems(result.data)
    }

    useEffect(() => {
        getItems(currentUser.position, archive, _page, limit)
    }, [_page, archive, currentUser.position])

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <div className="flex h-12">
                    <h3 className='text-xl font-bold text-lv-11 dark:text-lv-0 h-full flex flex-col justify-center'>{archive.toUpperCase()} </h3>
                    <AddIcon className='!w-12 !h-full p-3 opacity-50 hover:opacity-100 cursor-pointer text-lv-11 dark:text-lv-0' onClick={() => toPage.push(archive + "/news")} />
                </div>
                {/* <SearchButton placehoder='search' func={(v) => setSearch(v)} /> */}
            </div>
            <div className='flex flex-col gap-4'>
                {
                    items && items.length ?
                        items.map((n: BlogType, index: number) =>
                            <div className="bg-white rounded shadow" key={index}>
                                <div className="font-bold h-12 flex flex-col justify-center p-2 border-b border-slate-200">{n.host.username}</div>
                                <div className="h-60 py-2 px-4 overflow-hidden line-clamp-[8] dangerous_box " dangerouslySetInnerHTML={{ __html: n.content }} />
                                <div className="h-6"></div>
                                <div className="font-bold h-12 flex justify-between p-2 border-t border-slate-200">
                                    <div className="flex flex-col justify-center "></div>
                                    <Button onClick={() => toPage.push("/" + n.archive + "/" + n.slug)} name="more infor" sx=" uppercase text-sm !bg-slate-500 !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button>
                                </div>
                            </div>

                        )
                        : <div>There is no {archive}</div>
                }
            </div>
            <div className="h-12"></div>
            <div className=''>
                <Pagination page={_page} next={() => set_page(n => n + 1)} prev={() => set_page(n => n - 1)} end={items && items.length < limit ? true : false} />
            </div>
        </div>
    )
}
export const Archive = ({ archive }: Props) => {
    const useSearch = useSearchParams()
    const page = useSearch.get("page") || "1"
    const _limit = 20

    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    const [_items, set_items] = useState<QuestionType[]>([])
    const getItem = async (position: string, archive: string, page: number, limit: number) => {
        const result = await ApiItemUser({ position: position, archive: "path", archivePlus: archive, skip: page * limit, limit })
        if (result.success) {
            set_items(result.data)
        } else {
            set_items([])
        }
    }
    useEffect(() => {
        getItem(_currentUser.position, archive, page ? Number(page) - 1 : 0, _limit)
    }, [_currentUser.position, archive, page])
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
                            <div className={`line-clamp-4 min-h-full`} dangerouslySetInnerHTML={{ __html: _item.question }}></div>
                        </div>
                    </div>) : null}
            <Pagination page={Number(page) - 1} next={() => toPage.push("/" + archive + "?page=" + (Number(page) + 1))} prev={() => toPage.push("/" + archive + "?page=" + (Number(page) - 1))} end={_items.length < _limit} ></Pagination>

        </div>
    )
}