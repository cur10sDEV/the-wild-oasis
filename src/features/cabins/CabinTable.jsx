import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import CabinRow from "./CabinRow";

import { useGetCabins } from "./useGetCabins";

import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins, error } = useGetCabins();

  const [searchParams] = useSearchParams();

  if (cabins && !cabins.length) return <Empty resourceName="bookings" />;

  if (error) toast.error(error.message);

  if (isLoading) return <Spinner />;

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};
export default CabinTable;
