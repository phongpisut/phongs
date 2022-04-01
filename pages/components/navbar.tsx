import { Flex, Box ,Button,useColorMode ,Spacer} from '@chakra-ui/react'
import { MoonIcon , SunIcon } from '@chakra-ui/icons'

export default function NavBar(){
    const {colorMode ,toggleColorMode} =useColorMode()

    return <Flex bg='blackAlpha.100' width={'100%'}>
        <Box/>
        <Spacer/>

    <Box p='2' >
    <Button onClick={toggleColorMode} rounded={'full'} height={'45'} width={'40'} backgroundColor={colorMode=='light'?'orange.300':'yellow.400'} color={'white'}>
        {
          colorMode === 'light' ? <p> Light Mode  <SunIcon/></p> :<p> Dark Mode  <MoonIcon/></p>
        }
      </Button>
    </Box>
  </Flex>
}