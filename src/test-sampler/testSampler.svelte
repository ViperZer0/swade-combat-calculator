<script lang="ts">
    import { WildDie } from "$lib/dice";
	import { sampleDistribution, sortDistribution } from "$lib/sample";
    
    let { dieSize = 4 } = $props();
    let die = $derived(new WildDie(dieSize));

    let sampleSize = $state(100);
    let results: Array<[number, number]> | undefined = $state(undefined);
    let total = $derived(results?.reduce((acc, v) => acc + v[1], 0));

    function generateResults() {
        results = sortDistribution(sampleDistribution(die, sampleSize));
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
{#if results !== undefined}
    <table>
    <thead>
        <tr>
            <th>Roll Result</th>
            <!--<th>Times Rolled</th>-->
            <th>Frequency</th>
        </tr>
    </thead>
    <tbody>
    {#each results as result}
        <tr>
            <td>{result[0]}</td>
            <!--<td>{result[1]}</td>-->
            <td>{((result[1]/total * 100).toFixed(2)).toString() + "%"}</td>
        </tr>
    {/each}
    </tbody>
    </table>
{/if}
</div>
