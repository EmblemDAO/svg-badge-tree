function position(x, y) {
  return [x, y];
}

const TRACK_INDEXING_A = "C-"
  , TRACK_INDEXING_B = "C-1<"
  , TRACK_INDEXING_C = "C-1<<"
  , TRACK_INDEXING_D = "C-2<"
  , TRACK_INDEXING_E = "C-2<<"
  , TRACK_QUERYING_A = "A-"
  , TRACK_DEVELOPMENT_A = "B-"
  , TRACK_DEVELOPMENT_B = "B-1<"
  , TRACK_CURATING_A = "D-"
  , TRACK_CURATING_B = "D-1<"
  , TRACK_DELEGATING_A = "E-";

export default [
  {
    type: "protocolNode",
    id: "source",
    position: position(-1, 0),
  },

  {
    id: TRACK_INDEXING_A + 1,
    image: "2-3/Placeholder_Badge.png",
    position: position(-1, 2),
    data: { awarded: false, definitionID: "Nexus I" },
  },

  {
    id: TRACK_INDEXING_B + 1,
    image: "2-3/Placeholder_Badge.png",
    position: position(0, 3),
    data: { awarded: false, definitionID: "Nexus II" },
  },
  {
    id: TRACK_INDEXING_B + 2,
    image: "2-3/Placeholder_Badge.png",
    position: position(1, 4),
    data: { awarded: false, definitionID: "Nexus III" },
  },
  // {
  //   id: TRACK_INDEXING_B + 3,
  //   image: "/images/scifi/7.svg",
  //   position: position(2, 5),
  //   data: { awarded: false },
  // },

  {
    id: TRACK_INDEXING_C + 1,
    image: "2-3/Navigation_Badge_Set_Tier-1_GLOW.png",
    position: position(-2, 3),
    data: { awarded: true, definitionID: "Pathfinder I" },
  },
  {
    id: TRACK_INDEXING_C + 2,
    image: "2-3/Navigation_Badge_Set_Tier-2_GLOW.png",
    position: position(-3, 4),
    data: { awarded: true, definitionID: "Pathfinder II" },
  },
  // {
  //   id: TRACK_INDEXING_C + 3,
  //   image: "/images/scifi/7.svg",
  //   position: position(-4, 5),
  //   data: { awarded: false },
  // },

  {
    id: TRACK_INDEXING_A + 2,
    image: "2-3/Navigation_Badge_Set_Tier-3_GLOW.png",
    position: position(-1, 3.5),
    data: { awarded: true, definitionID: "Pathfinder III" },
  },
  {
    id: TRACK_INDEXING_D + 1,
    image: "2-3/Tree_Badge_Set_Tier-1.png",
    position: position(-0.25, 4.75),
    data: { awarded: true, definitionID: "Query Seeker" },
  },
  {
    id: TRACK_INDEXING_D + 2,
    image: "2-3/Tree_Badge_Set_Tier-2.png",
    position: position(0.5, 5.75),
    data: { awarded: true, definitionID: "Query Seeker II" },
  },

  {
    id: TRACK_INDEXING_E + 1,
    image: "2-3/Tree_Badge_Set_Tier-3.png",
    position: position(-1.75, 4.75),
    data: { awarded: true, definitionID: "Query Seeker III" },
  },

  {
    id: TRACK_INDEXING_E + 2,
    image: "1-31 Badges/tree4.png",
    position: position(-2.5, 5.75),
    data: { awarded: true, definitionID: "Query Seeker IV" },
  },

  {
    id: TRACK_QUERYING_A + 1,
    image: "2-3/Placeholder_Badge.png",
    position: position(-2.5, 0),
    data: { awarded: false, definitionID: "Allegiance I" },
  },
  {
    id: TRACK_QUERYING_A + 2,
    image: "2-3/Placeholder_Badge.png",
    position: position(-4, 0),
    data: { awarded: false, definitionID: "Allegiance II" },
  },
  {
    id: TRACK_QUERYING_A + 3,
    image: "2-3/Placeholder_Badge.png",
    position: position(-5.5, 0),
    data: { awarded: false, definitionID: "Allegiance III" },
  },

  {
    id: TRACK_DEVELOPMENT_A + 1,
    image: "2-3/Alchemist_Badge_Set_Tier-1.png",
    position: position(-2.5, 1.5),
    data: { awarded: true, definitionID: "Subgraph Alchemist I" },
  },
  {
    id: TRACK_DEVELOPMENT_A + 2,
    image: "2-3/Hammer_Badge_Set_Tier_1.png",
    position: position(-3.5, 2.5),
    data: { awarded: true, definitionID: "Subgraph Smith I" },
  },
  {
    id: TRACK_DEVELOPMENT_A + 3,
    image: "2-3/Hammer_Badge_Set_Tier_2.png",
    position: position(-4.5, 3.5),
    data: { awarded: true, definitionID: "Subgraph Smith II" },
  },
  {
    id: TRACK_DEVELOPMENT_A + 4,
    image: "2-3/Hammer_Badge_Set_Tier_3.png",
    position: position(-5.5, 4.5),
    data: { awarded: true, definitionID: "Subgraph Smith III" },
  },
  {
    id: TRACK_DEVELOPMENT_B + 1,
    image: "2-3/Alchemist_Badge_Set_Tier-2.png",
    position: position(-4, 1.5),
    data: { awarded: true, definitionID: "Subgraph Alchemist II" },
  },
  {
    id: TRACK_DEVELOPMENT_B + 2,
    image: "2-3/Alchemist_Badge_Set_Tier-3.png",
    position: position(-5.5, 1.5),
    data: { awarded: true, definitionID: "Subgraph Alchemist III" },
  },


  {
    id: TRACK_CURATING_A + 1,
    image: "2-3/Chest_Badge_Set_Tier-1.png",
    position: position(1, 2),
    data: { awarded: true, definitionID: "Query Collector" },
  },
  {
    id: TRACK_CURATING_A + 2,
    image: "2-3/Chest_Badge_Set_Tier-2.png",
    position: position(2, 3),
    data: { awarded: true, definitionID: "Query Collector II" },
  },
  {
    id: TRACK_CURATING_A + 3,
    image: "2-3/Chest_Badge_Set_Tier-3.png",
    position: position(3, 4),
    data: { awarded: true, definitionID: "Query Collector III" },
  },

  {
    id: TRACK_CURATING_B + 1,
    image: "2-3/Placeholder_Badge.png",
    position: position(3, 2),
    data: { awarded: false, definitionID: "Planet of the Aped I" },
  },
  {
    id: TRACK_CURATING_B + 2,
    image: "2-3/Placeholder_Badge.png",
    position: position(4, 3),
    data: { awarded: false, definitionID: "House Odds I" },
  },

  {
    id: TRACK_DELEGATING_A + 1,
    image: "2-3/Shield_Badge_Set_Tier-1.png",
    position: position(1, 0),
    data: { awarded: true, definitionID: "Guardian I" },
  },
  {
    id: TRACK_DELEGATING_A + 2,
    image: "2-3/Shield_Badge_Set_Tier-2.png",
    position: position(2, 1),
    data: { awarded: true, definitionID: "Guardian II" },
  },
  {
    id: TRACK_DELEGATING_A + 3,
    image: "2-3/Shield_Badge_Set_Tier-3.png",
    position: position(3, 0),
    data: { awarded: true, definitionID: "Guardian III" },
  },
  {
    id: TRACK_DELEGATING_A + 4,
    image: "2-3/Shield_Badge_Set_Tier-4.png",
    position: position(4, 1),
    data: { awarded: true, definitionID: "Guardian IV" },
  },
  {
    id: TRACK_DELEGATING_A + 5,
    image: "2-3/Shield_Badge_Set_Tier-4_GLOW.png",
    position: position(5, 0),
    data: { awarded: true, definitionID: "Guardian V" },
  },
];