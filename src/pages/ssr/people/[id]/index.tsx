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
  const id = await Promise.resolve(context.params?.id);

  const target = `https://swapi.dev/api/people/${id}/`;
  const res = await fetch(target);
  const person: Person = await res.json();
  return { props: { person } };
}) satisfies GetServerSideProps<{ person: Person }>;
