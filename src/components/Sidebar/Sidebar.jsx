import React from "react";
import { Drawer } from "antd";
import styled from "styled-components";

const DrawerContent = styled.div`
  padding: 16px; /* Ichki bo‘shliq */
  overflow-y: auto; /* Vertikal skroll */
  height: 100%; /* Drawerning balandligi */
  box-sizing: border-box;

  /* Mobil uchun to'liq ekran */
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1024px) {
    /* Kompyuter uchun markazda joylashgan bir qism */
    max-width: 50vw;
  }
`;

const DrawerMain = styled(Drawer)`
  .ant-drawer-content-wrapper {
    min-width: 320px !important;
    width: 100vw !important; /* Mobil uchun kenglik */
    max-width: 1920px;

    @media (min-width: 1024px) {
      width: 70vw !important; /* Kompyuter uchun kenglik */
    }
  }
`;

const Sidebar = ({
  isOpen,
  onClose,
  children,
  direction = "right",
  title = "Kategoriyalar",
}) => {
  return (
    <DrawerMain
      title={title}
      placement={direction}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
      }}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Mask uchun qora rang
      }}
    >
      <DrawerContent>{children}</DrawerContent>
    </DrawerMain>
  );
};

export default Sidebar;
