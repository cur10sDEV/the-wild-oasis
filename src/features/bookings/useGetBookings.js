import { useSearchParams } from "react-router-dom";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";

export const useGetBookings = () => {
  const queryClient = useQueryClient();
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

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  // pre-fetching - next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, nextPage],
      queryFn: () => getBookingsApi({ filter, sortBy, page: nextPage }),
    });
  }

  // pre-fetching - prev page
  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, prevPage],
      queryFn: () => getBookingsApi({ filter, sortBy, page: prevPage }),
    });
  }

  return { isLoading, bookings, error, count };
};
