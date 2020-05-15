import Api from '@/services/api';
import axios from "axios";

export default {
  getFile(data: any) {
    return Api()
      .post('/getFile', data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  addReport(data: any) {
    return Api()
      .post('/addOperationalEvent', data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  addUser(data: any) {
    return Api()
      .post('/addUser', data)
      .then(res => {
        return res;
      })
      .catch( error => {
        alert(error);
      });
  },
  changePassword(data: any) {
    return Api()
      .post('/changePassword', data)
      .then( res => {
        return res;
      })
      .catch(error=> {
        alert(error);
      });
  },
  changeAcces(data: any) {
    return Api()
      .post('/changeAcces', data)
      .then(res => {
        return res;
      })
      .catch(error => {
        alert(error);
      });
  },
  addField(data: any) {
    return Api()
      .post('/addField', data)
      .then(res => {
        return res;
      })
      .catch(error => {
        alert(error);
      });
  },
  getAllReports(url: string) {
    return Api()
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  getAllUsers(url: string) {
    return Api()
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    });
  },
  addWorkForceEvent(data: any) {
    return Api()
      .post('/addWorkForceEvent', data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  addTechnicalEvent(data: any) {
    return Api()
      .post('/addTechnicalEvent', data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  loginUser(data: any) {
    return Api()
      .post('/loginUser', data)
      .then(res => {
        window.localStorage.setItem("token",res.data.token);
        window.location = res.data.redirect;
        return;
      })
      .catch(error => {
        alert(error);
      });
  },
  changeSubscription(data: any) {
    return Api()
    .post("/changeSubscription", data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  autoCompleteOperationalEvent(data: any) {
    return Api()
    .post("/getOperationalEvents", data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  getSearchReports(url: string) {
    return Api()
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
};
