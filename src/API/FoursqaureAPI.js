class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2";
    }

    static auth() {

        const client_id = "WIAYEQ3YO2K4K0FBTGAR4ZNOTKE4UKXSGF4HFM55G3TVG0M3";
        const client_secret = "GYC34VG1MCNM4VNLJ3BYNKUMJ1OWCNJIUICKGZ3A1WVPDN1A";
        const v = "20181128";

        return `client_id=${client_id}&client_secret=${client_secret}&v=${v}`;
    }

    static urlBuilder(urlParams) {

        
        return "near=Delhi,IN&query=coffee&limit=10"
    }

    static header() {
        return {
            Accept: "application/json"
        };
    }

    static check(response){
        if(response.ok){
            return response;
        }else{
            let err = new Error(response.statusText);
            err = response;
            throw err;
        }
    }

    static simpleFetch(endPoint, method, urlParams) {
        let requestData = {
            method,
            headers: Helper.header()
        };

        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
            requestData
        )
        .then(Helper.check)
        .then(res => res.json())
        .catch(err => {
            alert( 'An error occurred while trying to fetch data from Foursquare - Error Code of: ' +
            err.response)
        })

    }
}

class FoursqaureAPI {
    static search(urlParams) {
        return Helper.simpleFetch("/venues/search", "GET", urlParams)
    }
    static searchVenue(id){
        return Helper.simpleFetch(`/venues/${id}`,"GET")
    }

}

export default FoursqaureAPI;