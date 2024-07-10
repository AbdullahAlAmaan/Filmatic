import { Flex } from "@chakra-ui/react"


export const percentageFormatter= (rating)=> {
  return (
    (rating*10)?.toFixed(0)
  )
}
export const resolveRatingColor= (rating)=>{
  if (rating>=7){
    return "green.400"
  }
  else if (rating>=5 ){
    return "orange.500"
  }
  else{
    return "red.400"
  }

}
export const minutesTohours = (minute) => {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours}h ${minutes}m`;
}
