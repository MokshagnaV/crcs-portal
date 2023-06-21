import { Th, Thead, Tr } from "@chakra-ui/table";

const TableHead = ({ data }) => {
  return (
    <Thead>
      <Tr>
        {data.map((d) => (
          <Th key={d}>{d}</Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default TableHead;
