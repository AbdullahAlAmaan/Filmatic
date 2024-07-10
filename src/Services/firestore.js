
  
  import { db } from "../Services/firebase";
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
  } from "firebase/firestore";
  import { useToast } from "@chakra-ui/react";
  import { useCallback } from "react";
  
  export const useFirestore = () => {
    const toast = useToast();
    const addDocument = async (collectionName, data) => {
      
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
    };
  
    const addToWatchlist = async (userId, dataId, data) => {
      try {
        if (await checkIfInWatchlist(userId, dataId)) {
          toast({
            title: "Error!",
            description: "This item is already in your wathclist.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return false;
        }
        await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
        toast({
          title: "Success!",
          description: "Added to watchlist",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        console.log(error, "Error adding document");
        toast({
          title: "Error!",
          description: "An error occurred.",
          status: "error",
          isClosable: true,
        });
      }
    };
  const getWatchAgainList = useCallback(async (userId) => {
    const querySnapshot = await getDocs(collection(db, "users", userId, "watchlist"));
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(item => item.vote_average && (item.vote_average * 10) > 70);
  }, []);
    const checkIfInWatchlist = async (userId, dataId) => {
      const docRef = doc(
        db,
        "users",
        userId?.toString(),
        "watchlist",
        dataId?.toString()
      );
  
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return true;
      } else {
        return false;
      }
    };
  
    const removeFromWatchlist = async (userId, dataId) => {
      try {
        await deleteDoc(
          doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
        );
        toast({
          title: "Success!",
          description: "Removed from watchlist",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error!",
          description: "An error occurred.",
          status: "error",
          isClosable: true,
        });
        console.log(error, "Error while deleting doc");
      }
    };
   
    
    const removeFromWatchAgainList = async (userId, itemId) => {
      try {
        const itemRef = doc(db, "users", userId, "watchagain", itemId.toString());
        await deleteDoc(itemRef);
        toast({
          title: "Item Removed",
          description: "The item has been successfully removed from Watch Again.",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        console.error("Error removing from Watch Again:", error);
        toast({
          title: "Error Removing Item",
          description: "Failed to remove the item from Watch Again. Please try again.",
          status: "error",
          isClosable: true,
        });
      }
    };
    
    
    
  
    const getWatchlist = useCallback(async (userId) => {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "watchlist")
      );
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      return data;
    }, []);
  
    return {
      addDocument,
      addToWatchlist,
      checkIfInWatchlist,
      removeFromWatchlist,
      removeFromWatchAgainList,
      getWatchlist,
      getWatchAgainList
    };
  };