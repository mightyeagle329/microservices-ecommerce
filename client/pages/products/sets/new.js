import { useEffect, useState } from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";

import Product from "../../../components/Product";
import Loader from "../../../components/Loader";
import Head from "next/head";
import Link from "next/link";

const SetsNewArrivals = ({ products, currentUser }) => {
  const [onMobile, setOnMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  const setsNewArrivals = products
    .filter((set) => set.category === "Set")
    .reverse();

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }

    if (products && setsNewArrivals) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>New Arrivals Sets | Aurapan</title>
      </Head>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center px-0"
          style={{ marginTop: "80px" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="category-header">New Arrivals Sets</h1>
          <Breadcrumb className={onMobile ? "px-3" : "px-5"}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>

            <Link href="/products/sets" passHref>
              <Breadcrumb.Item>Sets</Breadcrumb.Item>
            </Link>

            <Link href="/products/sets/new" passHref>
              <Breadcrumb.Item>New Arrivals</Breadcrumb.Item>
            </Link>
          </Breadcrumb>

          <Row className="mx-0">
            {setsNewArrivals.map((item) => (
              <Col key={item.id} xs={6} md={4} xl={3} className="p-0">
                <Product product={item} currentUser={currentUser} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default SetsNewArrivals;
