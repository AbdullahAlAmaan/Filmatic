import { Box, Flex, Heading, IconButton, Image, Link, Text, Tooltip } from "@chakra-ui/react";
import { RepeatIcon, StarIcon } from "@chakra-ui/icons";
import { imagePath } from "../Services/api";
import { useFirestore } from "../Services/firestore";
import { useAuth } from "../context/useAuth";

const WatchAgainCard = ({ item, onRemove }) => {
  const { removeFromWatchAgainList } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = async (event) => {
    event.preventDefault();
    if (user?.uid && item?.id) {
      try {
        await removeFromWatchAgainList(user.uid, item.id);
        
        onRemove(item.id); 
        setWatchAgainItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    }
  };

  return (
    <Link to={`/${item.type}/${item.id}`}>
      <Flex gap="4">
        <Box position="relative" w="150px">
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height="200px"
            minW="150px"
            objectFit="cover"
          />
          <Tooltip label="Remove from Watch Again">
            <IconButton
              aria-label="Remove from Watch Again"
              icon={<RepeatIcon />}
              size="sm"
              colorScheme="red"
              position="absolute"
              zIndex="999"
              top="2px"
              left="2px"
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box flex="1">
          <Heading fontSize="md" noOfLines={1}>
            {item.title}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt="2">
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </Text>
          <Flex alignItems="center" gap={2} mt="4">
            <StarIcon fontSize="small" />
            <Text textAlign="center" fontSize="small">
              {item.vote_average.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize="sm" noOfLines={5}>
            {item.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchAgainCard;
