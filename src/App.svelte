<script lang="ts">
  import logo from "./assets/teckstackify.svg";
  import MyStack from "./lib/MyStack.svelte";
  import StackBuilder from "./lib/StackBuilder.svelte";
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

<footer class="vstack">
  <div class="hstack f-jc-center">
    <a
      href="https://github.com/daroxs95/techstackify"
      target="_blank"
      title="Github"
    >
      <i class="fa-brands fa-github font-icon-button" />
    </a>
  </div>
  <!-- <div>
    &copy; {today.getFullYear()}
    {MY_NAME}. Maybe some rights reserved.
  </div> -->
</footer>

<style>
  footer {
    padding: 40px 25px;
    text-align: center;
  }
  .font-icon-button {
    font-size: 40px;
  }
  main {
    min-height: 100vh;
  }
</style>
