export default interface Pokemon {
  name: string;
  Id: number;
  weight: number;
  height: number;
  types: string[];
  stats: { name: string; base_stat: number; effort: number }[];
}
