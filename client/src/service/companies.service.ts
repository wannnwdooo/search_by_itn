import axios from "axios";
import { POSITION, useToast } from "vue-toastification";

const toast = useToast();
export const getCompanies = async (query: string) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/company/", {
      query: query,
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const error = await err.response.data.message;
      toast.error(error[0], {
        timeout: 5000,
        position: POSITION.BOTTOM_RIGHT,
      });
      throw new Error(error);
    }
  }
};
