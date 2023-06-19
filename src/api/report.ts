import apiInstance from ".";

const viewAllReport = async () => {
  try {
    const res = await apiInstance.get("/report");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const deleteReport = async (id) => {
  try {
    const res = await apiInstance.delete(`/report/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { viewAllReport, deleteReport };
