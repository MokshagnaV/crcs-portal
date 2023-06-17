import {
  Container,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  useColorMode,
  Avatar,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Dashboard = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((store) => store.user.token);
  return (
    <Container>
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

export default Dashboard;
