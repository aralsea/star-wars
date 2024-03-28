import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function Person({
  person,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
export const getServerSideProps = (async (context) => {
  const target = `https://swapi.dev/api/people/${context.params?.id}/`;

  const person: Person = await fetch(target).then((response) =>
    response.json()
  );
  return { props: { person } };
}) satisfies GetServerSideProps<{ person: Person }>;
