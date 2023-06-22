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
      {dataSet.length !== 0 &&
        dataSet[0].Address &&
        dataSet.map((d) => {
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
      {dataSet.length !== 0 &&
        dataSet[0]["Updated ON"] &&
        dataSet.map((d) => {
          return (
            <Tr key={d["S No"]} borderColor="gray.50">
              <Td>{d["S No"]}</Td>
              <Td>{d.Name}</Td>
              <Td>{d["State/UT"]}</Td>
              <Td>{d.Year}</Td>
              <Td>{d["Updated ON"]}</Td>
            </Tr>
          );
        })}
    </Tbody>
  );
};

export default TableBody;
