import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type GeneratedStringField = {
    label?: any;
    value?: any;
};

export type fieldValue = {
    label?: any;
    value?: any;
    fieldName?: any;
};

export type AppState = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    generatedStringField: GeneratedStringField;
    gender: string | null;
    age: number | null;
    testimonial: string | null;
    status: string;
    error?: string | null;
};

const initialState: AppState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    generatedStringField: {
        label: "",
        value: "",
    },
    gender: "",
    age: null,
    testimonial: "",
    status: "idle",
    error: null,
};

export const postData = createAsyncThunk(
    "api/form",
    async (_, { getState }) => {
        const { app } = getState() as { app: AppState };
        const response = await axios.post(
            "/api/form",
            {
                firstName: app.firstName,
                lastName: app.lastName,
                emailAddress: app.emailAddress,
                [app.generatedStringField.label]:
                    app.generatedStringField.value,
                gender: app.gender,
                age: app.age,
                testimonial: app.testimonial,
            },
            {
                baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            }
        );
        return response;
    }
);

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<fieldValue>) => {
            console.log(action);
            // @ts-ignore:next-line
            state[action.payload.label] = action.payload.value;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(postData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(postData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setFieldValue } = appSlice.actions;

export default appSlice.reducer;
