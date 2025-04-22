import React, { useState, useEffect } from "react"
import { Divider } from "../divider/divider"

import { DividerType } from "../divider/divider"
import { Input } from "../input/input"
type Props = {
    icon: React.ReactNode,
    data: DividerType[],
    sx?: string,
    valueReturn?: (v: string | number) => void

}
export const IconDivider = ({ icon, data, sx, valueReturn }: Props) => {
    const [drop, setDrop] = useState<boolean>(false)
    const [_name, set_name] = useState<string>("")
    const [_id, set_id] = useState<number>(0)

    useEffect(() => {
        if (valueReturn) {
            valueReturn(_id || _name)
        }
    }, [_id, _name, valueReturn])
    return (
        <div className={`relative ${sx}`}>
            <div className="h-12 w-12 p-2 ml-auto mr-0" onClick={() => { setDrop(!drop) }}>
                {icon}
            </div>
            <div className={`w-max transition-all duration-100 overflow-hidden absolute z-10 top-12 shadow-lg bg-lv-0 dark:bg-lv-19 border-lv-2 dark:border-lv-17 ${drop ? "border" : ""}  rounded bg-colorlight dark:bg-colordark absolute right-0`} style={{ height: drop && data?.length ? (data.length) * 48 + "px" : 0 }} >
                {data?.length ? data.map((d: DividerType, index: number) =>
                    <Divider key={index} name={d.name} onClick={() => { set_name(d.name); if (d.id) { set_id(d.id) }; setDrop(!drop); if (d.func) { d.func() } }} sx="w-32 text-center opacity-75 hover:opacity-100" />
                ) : null}
            </div >
        </div>
    )
}
type IconSlideType = {
    icon: React.ReactNode,
    sx?: string,
    valueReturn?: (v: string | number) => void

}
export const IconSlider = ({ icon, sx, valueReturn }: IconSlideType) => {
    const [drop, setDrop] = useState<boolean>(false)
    const [_search, set_search] = useState<string>("")

    useEffect(() => {
        if (valueReturn) {
            valueReturn(_search)
        }
    }, [_search, valueReturn])
    return (
        <div className={`relative flex w-max overflow-hidden ${sx}`}>
            <Input name={`search`} sx={`${drop ? "w-max" : "!w-0 overflow-hidden"}`} onChange={(v) => set_search(v)} value={_search} />
            <div className="h-12 w-12 p-2 ml-auto mr-0" onClick={() => { setDrop(!drop); if (drop) { set_search("") } }}>
                {icon}
            </div>
        </div>
    )
}