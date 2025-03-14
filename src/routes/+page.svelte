<script lang="ts">
	import { WildDie, type Rollable } from "$lib/dice";
	import { Option } from "effect";
	import TestSampler from "../test-sampler/TestSampler.svelte";
	import { RaiseRollable } from "$lib/skill";

    let sampleSize: number = $state(100);
    let dieSize: number = $state(4);
    let testRoller = $derived(new WildDie(dieSize));
    let dieRoller: Option.Option<Rollable> = $derived(Option.some(new RaiseRollable(new WildDie(dieSize))));
</script>

<div>
<label id="diesize">Die Size</label>
<input type="number" id="diesize" bind:value={dieSize} min="0" />
</div>
<div>
<label for="samplesize">Sample Size</label>
<input type="number" id="samplesize" bind:value={sampleSize} min="0" />
</div>
<TestSampler sampleSize={sampleSize} rollable={dieRoller}/>
