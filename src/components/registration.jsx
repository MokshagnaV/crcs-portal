import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Flex,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import {
  formDataToJSON,
  getDistricts,
  getStates,
  getSectors,
} from "../services/getFormData";
import authServices from "../services/authServices";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Registration = (props) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getStates().then((data) => setStates(data));
  }, []);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // dispatch(loginActions.submit(formDataToJSON(data)));
    const regData = formDataToJSON(data);
    try {
      const user = await authServices.register(regData);
      dispatch(userActions.setUser(user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const stateChange = async (e) => {
    const state = e.currentTarget.value;
    const districts = await getDistricts(state);
    setDistricts(districts);
  };
  // getDistricts("Telangana");
  // getStates();
  return (
    <Flex flexDirection="column">
      <Container maxW="4xl">
        <Stack align="center">
          <Heading as="h1" size="s">
            MSCS : Ministry of Agriculture and Farmers' Welfare
          </Heading>
          <Text>Office of The Central Registrar of Cooperative Societies </Text>
          <Box bg="gray.300" py="1rem" width="100%" align="center">
            <Heading as="h1" size="l" color="black">
              User Registration Form
            </Heading>
          </Box>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing="1rem" m="1rem" wrap="wrap">
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Select State (Head Quater) :</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={stateChange}
                  name="state"
                >
                  {states.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Select District :</FormLabel>
                <Select placeholder="Select option" name="district">
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Stack m="1rem">
            <FormControl isRequired>
              <FormLabel>Select Type / Class of the Society :</FormLabel>
              <Select placeholder="Select option" name="type">
                {getSectors().map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack m="1rem">
            <FormControl isRequired>
              <FormLabel>Consumer Name :</FormLabel>
              <Input placeholder="Please Enter Name" name="name" />
            </FormControl>
          </Stack>
          <Stack m="1rem">
            <FormControl isRequired>
              <FormLabel>
                Complete Reistered Address (with PIN code):{" "}
              </FormLabel>
              <Textarea name="address" />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing="1rem" m="1rem">
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>PAN No. :</FormLabel>
                <Input placeholder="Please Enter PAN No." name="pan" />
              </FormControl>
            </Box>
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>TAN No. :</FormLabel>
                <Input placeholder="Please Enter TAN No." name="tan" />
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" spacing="1rem" m="1rem">
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>
                  Name of MD/Chairman/Vice Chairman/ Officers Authorized
                  (Select) :
                </FormLabel>
                <Input placeholder="Please Enter Name" name="name_of_md" />
              </FormControl>
            </Box>
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Designation :</FormLabel>
                <Select placeholder="Select option" name="designation">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" spacing="1rem" m="1rem">
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Mobile No. of Authorized Ofiicer</FormLabel>
                <Input placeholder="Please Enter Mobile No." name="mobile_no" />
              </FormControl>
            </Box>
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Email ID :</FormLabel>
                <Input
                  type="email"
                  placeholder="Please Enter Email ID"
                  name="email_id"
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack m="1rem">
            <Box>
              <FormControl isRequired>
                <FormLabel>Service Tax No. :</FormLabel>
                <Input
                  placeholder="Please Enter Serivce Tax No."
                  name="service_tax_no"
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" spacing="1rem" m="1rem">
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Password :</FormLabel>
                <Input
                  type="password"
                  placeholder="Please Enter Password"
                  name="password"
                />
              </FormControl>
            </Box>
            <Box flexGrow="1">
              <FormControl isRequired>
                <FormLabel>Confirm Password :</FormLabel>
                <Input
                  type="password"
                  placeholder="Please Enter Confirm Password"
                />
              </FormControl>
            </Box>
          </Stack>
          <Flex justify="center" m="1rem">
            <Button colorScheme="blue" w="10rem" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
        <Stack m="1rem">
          <Alert status="info">
            <AlertIcon />
            If you have not recieved OTP within 1 minute then press F5.
          </Alert>
        </Stack>
      </Container>
      <Box bg="blackAlpha.900" color="whiteAlpha.700">
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © CMS - Office of The Central Registrar of Cooperative Societies
          </Text>
          <Stack direction="row" spacing={6}></Stack>
        </Container>
      </Box>
    </Flex>
  );
};

export default Registration;
