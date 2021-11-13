import React, { useEffect, useState } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCadidateList,
    setSearchResultList,
    setSelectedCadidateDetails,
    setShortListedcandidateList,
    setRejectionCandidateList
} from "../../redux/reducer/candidateReducer";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        getCadidateListFunc();
    }, [])
    // const [candidateList, setcandidateList] = useState([]);

    const [searchText, setSearchText] = useState("");

    //store
    const candidateStore = useSelector(state => state.candidate);
    const {
        count,
        candidateList,
        searchResultList
    } = candidateStore;

    const getCadidateListFunc = async () => {
        console.log("candidateList", candidateList);
        candidateList.length > 1 ? console.log("already have data") : await dispatch(getCadidateList())

    }
    const searchFunc = (text) => {
        let searchWord = text.toLowerCase();
        let newCandidateList = [];
        for (let candidate of candidateList) {
            let candidateName = candidate.name.toLowerCase();
            let n = candidateName.search(searchWord);
            if (n > -1) {
                newCandidateList.push(candidate);
            }
        }
        //setSearchResultList(newCandidateList);
        dispatch(setSearchResultList(newCandidateList));
    }
    const setCadidateForMoreDetails = (item) => {
        dispatch(setSelectedCadidateDetails(item));

        history(`/${item.id}`);
        // window.open(`/${item.id}`, "_blank");

    }
    const setShortListedcandidateListFunc = () => {
        let newArray = [];
        for (let candidate of candidateList) {
            if (candidate.status == "ShortList") {
                newArray.push(candidate);
            }
        }
        dispatch(setShortListedcandidateList(newArray));
        history(`/shortlist`);

    }
    const setRejectionCandidateListFunc = () => {
        let newArray = [];
        for (let candidate of candidateList) {
            if (candidate.status == "Reject") {
                newArray.push(candidate);
            }
        }
        dispatch(setRejectionCandidateList(newArray));
        history(`/Rejection`);

    }

    const renderTableData = () => {

        return searchResultList.map((candidate, index) => {
            const { name, Image, id, status } = candidate //destructuring
            return (
                <tr
                    onClick={() => { setCadidateForMoreDetails(candidate) }}
                    key={id}>
                    <img
                        style={{ width: 60, height: 60 }}
                        src={Image} />
                    <td>{name}</td>
                    <td>{status ? status : "Not yet resulted"}</td>
                    <td style={{ color: "blue", cursor: "pointer" }}>More</td>



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
                    }}>Candidate List</h1>
                </div>
                <input
                    style={{
                        width: "40vw",
                        height: 50,
                        textAlign: "center",
                        marginTop: 30
                    }}
                    value={searchText}
                    onChange={(e) => {
                        searchFunc(e.target.value);
                        setSearchText(e.target.value);
                    }}
                />
                <div
                    style={{
                        marginTop: 10
                    }}
                >
                    <button
                        style={{
                            backgroundColor: "green",
                            width: 200,
                            height: 50
                        }}
                        onClick={() => {
                            setShortListedcandidateListFunc();
                        }}
                    >ShortList candidate list</button>
                    <button
                        style={{
                            backgroundColor: "red",
                            width: 200,
                            height: 50,
                            marginLeft: 30
                        }}
                        onClick={() => {
                            setRejectionCandidateListFunc();
                        }}
                    >Reject candidate list</button>
                </div>
                <div
                    style={{ width: "70%", marginTop: 15, marginBottom: 50 }}
                >
                    {searchResultList.length ?
                        <table id='students'>
                            <tbody>
                                <tr>
                                    <th >IMAGE</th>
                                    <th >NAME</th>
                                    <th> Current Status</th>
                                    <th></th>



                                </tr>
                                {renderTableData()}
                            </tbody>
                        </table>
                        : <label>No result found !</label>}
                </div>


            </div>
        </center>
    );
}
export default HomePage;