export const enum RatingValue {
  Perfect = 5,
  Good = 4,
  NotBad = 3,
  Badly = 2,
  Terribly = 1,
}

export const RATINGS = [
  { value: RatingValue.Perfect, title: 'Perfect' },
  { value: RatingValue.Good, title: 'Good' },
  { value: RatingValue.NotBad, title: 'Not Bad' },
  { value: RatingValue.Badly, title: 'Badly' },
  { value: RatingValue.Terribly, title: 'Terribly' },
] as const;
