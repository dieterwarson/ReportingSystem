import Api from "@/services/api";

export default {
    addReport (data: any) {
        return Api().post("/addReport", data )
        .then(res => {
            return res.data;
        }) 
        .catch(error => {
            alert(error);
        });
        // return data;
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
