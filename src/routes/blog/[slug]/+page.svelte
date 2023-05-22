<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main class="max-w-3xl mx-auto px-6 my-12">
  <h1 class="my-24">{data.post.title}</h1>

  {@html data.post.content}
</main>
