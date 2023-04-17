const API = 'http://127.0.0.1:8000/'


const getHandbookSectionAPI = async () => {
    try {
        const res = await fetch(`${API}handbook/handbookSections/`, {
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

const getHandbookallPointsAPI = async () => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints/`, {
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

const getHandbookPointsSectionIdAPI = async (sectionNumber) => {
    try {
        const res = await fetch(`${API}handbook/getHandbookPointsBySectionNumber/?handbookSection=${sectionNumber}`, {
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

const addHandbookSectionAPI = async (handbookSection, text, number) => {
    try {
        const res = await fetch(`${API}handbook/handbookPoints`, {
            method: "POST",
            headers: {
                // 'Authorization': token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "handbookSection": handbookSection, "text": text, "number" : number }),
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





export {getHandbookSectionAPI, getHandbookallPointsAPI,getHandbookPointsSectionIdAPI, addHandbookSectionAPI };