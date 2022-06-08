import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {DrawerCloseButton,IconButton,    Box,
    CloseButton,
    Flex,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Icon, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
    Grid,GridItem, Center, Container, Show, SimpleGrid, Heading
  } from '@chakra-ui/react'
  import {BsPersonCircle } from 'react-icons/bs'
  import { IoNotificationsCircleSharp, IoSettingsSharp } from 'react-icons/io5'

// import RouteAuthentication

// import RouteAuthentication from "../components/routeAuthModal";
import { autoLogout, getTokenExpirationTime, reset, tokenXp } from "../features/authSlice";
import AuthService from "../services/auth.service";
// import RouteModal,{RouteModalBody, RouteModalFooter, RouteModalHeader } from "../components/routeAuthModal";
import RouteModal, {RouteModalBody, RouteModalFooter,RouteModalHeader} from "../components/Modals/routeAuthModal";
import Modal from "../components/Modals/routeModal";
import '../pages/css/dashboard.css'

const Dashboard = () => {

    const [size, setSize] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const handleClick = (newSize) => {
      setSize(newSize)
      onOpen()
    }
  
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

    const {user, tokenExp } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const tokenExpire = AuthService.getTokenExpirationTime()


    useEffect(()=>{
        // console.log("Check  ", user)
        // if(tokenExp){
        //     navigate('/')
        // }
        // dispatch(getTokenExpirationTime())
        // dispatch(tokenXp())
        // dispatch(reset())

        onOpen()

    }, [user, tokenExp, dispatch, navigate])


    //Content for the message to be displayed to user with unauthorize access.
    const content = (
        <section>
            <p>Only Logged in users can access this page.</p>
            <Link to='/login' style={{textDecoration: 'none'}}>Goto Login Page</Link>
        </section>
     
    )

    return ( 
        <>
        {user ? (
          <Grid
            templateAreas={`"nav main"
                            "footer footer"`}
            gridTemplateRows={'1fr 50px'}
            gridTemplateColumns={'20% 1fr'}
            h='90vh'
            color='blackAlpha.700'
            fontWeight='bold'
          >
            <Show breakpoint="(min-width: 900px)">
            <GridItem pl='2' bg='whiteAlpha.500' area={'nav'} style={{borderRight: '2px solid gray', width: '100%'}} >
              <Box style={{position: 'fixed'}} >
                <Container centerContent>
                <h3 className='sidebar-header'> Dashboard </h3>
                <Box w='100%'>
                <Flex flexDirection='column' gap='30px' marginTop="20" >
                <Link to='/' >
                <Flex  _hover={{color: '#809A6F'}} flexDirection='row' alignItems='center' justifyContent='center' gap='10px'>
                    <BsPersonCircle />Profile 
                </Flex>
                </Link>
                <Link to='/' >
                <Flex _hover={{color: '#809A6F'}} ml='5' w='100%' flexDirection='row' alignItems='center' justifyContent='center' gap='10px'>
                    <IoNotificationsCircleSharp />Notifications
                </Flex>
                </Link > 
                <Link to='/' _hover={{color: 'red'}} >
                <Flex _hover={{color: '#809A6F'}} flexDirection='row' alignItems='center' justifyContent='center' gap='10px'>
                    <IoSettingsSharp />Settings
                </Flex>
                </Link>
                </Flex>
              </Box>
              </Container>
              </Box>
            </GridItem>
            </Show>
            <GridItem pl='2' bg='white.300' area={'main'}>
              <Heading size="2xl" mt="30px" textAlign="center">I Love This Design</Heading>
              <Box mt="50px" mb="5" mr="20px" ml="20px">
                <SimpleGrid minChildWidth="300px" spacing="20px" >
  
                  <Box className="grid_wrappers" bg="#E9D5CA" h="250px" borderRadius="10px" textAlign="center">
                  <Text className="badge_wrapper">Valentine</Text>
                  <Box className="badge_text_wrapper">
                    First Grid</Box>
                  </Box>
                  <Box className="grid_wrappers" bg="#827397" h="250px"  borderRadius="10px">Second Grid</Box>
                  <Box className="grid_wrappers" bg="#4D4C7D" h="250px"  borderRadius="10px">Third Grid</Box>
                  <Box className="grid_wrappers" bg="#363062" h="250px"  borderRadius="10px">Fourth Grid</Box>
                  <Box className="grid_wrappers" bg="#EC9B3B" h="250px"  borderRadius="10px">Fifth Grid</Box>
                </SimpleGrid>
              </Box>
            </GridItem>
            <GridItem pl='2' bg='#CA82FF' area={'footer'} h='20'>
              <Box style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '2rem' }}>
              <Center mt="3">
                <Text display="flex" justifyItems="center" alignItems="center">&copy; 2022 Barrondy World Inc.</Text>
              </Center>
              </Box>
            </GridItem>
          </Grid>
        ): (
          <Modal header="Unauthorized Action!" content={content} />
        )
}

        </>
     );
}
 
export default Dashboard;