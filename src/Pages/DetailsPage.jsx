import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { fetchDetails } from "../Services/api";

const DetailsPage = (item) => {
  const router = useParams();
  const { type, id } = router;
  const [loading, setLoading] = useState(true);
  const [details,setDetails]=useState({})
  useEffect(() => {
    fetchDetails(type, id)
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, id]);
  if (loading){
    return(
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red"/>

      </Flex>
    )
    
  }
  return (
    <Box>
      <Box>
        <Container>
          
        </Container>
      </Box>
    </Box>
  )
};

export default DetailsPage;
