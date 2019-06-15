<template>
    <div class="wrapper row center-xs middle-xs">
        <div class="col-xs-12 row">

            <div class="title col-xs-12">
                Sharpshooter calculator
            </div>

            <div class="col-xs-6 end-xs">
                Attack mod:
            </div>
            <div class="col-xs-6 start-xs">
                <input v-model="atkRoll" placeholder="6">
            </div>

            <div class="col-xs-6 end-xs">
                Damage roll:
            </div>
            <div class="col-xs-6 start-xs">
                <input v-model="dmgRoll" placeholder="d10+3+d6">
            </div>

            <!--<div class="col-xs-6 end-xs">-->
                <!--Avg dmg per hit:-->
            <!--</div>-->
            <!--<div class="col-xs-6 start-xs">-->
                <!--{{dmgAvg | round}}, sharpshooter: {{dmgAvg + 10 | round}}-->
            <!--</div>-->

            <div class="col-xs-6 end-xs">
                Avg dmg per attack on <input v-model="AC" placeholder="16" style="width: 35px"> AC:
            </div>
            <div class="col-xs-6 start-xs">
                {{dmgPerAttack | round}}, sharpshooter: {{dmgPerAttackSharpshooter | round}}
            </div>

            <div class="col-xs-6 end-xs">
                Optimal AC:
            </div>
            <div class="col-xs-6 start-xs">
                {{optimalAC | round}}
            </div>

            <div class="col-xs-12">
                If the enemy's AC is higher, switch from sharpshooter to normal
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Sharpshooter",
        data () {
            return {
                atkRoll: "6",
                dmgRoll: "d10+3+d6",
                AC: 16,
            }
        },
        computed: {
            optimalAC() {
                return 16 + Number.parseInt(this.atkMod) - (0.5 * this.dmgAvg)
            },
            dmgAvg() {
                let dmg = this.dmgRoll.replace(/([+-][1-9d]*[^+-])/g, ".$1").split(/[.]/)
                let dmgAverage = 0

                for (let value of dmg) {
                    value = value.replace("+", "")

                    if (value.includes("d")) {
                        let operator = value.startsWith("-") ? -1 : 1
                        if (operator == -1) value = value.replace("-", "")
                        let dice = value.split("d")
                        if (dice[0] == "")
                            dmgAverage += operator * (0.95 * (Number.parseInt(dice[1]) / 2 + 0.5) + 0.05 * (Number.parseInt(dice[1]) + 1))
                        else
                            dmgAverage += operator * (0.95 * (Number.parseInt(dice[1]) / 2 + 0.5) + 0.05 * (Number.parseInt(dice[1]) + 1)) * Number.parseInt(dice[0])
                    }

                    else dmgAverage += Number.parseInt(value)
                }

                return dmgAverage
            },
            atkMod() {
                let atk = this.atkRoll.replace(/([+-][1-9d]*[^+-])/g, ".$1").split(/[.]/)
                let atkAverage = 0

                for (let value of atk) {
                    value = value.replace("+", "")

                    if (value.includes("d")) {
                        let operator = value.startsWith("-") ? -1 : 1
                        if (operator == -1) value = value.replace("-", "")
                        let dice = value.split("d")
                        if (dice[0] == "")
                            atkAverage += operator * (Number.parseInt(dice[1]) / 2 + 0.5)
                        else
                            atkAverage += operator * (Number.parseInt(dice[1]) / 2 + 0.5) * Number.parseInt(dice[0])
                    }

                    else atkAverage += Number.parseInt(value)
                }

                return atkAverage
            },
            dmgPerAttack() {
                let probability = (21 + this.atkMod - this.AC) / 20
                return this.dmgAvg * probability
            },
            dmgPerAttackSharpshooter() {
                let probability = (16 + this.atkMod - this.AC) / 20
                return (this.dmgAvg + 10) * probability
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        font-family: Arial, sans-serif;
    }
    .title {
        font-size: 30px;
    }
    div {
        padding: 10px;
    }
</style>