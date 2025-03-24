'use client'
import React, { useState, useEffect } from 'react'
import { ItemType } from './archive'
import { ApiItemUser, ApiUpdateItem, ApiCreateItem, ApiDeleteItem } from '@/api/user'
import { useRouter } from 'next/navigation'
import { Input } from '@/tool/input/input'
import { Button } from '@/tool/button/button'
import { TextArea, TextAreaTool } from '@/tool/input/textarea'
import { DividerSelect } from "../tool/divider/divider"
import { Add } from '@mui/icons-material'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    archive: string,
    slug: string
}
type questionTypeBody = {
    archive: string;
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
export const Detail = ({ archive, slug }: Props) => {
    const [_loading, set_loading] = useState<boolean>(true)
    const [_id, set_id] = useState<number>(-1)
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
        anwser: string
    }[]>([])
    const [_chooseIndex, set_chooseIndex] = useState<number>(0)
    const [_chooseQuestion, set_chooseQuestion] = useState<string>("")
    const [_answerA, set_answerA] = useState<string>("")
    const [_answerB, set_answerB] = useState<string>("")
    const [_answerC, set_answerC] = useState<string>("")
    const [_answerD, set_answerD] = useState<string>("")
    const [_chooseAnswer, set_chooseAnswer] = useState<string>("")

    useEffect(() => {
        set_choose(JSON.stringify(_chooseArr))
    }, [_chooseArr])

    const getItem = async (archive: string, id: string) => {
        set_loading(true)
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive, id: Number(id) })
        if (result.success && result.data[0]) {
            set_loading(false)
            set_id(result.data[0].id)
            set_question(result.data[0].question)
            set_chooseArr(JSON.parse(result.data[0].choose))
            set_explain(result.data[0].explain)
        } else {
            set_loading(false)
        }
    }

    useEffect(() => {
        if (archive) {
            getItem(archive, slug)
        }
    }, [archive, slug])

    const toPage = useRouter()

    const body: questionTypeBody = {
        archive: archive,
        question: __question,
        choose: _choose,
        explain: __explain
    }

    const upload = async (body: questionTypeBody, archive: string, id: number) => {
        const result = await ApiUpdateItem({ position: "user", archive, id }, body)
        if (result.success) {
            toPage.push("/" + body.archive)
        }
    }
    const create = async (body: questionTypeBody, archive: string) => {
        // console.log(body)
        const result = await ApiCreateItem({ position: "user", archive }, body)
        console.log(result)
        if (result.success) {
            toPage.push("/" + body.archive)
        }
    }

    const makeQuestion = (index: number) => {
        set_chooseArr((arr) => [...arr, {
            id: (index),
            name: "question " + index,
            question: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            anwser: ""
        }])
        set_chooseIndex(index - 1)
    }

    const deleteQuestion = (index: number) => {
        const newArr = _chooseArr
        newArr.splice(index, 1)
        console.log(newArr)
        set_chooseIndex(0)
    }
    const inputItem = (t: "id" | "question" | "answerA" | "answerB" | "answerC" | "answerD" | "name" | "anwser", v: string, index: number) => {
        const newArr = _chooseArr
        const object: Record<string, string | number> = newArr[index - 1]
        const prop: keyof typeof object = t;
        object[prop] = v
        set_chooseArr(newArr)
    }


    useEffect(() => {
        set_choose(JSON.stringify(_chooseArr))
    }, [_chooseAnswer, _answerA, _answerB, _answerC, _answerD, _chooseQuestion, _chooseArr])

    console.log(_chooseIndex)

    return (
        _loading ?
            < div className="h-11  bg-white px-2 shadow-md rounded flex flex-col justify-center gap-1 text-center " >
                loading...
            </div> :
            < div className="min-h-full  bg-white px-2 shadow-md rounded  flex flex-col gap-1 " >
                <div className="h-11 flex flex-col justify-end font-bold">Reading</div>
                <TextAreaTool onChange={(v) => set__question(v)} value={_question} sx='h-96 w-full' />
                <div className="h-11 flex flex-col justify-end font-bold">Q&A</div>
                <div className="flex">
                    <DividerSelect data={_chooseArr} name={_chooseArr[_chooseIndex - 1]?.name || "question"} valueReturn={(v) => { set_chooseIndex(Number(v)) }} />
                    <Add className='!h-12 !w-12 p-3' onClick={() => { makeQuestion(_chooseArr.length + 1) }} />
                    {_chooseIndex ? <RemoveIcon className='!h-12 !w-12 p-3' onClick={() => deleteQuestion(_chooseIndex - 1)} /> : null}
                </div>
                {
                    _chooseIndex ?
                        <div>
                            <Input name={_chooseArr[_chooseIndex - 1].name} onChange={(v) => { inputItem("question", v, _chooseIndex); set_chooseQuestion(v) }} value={_chooseArr[_chooseIndex - 1].question} key={"q" + _chooseIndex} />
                            <Input name={"Answer A"} onChange={(v) => { inputItem("answerA", v, _chooseIndex); set_answerA(v) }} value={_chooseArr[_chooseIndex - 1].answerA} key={"aa" + _chooseIndex} />
                            <Input name={"Answer B"} onChange={(v) => { inputItem("answerB", v, _chooseIndex); set_answerB(v) }} value={_chooseArr[_chooseIndex - 1].answerB} key={"ab" + _chooseIndex} />
                            <Input name={"Answer C"} onChange={(v) => { inputItem("answerC", v, _chooseIndex); set_answerC(v) }} value={_chooseArr[_chooseIndex - 1].answerC} key={"ac" + _chooseIndex} />
                            <Input name={"Answer D"} onChange={(v) => { inputItem("answerD", v, _chooseIndex); set_answerD(v) }} value={_chooseArr[_chooseIndex - 1].answerD} key={"ad" + _chooseIndex} />
                            <DividerSelect data={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" },]} name={_chooseArr[_chooseIndex - 1].anwser || "answer correct"} valueReturn={(v) => { inputItem("anwser", v ? v.toString() : _chooseArr[_chooseIndex - 1].anwser, _chooseIndex); set_chooseAnswer(v ? v.toString() : _chooseArr[_chooseIndex - 1].anwser) }} key={"a" + _chooseIndex} />
                        </div> : null
                }
                <div className="h-11 flex flex-col justify-end font-bold">Explain</div>

                <TextAreaTool onChange={(v) => set__explain(v)} value={_explain} sx='h-96' />

                <Button name={_id && _id !== -1 ? "save" : "create"} sx='bg-slate-200 !text-black' onClick={() => _id && _id !== -1 ? upload(body, "path", _id) : create(body, "path")}></Button>
            </div >


    )

}

