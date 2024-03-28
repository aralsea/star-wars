import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Person() {
  const router = useRouter();
  const [person, setPerson] = useState<Person | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const target = `https://swapi.dev/api/people/${router.query.id}/`;
      const fetchedPerson: Person = await fetch(target).then((response) =>
        response.json()
      );
      setPerson(fetchedPerson);
    };
    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [router.query.id]);

  if (person) {
    return (
      <ul>
        <li>{person.name}</li>
        <li>height: {person.height} cm</li>
        <li>weight: {person.mass} kg</li>
        <li>gender: {person.gender}</li>
        <li>birth year: {person.birth_year}</li>
      </ul>
    );
  } else {
    return <p>Loading...</p>;
  }
}
