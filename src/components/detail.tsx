'use client'
import React, { useState, useEffect } from 'react'
import { BlogType, ItemType } from './archive'
import { ApiItemUser, ApiUpdateItem, ApiCreateItem, ApiDeleteItem } from '@/api/user'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/tool/input/input'
import { Button } from '@/tool/button/button'
import { TextArea, TextAreaTool } from '@/tool/input/textarea'
import { DividerSelect } from "../tool/divider/divider"
import { Add } from '@mui/icons-material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import { ApiItem } from '@/api/client'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment'
import Switch from '@/tool/button/switch'
import { ModalType, setModal } from '@/redux/reducer/ModalReduce'

type Props = {
    archive: string,
    slug: string
}
type questionTypeBody = {
    archive: string;
    audioId?: number;
    question?: string;
    choose?: string;
    answer?: string;
    questionTran?: string;
    answerTran?: string;
    explain?: string;
}
export const DetailWord = ({ archive, slug }: Props) => {
    const [_item, set_item] = useState<ItemType>()
    const getItem = async (archive: string, id: string) => {
        const result = await ApiItemUser({ position: "user", archive: archive, id: Number(id) })
        if (result.success) {
            set_item(result.data[0])
        } else {
            set_item(undefined)
        }
    }
    useEffect(() => {
        if (archive && slug !== "_new") {
            getItem(archive, slug)
        } else {
            set_item(undefined)
        }
    }, [archive, slug])

    const [_id, set_id] = useState<number>(0)
    const [_word, set_word] = useState<string>("")
    const [_mean, set_mean] = useState<string>("")
    const [_example, set_example] = useState<string>("")
    const [__example, set__example] = useState<string>("")
    const [_book, set_book] = useState<string>("")

    const [_loading, set_loading] = useState<boolean>(true)

    useEffect(() => {
        if (_item) {
            set_id(_item.id)
            set_word(_item.name)
            set_mean(_item.mean)
            set_example(_item.example ? _item.example : "")
            set_book(_item.book ? _item.book : "")
        }
        set_loading(false)
    }, [_item])

    const toPage = useRouter()

    const body = {
        name: _word,
        mean: _mean,
        example: __example || _example,
        book: _book
    }
    const upload = async (body: { name: string, mean: string, example: string, book: string }, archive: string, id: number) => {

        const result = await ApiUpdateItem({ position: "user", archive, id }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }
    const create = async (body: { name: string, mean: string, example: string, book: string }, archive: string) => {
        const result = await ApiCreateItem({ position: "user", archive }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }

    const deleteWord = async (id: number) => {
        const result = await ApiDeleteItem({ position: "user", archive, id })
        if (result.success) {
            toPage.push("/" + archive)

        }
    }
    return (
        _loading ? null :
            _item ?
                <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                    <div className="h-11"></div>
                    <Input name="word" value={_word} onChange={(v) => { set_word(v) }} icon1={<DeleteIcon onClick={() => deleteWord(_item.id)} />}></Input>
                    <Input name="mean" value={_mean} onChange={(v) => { set_mean(v) }}></Input>
                    <TextArea name="example" value={_example} onChange={(v) => { set__example(v) }} />
                    <Input name="book" value={_book} onChange={(v) => { set_book(v) }}></Input>
                    <Button name="save" onClick={() => upload(body, archive, _id)} sx='bg-slate-200 !text-black'></Button>
                </div> :
                <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                    <div className="h-11"></div>
                    <Input name="word" value={_word} onChange={(v) => { set_word(v) }}></Input>
                    <Input name="mean" value={_mean} onChange={(v) => { set_mean(v) }}></Input>
                    <TextArea name="example" value={_example} onChange={(v) => { set__example(v) }} />
                    <Input name="book" value={_book} onChange={(v) => { set_book(v) }}></Input>
                    <Button name="create" onClick={() => create(body, archive)} sx='bg-slate-200 !text-black'></Button>
                </div>

    )
}
export const DetailBlog = () => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive
    const slug = params.slug

    const [_blog, set_blog] = useState<BlogType | undefined>()
    const [_refresh, set_refresh] = useState<number>(0)
    const getOneBlog = async (archive: string, slug: string) => {
        const result = await ApiItem({ archive, slug })
        if (result.success) {
            set_blog(result.data[0])
        }
    }

    useEffect(() => {
        getOneBlog(archive, slug)
    }, [archive, slug, _refresh])


    // const [_isEdit, set_isEdit] = useState<boolean>(false)
    const [_content, set_content] = useState<string>("")
    const [_cencor, set_cencor] = useState<boolean>(false)

    const toPage = useRouter()
    const createBlog = async (position: string, archive: string, body: { content: string, slug: string }) => {
        const result = await ApiCreateItem({ position, archive }, body)
        if (result.success) {
            set_refresh(n => n + 1)
        }
    }
    const updateBlog = async (position: string, archive: string, body: { content: string, censor: boolean }, id: number) => {
        const result = await ApiUpdateItem({ position, archive, id }, body)
        if (result.success) {
            set_refresh(n => n + 1)
        }
    }
    const deleteBlog = async (position: string, archive: string, id: number) => {
        const result = await ApiDeleteItem({ position, archive, id },)
        if (result.success) {
            toPage.push("/blog")
        }
    }
    return (
        _blog ?
            <div className='flex flex-col gap-1'>
                <div className='bg-white shadow rounded'>
                    <div className='h-12 flex justify-between  border-b border-slate-200 font-bold px-2'>
                        <div className='flex flex-col justify-center'>
                            {_blog?.host.username}
                        </div>
                        <div className='flex'>
                            {_currentUser.id === _blog?.hostId || _currentUser.position === "admin" ?
                                <SaveIcon className='cursor-pointer !w-8 !h-8 p-1  m-auto' onClick={() => updateBlog(_currentUser.position, _blog.archive, { content: _content, censor: _cencor }, _blog.id)} /> :
                                null}
                            <DeleteIcon className='cursor-pointer !w-8 !h-8 p-1  m-auto' onClick={() => deleteBlog(_currentUser.position, _blog.archive, _blog.id)} />
                        </div>
                    </div>
                    <TextAreaTool onChange={(v) => set_content(v)} value={_blog ? _blog.content : ""} sx='min-h-96 border-none' />
                    <div className="h-12"></div>
                </div>
                {_currentUser.position === "admin" ?
                    <div className=' rounded px-2 flex justify-between max-w-xs '>
                        <div className='h-12 flex flex-col justify-center'> censor</div>
                        <Switch value={_blog.censor} func={(v) => set_cencor(v)} />
                    </div> : null}
                <div className='  rounded px-2 '>
                    <div className='h-12 flex flex-col justify-center'>
                        comment
                    </div>
                </div>
            </div> :
            slug === "news" ?
                <div className='flex flex-col gap-1'>
                    <div className='bg-white shadow rounded'>
                        <div className='h-12 flex justify-between  border-b border-slate-200 font-bold px-2'>
                            <div className='flex flex-col justify-center'>
                                {_currentUser.username}
                            </div>
                            <div className='flex'>
                                {_currentUser.position === "admin" ?
                                    <SaveIcon className='!w-8 !h-8 p-1  m-auto' onClick={() => createBlog(_currentUser.position, archive, { content: _content, slug: moment(Date()).format("YYYYMMDDhhmmss") })} /> :
                                    null}
                                <DeleteIcon className='!w-8 !h-8 p-1  m-auto' onClick={() => toPage.push("/blog")} />
                            </div>
                        </div>
                        <TextAreaTool onChange={(v) => set_content(v)} value={""} sx='min-h-96 border-none' />
                        <div className="h-12"></div>
                    </div>
                    <div className='  rounded px-2 '>
                        <div className='h-12 flex flex-col justify-center'>
                            comment
                        </div>
                    </div>
                </div> :
                null
    )
}
export const Detail = ({ archive, slug }: Props) => {

    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const [_currentModal, set_currentModal] = useState<ModalType>(store.getState().modal)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentModal(store.getState().modal))
    }
    useEffect(() => {
        update()
    }, [])

    const [_loading, set_loading] = useState<boolean>(true)
    const [_id, set_id] = useState<number>(0)
    const [_audioId, set_AudioId] = useState<number>(0)
    const [_audioPreview, set_AudioPreview] = useState<string>("")
    const [_question, set_question] = useState<string>("")
    const [__question, set__question] = useState<string>("")
    const [_choose, set_choose] = useState<string>("")
    const [_explain, set_explain] = useState<string>("")
    const [__explain, set__explain] = useState<string>("")

    const [_chooseArr, set_chooseArr] = useState<{
        id: number;
        name: string;
        question: string;
        answerA: string;
        answerB: string;
        answerC: string;
        answerD: string;
        answer: string
    }[]>([])
    const [_chooseIndex, set_chooseIndex] = useState<number>(-1)
    const [_chooseQuestion, set_chooseQuestion] = useState<string>("")
    const [_answerA, set_answerA] = useState<string>("")
    const [_answerB, set_answerB] = useState<string>("")
    const [_answerC, set_answerC] = useState<string>("")
    const [_answerD, set_answerD] = useState<string>("")
    const [_chooseAnswer, set_chooseAnswer] = useState<string>("")

    useEffect(() => {
        set_choose(JSON.stringify(_chooseArr))
    }, [_chooseArr])

    const getItem = async (position: string, archive: string, id: string) => {
        set_loading(true)
        const result = await ApiItemUser({ position, archive: "path", archivePlus: archive, id: Number(id) })
        if (result.success && result.data[0]) {
            set_loading(false)
            set_id(result.data[0].id)
            set_AudioId(result.data[0].audioId)
            set_question(result.data[0].question)
            set_chooseArr(JSON.parse(result.data[0].choose))
            set_explain(result.data[0].explain)
        } else {
            set_loading(false)
        }
    }

    useEffect(() => {
        if (archive) {
            getItem(_currentUser.position, archive, slug)
        }
    }, [archive, slug, _currentUser.position])

    const toPage = useRouter()

    const body: questionTypeBody = {
        archive: archive,
        audioId: _audioId,
        question: __question,
        choose: _choose,
        explain: __explain
    }

    const upload = async (position: string, archive: string, id: number, body: questionTypeBody,) => {
        const result = await ApiUpdateItem({ position, archive, id }, body)
        if (result.success) {
            toPage.push("/" + body.archive)
        }
    }
    const create = async (position: string, archive: string, body: questionTypeBody,) => {
        const result = await ApiCreateItem({ position, archive }, body)
        if (result.success) {
            toPage.push("/" + body.archive)
        }
    }

    const makeQuestion = (index: number) => {
        set_chooseArr((arr) => [...arr, {
            id: (index),
            name: "question",
            question: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            answer: ""
        }])
    }


    const inputItem = (t: "id" | "question" | "answerA" | "answerB" | "answerC" | "answerD" | "name" | "answer", v: string, index: number) => {
        const newArr = _chooseArr
        const object: Record<string, string | number> = newArr[index]
        const prop: keyof typeof object = t;
        object[prop] = v
        set_chooseArr(newArr)
    }

    const deleteQuestion = (index: number) => {
        const newArr = _chooseArr
        const newArrFilter = newArr.filter((a, i) => i !== index)
        set_chooseArr(newArrFilter)
        set_chooseIndex(-1)
    }

    useEffect(() => {
        set_choose(JSON.stringify(_chooseArr))
    }, [_chooseAnswer, _answerA, _answerB, _answerC, _answerD, _chooseQuestion, _chooseArr])

    useEffect(() => {
        if (_chooseArr.length) {
            set_chooseIndex(_chooseArr.length - 1)
        }
    }, [_chooseArr.length])

    const [_isSelectFromButton, set_isSelectFromButton] = useState<boolean>(false)

    useEffect(() => {
        if (_isSelectFromButton && _currentModal.open === false && _currentModal.value) {
            set_AudioId(_currentModal.value)
            store.dispatch(setModal({ open: false, value: 0 }))
            set_isSelectFromButton(false)
        }
    }, [_currentModal.open, _currentModal.value, _isSelectFromButton])


    useEffect(() => {
        const getAudioFile = async (id: number) => {
            const result = await ApiItemUser({ position: _currentUser.position, archive: "file", id })
            if (result.success) {
                set_AudioPreview(result.data[0].name)
            }
        }
        if (_audioId) {
            getAudioFile(_audioId)
        }
    }, [_audioId, _currentUser.position])

    return (
        _loading ?
            < div className="h-11  bg-white px-2 shadow-md rounded flex flex-col justify-center gap-1 text-center " >
                loading...
            </div> :
            <div className='flex flex-col gap-1'>
                <div className="h-11  bg-white px-2 shadow-md rounded cursor-pointer" onClick={() => toPage.push("/" + archive + "/-1")}>
                    <div className="flex">
                        <AddIcon className='!w-11 !h-11 p-2' />
                        <div className='flex flex-col justify-center'>new question of {archive}</div>
                    </div>
                </div>
                < div className="min-h-full  bg-white px-2 shadow-md rounded  flex flex-col gap-1 " >
                    <div className="h-11 flex flex-col justify-end font-bold">Reading</div>
                    <TextAreaTool onChange={(v) => set__question(v)} value={_question} sx='h-96 w-full overflow-auto' />

                    {
                        archive === "pathone" || archive === "pathtwo" || archive === "paththree" || archive === "pathfour" ?
                            <>
                                <div className="h-11 flex flex-col justify-end font-bold">Audio</div>
                                <Button name="select audio" onClick={() => { store.dispatch(setModal({ open: true, value: 0 })); set_isSelectFromButton(true) }} sx='bg-slate-200 !text-black cursor-pointer' />
                            </> : null
                    }
                    {_audioPreview ? <audio className='w-full' src={process.env.ftp_url + _audioPreview} controls /> : null}
                    <div className="h-11 flex flex-col justify-end font-bold">Q&A</div>
                    <div className="flex">
                        <DividerSelect data={_chooseArr} name={"question"} valueReturn={(v) => set_chooseIndex(v.id)} key={_chooseArr.length} />
                        <Add className='!h-12 !w-12 p-3' onClick={() => { makeQuestion(_chooseArr[_chooseArr.length - 1] ? _chooseArr[_chooseArr.length - 1].id + 1 : 0) }} />
                        {_chooseIndex !== -1 ? <RemoveIcon className='!h-12 !w-12 p-3' onClick={() => deleteQuestion(_chooseIndex)} /> : null}
                    </div>

                    {
                        _chooseIndex !== -1 ?
                            < div >
                                <Input name={"question " + (_chooseIndex + 1)} onChange={(v) => { inputItem("question", v, _chooseIndex); set_chooseQuestion(v) }} value={_chooseArr[_chooseIndex].question} key={"q" + _chooseIndex} />
                                <Input name={"Answer A"} onChange={(v) => { inputItem("answerA", v, _chooseIndex); set_answerA(v) }} value={_chooseArr[_chooseIndex].answerA} key={"aa" + _chooseIndex} />
                                <Input name={"Answer B"} onChange={(v) => { inputItem("answerB", v, _chooseIndex); set_answerB(v) }} value={_chooseArr[_chooseIndex].answerB} key={"ab" + _chooseIndex} />
                                <Input name={"Answer C"} onChange={(v) => { inputItem("answerC", v, _chooseIndex); set_answerC(v) }} value={_chooseArr[_chooseIndex].answerC} key={"ac" + _chooseIndex} />
                                <Input name={"Answer D"} onChange={(v) => { inputItem("answerD", v, _chooseIndex); set_answerD(v) }} value={_chooseArr[_chooseIndex].answerD} key={"ad" + _chooseIndex} />
                                <DividerSelect data={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" },]} name={_chooseArr[_chooseIndex].answer || "answer correct"} valueReturn={(v) => { inputItem("answer", v.name ? v.name : _chooseArr[_chooseIndex].answer, _chooseIndex); set_chooseAnswer(v.name ? v.name : _chooseArr[_chooseIndex].answer) }} key={"a" + _chooseIndex} />
                            </div> :
                            null
                    }
                    <div className="h-11 flex flex-col justify-end font-bold">Explain</div>

                    <TextAreaTool onChange={(v) => set__explain(v)} value={_explain} sx='h-96 overflow-auto' />

                    <Button name={_id && _id !== -1 ? "save" : "create"} sx='bg-slate-200 !text-black' onClick={() => _id && _id !== -1 ? upload(_currentUser.position, "path", _id, body) : create(_currentUser.position, "path", body)}></Button>
                </div >
            </div >


    )

}

