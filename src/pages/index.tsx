import Head from "next/head";
import Header from "@/components/Header";
import Coin from "@/components/Coin";
import { quickAccessTokens } from "@/utils/global";
import { Row, Col } from "antd";
export default function Home() {
  return (
    <>
      <Head>
        <title>The Risk Protocol</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header></Header>
        <Row justify="space-around" style={{ marginTop: 75 }}>
          {quickAccessTokens.map((item, index) => (
            <Col span={4} key={`coin-${index}`}>
              <Coin {...item} />
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
}
