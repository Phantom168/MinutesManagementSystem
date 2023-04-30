import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { getHandbookSectionAPI, getHandbookPointsSectionIdAPI, getHandbookPointsIdAPI } from '../api/handbook'
import {publishHandbookAPI, updateHandbookPointAPI} from '../api/UpdateHandbook'

import { getSenateMeetingAllAPI, getSenatePointsMeetingIdAPI } from '../api/senateMeeting'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Select from '@mui/material/Select';

var parse = require('html-react-parser');


const UpdateHandbook = () => {
    const [data, setdata] = useState();
    const [agenda, setagenda] = useState(0);
    const [point, setpoint] = useState(0);
    const [handbookSection, sethandbookSection] = useState();
    const [handbookPoint, sethandbookPoint] = useState();
    const [handbookPointHTML, sethandbookPointHTML] = useState();
    
    const [HandbookData, setHandbookData] = useState();
    const [pointData, setpointData] = useState();
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    const [HandbookPublished, setHandbookPublished] = useState(false);
    const [emptyHandbookPoint, setemptyHandbookPoint] = useState(false);
    const [HandbookPointUpdated, setHandbookPointUpdated] = useState(false);
    const [HandbooknewText, setHandbooknewText] = useState(false);

const handleSubmit = async(e) => {
    e.preventDefault();
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(pointData.id, pointData.num, pointData.senateMeeting, handbookPoint, htmlContent, convertToRaw(editorState.getCurrentContent()))


    !handbookPoint ? setemptyHandbookPoint(true) : (!editorState ?  setHandbooknewText(true) : await updateHandbookPointAPI(pointData.id, pointData.num, pointData.senateMeeting, handbookPoint, htmlContent))
    if(handbookPoint && editorState)
    {
        setHandbookPointUpdated(true);
        setpoint(0);
        seteditorState(EditorState.createEmpty());
        sethandbookSection();



    }

}


const handlePublish = async(e) => {
    e.preventDefault();

    await publishHandbookAPI(pointData.senateMeeting);
    setHandbookPublished(true);

}




    const handleAgendaClick = (e) => {
        setagenda(Number(e.target.dataset.target.split("_").slice(-1)));
        setpoint(0);
    }



    const getdata = async () => {
        const response = await getSenateMeetingAllAPI();
        const Meeting = response.body.results;
        const new_data = []

        for (let i = 0; i < Meeting.length; i++) {
            const pointsArray = []
            const res2 = await getSenatePointsMeetingIdAPI(Meeting[i].number)
            for (const points of res2.body.senatePoints) {

                pointsArray.push({
                    id: points.id,
                    num: points.number,
                    name: points.name,
                    senateMeeting: points.senateMeeting,
                    proposal: points.proposal,
                    resolution: points.resolution,
                })
            }

            new_data.push({
                num: Meeting[i].number,
                name: Meeting[i].announcement,
                points: pointsArray

            })
        };
        setdata(new_data)

        const newhandbookData = [];
        const handbookResponse = await getHandbookSectionAPI();
        const section = handbookResponse.body.results;

        for (let i = 0; i < section.length; i++) {

            const handbookPointsArray = []
            const handbookRes2 = await getHandbookPointsSectionIdAPI(section[i].number)
            for (const points of handbookRes2.body.handbookPoints) {

                handbookPointsArray.push({
                    id : points.id,
                    text : points.text, 
                    num: points.number,
                })
            }

            newhandbookData.push({
                name : section[i].name,
                points : handbookPointsArray
            })
        }

        console.log("newhandbookData", newhandbookData)
        setdata(new_data);
        setHandbookData(newhandbookData)


    }



    useEffect(() => {
        getdata();
    }, [])

    const getPointDataHTML= async(handbookPoint) => {
        const res = await getHandbookPointsIdAPI(handbookPoint);
        sethandbookPointHTML(res.body.text)
        seteditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.body.text))))
        
        console.log(res.body.text);

    }

    useEffect(()=> {
        handbookPoint && getPointDataHTML(handbookPoint)
    }, [handbookPoint])


    return (
        <>

<Snackbar open={HandbooknewText} autoHideDuration={3000} onClose={() => { setHandbooknewText(false); }}>
                <Alert onClose={() => { setHandbooknewText(false); }} severity="error" sx={{ width: '100%' }}>
                    Please Write HandbookPoint to be updated!
                </Alert>
            </Snackbar>


            <Snackbar open={emptyHandbookPoint} autoHideDuration={3000} onClose={() => { setemptyHandbookPoint(false); }}>
                <Alert onClose={() => { setemptyHandbookPoint(false); }} severity="error" sx={{ width: '100%' }}>
                    Please Select HandbookPoint to be updated!
                </Alert>
            </Snackbar>

            <Snackbar open={HandbookPointUpdated} autoHideDuration={3000} onClose={() => { setHandbookPointUpdated(false); }}>
                <Alert onClose={() => { setHandbookPointUpdated(false); }} severity="success" sx={{ width: '100%' }}>
                    Handbook point Added. Please Publish the Changes.
                </Alert>
            </Snackbar>

            <Snackbar open={HandbookPublished} autoHideDuration={3000} onClose={() => { setHandbookPublished(false); }}>
                <Alert onClose={() => { setHandbookPublished(false); }} severity="success" sx={{ width: '100%' }}>
                    Handbook changes are published.
                </Alert>
            </Snackbar>


            <div className="up_hb_cont">
                <div className="col-sm-3 up_hb_menu left-pane">
                    <button className="btn btn-primary">Preview Handbook</button>
                    <button className="btn btn-primary" onClick={handlePublish}>Publish Handbook</button>
                    <h2>Senate Decisions</h2>
                    <ul className="list-group">
                        {
                            data?.map((val) => {
                                return <li data-active={agenda === val.num} onClick={handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_" + val.num}>{val.name}</li>
                            })
                        }
                    </ul>
                </div>



                <div className="col-sm-3 agenda-submenu center-pane">
                    {agenda !== 0 && <React.Fragment>
                        {/* <DropdownButton onSelect={(e) => console.log(e)} as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Delete Selected Agenda</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Finalise Agenda for Senate</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Rename Selected Agenda</Dropdown.Item>
                    </DropdownButton> */}

                        <h2>Agenda Points</h2></React.Fragment>}
                    {data?.map((val, id) => {
                        return (
                            agenda === val.num &&
                            <ul id={"agenda_" + id} className="list-group">
                                {val.points.map((det, id) => {
                                    return (
                                        det.has_subpoints ?
                                            (<Collapsible trigger={det.proposal}>
                                                {
                                                    det.subpoints.map((sp) => {
                                                        return (
                                                            <li data-active={point === sp.id} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.id}>Handbook Sub Point {sp.num}</li>
                                                        )
                                                    })
                                                }
                                            </Collapsible>)

                                            : <li data-active={point === det.id} onClick={(e) => {
                                                setpoint(Number(e.target.dataset.target.split("_").slice(-1)))
                                                setpointData(det);

                                                console.log("agenda, point", agenda, point)
                                                console.log("data", det)
                                            }} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.id}>{det.proposal}</li>

                                    )
                                })}

                            </ul>
                        )
                    })
                    }

                </div>




                <div className="col-sm-6 changes-data pt-5">

                    {
                        (point === 0 ? (agenda === 0 ?
                            <h5 className="placeholder-tile">Select senate point to edit the handbook</h5>
                            : (
                                <h5 className="placeholder-tile">Select senate point to edit the handbook</h5>
                            )
                        ) : (<div>


                            <form className="up_hb_form">
                            <FormControl fullWidth sx={{ margin: 0.5 }}>

                                <TextField 
                                    disabled
                                    id="outlined-disabled"
                                    label="Proposal"
                                    value={pointData.proposal}
                                /></FormControl>
                                <FormControl fullWidth sx={{ margin: 0.5 }}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Resolution"
                                    value={pointData.resolution}
                                />
                                </FormControl>
                                <div className="boxing-div">
                                


                                    {
                                        <FormControl sx={{ m: 0.5, minWidth: 120 }}>

                                            <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={handbookSection}
                                                label="Section"
                                                onChange={(e) => { sethandbookSection(e.target.value) }}
                                            >
                                               { HandbookData.map((det, id) => {
                                                return (
                                                    <MenuItem value={id+1}>{det.name}</MenuItem>
                                                )
                                                })}
                                            </Select>
                                        </FormControl>

                                    }
                                    {
                                        handbookSection && (
                                            <>
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>

                                                    <InputLabel id="demo-simple-select-label">Point</InputLabel><Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={handbookPoint}
                                                        label="Point"
                                                        onChange={(e) => { sethandbookPoint(e.target.value); }}
                                                    >
                                                        {
                                                            HandbookData[handbookSection-1].points.map((det) => {
                                                                return (
                                                                    <MenuItem value={det.id}>{parse(det.text)}</MenuItem>
                                                                )
                                                            })
                                                        }


                                                    </Select>
                                                </FormControl>


                                            </>

                                        )

                                    }
                                </div>


                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="wysiwyg-wrapper"
                                    editorClassName="wysiwyg"
                                    onEditorStateChange={(e) => {
                                        seteditorState(e);
                                        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                                    }}
                                />


                                <div className="boxing-div">
                                    <button className="btn btn-success" onClick={handleSubmit}>Create</button>
                                </div>
                            </form>










                        </div>))

                    }



                </div>







            </div>
        </>
    )


}

export default UpdateHandbook;