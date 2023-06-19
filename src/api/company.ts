import apiInstance from ".";

const getAllCompanies = async () => {
  try {
    const res = await apiInstance.get("/company");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const banCompany = async (id: string) => {
  try {
    const res = await apiInstance.put(`/company/registration/${id}`, {
      isApproveToActive: false,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const unbanCompany = async (id: string) => {
  try {
    const res = await apiInstance.put(`/company/registration/${id}`, {
      isApproveToActive: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const deleteCompany = async (id: string) => {
  try {
    const res = await apiInstance.delete(`/company/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { getAllCompanies, banCompany, unbanCompany, deleteCompany };
