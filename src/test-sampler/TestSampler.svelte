<script lang="ts">
    import type { Rollable } from "$lib/dice";
	import { sampleDistribution, SortedSampleDistribution, type Sample } from "$lib/sample";
	import { Option } from "effect";
    
    interface Props {
        sampleSize: number,
        rollable: Option.Option<Rollable>,
    };

    let {
        sampleSize = 0,
        rollable = Option.none(),
    }: Props = $props();

    let results: Option.Option<SortedSampleDistribution> = $state(Option.none());

    function generateResults() {
        if(Option.isNone(rollable))
        {
            results = Option.none();
            return;
        }
        results = Option.some(sampleDistribution(rollable.value, sampleSize).sort());
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
            <td>{((result.count/sampleSize * 100).toFixed(2)).toString() + "%"}</td>
        </tr>
    {/each}
    </tbody>
    </table>
{/if}
</div>
