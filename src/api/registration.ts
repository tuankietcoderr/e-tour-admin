import IReport from "@/schema/report";
import apiInstance from ".";

const getAllRegistration = async () => {
  try {
    const res = await apiInstance.get("/company/registration");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const updateRegistration = async ({
  isApproveToActive,
  id,
}: {
  isApproveToActive: boolean;
  id: string;
}) => {
  try {
    const res = await apiInstance.put(`/company/registration/${id}`, {
      isApproveToActive,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { getAllRegistration, updateRegistration };
