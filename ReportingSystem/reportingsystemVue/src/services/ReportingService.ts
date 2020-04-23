import Api from "@/services/api";

export default {
getFile (data: any) {
    return Api().post("/getFile", data )
    .then(res => {
        return res.data;
    }) 
    .catch(error => {
        alert(error);
    });
},
addReport(data: any) {
    return Api().post("/addReport", data)
    .then(res => {
        return res;
    })
    .catch(error => {
        alert(error);
    })
},
addUser(data: any) {
    return Api().post("/addUser", data)
    .then(res => {
        return res;
    })
    .catch(error => {
        alert(error);
    })
},
changePassword(data: any) {
    return Api().post("/changePassword", data)
    .then(res => {
        return res;
    })
    .catch(error => {
        alert(error);
    })
},
changeAcces(data: any) {
    return Api().post("/changeAcces", data)
    .then(res => {
        return res;
    })
    .catch(error => {
        alert(error);
    })
},
addField(data: any) {
    return Api().post("/addField", data)
    .then(res => {
        return res;
    })
    .catch(error => {
        alert(error);
    })
},
    getAllReports (url:string) {
        return Api().get(url)
        .then(res => {
            return res.data;
        }) 
        .catch(error => {
            alert(error);
        });
    }
};
