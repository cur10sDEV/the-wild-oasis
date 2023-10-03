import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppConatiner = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const AppLayout = () => {
  return (
    <StyledAppConatiner>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppConatiner>
  );
};
export default AppLayout;
