import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDataUser = () => {
  return useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const userResponse = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return userResponse.data.data.user;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
