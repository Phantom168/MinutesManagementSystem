const API = 'http://127.0.0.1:8000/'


const getHandbookSectionAPI = async (token) => {
    try {
        const res = await fetch(`${API}handbook/handbookSections/`, {
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

const deleteHandbookSectionAPI = async (number, token) => {
    try {
        const res = await fetch(`${API}handbook/handbookSections/${number}/`, {
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


const deleteHandbookPointAPI = async (number, token) => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints/${number}/`, {
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


const getHandbookallPointsAPI = async (token) => {
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

const getHandbookPointsSectionIdAPI = async (sectionNumber, token) => {
    try {
        const res = await fetch(`${API}handbook/getHandbookPointsBySectionNumber/?handbookSection=${sectionNumber}`, {
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


const getHandbookPointsIdAPI = async (id, token) => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints/${id}`, {
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



const addHandbookSectionAPI = async (handbookSection, text, number, token) => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints`, {
            method: "POST",
            headers: {
                // 'Authorization': token,
                Accept: "application/json",
                "Content-Type": "application/json",
                headers: {
                    'Authorization': `Token ${token}`
                }
            },
            body: JSON.stringify({ "handbookSection": handbookSection, "text": text, "number": number }),
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





export {
    getHandbookSectionAPI,
    deleteHandbookSectionAPI,
    deleteHandbookPointAPI,
    getHandbookallPointsAPI,
    getHandbookPointsSectionIdAPI,
    addHandbookSectionAPI,
    getHandbookPointsIdAPI
};