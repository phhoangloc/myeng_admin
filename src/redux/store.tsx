import { configureStore } from "@reduxjs/toolkit";

import MenuReducer from "./reducer/MenuReduce";


const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
    }
})

export default store