import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  TableContainer,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import dataSet from "../dummydataset.json";

const Socities = (props) => {
  return (
    <Box display="flex" flexDirection="column" maxH="100vh">
      <Heading>All Socities Here!</Heading>
      <TableContainer overflowY="scroll">
        <Table>
          <TableCaption>Data of Socities</TableCaption>
          <Thead>
            <Th>SNo</Th>
            <Th>Name of Society</Th>
            <Th>Sector Type</Th>
            <Th>Date of Registration</Th>
            <Th>State</Th>
            <Th>District</Th>
            <Th>Address</Th>
            <Th>Area of Operation</Th>
          </Thead>
          <Tbody>
            {dataSet.map((d) => {
              return (
                <Tr key={d.Sno}>
                  <Td isNumeric>{d.Sno}</Td>
                  <Td>{d["Name of Society"]}</Td>
                  <Td>{d["Sector Type"]}</Td>
                  <Td>{d["Date of Registration"]}</Td>
                  <Td>{d.State}</Td>
                  <Td>{d.District}</Td>
                  <Td>{d.Address}</Td>
                  <Td>{d["Area of Operation"]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Socities;
