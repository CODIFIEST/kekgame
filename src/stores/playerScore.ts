import { writable } from "svelte/store";

const playerScore = writable<integer>();
export default playerScore;