import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../Services/api";
import CardComponent from "../Components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading
        color={"white"}
          as={"h2"}
          fontFamily={"mono"}
          fontSize={"md"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
          color={"white"}
            as="button"
            px="3px"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`}
            onClick={() => {
              setTimeWindow("day");
            }}
          >
            Today
          </Box>
          <Box
          color={"white"}
            as="button"
            px="3px"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`}
            onClick={() => {
              setTimeWindow("week");
            }}
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      {/* {loading && <div> Loading ...</div>} */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(4,1fr)",
          lg: "repeat(5,1fr)",
        }}
        gap={"4"}
      >
        {data &&
          data?.map((item, i) => {
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            );
          })}
      </Grid>
    </Container>
  );
};

export default Home;
