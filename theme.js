import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      
      body: {
        bg: "black", 
        color: "white", 
      },
      a: {
        color: "white", 
        _hover: {
          textDecoration: "underline",
          color:"gray.400"
        },
      },
    },
  },
});

export default theme;
