import Api from "@/services/api";

export default {
addReport (data: any) {
    return Api().post("/addReport", data )
    .then(res => {
        alert(res);
    }) 
    .catch(error => {
        alert(error);
    });
    // return data;
}
};