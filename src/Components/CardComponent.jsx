import { Box, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { imagePath } from "../Services/api"


const CardComponent = ({item}) => {
  return (
    <Link to="/">
      <Box>
        <Image src={`${imagePath}/${item?.poster_path}`}/>
      </Box>
    </Link>
  )
}

export default CardComponent