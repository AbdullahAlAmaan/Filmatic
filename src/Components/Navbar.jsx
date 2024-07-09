import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  return (
    <Box py="4" mb="2" color={"black"}>
      <Container maxW={"container.xl"} color={"black"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              Moviepedia
            </Box>
          </Link>
          <Flex color={"white"} gap={"4"} alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">Search</Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"small"}
                    name="code"
                  />
                </MenuButton>
                <MenuList>
                  <Link to={"/"}>
                    <MenuItem>Watchlist</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                    <MenuItem>Watch Again</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar size={"small"} bg={"gray.800"}/>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
