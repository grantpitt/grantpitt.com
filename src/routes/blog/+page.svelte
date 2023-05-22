<script lang="ts">
  import type { PageServerData } from "./$types";
  import DrawnUnderline from "./DrawnUnderline.svelte";

  export let data: PageServerData;
</script>

<main class="max-w-7xl bg-white px-12 py-12 mx-auto">
  <h1 class="my-24">The Blog</h1>

  <section class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 py-12">
    {#each data.posts as post, i (i)}
      <article>
        <h2 class="mb-2">
          <a href="/blog/{post.slug}">
            <DrawnUnderline text={post.title} />
          </a>
        </h2>
        <p class="text-stone-700 my-2">{post.description}</p>
        <time class="text-sm text-stone-400">{post.formatedDate}</time>
      </article>
    {/each}
  </section>
</main>
