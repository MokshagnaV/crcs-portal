import { Th, Thead, Tr } from "@chakra-ui/table";

const TableHead = (props) => {
  return (
    <Thead>
      <Tr>
        <Th>SNo</Th>
        <Th>Name of Society</Th>
        <Th>Sector Type</Th>
        <Th>Date of Registration</Th>
        <Th>State</Th>
        <Th>District</Th>
        <Th>Address</Th>
        <Th>Area of Operation</Th>
      </Tr>
    </Thead>
  );
};

export default TableHead;
