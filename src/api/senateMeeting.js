const API = 'http://127.0.0.1:8000/'


const getSenateMeetingAllAPI = async () => {
    try {
        const res = await fetch(`${API}senateMeeting/senateMeetings/`, {
            method: "GET",
            // headers: {
            //     'Authorization': token
            // }
        });
        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};




const getSenatePointsAllAPI = async () => {
    try {
        const res = await fetch(`${API}senateMeeting/senatePoints/`, {
            method: "GET",
            // headers: {
            //     'Authorization': token
            // }
        });
        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};



const getSenatePointsIdAPI = async (sectionID) => {
    try {
        const res = await fetch(`${API}senateMeeting/senatePoints/${sectionID}`, {
            method: "GET",
            // headers: {
            //     'Authorization': token
            // }
        });
        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};




const getSenatePointsMeetingIdAPI = async (senateNumber) => {
    try {
        const res = await fetch(`${API}senateMeeting/getSenatePointsByMeetingNumber/?senateMeeting=${senateNumber}`, {
            method: "GET",
            // headers: {
            //     'Authorization': token
            // }
        });
        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};

const addSenateMeetingAPI = async (number, announcement) => {
    try {
        let FD = new FormData();

        FD.append("announcement", announcement)
        FD.append("number", number)


        const res = await fetch(`${API}senateMeeting/senateMeetings/`, {
            method: "POST",
            body: FD
        });

        //   create a map of the status and body of the response
        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};



const addSenatePointAPI = async (number, name, proposal, senateMeeting) => {
    try {
        let FD = new FormData();

        console.log("number", number, name,  proposal, senateMeeting)
        FD.append("number", number)
        FD.append("proposal", proposal)
        FD.append("name", name)
        FD.append("senateMeeting", senateMeeting)

        console.log("FD", FD)

        const res = await fetch(`${API}senateMeeting/senatePoints/`, {
            method: "POST",
            body: FD
        });

        if (!res.ok) {
            throw new Error(`Failed to add senate point: ${res.status}`);
        }

        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
        return { status: 500, body: { error: error.message } };
    }
};


const putSenatePointAPI = async (id, number, senateMeeting, resolution, decision) => {
    try {
        let FD = new FormData();

        FD.append("resolution", resolution)
        FD.append("approved", decision-1)
        FD.append("approvalComplete", 0)
        FD.append("number", number)
        FD.append("senateMeeting", senateMeeting)

        console.log("FD", FD)

        const res = await fetch(`${API}senateMeeting/senatePoints/${id}/`, {
            method: "PUT",
            body: FD
        });

        if (!res.ok) {
            throw new Error(`Failed to put senate point: ${res.status}`);
        }

        const response = {
            status: res.status,
            body: await res.json(),
        };

        return response;
    } catch (error) {
        console.log(error);
        return { status: 500, body: { error: error.message } };
    }
};









export {getSenateMeetingAllAPI, getSenatePointsAllAPI, getSenatePointsIdAPI, getSenatePointsMeetingIdAPI, addSenateMeetingAPI, addSenatePointAPI, putSenatePointAPI};