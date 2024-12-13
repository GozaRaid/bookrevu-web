import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDeleteProfilePicture = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("masuk");
        const response = await axiosInstance.delete("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
