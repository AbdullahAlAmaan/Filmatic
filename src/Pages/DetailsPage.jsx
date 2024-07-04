import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { fetchDetails, imagePath, imagePathOriginal } from "../Services/api";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
import { percentageFormatter, resolveRatingColor } from "../utils/helpers";

const DetailsPage = (item) => {
  const router = useParams();
  const { type, id } = router;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetchDetails(type, id)
      .then((res) => {
        console.log(res, "res");
        setDetails(res);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, id]);
  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }
  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;
  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88), url(${imagePathOriginal}/${details?.backdrop_path}))`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        py={"2"}
        display={"flex"}
        alignItems={"center"}
        zIndex={"-1"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}
                <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={"2"} color={"gray.400"} />
                  <Text fontSize={"sm"}>
                    {new Date(releaseDate).toLocaleDateString("bn-BD")}(BAN)
                  </Text>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={percentageFormatter(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {percentageFormatter(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  display={"none"}
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={"outline"}
                  onClick={() => {
                    console.log("Click");
                  }}
                >
                  In Watchlist
                </Button>
                <Button
                  display={"none"}
                  leftIcon={<SmallAddIcon />}
                  colorScheme="green"
                  variant={"outline"}
                  onClick={() => {
                    console.log("Click");
                  }}
                >
                  Add to watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontSize="sm"
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"} fontWeight={"bold"}>
                Overview
              </Heading>  
              <Text fontSize={"md"} mb={"3"}>{details?.overview}</Text>
              <Flex mt={"2"} gap={"2"}>
                {details?.genres?.map((genre)=>{
                  <Badge key={genre?.key}>{genre?.name}</Badge>
                })}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
