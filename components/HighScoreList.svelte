<script lang="ts">
    import axios from "axios";
    import highscores from "../src/stores/highscores";
    import { onMount } from "svelte";
    // import highscores from "../src/stores/highscores";
    let scores = [];
    let onthelist=[];
    async function getHighScores() {
        const result = await axios.get('http://localhost:3888/scores');
        console.log('results', result.data)
        return result.data
        
    }
    onMount(async ()=> {
    
        scores = await getHighScores();
          // sort by value
        scores.sort((a,b)=> b.score - a.score)

        scores.forEach((score)=>{
            if (!onthelist.some(e=>e.address === score.address)){
                onthelist.push(score)
            }
            // console.log('onthelist' , onthelist);
           
        });
        if (onthelist.length > 10) {
            onthelist.length = 10;
        }
        highscores.set(onthelist)
             console.log(' here are the high score stored in a local array')
             console.log(onthelist)
             scores = onthelist;
// console.log('do scores and onthelist look different?', scores)
// console.log('onthelist', onthelist)

    })

</script>
<div class="carousel rounded-box ">
<!-- {#each scores as p1score } -->


{#each scores as p1score}
    

    <div class="carousel-item rounded-md p-2">
    
        <!-- <br> Token: {p1score.token} -->
        <img src="/kek.png" height="150px" width="150px" alt="kek">
        
        <p class="mb-5 text-secondary">   Name: {p1score.name}
    <br>    Score: {p1score.score}</p>

        </div>

{/each}
</div>
  
<!-- <style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style> -->