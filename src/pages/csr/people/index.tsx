import React, { useState, useEffect, useMemo } from "react";
import getPeople, { url2id } from "@/utils/util";
import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function People() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPeople = await getPeople();
      setPeople(fetchedPeople);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const listItems = useMemo(() => {
    return people.map((person) => (
      <li key={person.url}>
        <Link href={"/ssg/people/" + url2id(person.url)}>{person.name}</Link>
      </li>
    ));
  }, [people]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {people.length ? <ol>{listItems}</ol> : <p>Loading...</p>}
      </main>
    </>
  );
}
