import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
    setApplicationStatus
} from '../../redux/reducer/candidateReducer';
import { useNavigate } from "react-router-dom";
const CandidatePage = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    //store
    const candidateStore = useSelector(state => state.candidate);
    const {
        selectedCadidateDetails
    } = candidateStore;
    const setApplicationStatusFunc = (status) => {
        dispatch(setApplicationStatus({ id: selectedCadidateDetails.id, status: status }));
        history(`/`);
    }

    return (
        <center>
            <div>

                <img
                    src={selectedCadidateDetails.Image}
                    style={{
                        width: 300,
                        height: 300,
                        marginTop: 60
                    }}
                />

                <h1>{selectedCadidateDetails.name}</h1>
                <label> Current Application : {selectedCadidateDetails.status ? selectedCadidateDetails.status : "Not yet resulted"}</label>
                <div
                    style={{
                        marginTop: 50
                    }}
                >
                    <button
                        style={{
                            backgroundColor: "green",
                            width: 200,
                            height: 50
                        }}
                        onClick={() => {
                            setApplicationStatusFunc("ShortList");
                        }}
                    >ShortList</button>
                    <button
                        style={{
                            backgroundColor: "red",
                            width: 200,
                            height: 50,
                            marginLeft: 30
                        }}
                        onClick={() => {
                            setApplicationStatusFunc("Reject");
                        }}
                    >Reject</button>
                </div>

                <div
                    style={{ marginTop: 20 }}
                    onClick={() => {
                        history("/");
                    }}>
                    <label>{`<-`}</label>
                    <label>Back</label>
                </div>
            </div>
        </center>
    );
}
export default CandidatePage;