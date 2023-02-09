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

export const roleValue = (role: string): number => {
  switch (role) {
    case ROLE_STUDENT:
      return 0;
    case ROLE_SECRETARY:
      return 1;
    case ROLE_RESPONSIBLE:
      return 2;
    case ROLE_ADMIN:
      return 9999;
    default:
      return -1;
  }
};
