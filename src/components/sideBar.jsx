// import {
//   Heading,
//   List,
//   ListItem,
//   Button,
//   Avatar,
//   useColorMode,
// } from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

import {
  // Drawer,
  // DrawerBody,
  // DrawerHeader,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react-use-disclosure";
// import { HamburgerIcon } from "@chakra-ui/icons";
import NavBar from "./navBar";

const SideBar = (props) => {
  // const { colorMode, toggleColorMode } = useColorMode();
  // const user = useSelector((store) => store.user.token);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="nav">
        {/* <Button colorScheme="blue" onClick={onOpen}>
          <HamburgerIcon />
        </Button> */}
        <NavBar />
      </Box>
      {/* <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "light" ? "purple.200" : "purple.800"}>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            borderBottomColor={
              colorMode === "light" ? "purple.800" : "purple.200"
            }
          >
            <Heading>CRCS</Heading>
          </DrawerHeader>
          <DrawerBody>
            <Heading>
              <NavLink to="/" onClick={onClose}>
                Dashboard
              </NavLink>
            </Heading>
            <List>
              {!user && (
                <>
                  <ListItem>
                    <NavLink to="/login" onClick={onClose}>
                      {" "}
                      Login{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink to="/registration" onClick={onClose}>
                      {" "}
                      Registration{" "}
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink to="/socities" onClick={onClose}>
                      {" "}
                      Socities{" "}
                    </NavLink>
                  </ListItem>
                </>
              )}
              {user && (
                <>
                  <Avatar name={user} />
                  <ListItem>
                    <NavLink to={"/logout"}>Logout</NavLink>
                  </ListItem>
                </>
              )}
            </List>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </>
  );
};

export default SideBar;
