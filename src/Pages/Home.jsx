import { Container, Grid, Heading } from '@chakra-ui/react'
import React from 'react'
import { useEffect,useState } from 'react'
import { fetchTrending } from '../Services/api'

const Home = () => {
  const [data,setData]=useState([])

  useEffect(() => {
    fetchTrending('day').then((res)=>{setData(res);}).catch((err)=>{console.log(err,'error')})
  }, [])
  
  return (
    <>
    <Container maxW={'container.xl'}>
      <Heading as={"h2"} fontFamily={"mono"} fontSize={"md"} textTransform={"uppercase"} fontWeight={"bold"}> Trending </Heading>
      <Grid templateColumns={'repeat(5,1fr)'}>
        {data && data?.map((item)=>(<Image key={item.id}>

      </Grid>

    </Container>
    </>
  )
}

export default Home