const API = 'http://127.0.0.1:8000/'


const publishHandbookAPI = async (senateMeeting) => {
    try {
        const res = await fetch(`${API}senateMeeting/publishHandbook/`, {
            method: "POST",
            headers: {
                // 'Authorization': token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"senateMeeting" : senateMeeting}),
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





export {publishHandbookAPI}