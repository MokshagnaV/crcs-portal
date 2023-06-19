import {
  Container,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Avatar,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((store) => store.user.token);
  return (
    <Container
      as="aside"
      minH={{ md: "100vh" }}
      bg={colorMode === "light" ? "purple.200" : "purple.800"}
    >
      <Heading>Dashboard</Heading>
      <List>
        {!user && (
          <>
            <ListItem>
              <NavLink to={"/login"}> Login </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/registration"}> Registration </NavLink>
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
      <Text />
    </Container>
  );
};

export default SideBar;
