function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner:null,
            messageLog:[]
        }
    },
    watch:{
        playerHealth(value){
            if(value <=0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(value <=0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <=0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(value <=0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        addLogMessage(who,what,value){
            this.messageLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        },

        attackMonster(){
            const attackValue = getRandomValue(5,12)
            this.monsterHealth -= attackValue
            this.attackPlayer()
            this.currentRound++
            this.addLogMessage('player','attack',attackValue)
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15)
            this.playerHealth -= attackValue
            this.addLogMessage('monster','attack',attackValue)
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10,25)
            this.monsterHealth -= attackValue
            this.attackPlayer()
            this.currentRound++
            this.addLogMessage('player','special-attack',attackValue)
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(12,14);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.attackPlayer()
            this.addLogMessage('player','heal',healValue)
        },
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.messageLog = [];
        },
        surrender(){
            this.winner = 'monster'
            this.addLogMessage('player','surrender')
        }
    },
    computed:{
        monsterBarStyle(){
            if(this.monsterHealth <= 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'} 
        },
        playerBarStyle(){
            if(this.playerHealth <= 0){
                return {width: '0%'}
            }
            return{width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }
    }
})
    app.mount('#game')