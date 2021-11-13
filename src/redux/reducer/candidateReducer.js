import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCadidateList = createAsyncThunk(
    'candidate/getCadidateList',
    async () => {

        let result = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json");
        result = await result.json();
        console.log("result", result);
        for (let i = 0; i < result.length; i++) {
            result[i].status = "";
        }
        return { result: result };
    }
);
const candidateSlice = createSlice({
    name: 'candidateSlice',
    initialState: {
        candidateList: [],
        searchResultList: [],
        loader: false,
        selectedCadidateDetails: {
            name: "",
            Image: "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user20c5688c.jpg",
            id: "1000",
            status: ""

        },
        shortListedcandidateList: [],
        rejectionCandidateList: []
    },
    reducers: {
        setSearchResultList: (state, action) => {
            state.searchResultList = action.payload;
        },
        setSelectedCadidateDetails: (state, action) => {
            state.selectedCadidateDetails = action.payload;
        },
        setApplicationStatus: (state, action) => {
            console.log("status", action.payload.status)
            for (let i in state.candidateList) {
                if (state.candidateList[i].id == action.payload.id) {
                    state.candidateList[i].status = action.payload.status;
                }
            }
            for (let i in state.searchResultList) {
                if (state.searchResultList[i].id == action.payload.id) {
                    state.searchResultList[i].status = action.payload.status;
                }
            }


        },
        setShortListedcandidateList: (state, action) => {
            state.shortListedcandidateList = action.payload;
        },
        setRejectionCandidateList: (state, action) => {
            state.rejectionCandidateList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCadidateList.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getCadidateList.fulfilled, (state, action) => {
            state.loader = false;
            state.candidateList = action.payload.result;
            state.searchResultList = action.payload.result;
        });

        builder.addCase(getCadidateList.rejected, (state, action) => {
            state.loader = false;
            console.log("eroor", action.error);
        });
    }

});
export const {
    setSearchResultList,
    setSelectedCadidateDetails,
    setApplicationStatus,
    setShortListedcandidateList,
    setRejectionCandidateList
} = candidateSlice.actions;

export default candidateSlice.reducer;