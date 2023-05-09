<script lang="ts">
    import GameOn from './pages/GameOn.svelte';
    import Home from './pages/Home.svelte';
import Router from 'svelte-spa-router'
const routes = {
    // home lets the user enter their name to store their high score
    "/": Home,
   // launch the game
    "/game": GameOn,

    // Catch-all
    // This is optional, but if present it must be the last
    // "*": NotFound,
  };
</script>

<main>

  <div class="hero min-h-screen" style="background-image: url('./kekbig.png')">
  
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content text-center">
      <div class="max-w-7xl">
        
        <!-- <Notifications> -->
          <Router {routes} />
        <!-- </Notifications> -->
      </div>
    </div>
  </div>

  <!-- <div id="game"></div> -->
  
</main>

<style>

</style>