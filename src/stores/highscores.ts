import  type { PlayerScore } from "../domain/playerscore";
import { writable } from "svelte/store";

const highscores = writable<PlayerScore[]>();
export default highscores