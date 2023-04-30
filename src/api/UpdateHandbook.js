const API = 'http://127.0.0.1:8000/'


const publishHandbookAPI = async (senateMeeting, token) => {
    try {
        let FD = new FormData();

        FD.append("senateMeeting", senateMeeting)


        const res = await fetch(`${API}senateMeeting/publishHandbook/`, {
            method: "POST",
            body: FD,
            headers: {
                'Authorization': `Token ${token}`
            }
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



const updateHandbookPointAPI = async (id, number, senateMeeting, handbookPoint, handbookPointNewText, token) => {
    try {
        let FD = new FormData();

        FD.append("handbookPoint", handbookPoint)
        FD.append("handbookPointNewText", handbookPointNewText)
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



const getHandbookPointsAPI = async (token) => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints/`, {
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




export {publishHandbookAPI, updateHandbookPointAPI, getHandbookPointsAPI}