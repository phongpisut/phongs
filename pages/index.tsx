import Head from "next/head";
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css";
import clientPromise from "../utils/mongodb";
import {
  useColorMode,
  Image,
  Box,
  SlideFade,
  Center,
  useDisclosure,
  Button,
  Divider,
  useToast ,
  IconButton 
} from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons'
import React, { useCallback} from "react";
import NavBar from "./components/navbar";
import useWindowSize from "../hooks/useWindowSize";
import Confetti from "react-confetti";
import CongrateModal from "./components/congrateModal";
import DetailModal from "./components/detailModal";
import images from "../assets/images";

type Props = {
  isConnected: boolean;
  userlist?: [{ name?: string; desc?: string; img?: string }];
};

const Home = ({ isConnected, userlist }: Props) => {
  const { colorMode } = useColorMode();
  const { windowSize } = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen : isOpen2, onOpen :onOpen2, onClose :onClose2} = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const onPost = useCallback(async (rawData)=>{

 try{
  const response = await fetch('api/post',{
    method: 'POST',
    body:JSON.stringify(rawData)
  })
  const data = await response.json()
  if(data){
    toast({
      title: `ส่งข้อความเรียบร้อย`,
      status: 'success',
      isClosable: true,
    })
    onClose()
    router.replace(router.asPath);
  }
 }catch(err){
  toast({
    title: `กรุณาลองอีกครั้ง`,
    description:`${err}`,
    status: 'error',
    isClosable: true,
  })
 }

  
  },[toast,onClose,router])
  


  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Congrate me!</title>
          <meta name="description" content="Congrate me!" />
          <link rel="icon" href="/me.ico" />
        </Head>
        <main className={styles.main}>
          {windowSize.width && (
            <Confetti
              numberOfPieces={50}
              width={windowSize.width}
              height={windowSize.height}
            />
          )}

          <Box>
            <Center>
              <SlideFade
                in={colorMode == "light"}
                style={{ zIndex: 5, position: "absolute", marginTop: "150px" }}
              >
                <Image
                  draggable={false}
                  boxSize="60px"
                  src={images.sg}
                  style={{
                    alignSelf: "center",
                    transform: "rotate(-15deg)",
                    marginRight: "5px",
                  }}
                  alt=""
                />
              </SlideFade>
            </Center>
            <Center>
              <SlideFade
                in={colorMode == "dark"}
                style={{ zIndex: 5, position: "absolute", marginTop: "150px" }}
              >
                <Image
                  draggable={false}
                  boxSize="65px"
                  src={images.nv}
                  style={{
                    alignSelf: "center",
                    transform: "rotate(-15deg)",
                    marginRight: "5px",
                  }}
                  alt=""
                />
              </SlideFade>
            </Center>

            <Image
              draggable={false}
              borderRadius="full"
              boxSize="250px"
              src={images.mypic}
              alt="Phongspisut Meemuk"
            />
          </Box>

          <h1
            className={styles.title}
            style={{
              fontFamily: "Athiti",
              fontSize: "min(max(22px, 5vw), 40px)",
              marginTop: "10px",
            }}
          >
            <a>พงศ์</a>จะรับปริญญาแล้วน้าา🎓
          </h1>

<Box flexDirection={"row"}>
<Button
            mt={5}
            mb={5}
            mr={5}
            onClick={onOpen}
            fontFamily={"Athiti"}
            disabled={!isConnected}
          >
             {" "}
            ร่วมแสดงความยินดี
          </Button>
  <IconButton  aria-label='detail' icon={<CalendarIcon />} onClick={onOpen2}/>

</Box>
         
           

          <CongrateModal isOpen={isOpen} onClose={onClose} onSend={onPost}/>
          <DetailModal isOpen={isOpen2} onClose={onClose2}/>

          <div className={styles.grid} style={{fontFamily:'Athiti'}}>
            {isConnected &&
              userlist?.map((x, index) => {
                return (
                  <a
                    key={`comment-${index}`}
                    href="https://nextjs.org/docs"
                    className={styles.card}
                  >
                    <h2>🎉 {x.name}</h2>

                    <Box>
                    <Center>
                      <p>
                       {x.desc}
                      </p>
                      </Center>
                      {x.img && (<>
                        <Divider mt={1}/>
                      <Center>
                   
                          <Image
                          borderRadius={'md'}
                          mt={2}
                          draggable={false}
                          boxSize="130px"
                          objectFit={"contain"}
                          src={x.img}
                          alt={`img-comment-${index}`}
                        />
                      </Center>
                      </>
                            
                      )}
                    </Box>
                  </a>
                );
              })}
          </div>
        </main>

        <footer className={styles.footer}>
          <a target="_blank" rel="noopener noreferrer">
            Powered by{" "}
            <code
              className={styles.code}
              style={{
                marginLeft: "10px",
                color: colorMode === "light" ? "gray" : "black",
              }}
            >
              Phongpisut Meemuk 😂{" "}
            </code>
          </a>
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    const client = await clientPromise;
    const db = client.db("db");
    const data = await db.collection("participant").find({}).toArray();
    const userlist = JSON.parse(JSON.stringify(data));

    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true, userlist },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default Home;
