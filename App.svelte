<script>
  import { log, noop, idGenerator } from "./tools";
  import Button from "./Button.svelte";
  import Clock from "./Clock.svelte";

  let clocks = [];
  const getNewClockId = idGenerator(0).getNewId;
  const addClock = () => {
    clocks = [...clocks, { id: getNewClockId() }];
  };

  const deleteClock = ({ detail: { id } }) => {
    clocks = clocks.filter(clock => clock.id !== id);
    log(`Clock ${id} deleted`);
  };
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
  <Button on:click={addClock}>Add a clock</Button>
  {#each clocks as clock (clock.id)}
    <Clock id={clock.id} on:deleteClock={deleteClock} />
  {/each}
</main>