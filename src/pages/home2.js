import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { getHandbookSectionAPI, getHandbookPointsSectionIdAPI, deleteHandbookSectionAPI } from '../api/handbook'
import '../style.css';

import { getSenatePointsIdAPI } from '../api/senateMeeting'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
var parse = require('html-react-parser');


export function PointHistory(props) {
    return (
        <div className="point_history_tile">
            <h5>Change in: {props.when}</h5>
            {parse(props.change)}
        </div>
    );
}


const Home = () => {
    const [data, setdata] = useState();
    const [agenda, setagenda] = useState(0);
    const [point, setpoint] = useState(0);


    const handleAgendaClick = (e) => {
        setagenda(Number(e.target.dataset.target.split("_").slice(-1)));
        setpoint(0);
    }


 

    const getdata = async () => {
        const response = await getHandbookSectionAPI();
        const section = response.body;
        const new_data = []


        for (let i = 0; i < section.length; i++) {
            const pointsArray = []
            const res2 = await getHandbookPointsSectionIdAPI(section[i].number)
            for (const points of res2.body.handbookPoints) {
                const changes = []
                const versionHistory = points.versionHistory;
                if (versionHistory.length === 0) {
                    changes.push({
                        when: "Original Point",
                        change: points.text
                    })
                }
                for (const version of versionHistory) {
                    const version_data = await getSenatePointsIdAPI(version);
                    changes.push({
                        when: `${version_data.body.senateMeeting} Senate Meeting`,
                        change: version_data.body.handbookPointNewText
                    })
                }
                pointsArray.push({
                    num: points.number,
                    changes: changes
                })
            }

            new_data.push({
                num: section[i].number,
                name: section[i].name,
                points: pointsArray

            })


        };


        console.log(new_data);
        setdata(new_data)

    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <>




            <div className="agenda-cont">
                <div className="col-sm-3 agenda-menu left-pane">
                    <h2>Agendas</h2>
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
                                                            <li data-active={point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.num}>Handbook Sub Point {sp.num}</li>
                                                        )
                                                    })
                                                }
                                            </Collapsible>)

                                            : <li data-active={point === det.num} onClick={(e) => {
                                                setpoint(Number(e.target.dataset.target.split("_").slice(-1)))
                                                console.log("agenda, point", agenda, point)
                                                console.log("data", det)
                                            }} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.num}>{det.proposal}</li>

                                    )
                                })}

                            </ul>
                        )
                    })
                    }

                </div>




                <div className="col-sm-6 changes-data pt-5">
                    




                </div>







            </div>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header CloseButton>
                    <Modal.Title>Crate Agenda</Modal.Title>
                {/* <CloseButton/> */}
                {/* </Modal.Header>
                <Modal.Body>
                    <form>
                        <label for="cr_ag_name" class="form-label">Agenda Name</label>
                        <input type="text" class="form-control" id="cr_ag_name" placeholder="Enter the Agenda Name"></input>

                        <label for="cr_ag_ann" class="form-label">Announcement</label>
                        <input type="textarea" active="false" class="form-control" id="cr_ag_ann" placeholder="Enter the Announcement"></input>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Create
                </Button>
                </Modal.Footer> */}
            {/* </Modal> */} 
        </>
    )


}

export default Home;