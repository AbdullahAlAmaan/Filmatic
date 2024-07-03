import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.800")(props), // Using predefined Chakra UI color tokens
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
