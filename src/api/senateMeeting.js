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
        const res = await fetch(`${API}senateMeeting/senateMeetings/`, {
            method: "POST",
            headers: {
                // 'Authorization': token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "number": number, "announcement" : announcement }),
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



const addSenatePointAPI = async (number, proposal, resolution, senateMeeting) => {
    try {
        let FD = new FormData();

        console.log("number", number, proposal, resolution, senateMeeting)
        FD.append("number", number)
        FD.append("proposal", proposal)
        FD.append("resolution", resolution)
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





export {getSenateMeetingAllAPI, getSenatePointsAllAPI, getSenatePointsIdAPI, getSenatePointsMeetingIdAPI, addSenateMeetingAPI, addSenatePointAPI};