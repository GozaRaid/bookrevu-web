import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUpcomingBooks = () => {
  return useQuery({
    queryKey: ["recomendationbooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/api/books/upcoming");
      return booksResponse.data.data.books;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
