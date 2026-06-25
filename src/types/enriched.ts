import type { Forderungserfassung, Ueberzahlungsbearbeitung } from './app';

export type EnrichedForderungserfassung = Forderungserfassung & {
  schuldnerName: string;
};

export type EnrichedUeberzahlungsbearbeitung = Ueberzahlungsbearbeitung & {
  forderungName: string;
};
