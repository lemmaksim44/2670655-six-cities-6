export const enum RatingValue {
  Perfect = 5,
  Good = 4,
  NotBad = 3,
  Badly = 2,
  Terribly = 1,
}

export const RATINGS = [
  { value: RatingValue.Perfect, title: 'perfect' },
  { value: RatingValue.Good, title: 'good' },
  { value: RatingValue.NotBad, title: 'not bad' },
  { value: RatingValue.Badly, title: 'badly' },
  { value: RatingValue.Terribly, title: 'terribly' },
] as const;
