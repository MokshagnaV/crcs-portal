import {
  Table,
  TableCaption,
  Box,
  TableContainer,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Text,
  Select,
  Heading,
  Divider,
  Flex,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  formDataToJSON,
  getDummyStates,
  getSectors,
} from "../services/getFormData";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import { useEffect, useRef, useState } from "react";
import {
  getData,
  societiesCountAccToSector,
  societiesCountAccToStates,
} from "../services/chartServices/dataService";
import { useReactToPrint } from "react-to-print";

const Societies = (props) => {
  const toast = useToast();
  const tableRef = useRef();
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [dataset, setDataSet] = useState([]);
  const [filtering, setFiltering] = useState({});
  const [highestCount, setHighestCount] = useState({
    sector: { name: "", count: "" },
    state: { name: "", count: "" },
  });
  useEffect(() => {
    setDataSet(getData());
    const highestCount = {};
    const states = Object.entries(societiesCountAccToStates()).sort(
      ([, a], [, b]) => b - a
    )[0];
    highestCount.state = { name: states[0], count: states[1] };
    const sector = Object.entries(societiesCountAccToSector()).sort(
      ([, a], [, b]) => b - a
    )[0];
    highestCount.sector = { name: sector[0], count: sector[1] };
    setHighestCount(highestCount);
  }, []);

  const getFiltering = (e) => {
    const formData = new FormData(e.currentTarget);
    setFiltering(formDataToJSON(formData));
  };

  const getFilteredData = () => {
    const filteredData = dataset.filter(
      (d) =>
        (d.State === filtering.stateFactor || !filtering.stateFactor) &&
        (d["Sector Type"] === filtering.sectorFactor ||
          !filtering.sectorFactor) &&
        (new Date(d["Date of Registration"]).getFullYear() ===
          parseInt(filtering.yearFactor) ||
          !filtering.yearFactor)
    );
    return filteredData;
  };

  // const handleReset = () => {
  //   console.log("Reset");
  // };

  const generatePdf = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Societies list",
    onAfterPrint: () =>
      toast({
        title: "PDF Download initiated",
        status: "success",
        isClosable: true,
        duration: 5000,
      }),
  });

  return (
    <Box>
      <Heading textAlign="center" margin="1rem">
        {!Object.entries(filtering).length && <span>Registered societies</span>}
        {Object.entries(filtering).length !== 0 && (
          <span>
            Registered societies of{" "}
            {filtering.sectorFactor && <span>{filtering.sectorFactor}, </span>}
            {filtering.stateFactor && <span>{filtering.stateFactor}, </span>}
            {filtering.yearFactor}
          </span>
        )}
      </Heading>
      <Divider />
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <GridItem colSpan="6">
          <Flex flexDir="row-reverse" p="1rem">
            <Card size="sm" flexGrow="1" m="1rem">
              <CardBody>
                <Heading size={"sm"}> {highestCount.sector.name}</Heading>
                <Text>{highestCount.sector.count}</Text>{" "}
                <Text fontStyle="italic"> Most Registered Sector</Text>
              </CardBody>
            </Card>
            <Card size="sm" flexGrow="1" m="1rem">
              <CardBody>
                <Heading size={"sm"}> {highestCount.state.name}</Heading>
                <Text>{highestCount.state.count}</Text>{" "}
                <Text fontStyle="italic">State with Highest Societies</Text>
              </CardBody>
            </Card>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem padding="1rem">
          <form onChange={getFiltering}>
            <Flex flexDir="column" gap="2rem">
              <Card size="sm">
                <CardHeader>Select State</CardHeader>
                <CardBody>
                  <Select name="stateFactor">
                    <option value=""> -- Select State --</option>
                    {getDummyStates().map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </CardBody>
              </Card>
              <Card size="sm">
                <CardHeader>Select Sector</CardHeader>
                <CardBody>
                  <Select name="sectorFactor">
                    <option value=""> -- Select Sector -- </option>
                    {getSectors().map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </CardBody>
              </Card>
              <Card size="sm">
                <CardHeader>Select year</CardHeader>
                <CardBody>
                  <Select name="yearFactor">
                    <option value=""> -- Select year -- </option>
                    {years.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </CardBody>
              </Card>
              <Button colorScheme="blue" onClick={generatePdf}>
                Download PDF
              </Button>
              {/* <Button colorScheme="blackAlpha" onClick={handleReset}>
                {" "}
                Reset
              </Button> */}
            </Flex>
          </form>
        </GridItem>
        <GridItem colSpan="5">
          <Card m="1rem">
            <TableContainer overflowY="scroll" maxH="70vh" m="1rem">
              <div ref={tableRef} style={{ width: "100%" }}>
                <Table variant="striped">
                  <TableCaption>Data of Societies</TableCaption>
                  <TableHead
                    data={[
                      "SNo",
                      "Name of Society",
                      "Sector Type",
                      "Date of Registration",
                      "State",
                      "District",
                      "Address",
                      "Area of Operation",
                    ]}
                  />
                  <TableBody dataSet={getFilteredData()} />
                </Table>
              </div>
            </TableContainer>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Societies;
