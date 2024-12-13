import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePostAdmin = () => {
  return useMutation({
    mutationFn: async (id) => {
      console.log(id);
      const response = await axiosInstance.post("/users/admin", id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    },
  });
};
