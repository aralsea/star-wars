export default async function getPeople() {
  const targets = Array.from(
    { length: 9 },
    (_, i) => `https://swapi.dev/api/people/?page=${i + 1}`
  );

  let people: Person[] = [];

  const peopleArray: Person[][] = await Promise.all(
    targets.map((url) => {
      return fetch(url).then((response) => response.json());
    })
  ).then((repos) => {
    return repos.map((repo) => repo.results);
  });

  for (const tmpPeople of peopleArray) {
    people = people.concat(tmpPeople);
  }
  return people;
}

export function url2id(url: string) {
  const regex = /(\d+)\/$/;

  // 正規表現を使用してURLを検索
  const match = url.match(regex);

  if (match) {
    // マッチした場合、マッチした全体の文字列が望む値
    return match[1];
  } else {
    // マッチしなかった場合の処理
    throw new Error("Failed to match!");
  }
}
