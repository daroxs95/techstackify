<script>
  import MadeWith from "./MadeWith.svelte";

</script>
<footer class="vstack">
  <MadeWith />
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
    padding: 60px 25px;
    text-align: center;
  }
  .font-icon-button {
    font-size: 80px;
  }
</style>
