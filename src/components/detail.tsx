'use client'
import React, { useState, useEffect } from 'react'
import { ItemType, QuestionType } from './archive'
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
    const [_item, set_item] = useState<QuestionType>()
    const getItem = async (archive: string, id: string) => {
        const result = await ApiItemUser({ position: "user", archive: archive, id: Number.isNaN(id) ? -1 : Number(id) })
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
        if (_item) {
            set_id(_item.id)
            set_question(_item.question)
            set_choose(_item.choose)
            set_answer(_item.answer)
            set_questionTran(_item.questionTran)
            set_answerTran(_item.answerTran)
            set_explain(_item.explain)
        }
    }, [_item])

    const toPage = useRouter()

    const body: questionTypeBody = {
        question: __question,
        choose: _choose,
        answer: _answer.toString(),
        questionTran: __questionTran,
        answerTran: __answerTran,
        explain: __explain
    }
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

    const JSX = _item ?
        <div className="min-h-full  bg-white px-2 shadow-md rounded bg-sl flex flex-col gap-1 ">
            <div className="h-11"></div>
            <TextArea onChange={(v) => set__question(v)} value={_question} name="question" />
            <Input name={"Answer A"} onChange={(v) => set_answerA(v)} value={_answerA} />
            <Input name={"Answer B"} onChange={(v) => set_answerB(v)} value={_answerB} />
            <Input name={"Answer C"} onChange={(v) => set_answerC(v)} value={_answerC} />
            <Input name={"Answer D"} onChange={(v) => set_answerD(v)} value={_answerD} />
            <DividerSelect data={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" },]} name="answer" valueReturn={(v) => set_answer(v)} />
            <TextArea onChange={(v) => set__questionTran(v)} value={_questionTran} name="question translate" />
            <TextArea onChange={(v) => set__answerTran(v)} value={_answerTran} name="answer translate" />
            <TextArea onChange={(v) => set__explain(v)} value={_explain} name="answer" />

            <Button name="save" sx='bg-slate-200 !text-black' onClick={() => upload(body, archive, _id)}></Button>
        </div> : null

    return (
        JSX
    )
}