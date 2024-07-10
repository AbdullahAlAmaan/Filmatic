import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
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
    if (searchValue) { 
      setIsLoading(true);
      searchData(searchValue, activePage)
        .then((res) => {
          setData(res?.results || []);
          setActivePage(res?.page);
          setTotalPages(res?.total_pages);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setData([]); 
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (tempSearchValue.trim()) {
      setSearchValue(tempSearchValue.trim());
    }
  };
  

  return (
    <Container maxW="container.xl" bgColor="black">
      <Flex alignItems="baseline" gap="4" my="8">
        <Heading
          as="h2"
          fontFamily="mono"
          fontSize="md"
          textTransform="uppercase"
          fontWeight="bold"
          color="white"
        >
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <Input
          color="white"
          placeholder="Search Movies, TV Shows..."
          _placeholder={{ color: 'gray.500' }}
          value={tempSearchValue}
          type="text"
          mb="6"
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>
      {isLoading && (
        <Flex justifyContent="center" mt="10">
          <Spinner size="xl" color="red" />
        </Flex>
      )}
      {!isLoading && data.length === 0 && searchValue && (
        <Text
          textAlign="center"
          fontSize="md"
          mt="10"
          color="white"
        >
          No results found
        </Text>
      )}
      <Grid 
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="4"
      >
        {data.map((item, index) => (
          <CardComponent
            key={item.id || index}
            item={item}
            type={item.media_type}
          />
        ))}
      </Grid>
      {data.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
