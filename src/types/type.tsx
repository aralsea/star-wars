type Repo = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

type Person = {
  name: string;
  birthYear: string;
  height: number;
  mass: number;
  gender: string;
  url: string;
};
