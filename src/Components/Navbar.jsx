import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("errr", error);
    }
  };

  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              FILMATIC
            </Box>
          </Link>

          
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <SearchIcon fontSize={"xl"} color={"teal.400"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList
            color="white"
            bg="gray.600"
            border="0" 
            boxShadow="md" 
            borderRadius="md"
            py="0" 
          >
           
            <MenuItem
              as={Link} to="/watchlist"
              bg="gray.900"
              _hover={{ bg: "gray.600" }} // 
            >
              Watchlist
            </MenuItem>
            <MenuItem
              as={Link} to="/watchagain"
              bg="gray.900"
              _hover={{ bg: "gray.600" }} // 
            >
              Watch Again
            </MenuItem>
            <MenuItem
              onClick={logout}
              bg="gray.900"
              _hover={{ bg: "gray.600" }} // 
            >
              Logout
            </MenuItem>
          </MenuList>
              </Menu>
            )}
            
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>

          
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar bg="red.500" size={"sm"} name={user?.email} />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist" textColor="black">
                          Watchlist
                        </Link>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          onClick={logout}
                          color={"black"}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
