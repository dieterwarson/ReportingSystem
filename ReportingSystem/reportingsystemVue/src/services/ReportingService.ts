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
    
    getAllReports (data: any) {
        return Api().get("/api/reports/all", data)
        .then(res => {
            return res.data;
        }) 
        .catch(error => {
            alert(error);
        });
    }
};