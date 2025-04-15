export interface Event {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  totalSeats: number;
  availableSeats: number;
  type: EventType;
  department: Department;
  description: string;
  participants?: string[];
  isOnline: boolean;
}

export enum EventType {
  PRESENTATION = 'Présentation',
  WORKSHOP = 'Atelier',
  CONFERENCE = 'Conférence',
  MEETUP = 'Rencontre',
  TRAINING = 'Formation',
  VISIT = 'Visite'
}

export enum Department {
  DEV = 'Développement',
  DS = 'Data Science',
  OPS = 'Opérations',
  CIO = 'Direction Informatique',
  SUPPORT = 'Support',
  BUSINESS = 'Métier',
  PILOT = 'Pilotage',
  HISTORY = 'Histoire'
} 