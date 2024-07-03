import { Container, Flex, Grid, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { useEffect,useState } from 'react'
import { fetchTrending} from '../Services/api'
import CardComponent from '../Components/CardComponent'

const Home = () => {
  const [data,setData]=useState([])
  const [timeWindow,setTimeWindow]=useState('day')

  useEffect(() => {
    fetchTrending('day').then((res)=>{setData(res);}).catch((err)=>{console.log(err,'error')})
  }, [])
  
  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
      <Heading as={"h2"} fontFamily={"mono"} fontSize={"md"} textTransform={"uppercase"} fontWeight={"bold"}>
         Trending 
         </Heading>
         <Flex alignItems={"center"} gap={"2"} border={ "1px solid teal"} borderRadius={"20px"}>
          <Box as="button" px="3px" py="1" borderRadius={"20px"}>Today</Box>
          <Box as="button" px="3px" py="1" borderRadius={"20px"}>This Week</Box>
         </Flex>
         </Flex>
      <Grid templateColumns={{
          base: "1fr",
          sm:"repeat(2,1fr)",
          md:"repeat(4,1fr)",
          lg:"repeat(5,1fr)"
      }} gap={"4"}> 
        {data && data?.map((item)=>(
          <CardComponent key={item?.id} item={item}/>
          ))}

      </Grid>

    </Container>
    
  )
}

export default Home