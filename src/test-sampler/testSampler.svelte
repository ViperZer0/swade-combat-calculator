<script lang="ts">
    import { WildDie } from "$lib/dice";
	import { sampleDistribution, SortedSampleDistribution, type Sample } from "$lib/sample";
	import { Option } from "effect";
    
    let { dieSize = 4 } = $props();
    let die = $derived(new WildDie(dieSize));

    let sampleSize = $state(100);
    let results: Option.Option<SortedSampleDistribution> = $state(Option.none());
    let total: Option.Option<number> = $derived.by(() => {
        // I know this looks scary (and it kinda is) but this basically 
        // just returns None if results hasn't been defined,
        // and if it HAS been defined it calculates the total
        // Number of results. This should be the exact same as sampleSize
        // but maybe we want to double check that???
        return Option.map(results, (results) => results[Symbol.iterator]().reduce((acc: number, sample: Sample) => acc + sample.count, 0));
    });

    function generateResults() {
        results = Option.some(sampleDistribution(die, sampleSize).sort());
    }

</script>

<style>
    @property --alt-table-background-color {
        syntax: "<color>";
        inherits: false;
        initial-value: #f2f2f2;
    }

    button {
        background-color: cornflowerblue;
        padding: 0.5em;
        margin-top: 1em;
        margin-left: 0.5em;
        margin-bottom: 1em;
    }
    th, td {
        padding-left: 15px;
    }

    th {
        font-weight: bold;
        background-color: var(--alt-table-background-color);
    }

    tr:nth-child(even) {
        background-color: var(--alt-table-background-color);
    }

</style>

<div>
<label for="dieSize">Die size:</label>
<input id="dieSize" type="number" bind:value={dieSize} min="2" step="2" />
</div>
<div>
<label for="sampleSize">Sample size:</label>
<input id="sampleSize" type="number" bind:value={sampleSize} min="1" />
</div>

<div>
<button onclick={generateResults}>
    Sample distribution
</button>
</div>

<div>
{#if Option.isSome(results)}
    <table>
    <thead>
        <tr>
            <th>Roll Result</th>
            <!--<th>Times Rolled</th>-->
            <th>Frequency</th>
        </tr>
    </thead>
    <tbody>
    {#each results.value as result: Sample}
        <tr>
            <td>{result.result}</td>
            <!--<td>{result[1]}</td>-->
            <!-- We can assert that total should not be None since results is not None.
            I don't know if there's a better way to logically make these things equivalent? -->
            <td>{((result.count/Option.getOrThrow(total) * 100).toFixed(2)).toString() + "%"}</td>
        </tr>
    {/each}
    </tbody>
    </table>
{/if}
</div>
