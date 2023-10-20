import { useSearchParams } from "react-router-dom";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export const useGetBookings = () => {
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", filterValue };
  // { field: "total_price", filterValue: 5000, method: "gte" };

  // sort
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookingsApi({ filter, sortBy }),
  });

  return { isLoading, bookings, error };
};
