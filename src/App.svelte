<script lang="ts">
  import logo from "./assets/teckstackify.svg";
  import MyStack from "./lib/MyStack.svelte";
  import StackBuilder from "./lib/StackBuilder.svelte";
  import Footer from "./lib/modules/Footer/Footer.svelte";
</script>

<nav>
  <div class="content-centered w-100">
    <a href="/" class="f-ai-center p-def">
      <img src={logo} class="logo" alt="" width="200" />
    </a>
  </div>
</nav>

<main class="content-centered p-def">
  <MyStack />
  <StackBuilder />
</main>

<Footer />

<style>
  main {
    min-height: 100vh;
  }
</style>
