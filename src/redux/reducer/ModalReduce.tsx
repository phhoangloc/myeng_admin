
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

export type ModalType = {
    open: boolean,
    value: number
}
const ModalReducer = createSlice({
    name: "Modal",
    initialState: { open: false, value: 0 } as ModalType,
    reducers: {
        setModal: {
            reducer: (state: ModalType, action: PayloadAction<ModalType>) => {
                return (state = action.payload)
            },
            prepare: (msg: ModalType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = ModalReducer
export const { setModal } = actions;

export default ModalReducer