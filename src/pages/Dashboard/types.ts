export interface Odd {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}

export interface OddGroup {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, Odd>;
}

export interface Bet {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, OddGroup>;
  HEC: boolean;
}

export type Group = {
  date: string;
  day: string;
  leagueName: string;
  bets: Bet[];
};

export type RowItem =
  | { type: "header"; date: string; day: string; leagueName: string }
  | { type: "bet"; bet: Bet };
