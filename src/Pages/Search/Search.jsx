import { Container, Heading } from '@chakra-ui/react'
import React from 'react'

const Search = () => {
  return (
     
    <Container maxW={'container.xl'}>
      <Heading as={"h2"} fontFamily={"mono"} fontSize={"md"} textTransform={"uppercase"} fontWeight={"bold"}> Search </Heading>

    </Container>
    
  )
}

export default Search