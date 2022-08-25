type ID = number | string;

interface Artist {
  name: string;
  about: string;
}

interface Artwork {
  name: string;
  year: number;
  about: string;
  artist: ID;
}

interface Person {
  name: string;
  age: number;
  bestFriend: ID;
  favoriteArtist: ID;
  favoriteArtwork: ID;
}

interface DataSource {
  Artist: {
    [key: ID]: Artist;
  };
  Artwork: {
    [key: ID]: Artwork;
  };
  Person: {
    [key: ID]: Person;
  };
}

export const DataSource: DataSource = {
  Artist: {
    1: {
      name: "Pink Floyd",
      about: "A British progressive psychedelic rock band formed in 1967.",
    },
    2: {
      name: "Toby Fox",
      about: "An American indie game developer and musician.",
    },
  },
  Artwork: {
    1: {
      name: "The Dark Side of the Moon",
      year: 1973,
      about:
        "A masterpiece concept album by Pink Floyd, about the human experience and modern life.",
      artist: 1,
    },
    2: {
      name: "Undertale",
      year: 2015,
      about: "2D role-playing video game designed and developed by Toby Fox.",
      artist: 2,
    },
  },
  Person: {
    1: {
      name: "Doruk Eray",
      age: 18,
      bestFriend: 2,
      favoriteArtist: 1,
      favoriteArtwork: 1,
    },
    2: {
      name: "Berk Cambaz",
      age: 18,
      bestFriend: 2, //? intentional... he doesn't value me that much :(
      favoriteArtist: 2,
      favoriteArtwork: 2,
    },
  },
};
