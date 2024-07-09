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
  Text, // Make sure Text is imported correctly
  keyframes,
} from "@chakra-ui/react";
import {
  fetchDetails,
  fetchMovieCredits,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../Services/api";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon } from "@chakra-ui/icons";
import { percentageFormatter, resolveRatingColor } from "../utils/helpers";
import VideoComponent from "../Components/VideoComponent";
import { timeConverter } from "../utils/helpers";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchMovieCredits(type, id),
          fetchVideos(type, id),
        ]);
        setDetails(detailsData);
        setCredits(creditsData.cast.slice(0, 10)); // Assuming creditsData.cast exists and is an array
        setVideo(videosData.results.find((video) => video.type === "Trailer"));
        setVideos(
          videosData.results
            .filter((video) => video.type !== "Trailer")
            .slice(0, 10)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <Flex justify="center">
        <Spinner size="xl" color="red" />
      </Flex>
    );
  }

  const title = details.title || details.name;
  const releaseDate =
    type === "tv" ? details.first_air_date : details.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${imagePathOriginal}/${details.backdrop_path})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        w="100%"
        py="2"
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <Flex alignItems="center" gap="10">
            <Image
              height="450px"
              borderRadius="sm"
              src={`${imagePath}/${details.poster_path}`}
            />
            <Box>
              <Heading fontSize="3xl" color={"gray.200"}>
                {title}{" "}
                <Text as="span" fontWeight="normal" color="gray.200">
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              <Flex alignItems="center" gap="4" mt="1" mb="5">
                <CalendarIcon mr="2" color="gray.200" />
                <Text fontSize="sm" color={"gray.200"}>
                  {new Date(releaseDate).toLocaleDateString("en-US")}
                </Text>
              </Flex>
              {type==="movie" && (
                <>
                <Box>*</Box>
                <Flex alignItems={"center"}>
  <TimeIcon mr={"2"} color={"gray.200"}/>
  <Text fontSize={"small"} color={"gray.200"}>
    {details?.runtime ? timeConverter(details.runtime) : 'N/A'}
  </Text>
</Flex>

                </>
              )}

              <Flex alignItems={"center"} gap={"4"}>
              <CircularProgress
                value={percentageFormatter(details.vote_average * 10)}
                size="70px"
                color={resolveRatingColor(details.vote_average)}
                thickness="6px"
              >
                <CircularProgressLabel fontSize="sm" color={"gray.200"}>
                  {percentageFormatter(details?.vote_average * 10)} %
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontStyle="italic" my="5" color="gray.200">
                {details.tagline}
              </Text>
              <Heading fontSize="xl" mb="3" fontWeight="bold" color={"gray.200"}>
                Overview
              </Heading>
              <Text fontSize="md" mb="3" color={"gray.200"}>
                {details.overview} 
              </Text></Flex>
              <Flex mt="2" gap="2">
                {details.genres?.map((genre) => (
                  <Badge key={genre.id} p="1">
                    {genre.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" pb="10">
        <Heading as="h2" textTransform="uppercase" fontSize="md" mt="10">
          Cast
        </Heading>
        <Flex mt="5" mb="10" overflowX="scroll" gap="5">
          {credits.length === 0 ? (
            <Text>No cast found.</Text>
          ) : (
            credits.map((actor) => (
              <Box key={actor.id} minW="150px">
                <Image
                  src={`${imagePath}/${actor.profile_path}`}
                  alt={actor.name}
                  w={"100%"}
                  height={"225px"}
                  objectFit={"cover"}
                  borderRadius={"small"}
                />
                <Text fontSize="small" mt="2">
                  {actor.name}
                </Text>
              </Box>
            ))
          )}
        </Flex>
        <Heading as="h2" fontSize="md" textTransform="uppercase" mt="10" mb="5">
          Videos
        </Heading>
        {video && <VideoComponent id={video.key} />}
        <Flex mt="5" mb="10" overflowX="scroll" gap="5">
          {videos.map((item) => (
            <Box key={item.id} minW="290px">
              <VideoComponent id={item.key} small />
              <Text fontSize="small" fontWeight="bold" mt="2" noOfLines={2}>
                {item.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   Badge,
//   Box,
//   Button,
//   CircularProgress,
//   CircularProgressLabel,
//   Container,
//   Flex,
//   Heading,
//   Image,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
// import {
//   fetchDetails,
//   fetchMovieCredits,
//   fetchVideos,
//   imagePath,
//   imagePathOriginal,
// } from "../Services/api";
// import { percentageFormatter, resolveRatingColor } from "../utils/helpers";
// import VideoComponent from "../Components/VideoComponent";

// const DetailsPage = () => {
//   const { type, id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [details, setDetails] = useState({});
//   const [credits, setCredits] = useState([]);
//   const [video, setVideo] = useState(null);
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [detailsData, creditsData, videosData] = await Promise.all([
//           fetchDetails(type, id),
//           fetchMovieCredits(type, id),
//           fetchVideos(type, id),
//         ]);
//         setDetails(detailsData);
//         setCredits(creditsData.credits.slice(0, 10)); // Assuming creditsData.credits exists and is an array
//         setVideo(videosData.results.find((video) => video.type === "Trailer"));
//         setVideos(
//           videosData.results
//             .filter((video) => video.type !== "Trailer")
//             .slice(0, 10)
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [type, id]);

//   if (loading) {
//     return (
//       <Flex justify="center">
//         <Spinner size="xl" color="red" />
//       </Flex>
//     );
//   }

//   const title = details.title || details.name;
//   const releaseDate =
//     type === "tv" ? details.first_air_date : details.release_date;

//   return (
//     <Box>
//       <Box
//         background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${imagePathOriginal}/${details.backdrop_path})`}
//         backgroundRepeat="no-repeat"
//         backgroundSize="cover"
//         backgroundPosition="center"
//         w="100%"
//         py="2"
//         display="flex"
//         alignItems="center"
//       >
//         <Container maxW="container.xl">
//           <Flex alignItems="center" gap="10">
//             <Image
//               height="450px"
//               borderRadius="sm"
//               src={`${imagePath}/${details.poster_path}`}
//             />
//             <Box>
//               <Heading fontSize="3xl">
//                 {title}{" "}
//                 <Text as="span" fontWeight="normal" color="gray.200">
//                   {new Date(releaseDate).getFullYear()}
//                 </Text>
//               </Heading>
//               <Flex alignItems="center" gap="4" mt="1" mb="5">
//                 <CalendarIcon mr="2" color="gray.200" />
//                 <Text fontSize="sm">
//                   {new Date(releaseDate).toLocaleDateString("en-US")}
//                 </Text>
//               </Flex>
//               <CircularProgress
//                 value={percentageFormatter(details.vote_average * 10)}
//                 size="70px"
//                 color={resolveRatingColor(details.vote_average)}
//                 thickness="6px"
//               >
//                 <CircularProgressLabel fontSize="lg">
//                   {percentageFormatter(details.vote_average * 10)}%
//                 </CircularProgressLabel>
//               </CircularProgress>
//               <Text fontStyle="italic" my="5" color="gray.200">
//                 {details.tagline}
//               </Text>
//               <Heading fontSize="xl" mb="3" fontWeight="bold">
//                 Overview
//               </Heading>
//               <Text fontSize="md" mb="3">
//                 {details.overview}
//               </Text>
//               <Flex mt="2" gap="2">
//                 {details.genres?.map((genre) => (
//                   <Badge key={genre.id} p="1">
//                     {genre.name}
//                   </Badge>
//                 ))}
//               </Flex>
//             </Box>
//           </Flex>
//         </Container>
//       </Box>
//       <Container maxW="container.xl" pb="10">
//         <Heading as="h2" textTransform="uppercase" fontSize="md" mt="10">
//           credits
//         </Heading>
//         <Flex mt="5" mb="10" overflowX="scroll" gap="5">
//           {credits.length === 0 ? (
//             <Text>No credits found.</Text>
//           ) : (
//             credits.map((actor) => (
//               <Box key={actor.id} minW="150px">
//                 <Image
//                   src={`${imagePath}/${actor.profile_path}`}
//                   alt={actor.name}
//                 />
//                 <Text fontSize="small" mt="2">
//                   {actor.name}
//                 </Text>
//               </Box>
//             ))
//           )}
//         </Flex>
//         <Heading as="h2" fontSize="md" textTransform="uppercase" mt="10" mb="5">
//           Videos
//         </Heading>
//         {video && <VideoComponent id={video.key} />}
//         <Flex mt="5" mb="10" overflowX="scroll" gap="5">
//           {videos.map((item) => (
//             <Box key={item.id} minW="290px">
//               <VideoComponent id={item.key} small />
//               <Text fontSize="small" fontWeight="bold" mt="2" noOfLines={2}>
//                 {item.name}
//               </Text>
//             </Box>
//           ))}
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// export default DetailsPage;
