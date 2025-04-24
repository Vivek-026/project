import React from "react";
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice'
import cardsReducer from './cardSlice'

const Store=configureStore({
    reducer:{
        auth: authReducer,
        cards: cardsReducer,

    },
})
export default Store;