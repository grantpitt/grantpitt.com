<script lang="ts">
  export let text: string;
  export let color: string = "#00d959";

  const width = 500;
  const leftSideThin = 8 + (Math.random() - 0.5) * 2;
  const rightSideThin = 8 + (Math.random() - 0.5) * 2;

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style="width: 100%;"
      viewBox="0 0 ${width} 15"
      preserveAspectRatio="none"
    >
      <g>
        <path
          pathLength="1" d="M${leftSideThin},6.17c${width / 2.6}-7.26,${width / 1.2}-1.94,${
    width - leftSideThin - rightSideThin
  }-.74"
          stroke="${color}" stroke-width="5"
          width="100%" height="100%"
          style="stroke-dasharray: 1.1; fill: none; stroke-linecap: round; stroke-miterlimit: 10; transform-origin: 0px 0px;"
        ></path>
      </g>
    </svg>
  `;
  const escpaedSvg = btoa(svg);
  const inlineCssSvg = "url('data:image/svg+xml;base64," + escpaedSvg + "')";
</script>

<span
  style="
  text-decoration: none;
  background: {inlineCssSvg};
  background-position: 0 110%;
  background-size: 0;
  background-repeat: no-repeat;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  margin: 0 -6px;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: calc((2rem - 1.5rem)/2) 6px;
"
  class="underline"
>
  {text}
</span>

<style>
  .underline:hover {
    background-size: 100% 10px !important;
  }
</style>
