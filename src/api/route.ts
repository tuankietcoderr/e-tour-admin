import apiInstance from ".";

const getAllRoutes = async () => {
  try {
    const res = await apiInstance.get("/touristRoute");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const deleteRoute = async (id: string) => {
  try {
    const res = await apiInstance.delete(`/touristRoute/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { getAllRoutes, deleteRoute };
