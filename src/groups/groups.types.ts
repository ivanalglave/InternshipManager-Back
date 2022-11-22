export type Group = {
  _id: any;
  id: string;
  final: boolean;
  responsibles: string[];
  secretaries: string[];
  students: string[];
  subgroups: string[];
  parent: string;
};
