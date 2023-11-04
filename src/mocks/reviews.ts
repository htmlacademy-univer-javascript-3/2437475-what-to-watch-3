export type Review = {
  id: string;
  filmId: string;
  rating: number;
  author: string;
  text: string;
  reviewDate: Date;
};

export const Reviews: Review[] = [
  {
    id: '1',
    filmId: '0',
    rating: 9,
    author: 'Какой-то чел',
    text: 'Что-то на довольном',
    reviewDate: new Date('2015-12-26')
  },
  {
    id: '2',
    filmId: '0',
    rating: 9.2,
    author: 'Какой-то чел2',
    text: 'Что-то на довольном',
    reviewDate: new Date('2015-12-26')
  },
  {
    id: '3',
    filmId: '0',
    rating: 9.8,
    author: 'Какой-то чел3',
    text: 'Что-то на довольном',
    reviewDate: new Date('2015-12-26')
  },
  {
    id: '4',
    filmId: '0',
    rating: 4,
    author: 'Какой-то чел4',
    text: 'Что-то на довольном',
    reviewDate: new Date('2015-12-26')
  },
  {
    id: '5',
    filmId: '0',
    rating: 7.8,
    author: 'Какой-то чел5',
    text: 'Что-то на довольном',
    reviewDate: new Date('2015-12-26')
  },
  {
    id: '6',
    filmId: '0',
    rating: 5,
    author: 'Какой-то чел6',
    text: 'Что-то на довольном',
    reviewDate: new Date('26.12.2015')
  },
  {
    id: '7',
    filmId: '0',
    rating: 2,
    author: 'Какой-то чел7',
    text: 'Что-то на довольноoooм',
    reviewDate: new Date('27.12.2015')
  }
  //TODO
];
