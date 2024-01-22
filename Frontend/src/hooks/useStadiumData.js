import { useQuery } from "@tanstack/react-query";
import { fetchStadiumData } from "../services/apiStadiumData.js";

export const useStadiumData = () => {
  return useQuery({
    queryKey: ["stadiumData"],
    queryFn: fetchStadiumData,
  });
};
