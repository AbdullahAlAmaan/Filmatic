import { Container, Flex, Grid, Heading, Skeleton,Select } from "@chakra-ui/react";
  import React from "react";
  import {  fetchShows } from "../../Services/api";
  import CardComponent from "../../Components/CardComponent";
  import { useState,useEffect } from "react";
import PaginationComponent from "../../Components/PaginationComponent";

  const Shows = () => {
    const [shows, setShows] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("popularity.desc");

    useEffect(() => {
      setIsLoading(true);
      fetchShows(activePage,sortBy)
        .then((res) => {
          setShows(res?.results)
          setActivePage(res?.page)
          setTotalPages(res?.total_pages)
        })
        .catch((error) => {
          console.log(error, "error");
        })
        .finally(() => setIsLoading(false));
    }, [activePage]);

    return (
      <Container maxW={"container.xl"}>
        <Flex alignContent={"baseline"} gap={"4"} my={"10"}>
          <Heading
          as={"h2"}
          fontFamily={"mono"}
          fontSize={"md"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          color={"white"}
          mb={"5"}
        >
          {" "}
          Discover TV Shows{" "}
        </Heading>
        <Select
          w={"130px"}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
          color={"white"}
        >
          <option value="popularity.desc" color={"black"}>
            Popular
          </option>
          <option value="vote_average.desc&vote_count.gte=1000" color={"black"}>
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
            gap={"4"}
          >
            { shows && shows.map((item, i) => isLoading ? (<Skeleton height={300} key={i} /> ):(
              <CardComponent
                key={item.id}
                item={item}
                type={'show'}
              />
            ))}
          </Grid>
          <PaginationComponent activePage={activePage} totalPages={totalPages} setActivePage={setActivePage}/>
      </Container>
    );
  };

  export default Shows;