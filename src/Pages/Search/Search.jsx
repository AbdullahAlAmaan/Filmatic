import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { searchData } from "../../Services/api";
import CardComponent from "../../Components/CardComponent";
import PaginationComponent from "../../Components/PaginationComponent";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log(res);
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(setIsLoading(false));
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };
  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="8">
        <Heading
          color="white"
          as="h2"
          fontFamily="mono"
          fontSize="md"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <Input
          color={"white"}
          placeholder={" Search Movies, TV Shows..."}
          _placeholder={{ color: "gray.200" }}
          value={tempSearchValue}
          type="text"
          mb={"6"}
          onChange={(e) => {
            setTempSearchValue(e.target.value);
          }}
        />
      </form>
      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size="xl" color="red" />
        </Flex>
      )}
      {data.length === 0 && !isLoading && (
        <Heading
          as={"h3"}
          textAlign={"center"}
          fontSize={"small"}
          mt={"10"}
          color={"white"}
        >
          {" "}
          No results found
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(4,1fr)",
          lg: "repeat(5,1fr)",
        }}
        gap={"4"}
      >
        {data?.length > 0 &&
          !isLoading &&
          data.map((item, i) =>
            isLoading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                key={item.id}
                item={item}
                type={item?.media_type}
              />
            )
          )}
      </Grid>
      {data?.length>0 && !isLoading && (
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />)}
    </Container>
  );
};

export default Search;
