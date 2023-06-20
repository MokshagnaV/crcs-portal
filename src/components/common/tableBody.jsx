import { Tbody, Td, Tr } from "@chakra-ui/table";

const TableBody = ({ dataSet }) => {
  return (
    <Tbody>
      {!dataSet.length && (
        <Tr>
          <Td colSpan="8" textAlign="center" fontStyle="oblique">
            No Socities
          </Td>
        </Tr>
      )}
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
  );
};

export default TableBody;
