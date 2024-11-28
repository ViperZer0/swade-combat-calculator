<script lang="ts"> 
    import { WildDie } from '$lib/dice';
    const die = new WildDie(4);
    let result = $state(0);
    
    function roll()
    {
        result = die.roll();
    }
</script>

<p>You rolled a {result}</p>

<button onclick={roll}>Roll Again</button>



