export interface dataInter {
  id: string,
  name: string,
  alternate_names:string[],
  species: string,
  gender: string,
  house:string,
  dateOfBirth: string,
  yearOfBirth: number,
  wizard: boolean
  ancestry: string,
  eyeColour: string,
  hairColour: string,
  wand: wandInter,
  patronus: string,
  hogwartsStudent: boolean,
  hogwartsStaff: boolean,
  actor: string
  alternate_actors:[];
  alive: boolean
  image: string;
}

export interface wandInter {
  wood: string;
  core: string;
  length: number;
}