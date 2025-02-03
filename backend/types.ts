export type CardColor = "red" | "blue" | "bystander" | "assassin";
export type Role = "spymaster" | "operative";
export type Team = "red" | "blue";
export interface Player {
  id: string;
  name: string;
  team: Team;
  role: Role;
}
