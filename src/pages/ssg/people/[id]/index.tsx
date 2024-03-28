import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { useRouter } from "next/router";
import getPeople, { url2id } from "@/utils/util";
export default function Person({
  person,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      <li>{person.name}</li>
      <li>height: {person.height} cm</li>
      <li>weight: {person.mass} kg</li>
      <li>gender: {person.gender}</li>
      <li>birth year: {person.birth_year}</li>
    </ul>
  );
}

//get the person
export const getStaticProps = (async (context) => {
  const target = `https://swapi.dev/api/people/${context.params?.id}/`;
  const person: Person = await fetch(target).then((response) =>
    response.json()
  );
  return { props: { person } };
}) satisfies GetStaticProps<{ person: Person }>;

export const getStaticPaths = (async () => {
  const people = await getPeople();
  const paths = people.map((person) => {
    return {
      params: {
        id: url2id(person.url),
      },
    };
  });
  console.log(paths);
  return {
    paths: paths,
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;
