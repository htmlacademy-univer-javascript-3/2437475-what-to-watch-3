export type Film = {
    id: string;
    name: string;
    image: string;
    video: string;
    bigImage: string;
  };

export const Films: Film[] = [
  {
    id: '0',
    name: 'The Grand Budapest Hotel',
    image: 'img/the-grand-budapest-hotel-poster.jpg',
    video: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    bigImage: 'img/bg-the-grand-budapest-hotel.jpg'
  },
  {
    id: '1',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    image: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    video: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    bigImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'
  },
  {
    id: '2',
    name: 'Bohemian Rhapsody',
    image: 'img/bohemian-rhapsody.jpg',
    video: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    bigImage: 'img/bohemian-rhapsody.jpg',
  },
  {
    id: '3',
    name: 'Macbeth',
    image: 'img/macbeth.jpg',
    bigImage: 'img/macbeth.jpg',
    video: 'https://example.com/video3.mp4'
  },
  {
    id: '4',
    name: 'Aviator',
    image: 'img/aviator.jpg',
    bigImage: 'img/aviator.jpg',
    video: 'https://example.com/aviator.mp4'
  },
  {
    id: '5',
    name: 'We need to talk about Kevin',
    image: 'img/we-need-to-talk-about-kevin.jpg',
    bigImage: 'img/we-need-to-talk-about-kevin.jpg',
    video: 'https://example.com/we-need-to-talk-about-kevin.mp4'
  },
  {
    id: '6',
    name: 'What We Do in The Shadows',
    image: 'img/what-we-do-in-the-shadows.jpg',
    bigImage: 'img/what-we-do-in-the-shadows.jpg',
    video: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
  },
  {
    id: '7',
    name: 'Revenant',
    image: 'img/revenant.jpg',
    bigImage: 'img/revenant.jpg',
    video: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
  },
  {
    id: '8',
    name: 'Johnny English',
    image: 'img/johnny-english.jpg',
    bigImage: 'img/johnny-english.jpg',
    video: 'video/johnny-english.mp4',
  }
];
