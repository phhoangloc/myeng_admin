'use client'
import React, { useEffect, useState } from 'react'

type Props = {
    value: boolean
    func?: (v: boolean) => void
}
const Switch = ({ value, func }: Props) => {
    const [_value, set_value] = useState<boolean>(false)

    useEffect(() => {
        set_value(value)
    }, [value])
    useEffect(() => {
        if (func) {
            func(_value)
        }
    }, [_value, func])
    return (
        <div className={`cursor-pointer select-none shadow w-16 h-8 my-auto rounded-ss-[1rem] rounded-es-[1rem] rounded-se-[1rem] rounded-ee-[1rem] ${_value ? "bg-white" : "bg-none"}`} onClick={() => set_value(!_value)}>
            {/* {_value.toString()} */}
            <div className={`h-6 w-6 rounded-[50%] transition-all duration-500 ${_value ? "bg-slate-500" : "bg-slate-300"} my-1 ${_value ? "ml-auto mr-1" : "ml-1 mr-auto"}`}></div>
        </div>
    )
}

export default Switch