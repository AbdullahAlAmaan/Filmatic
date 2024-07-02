import { Container, Heading } from '@chakra-ui/react'
import React from 'react'

const Movies = () => {
  return (
    <>
    <Container maxW={'container.xl'}>
      <Heading as={"h2"} fontFamily={"mono"} fontSize={"md"} textTransform={"uppercase"} fontWeight={"bold"}> Discover Movies </Heading>

    </Container>
    </>
  )
}

export default Movies