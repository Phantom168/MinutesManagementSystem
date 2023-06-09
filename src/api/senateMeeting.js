const API = 'http://127.0.0.1:8000/'


const getSenateMeetingAllAPI = async (token) => {
    try {
        const res = await fetch(`${API}senateMeeting/senateMeetings/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
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




const getSenatePointsAllAPI = async (token) => {
    try {
        const res = await fetch(`${API}senateMeeting/senatePoints/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
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



const getSenatePointsIdAPI = async (sectionID, token) => {
    try {
        const res = await fetch(`${API}senateMeeting/senatePoints/${sectionID}`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
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




const getSenatePointsMeetingIdAPI = async (senateNumber, token) => {
    try {
        const res = await fetch(`${API}senateMeeting/getSenatePointsByMeetingNumber/?senateMeeting=${senateNumber}`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
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

const addSenateMeetingAPI = async (number, announcement, token) => {
    try {
        let FD = new FormData();

        FD.append("announcement", announcement)
        FD.append("number", number)


        const res = await fetch(`${API}senateMeeting/senateMeetings/`, {
            method: "POST",
            headers: {
                'Authorization': `Token ${token}`
            },
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



const addSenatePointAPI = async (number, name, proposal, senateMeeting, token) => {
    try {
        let FD = new FormData();

        console.log("number", number, name, proposal, senateMeeting)
        FD.append("number", number)
        FD.append("proposal", proposal)
        FD.append("name", name)
        FD.append("senateMeeting", senateMeeting)

        console.log("FD", FD)

        const res = await fetch(`${API}senateMeeting/senatePoints/`, {
            method: "POST",
            body: FD,
            headers: {
                'Authorization': `Token ${token}`
            }
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


const putSenatePointAPI = async (id, number, senateMeeting, resolution, decision, token) => {
    try {
        let FD = new FormData();

        FD.append("resolution", resolution)
        FD.append("approved", decision - 1)
        FD.append("approvalComplete", 1)
        FD.append("number", number)
        FD.append("senateMeeting", senateMeeting)

        console.log("FD", FD)

        const res = await fetch(`${API}senateMeeting/senatePoints/${id}/`, {
            method: "PUT",
            body: FD,
            headers: {
                'Authorization': `Token ${token}`
            }
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



const deleteSenateAgendaAPI = async (number, token) => {
    try {
        const res = await fetch(`${API}senateMeeting/senateMeetings/${number}/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        const response = {
            status: res.status,
            body: '',
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};

const deleteSenatePointAPI = async (number, token) => {
    try {
        const res = await fetch(`${API}senateMeeting/senatePoints/${number}/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        const response = {
            status: res.status,
            body: '',
        };

        return response;
    } catch (error) {
        console.log(error);
    }
};


export {
    getSenateMeetingAllAPI,
    getSenatePointsAllAPI,
    getSenatePointsIdAPI,
    getSenatePointsMeetingIdAPI,
    addSenateMeetingAPI,
    addSenatePointAPI,
    putSenatePointAPI,
    deleteSenateAgendaAPI,
    deleteSenatePointAPI
};