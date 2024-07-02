import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box py='4' mb='2'>
      <Container maxW={'container.xl'}>
        <Flex justifyContent={"space-between"}>
          <Link to='/'>
          <Box fontSize={"2xl"} fontWeight={"bold"} color={"red"} letterSpacing={"widest"} fontFamily={"mono"}>
            Moviepedia
          </Box>
          </Link>
          <Flex color={"white"} gap={"4"} alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies" >Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">Search</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar