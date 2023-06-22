import {
  Table,
  TableCaption,
  Box,
  TableContainer,
  Grid,
  GridItem,
  useToast,
  // Card,
  // CardHeader,
  // CardBody,
  // Text,
  // Select,
  Heading,
  Card,
  Button,
  Center,
} from "@chakra-ui/react";
// import {
//   formDataToJSON,
//   getDummyStates,
//   getSectors,
// } from "../services/getFormData";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import { useEffect, useRef, useState } from "react";
import {
  getAnnualReturnsData,
  // socitiesCountAccToSector,
  // socitiesCountAccToStates,
} from "../services/chartServices/dataService";
import { useReactToPrint } from "react-to-print";
const AnnualReturns = (props) => {
  // const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
  const toast = useToast();
  const tableRef = useRef();
  const [dataset, setDataSet] = useState([]);
  // const [filtering] = useState({});
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
    return dataset.slice(0, 100);
  };

  const generatePdf = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Annual returns",
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
        Annual returns
      </Heading>
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <GridItem colSpan="6">
          <Card m="1rem">
            <TableContainer overflowY="scroll" maxH="70vh" m="1rem">
              <div ref={tableRef} style={{ width: "100%" }}>
                <Table variant="striped">
                  <TableCaption>Data of Socities</TableCaption>
                  <TableHead
                    data={["S No", "Name", "State/UT", "Year", "Updated ON"]}
                  />
                  <TableBody dataSet={getFilteredData()} />
                </Table>
              </div>
            </TableContainer>
          </Card>
        </GridItem>
        <GridItem colSpan="6" padding="2rem">
          <Center>
            <Button colorScheme="blue" onClick={generatePdf}>
              Download PDF
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AnnualReturns;
