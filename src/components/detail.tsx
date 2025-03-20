'use client'
import React, { useState, useEffect } from 'react'
import { ItemType } from './archive'
import { ApiItemUser, ApiUpdateItem, ApiCreateItem } from '@/api/user'
import { useRouter } from 'next/navigation'
import { Input } from '@/tool/input/input'
import { Button } from '@/tool/button/button'
import { TextArea } from '@/tool/input/textarea'
import { DividerSelect } from "../tool/divider/divider"

type Props = {
    archive: string,
    slug: string
}
type questionTypeBody = {
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
        const result = await ApiItemUser({ position: "user", archive: archive, id: Number.isNaN(id) ? -1 : Number(id) })
        console.log(result)
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
    const [_useto, set_useto] = useState<string>("")

    useEffect(() => {
        if (_item) {
            set_id(_item.id)
            set_word(_item.name)
            set_mean(_item.mean)
            set_useto(_item.useto)
        }
    }, [_item])

    const toPage = useRouter()

    const body = {
        name: _word,
        mean: _mean,
        useto: _useto
    }
    const upload = async (body: { name: string, mean: string, useto: string }, archive: string, id: number) => {
        const result = await ApiUpdateItem({ position: "user", archive, id }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }
    const create = async (body: { name: string, mean: string, useto: string }, archive: string) => {
        const result = await ApiCreateItem({ position: "user", archive }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }
    return (
        _item ?
            <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                <div className="h-11"></div>
                <Input name="word" value={_word} onChange={(v) => { set_word(v) }}></Input>

                <Input name="mean" value={_mean} onChange={(v) => { set_mean(v) }}></Input>

                <Input name="example" value={_useto} onChange={(v) => { set_useto(v) }}></Input>

                <Button name="save" onClick={() => upload(body, archive, _id)} sx='bg-slate-200 !text-black'></Button>
            </div> :
            <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                <div className="h-11"></div>
                <Input name="word" value={_word} onChange={(v) => { set_word(v) }}></Input>

                <Input name="mean" value={_mean} onChange={(v) => { set_mean(v) }}></Input>

                <Input name="example" value={_useto} onChange={(v) => { set_useto(v) }}></Input>

                <Button name="create" onClick={() => create(body, archive)} sx='bg-slate-200 !text-black'></Button>
            </div>

    )
}
export const Detail = ({ archive, slug }: Props) => {
    const [_id, set_id] = useState<number>(0)
    const [_question, set_question] = useState<string>("")
    const [__question, set__question] = useState<string>("")
    const [_choose, set_choose] = useState<string>("")
    const [_answer, set_answer] = useState<string | number>("")
    const [_questionTran, set_questionTran] = useState<string>("")
    const [__questionTran, set__questionTran] = useState<string>("")
    const [_answerTran, set_answerTran] = useState<string>("")
    const [__answerTran, set__answerTran] = useState<string>("")
    const [_explain, set_explain] = useState<string>("")
    const [__explain, set__explain] = useState<string>("")

    const [_answerA, set_answerA] = useState<string>("")
    const [_answerB, set_answerB] = useState<string>("")
    const [_answerC, set_answerC] = useState<string>("")
    const [_answerD, set_answerD] = useState<string>("")

    useEffect(() => {
        const _answerObj = {
            answerA: _answerA,
            answerB: _answerB,
            answerC: _answerC,
            answerD: _answerD,
        }
        set_choose(JSON.stringify(_answerObj))
    }, [_answerA, _answerB, _answerC, _answerD])
    const getItem = async (archive: string, id: string) => {
        const result = await ApiItemUser({ position: "user", archive: archive, id: Number.isNaN(id) ? -1 : Number(id) })

        if (result.success) {
            set_id(result.data[0].id)
            set_question(result.data[0].question)
            set_choose(result.data[0].choose)
            set_answer(result.data[0].answer)
            set_questionTran(result.data[0].questionTran)
            set_answerTran(result.data[0].answerTran)
            set_explain(result.data[0].explain)
        }
    }
    useEffect(() => {
        if (archive && slug !== "_new") {
            getItem(archive, slug)
        }
    }, [archive, slug])

    const toPage = useRouter()

    const body: questionTypeBody = {
        question: __question,
        choose: _choose,
        answer: _answer.toString(),
        questionTran: __questionTran,
        answerTran: __answerTran,
        explain: __explain
    }
    useEffect(() => {
        if (_choose) {
            set_answerA(JSON.parse(_choose).answerA)
            set_answerB(JSON.parse(_choose).answerB)
            set_answerC(JSON.parse(_choose).answerC)
            set_answerD(JSON.parse(_choose).answerD)
        }
    }, [_choose])

    const upload = async (body: questionTypeBody, archive: string, id: number) => {
        const result = await ApiUpdateItem({ position: "user", archive, id }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }
    const create = async (body: questionTypeBody, archive: string) => {
        const result = await ApiCreateItem({ position: "user", archive }, body)
        if (result.success) {
            toPage.push("/" + archive)
        }
    }

    const JSX =
        _id ?
            <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                <div className="h-11"></div>
                <TextArea onChange={(v) => set__question(v)} value={_question} name="question" />
                <Input name={"Answer A"} onChange={(v) => set_answerA(v)} value={_answerA} />
                <Input name={"Answer B"} onChange={(v) => set_answerB(v)} value={_answerB} />
                <Input name={"Answer C"} onChange={(v) => set_answerC(v)} value={_answerC} />
                <Input name={"Answer D"} onChange={(v) => set_answerD(v)} value={_answerD} />
                <DividerSelect data={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" },]} name={_answer} valueReturn={(v) => set_answer(v ? v : _answer)} />
                <TextArea onChange={(v) => set__questionTran(v)} value={_questionTran} name="question translate" />
                <TextArea onChange={(v) => set__answerTran(v)} value={_answerTran} name="answer translate" />
                <TextArea onChange={(v) => set__explain(v)} value={_explain} name="explain" />

                <Button name="save" sx='bg-slate-200 !text-black' onClick={() => upload(body, archive, _id)}></Button>
            </div> :
            null
    switch (slug) {
        case "_new":
            return (
                <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
                    <div className="h-11"></div>
                    <TextArea onChange={(v) => set__question(v)} value={""} name="question" />
                    <Input name={"Answer A"} onChange={(v) => set_answerA(v)} value={""} />
                    <Input name={"Answer B"} onChange={(v) => set_answerB(v)} value={""} />
                    <Input name={"Answer C"} onChange={(v) => set_answerC(v)} value={""} />
                    <Input name={"Answer D"} onChange={(v) => set_answerD(v)} value={""} />
                    <DividerSelect data={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" },]} name={"---"} valueReturn={(v) => set_answer(v ? v : _answer)} />
                    <TextArea onChange={(v) => set__questionTran(v)} value={""} name="question translate" />
                    <TextArea onChange={(v) => set__answerTran(v)} value={""} name="answer translate" />
                    <TextArea onChange={(v) => set__explain(v)} value={""} name="explain" />

                    <Button name="create" sx='bg-slate-200 !text-black' onClick={() => create(body, archive)}></Button>
                </div>
            )
        default:
            return JSX

    }

}