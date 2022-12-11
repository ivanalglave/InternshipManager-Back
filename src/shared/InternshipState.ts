export const STATE_1 = 'state-1';
export const STATE_2 = 'state-2';
export const STATE_3 = 'state-3';
export const STATE_4 = 'state-4';
export const STATE_5 = 'state-5';
export const STATE_6 = 'state-6';
export const STATE_7 = 'state-7';

export const STATES = [
  STATE_1,
  STATE_2,
  STATE_3,
  STATE_4,
  STATE_5,
  STATE_6,
  STATE_7,
];

export const isAllowedState = (potentialState: string): boolean =>
  STATES.includes(potentialState);
