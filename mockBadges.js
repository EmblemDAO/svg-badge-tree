function position(x, y) {
  return [x, y];
}

const TRACK_INDEXING_A = "C-",
  TRACK_INDEXING_B = "C-1<",
  TRACK_INDEXING_C = "C-1<<",
  TRACK_INDEXING_D = "C-2<",
  TRACK_INDEXING_E = "C-2<<",
  TRACK_QUERYING_A = "A-",
  TRACK_DEVELOPMENT_A = "B-",
  TRACK_DEVELOPMENT_B = "B-1<",
  TRACK_CURATING_A = "D-",
  TRACK_CURATING_B = "D-1<",
  TRACK_DELEGATING_A = "E-";

export default [
  {
    type: "protocolNode",
    id: "source",
    position: position(-1, 0),
  },

  {
    id: TRACK_INDEXING_A + 1,
    image: "shield1",
    position: position(-1, 2),
    data: { awarded: true },
  },

  {
    id: TRACK_INDEXING_B + 1,
    image: "shield2",
    position: position(0, 3),
    data: { awarded: true },
  },
  {
    id: TRACK_INDEXING_B + 2,
    image: "shield3",
    position: position(1, 4),
    data: { awarded: true },
  },
  // {
  //   id: TRACK_INDEXING_B + 3,
  //   image: "shield1",
  //   position: position(2, 5),
  //   data: { awarded: true },
  // },

  {
    id: TRACK_INDEXING_C + 1,
    image: "shield2",
    position: position(-2, 3),
    data: { awarded: true },
  },
  {
    id: TRACK_INDEXING_C + 2,
    image: "shield3",
    position: position(-3, 4),
    data: { awarded: true },
  },
  // {
  //   id: TRACK_INDEXING_C + 3,
  //   image: "shield1",
  //   position: position(-4, 5),
  //   data: { awarded: true },
  // },

  {
    id: TRACK_INDEXING_A + 2,
    image: "shield1",
    position: position(-1, 3.5),
    data: { awarded: true },
  },
  {
    id: TRACK_INDEXING_D + 1,
    image: "shield2",
    position: position(-0.25, 4.75),
    data: { awarded: true },
  },
  {
    id: TRACK_INDEXING_D + 2,
    image: "shield3",
    position: position(0.5, 5.75),
    data: { awarded: true },
  },

  {
    id: TRACK_INDEXING_E + 1,
    image: "shield2",
    position: position(-1.75, 4.75),
    data: { awarded: true },
  },

  {
    id: TRACK_INDEXING_E + 2,
    image: "shield3",
    position: position(-2.5, 5.75),
    data: { awarded: true },
  },

  {
    id: TRACK_QUERYING_A + 1,
    image: "shield1",
    position: position(-2.5, 0),
    data: { awarded: true },
  },
  {
    id: TRACK_QUERYING_A + 2,
    image: "shield2",
    position: position(-4, 0),
    data: { awarded: true },
  },
  {
    id: TRACK_QUERYING_A + 3,
    image: "shield3",
    position: position(-5.5, 0),
    data: { awarded: true },
  },

  {
    id: TRACK_DEVELOPMENT_A + 1,
    image: "shield1",
    position: position(-2.5, 1.5),
    data: { awarded: true },
  },
  {
    id: TRACK_DEVELOPMENT_A + 2,
    image: "shield2",
    position: position(-3.5, 2.5),
    data: { awarded: true },
  },
  {
    id: TRACK_DEVELOPMENT_A + 3,
    image: "shield3",
    position: position(-4.5, 3.5),
    data: { awarded: true },
  },
  {
    id: TRACK_DEVELOPMENT_A + 4,
    image: "shield1",
    position: position(-5.5, 4.5),
    data: { awarded: true },
  },
  {
    id: TRACK_DEVELOPMENT_B + 1,
    image: "shield2",
    position: position(-4, 1.5),
    data: { awarded: true },
  },
  {
    id: TRACK_DEVELOPMENT_B + 2,
    image: "shield3",
    position: position(-5.5, 1.5),
    data: { awarded: true },
  },

  {
    id: TRACK_CURATING_A + 1,
    image: "shield1",
    position: position(1, 2),
    data: { awarded: true },
  },
  {
    id: TRACK_CURATING_A + 2,
    image: "shield2",
    position: position(2, 3),
    data: { awarded: true },
  },
  {
    id: TRACK_CURATING_A + 3,
    image: "shield3",
    position: position(3, 4),
    data: { awarded: true },
  },

  {
    id: TRACK_CURATING_B + 1,
    image: "shield2",
    position: position(3, 2),
    data: { awarded: true },
  },
  {
    id: TRACK_CURATING_B + 2,
    image: "shield3",
    position: position(4, 3),
    data: { awarded: true },
  },

  {
    id: TRACK_DELEGATING_A + 1,
    image: "shield1",
    position: position(1, 0),
    data: { awarded: true },
  },
  {
    id: TRACK_DELEGATING_A + 2,
    image: "shield2",
    position: position(2, 1),
    data: { awarded: true },
  },
  {
    id: TRACK_DELEGATING_A + 3,
    image: "shield2",
    position: position(3, 0),
    data: { awarded: true },
  },
  {
    id: TRACK_DELEGATING_A + 4,
    image: "shield3",
    position: position(4, 1),
    data: { awarded: true },
  },
  {
    id: TRACK_DELEGATING_A + 5,
    image: "shield3",
    position: position(5, 0),
    data: { awarded: true },
  },
];
