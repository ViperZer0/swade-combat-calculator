export interface FightingSkill
{
    skill: "fighting",
    displayName: "Fighting",
    traitDieSize: number,
    avgModifier: number,
    strengthDieSize: number,
    weaponDamageFormula: string,
}

export interface ShootingSkill
{
    skill: "shooting",
    displayName: "Shooting",
    traitDieSize: number,
    avgModifier: number,
}


export type Skill = FightingSkill;
export interface PlayerCharacter
{
    primarySkill: Skill
}
