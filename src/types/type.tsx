type Repo = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

type Person = {
  name: string;
  birth_year: string;
  height: number;
  mass: number;
  gender: string;
  url: string;
};
