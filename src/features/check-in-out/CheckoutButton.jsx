import { useCheckOut } from "./useCheckOut";

import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkout, isLoading } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
