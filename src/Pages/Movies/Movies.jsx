import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { fetchMovies } from "../../Services/api";
import CardComponent from "../../Components/CardComponent";
import PaginationComponent from "../../Components/PaginationComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  
  const selectBgColor = useColorModeValue("gray.900", "gray.900"); 
  const selectTextColor = useColorModeValue("white", "white"); 
  const optionBgColor = useColorModeValue("gray.200", "gray.200"); 

  return (
    <Container maxW="container.xl">
      <Flex align="center" gap="4" my="10">
        <Heading
          as="h2"
          fontFamily="mono"
          fontSize="lg"
          textTransform="uppercase"
          fontWeight="bold"
          color="white"
        >
          Discover Movies
        </Heading>
        <Select
          w="200px"
          placeholder="Sort by"
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
          color={selectTextColor}
          bg={selectBgColor}
          borderColor="gray.600"
          _hover={{ bg: "gray.800" }} 
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} 
          _active={{ bg: selectBgColor }} 
        >
          <option style={{ backgroundColor: optionBgColor, color: 'black' }} value="popularity.desc">
            Popular
          </option>
          <option style={{ backgroundColor: optionBgColor, color: 'black' }} value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(4,1fr)",
          lg: "repeat(5,1fr)",
        }}
        gap="4"
      >
        {movies &&
          movies.map((item, i) => isLoading ? (
            <Skeleton height={300} key={i} />
          ) : (
            <CardComponent key={item.id} item={item} type="movie" />
          ))}
      </Grid>
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
