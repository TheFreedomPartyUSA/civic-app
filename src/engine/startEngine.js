import laws from "../data/stateLaws.json";

export function getStateLaw(state) {
  return laws[state.toLowerCase()] || null;
}