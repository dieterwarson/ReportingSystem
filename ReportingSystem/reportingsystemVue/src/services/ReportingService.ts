import Api from '@/services/api';

export default {
  getFile(data: any) {
    return Api()
      .post('/getFile', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addUser(data: any) {
    return Api()
      .post('/addUser', data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changePassword(data: any) {
    return Api()
      .post('/changePassword', data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeAcces(data: any) {
    return Api()
      .post('/changeAcces', data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addField(data: any) {
    return Api()
      .post('/addField', data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  },
  getAllReports(url: string) {
    return Api()
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addOperationalEvent(data: any) {
    return Api()
      .post('/addOperationalEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
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
  addSecretaryNotification(data: any) {
    return Api()
    .post('/addSecretaryNotification', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      alert(error);
    })
  },
  getAccessRoleData() {
    return Api()
    .get('api/permissions/all')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  updateAccessRoleData(data: any) {
    return Api()
    .post('api/permissions/update', data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  addWorkForceEvent(data: any) {
    return Api()
      .post('/addWorkForceEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addDefect(data: any) {
    return Api()
      .post('/addDefect', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addMalfunction(data: any) {
    return Api()
      .post('/addMalfunction', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeOperationalEvent(data: any) {
    return Api()
      .post('/changeOperationalEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeWorkplaceEvent(data: any) {
    return Api()
      .post('/changeWorkplaceEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeSecretariatNotification(data: any) {
    return Api()
      .post('/changeSecretariatNotification', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeDefect(data: any) {
    return Api()
      .post('/changeDefect', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeMalfunction(data: any) {
    return Api()
      .post('/changeMalfunction', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  loginUser(data: any) {
    return Api()
      .post('/loginUser', data)
      .then(res => {
        window.localStorage.setItem("token",res.data.token);
        window.location.href = res.data.redirect;
        return;
      })
      .catch(error => {
        return error.response.data;
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
  deleteUser(data: any) {
    return Api()
    .post("/deleteUser", data)
    .then(res => {
      window.location.href = "/userlist";
    })
    .catch(error => {
      alert(error);
    })
  },
  addTypes(data: any) {
    return Api()
    .post("/addTypes", data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  logoutUser(data: any) {
    return Api()
    .post('/logoutUser', data)
    .then(res => {
      window.location.href= "/login";
      window.localStorage.setItem("token", "");
    })
  },
  checkAuthentication(){
    return Api()
    .post('/checkAuthentication', {token: window.localStorage.getItem('token')})
    .then(res => {
      return res.data.check;
    });
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
  getReportEvent(url: string) {
    return Api()
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  getEventType(url: string) {
    return Api()
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  getStatistics(data: any) {
    return Api()
    .post("api/statistics/getStatistics", data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
};
