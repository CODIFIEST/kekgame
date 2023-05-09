<script lang="ts">
    // import HighScoreList from "../../components/HighScoreList.svelte";
    import player1 from "../stores/player1";
    import playerName from "../stores/playername";
    import { push } from "svelte-spa-router/Router.svelte";

  async function setPlayerName() {
        player1.set({
            name: $playerName,
            address: "",
            score: 0,
           
        });
        
    }
    player1.set({ name: "", address: "", score: 0,  });
</script>

<input
class = "input"
bind:value={$playerName} type="text" placeholder="Put your name here" maxlength="10" />
<button
class="btn"
    on:click={async () => {
        await setPlayerName(); 
        await push('/game');      

    }}>Let's Play!</button
>
<h1 class="mb-5 text-5xl font-bold text-secondary">Kek Cash Pepe Smash </h1>
<p class="mb-5 text-secondary">
Kek cash is the one token to rule them all. Smash the alts for points and collect golden keks for the big bucks.  Enter your name to begin.
</p>
<!-- <HighScoreList /> -->
