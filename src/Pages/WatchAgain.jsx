import { useState, useEffect } from "react";
import { useFirestore } from "../Services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import WatchAgainCard from "../Components/WatchAgainCard";

const WatchAgain = () => {
  const { getWatchAgainList, removeFromWatchAgainList } = useFirestore();
  const { user } = useAuth();
  const [watchAgainItems, setWatchAgainItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      getWatchAgainList(user.uid)
        .then(data => {
          setWatchAgainItems(data);
        })
        .catch(error => {
          console.error("Error fetching Watch Again items:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchAgainList]);

  const handleRemoveItem = async (itemId) => {
    
    setWatchAgainItems(currentItems => currentItems.filter(item => item.id !== itemId));

    
    try {
      await removeFromWatchAgainList(user.uid, itemId);
    } catch (error) {
      console.error("Failed to remove item from Watch Again list:", error);
      
      setWatchAgainItems(prevItems => [...prevItems, { id: itemId }]);
    }
  };

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap="4" my="10">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Watch Again
        </Heading>
      </Flex>
      {isLoading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" color="red" />
        </Flex>
      ) : watchAgainItems.length === 0 ? (
        <Flex justify="center" align="center" h="60vh">
          <Text fontSize="md">No items to watch again</Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap="4"
        >
          {watchAgainItems.map(item => (
            <WatchAgainCard key={item.id} item={item} type={item.type} onRemove={handleRemoveItem} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchAgain;
