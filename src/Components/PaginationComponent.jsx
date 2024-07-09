import { Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import Proptypes from "prop-types";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my={"10"}>
        <Button
          onClick={() => {
            setActivePage(activePage - 1);
          }}
          isDisabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setActivePage(activePage + 1);
          }}
          isDisabled={activePage === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={"1"} ml={"3"} color={"gray.200"}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text> {totalPages} </Text>
      </Flex>
    </Flex>
  );
};
PaginationComponent.Proptypes = {
  activePage: Proptypes.number.isRequired,
  totalPages: Proptypes.number.isRequired,
  setActivePage: Proptypes.func.isRequired,
};

export default PaginationComponent;
