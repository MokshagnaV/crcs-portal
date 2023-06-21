import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Heading: {
      defaultProps: {
        textAlign: "center",
      },
    },
  },
});

export default theme;
