import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getPopularCategories} from "api/Api";
import {LOAD_STATUSES} from "../constants";

export const fetchPopularCategories = createAsyncThunk("popularCategories/getPopularCategories", async () => {
    const result = await getPopularCategories();
    return result;
});

export const {actions, reducer} = createSlice({
    name: "popularCategories",
    initialState: {
        data: [],
        loadStatus: LOAD_STATUSES.UNKNOWN
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularCategories.pending, (state) => {
            state.loadStatus = LOAD_STATUSES.LOADING;
        });
        builder.addCase(fetchPopularCategories.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED;
            state.data = action.payload;
        });
        builder.addCase(fetchPopularCategories.rejected, (state) => {
            state.loadStatus = LOAD_STATUSES.ERROR;
        });
    }
});
