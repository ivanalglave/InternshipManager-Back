export const ROLE_STUDENT = 'student';
export const ROLE_SECRETARY = 'secretary';
export const ROLE_RESPONSIBLE = 'responsible';
export const ROLE_ADMIN = 'admin';

export const ROLES = [
  ROLE_STUDENT,
  ROLE_SECRETARY,
  ROLE_RESPONSIBLE,
  ROLE_ADMIN,
];

export const isRoleValid = (potentialRole: string): boolean =>
  ROLES.includes(potentialRole);
