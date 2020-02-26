<script>
  import { clock, formatTime } from "./clock";
  import { createEventDispatcher } from "svelte";
  import { log } from "./tools";

  export let id = -1;
  let clockText = "00:00:00";

  const unsubscribe = clock.subscribe(time => {
    log(`tick for ${id}`);
    clockText = formatTime(time);
  });

  const dispatch = createEventDispatcher();

  const deleteClock = () => {
    unsubscribe();
    dispatch("deleteClock", { id });
  };
</script>

<div>
  <code alt={id}>{clockText}</code> 
  <button on:click={deleteClock}>X</button>
</div>
