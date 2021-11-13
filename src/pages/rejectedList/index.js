import React, { useEffect, useState } from 'react';
import '../home/index.css';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from "react-router-dom";
const RejectionListPage = () => {

    const history = useNavigate();
    useEffect(() => {

    }, [])


    //store
    const candidateStore = useSelector(state => state.candidate);
    const {
        rejectionCandidateList
    } = candidateStore;
    const renderTableData = () => {

        return rejectionCandidateList.map((candidate, index) => {
            const { name, Image, id, status } = candidate //destructuring
            return (
                <tr
                    key={id}>
                    <img
                        style={{ width: 60, height: 60 }}
                        src={Image} />
                    <td>{name}</td>
                    <td>{status ? status : "Not yet resulted"}</td>




                </tr>
            )
        })
    }
    return (
        <center>
            <div
                style={{
                    backgroundImage: `url("https://image.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149007168.jpg")`,
                    width: "100vw",
                    height: "100vh",
                    backgroundSize: 'cover',
                    overflowY: "scroll"

                }}
            >
                <div style={{
                    width: "100%",
                }}>

                    <h1 style={{
                        alignSelf: "center",
                        paddingTop: 50
                    }}>Rejection Candidate</h1>
                </div>

                <div
                    style={{ width: "70%", marginTop: 50, marginBottom: 50 }}
                >
                    {rejectionCandidateList.length ?
                        <table id='students'>
                            <tbody>
                                <tr>
                                    <th >IMAGE</th>
                                    <th >NAME</th>
                                    <th> Current Status</th>




                                </tr>
                                {renderTableData()}
                            </tbody>
                        </table>
                        : <label>No one rejected !</label>}
                </div>

                <div
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
export default RejectionListPage;