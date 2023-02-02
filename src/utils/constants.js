import { getRandomInt } from "./getRandomInt";

export const DEFAULT_NOTES = [
  {
    id: getRandomInt(1000).toString(),
    x: 20,
    y: 20,
    height: 245,
    width: 365,
    fill: "white",
    content: "Hello world",
    labels: ["abc", "cde", "efg"],
  },
  {
    id: getRandomInt(1000).toString(),
    x: 0,
    y: 0,
    height: 245,
    width: 365,
    fill: "white",
    content: "Hello world",
    labels: ["abc", "cde", "efg"],
  },
  {
    id: getRandomInt(1000).toString(),
    x: 40,
    y: 40,
    height: 245,
    width: 365,
    fill: "white",
    content: "Hello world",
    labels: ["abc", "cde", "efg"],
  },
];
