import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { logoutUser, isLoading } = useLogout();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};
export default Logout;
