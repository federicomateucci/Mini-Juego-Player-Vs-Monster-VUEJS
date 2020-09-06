new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameInPlay: false,
        actionsLog: [], //es para registrar los eventos de la partida
        isPlayer: false,
        rangePlayerAttack: [3, 10],
        rangeplayerSpecialAttack: [10, 20],
        rangeMonsterAttack: [5, 12],
    },

    methods: {
       getHealth(anyHealth) {

            return `${anyHealth}%`

        },
        startMatch: function () {

            this.gameInPlay = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },

        playerAttack: function () {

            let damageToMonster = this.calculateDamage(this.rangePlayerAttack);
            this.monsterHealth-=damageToMonster;
            if( this.monsterHealth <= 0 ){
                let actionFatality = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageToMonster}%, has matado al mounstruo !!!!`}
                this.monsterHealth = 0;
                this.registerActionsInLog(actionFatality)
                this.checkWinner();
            }else{
                let actionPlayer = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageToMonster}%`}
                this.registerActionsInLog(actionPlayer)
                this.monsterAttack();
               // this.checkWinner();
            }
        },

        playerSpecialAttack: function () {

            let damageSpattack_ToMonster = this.calculateDamage(this.rangeplayerSpecialAttack)
            this.monsterHealth -= damageSpattack_ToMonster;
            if( this.monsterHealth <=0 ){
                this.monsterHealth = 0;
                let actionFatality = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageSpattack_ToMonster}%
                con tu ataque especial, has matado al mounstruo !!!!`}
                this.registerActionsInLog(actionFatality)
                setTimeout(() => {
                    this.checkWinner();    
                }, 500);
                
            }else { 
                this.monsterAttack();
            let event = {isPlayer: true, text:`Lanzas Ataque Especial, le has pegado al mounstruo por ${damageSpattack_ToMonster}% `}
            this.registerActionsInLog(event);
            this.checkWinner();
            }
            
            
          
        },

        cure: function () {
            this.playerHealth += 10;
            if(this.playerHealth >= 100) {
                this.playerHealth = 100;
                let topPlayerHealthWarning = {isPlayer: true, text:`No puedes seguir curandote, el mounstruo te va golpear por tardar en atacar..`}
                this.registerActionsInLog(topPlayerHealthWarning);
                this.monsterAttack();

            }else{
            let actionCureTrue = {isPlayer: true, text:`Has logrado curarte`}
            this.registerActionsInLog(actionCureTrue)
            }
        },

        registerActionsInLog(evento) {
            console.log(evento);
            this.actionsLog.unshift(evento);

        },

        endMatch: function () {
        
        this.actionsLog = [];
        this.gameInPlay = false;
     
        
        
       
        },

        monsterAttack: function () {

            let damageToPlayer = this.calculateDamage(this.rangeMonsterAttack);
            this.playerHealth-=damageToPlayer
            if(this.playerHealth <= 0){
                
                this.playerHealth = 0;
                let actionFatality = {isPlayer: false, text:`el mounstruo te ha pegado por ${damageToPlayer}, el mounstruo te ha matado !!!`}
                this.registerActionsInLog(actionFatality)
                this.playerHealth = 0;
                this.checkWinner();
                
                
            }else{
            let actionToLog = {isPlayer: false, text: `El mounstruo te ha pegado por ${damageToPlayer}% `}
            this.registerActionsInLog(actionToLog)
            this.checkWinner();
            }
        },

        calculateDamage: function (range) {
            let damage = Math.floor((Math.random() * range[1]) + range[0]);
            return damage;
         
        },
        checkWinner: function () {
            if(this.playerHealth == 0){
                alert(`El ganador es el Mounstruo `);
               
                this.endMatch();
                
            }else if(this.monsterHealth == 0){
                alert(`El ganador es el Jugador `);
                
                this.endMatch();
            }
            return false;
        },
        cssEvento(action) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-action': action.isPlayer,
                'monster-action': !action.isPlayer
            }
        }
    }
});