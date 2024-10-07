import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../../config/axiosConfig";

export const getSection = createAsyncThunk("get-list-section", async () => {
  try {
    const response = await axiosConfig.get("/sections/list");
    console.log(response, "check response");
    return response;
  } catch (error: any) {
    return error.message;
  }
});

interface Section {
  id: string;
  createdAt: number;
  subTitle: string;
  title: string;
  updatedAt: number;
}

interface SectionData {
  sections: Section[];
}

interface SectionResponse {
  statusCode: number;
  data: SectionData;
  message: string;
}

interface SectionState {
  listSection: SectionResponse;
}

const initialState: SectionState = {
  listSection: {
    statusCode: 200,
    data: {
      sections: [],
    },
    message: "",
  },
};

const getSectionSlice = createSlice({
  name: "get-list-section",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSection.pending, (state) => {});
    builder.addCase(getSection.fulfilled, (state, action) => {
      state.listSection = action.payload.data;
    });

    builder.addCase(getSection.rejected, (state, action) => {});
  },
});

export const {} = getSectionSlice.actions;
export default getSectionSlice.reducer;
