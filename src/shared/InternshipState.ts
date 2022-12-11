export const STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION =
  'student-enters-internship-information';
export const STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION =
  'responsible-accepts-internship-information';
export const STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT =
  'secretary-establishes-internship-agreement';
export const STATE_STUDENT_SIGNS_INTERNSHIP_AGREEMENT =
  'student-signs-internship-agreement';
export const STATE_RESPONSIBLE_SIGNS_INTERNSHIP_AGREEMENT =
  'responsible-signs-internship-agreement';
export const STATE_COMPANY_SIGNS_INTERNSHIP_AGREEMENT =
  'company-signs-internship-agreement';
export const STATE_DEAN_SIGNS_INTERNSHIP_AGREEMENT =
  'dean-signs-internship-agreement';

export const STATES = [
  STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
  STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION,
  STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT,
  STATE_STUDENT_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_RESPONSIBLE_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_COMPANY_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_DEAN_SIGNS_INTERNSHIP_AGREEMENT,
];

export const isStateValid = (potentialState: string): boolean =>
  STATES.includes(potentialState);
