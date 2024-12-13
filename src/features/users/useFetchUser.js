import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["userall"],
    queryFn: async () => {
      const userResponse = await axiosInstance.get("/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userResponse.data.data;
    },
  });
};
