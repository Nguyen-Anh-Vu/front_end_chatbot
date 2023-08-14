import instance from "./axios";


//collectionAPI là 1 object chứa tất cả đường dẫn API
const collectionAPI = {

    predict : (data,config) => {
        const url = "/predict";
        return instance.post(url,data,config);
    }
    ,
    addsearchmonitor : (data) => {
        const url = "/api/addsearchmonitor";
        return instance.post(url,data);
    }
    ,
    findallsearchmonitor : () => {
        const url = "/api/findallsearchmonitor";
        return instance.get(url);
    }
    ,
    login : (data) => {
        const url = "/login";
        return instance.post(url,data);
    }
    ,
    findUsernameExisted : (data) => {
        const url = "/api/findUsernameExisted";
        return instance.get(url,data);
    }
    ,
    addUser : (data) => {
        const url = "/api/addUser";
        return instance.post(url,data);
    }
}


export default collectionAPI;
