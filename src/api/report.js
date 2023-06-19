import apiInstance from ".";

const viewApplicantReport = async () => {
  try {
    const res = await apiInstance.get("/report/application");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const viewCompanyReport = async () => {
  try {
    const res = await apiInstance.get("/report/company");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const viewRouteReport = async () => {
  try {
    const res = await apiInstance.get("/report/route");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { viewApplicantReport, viewCompanyReport, viewRouteReport };
