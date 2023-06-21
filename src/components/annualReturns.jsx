import {
  Table,
  TableCaption,
  Box,
  TableContainer,
  Grid,
  GridItem,
  // Card,
  // CardHeader,
  // CardBody,
  // Text,
  // Select,
  Heading,
  Card,
} from "@chakra-ui/react";
// import {
//   formDataToJSON,
//   getDummyStates,
//   getSectors,
// } from "../services/getFormData";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import { useEffect, useState } from "react";
import {
  getAnnualReturnsData,
  // socitiesCountAccToSector,
  // socitiesCountAccToStates,
} from "../services/chartServices/dataService";

const AnnualReturns = (props) => {
  // const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [dataset, setDataSet] = useState([]);
  const [filtering] = useState({});
  // const [higheshCount, setHighestCount] = useState({
  //   sector: { name: "", count: "" },
  //   state: { name: "", count: "" },
  // });
  useEffect(() => {
    setDataSet(getAnnualReturnsData());
    // const higheshCount = {};
    // const states = Object.entries(socitiesCountAccToStates()).sort(
    //   ([, a], [, b]) => b - a
    // )[0];
    // higheshCount.state = { name: states[0], count: states[1] };
    // const sector = Object.entries(socitiesCountAccToSector()).sort(
    //   ([, a], [, b]) => b - a
    // )[0];
    // higheshCount.sector = { name: sector[0], count: sector[1] };
    // setHighestCount(higheshCount);
  }, []);

  // const getFiltering = (e) => {
  //   const formData = new FormData(e.currentTarget);
  //   setFiltering(formDataToJSON(formData));
  // };

  const getFilteredData = () => {
    // const filteredData = dataset.filter(
    //   (d) =>
    //     (d.State === filtering.stateFactor || !filtering.stateFactor) &&
    //     (d["Sector Type"] === filtering.sectorFactor ||
    //       !filtering.sectorFactor) &&
    //     (new Date(d["Date of Registration"]).getFullYear() ===
    //       parseInt(filtering.yearFactor) ||
    //       !filtering.yearFactor)
    // );
    console.log(dataset);
    return dataset.slice(0, 100);
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
        <GridItem colSpan="6">
          <Card m="1rem">
            <TableContainer overflowY="scroll" maxH="70vh" m="1rem">
              <Table>
                <TableCaption>Data of Socities</TableCaption>
                <TableHead
                  data={["S No", "Name", "State/UT", "Year", "Updated ON"]}
                />
                <TableBody dataSet={getFilteredData()} />
              </Table>
            </TableContainer>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AnnualReturns;
