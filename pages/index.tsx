import Head from "next/head";
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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import NavBar from "./components/navbar";
import useWindowSize from "../hooks/useWindowSize";
import Confetti from "react-confetti";
import CongrateModal from "./components/modal";
import images from "../images";
//import GUN from 'gun'

type Props = {
  isConnected: boolean;
  userlist?: [{ name?: string; text?: string; imgurl?: string }];
};

const Home = ({ isConnected, userlist }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { windowSize, setWindowSize } = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const gun = GUN('https://mvp-gun.herokuapp.com/gun');
  useEffect(() => {
    // gun.get('/board/a592cacc4dfe?board=0').on((data, key) => {
    //   console.log("realtime updates:", data);
    // });

    if (isConnected && userlist) {
      userlist.map((x) => {
        console.log(x.name);
      });
    }
  }, [isConnected, userlist]);

  // const putMessage = useCallback(()=>{
  //   gun.get('/board/a592cacc4dfe?board=0').put({
  //     name: "Mark",
  //     email: "mark@gun.eco",
  //   });
  // },[gun])

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Congrate me!</title>
          <meta name="description" content="Congrate me!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          {windowSize.width && (
            <Confetti
              numberOfPieces={50}
              width={windowSize.width}
              height={windowSize.height}
            />
          )}

          <Box >
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

          <Button mt={5} onClick={onOpen} fontFamily={'Athiti'} disabled={!isConnected}>
            {" "}
            ร่วมแสดงความยินดี
          </Button>

          <CongrateModal isOpen={isOpen} onClose={onClose} />

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
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
