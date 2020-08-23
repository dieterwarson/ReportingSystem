import Api from '@/services/api';

export default {
  getFile(data: any) {
    return Api()
      .post('api/reports/getFile', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addUser(data: any) {
    return Api()
      .post('api/users/addUser', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changePassword(data: any) {
    return Api()
      .post('api/users/changePassword', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeAcces(data: any) {
    return Api()
      .post('api/users/changeAcces', data)
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
  getPaginationReports(offset: number, dateRange: any) {
    return Api()
      .post("api/reports/all", { offset: offset, dateRange: dateRange })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  getFilteredEvents(data: any, id: number) {
    return Api()
      .post("api/reports/getTypeEvents/" + id, data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  getReportCount(dateRange: any) {
    return Api()
      .post("api/reports/count", dateRange)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addOperationalEvent(data: any) {
    return Api()
      .post('api/reports/addOperationalEvent', data)
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
      .post('api/reports/addSecretaryNotification', data)
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
      .post('api/reports/addWorkPlaceEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addDefect(data: any) {
    return Api()
      .post('api/reports/addDefect', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  addMalfunction(data: any) {
    return Api()
      .post('api/reports/addMalfunction', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeOperationalEvent(data: any) {
    return Api()
      .post('api/reports/changeOperationalEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeWorkplaceEvent(data: any) {
    return Api()
      .post('api/reports/changeWorkplaceEvent', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeSecretariatNotification(data: any) {
    return Api()
      .post('/api/reports/changeSecretariatNotification', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeDefect(data: any) {
    return Api()
      .post('api/reports/changeDefect', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  changeMalfunction(data: any) {
    return Api()
      .post('api/reports/changeMalfunction', data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  loginUser(data: any) {
    return Api()
      .post('api/users/loginUser', data)
      .then(res => {
        window.localStorage.setItem("token", res.data.token);
        window.location.href = res.data.redirect;
        return;
      })
      .catch(error => {
        return error.response.data;
      });
  },
  changeSubscription(data: any) {
    return Api()
      .post("api/users/changeSubscription", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  autoCompletePlNumber(data: any) {
    return Api()
      .post("api/reports/getPlNumberReports", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  autoCompleteAddOperationalEvent(data: any) {
    return Api()
      .post("api/reports/getDummyEvents", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  autoCompleteKeyword(data: any) {
    return Api()
      .post("api/reports/getKeywordReports", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  deleteUser(data: any) {
    return Api()
      .post("api/users/deleteUser", data)
      .then(res => {
        window.location.href = "/userlist";
      })
      .catch(error => {
        alert(error);
      })
  },
  addTypes(data: any) {
    return Api()
      .post("api/reports/addTypes", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  logoutUser(data: any) {
    return Api()
      .post('api/users/logoutUser', data)
      .then(res => {
        window.location.href = "/login";
        window.localStorage.setItem("token", "");
      })
  },
  checkAuthentication() {
    return Api()
      .post('api/users/checkAuthentication', { token: window.localStorage.getItem('token') })
      .then(res => {
        return res.data.check;
      });
  },

  getSearchReports(data: any) {
    return Api()
      .post("api/reports/search", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      });
  },
  getSearchPlReports(data: any) {
    return Api()
      .post("api/reports/pl", data)
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
  getPDF() {
    return Api()
      .get("api/statistics/downloadPDF", {responseType: 'blob'})
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
  getUserStatistics(data: any) {
    return Api()
      .post("api/statistics/getUserStatistics", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  removeNotification(data: any) {
    return Api()
      .post("api/reports/removeNotification", data)
      .then(res => {
        return res.data;
      })
  },
  autosaveOperational(data: any) {
    return Api()
      .post("api/reports/autoSaveOperational", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  getAutosavedOperational(data: any) {
    return Api()
    .post('api/reports/getAutoSavedFile', data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  addCustomFiche(data: any) {
    return Api()
    .post('api/reports/newCustomFiche', data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  getCustomFiche() {
    return Api()
    .post('api/reports/getCustomFiche')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  addCustomEvent(data: any) {
    return Api()
    .post('api/reports/addCustomEvent', data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  getAllCustomEvents(){
    return Api()
    .post('api/reports/getAllCustomEvents')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      alert(error);
    })
  },
  getFiltered(data: any) {
    return Api()
      .post("api/reports/getFiltered", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  getSearchFiltered(data: any) {
    return Api()
      .post("api/reports/getSearchFiltered", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  getSearchPlFiltered(data: any) {
    return Api()
      .post("api/reports/getSearchPlFiltered", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  filterDate(data: any) {
    return Api()
      .post("api/reports/filterDate", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  filterPlDate(data: any) {
    return Api()
      .post("api/reports/filterPlDate", data)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        alert(error);
      })
  },
  latestReportId() {
    return Api()
    .post('api/reports/latestReport')
    .then(res => {
      return res.data.id;
    })
    .catch(error => {
      alert(error);
    })
  }
};
