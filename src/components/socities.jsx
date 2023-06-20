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
} from "@chakra-ui/react";
import {
  formDataToJSON,
  getDummyStates,
  getSectors,
} from "../services/getFormData";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import { useEffect, useState } from "react";
import {
  getData,
  socitiesCountAccToSector,
  socitiesCountAccToStates,
} from "../services/chartServices/dataService";

const Socities = (props) => {
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [dataset, setDataSet] = useState([]);
  const [filtering, setFiltering] = useState({});
  const [higheshCount, setHighestCount] = useState({
    sector: { name: "", count: "" },
    state: { name: "", count: "" },
  });
  useEffect(() => {
    setDataSet(getData());
    const higheshCount = {};
    const states = Object.entries(socitiesCountAccToStates()).sort(
      ([, a], [, b]) => b - a
    )[0];
    higheshCount.state = { name: states[0], count: states[1] };
    const sector = Object.entries(socitiesCountAccToSector()).sort(
      ([, a], [, b]) => b - a
    )[0];
    higheshCount.sector = { name: sector[0], count: sector[1] };
    setHighestCount(higheshCount);
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

  return (
    <Box>
      <Heading>
        {!Object.entries(filtering).length && <span>All socities</span>}
        {Object.entries(filtering).length !== 0 && (
          <span>
            All socities of {filtering.sectorFactor}, {filtering.stateFactor},{" "}
            {filtering.yearFactor}
          </span>
        )}
      </Heading>
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <GridItem
          colSpan="6"
          display="flex"
          padding="1rem"
          flexDir="row-reverse"
          gap="5rem"
        >
          <Card size="sm">
            <CardBody>
              <Heading size={"sm"}> {higheshCount.sector.name}</Heading>
              <Text>{higheshCount.sector.count}</Text>{" "}
              <Text> Most Registered Sector</Text>
            </CardBody>
          </Card>
          <Card size="sm">
            <CardBody>
              <Heading size={"sm"}> {higheshCount.state.name}</Heading>
              <Text>{higheshCount.state.count}</Text>{" "}
              <Text>State with Highest Socities</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem
          padding="1rem"
          display="flex"
          flexDir="column"
          justifyContent="space-around"
        >
          <form onChange={getFiltering}>
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
          </form>
        </GridItem>
        <GridItem colSpan="5">
          <TableContainer overflowY="scroll" maxH="70vh">
            <Table>
              <TableCaption>Data of Socities</TableCaption>
              <TableHead />
              <TableBody dataSet={getFilteredData()} />
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Socities;
