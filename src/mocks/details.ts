export type Detail = {
    filmId: string;
    director: string;
    actors: string;
    duration: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    genre: string;
    year: Date;
}

export const Details: Detail[] = [
  {
    filmId: '0',
    genre: 'Drama',
    year:  new Date('02.06.2014'),
    director: 'Wes Anderson',
    actors: 'Bill Murray, \n Edward Norton, \n Jude Law, \n Willem Dafoe, \n Saoirse Ronan, \n Tony Revoloru, \n Tilda Swinton, \n Tom Wilkinson, \n Owen Wilkinson, \n Adrien Brody, \n Ralph Fiennes, \n Jeff Goldblum',
    duration: {
      hours: 1,
      minutes: 39,
      seconds: 55
    }
  },
  {
    filmId: '1',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '2',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 2,
      minutes: 22,
      seconds: 8,
    },
    genre: 'Drama',
    year: new Date('2018'),
  },
  {
    filmId: '3',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '4',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '5',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '6',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '7',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  },
  {
    filmId: '8',
    director: 'Какой-то чел',
    actors: 'Какие-то челики',
    duration: {
      hours: 1,
      minutes: 23,
      seconds: 7,
    },
    genre: 'Fantasy',
    year: new Date('2018'),
  }
];
