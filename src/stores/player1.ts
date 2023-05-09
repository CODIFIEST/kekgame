import type { PlayerScore } from "../domain/playerscore";
import { writable } from "svelte/store";

const player1 = writable<PlayerScore>();
export default player1