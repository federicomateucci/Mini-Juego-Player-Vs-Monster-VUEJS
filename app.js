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
            this.actionsLog = [];
        },

        playerAttack: function () {

            let damageToMonster = this.calculateDamage(this.rangePlayerAttack);
            this.monsterHealth-=damageToMonster;
            if( this.monsterHealth <= 0 ){
                let actionFatality = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageToMonster}%, has matado al mounstruo !!!!`}
                this.registerActionsInLog(actionFatality)
                this.monsterHealth = 0;
               
            }else{
                let actionPlayer = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageToMonster}%`}
                this.registerActionsInLog(actionPlayer)
                this.monsterAttack();
               
            }
            this.checkWinner();
        },

        playerSpecialAttack: function () {

            let damageSpattack_ToMonster = this.calculateDamage(this.rangeplayerSpecialAttack)
            this.monsterHealth -= damageSpattack_ToMonster;
            if( this.monsterHealth <=0 ){
                this.monsterHealth = 0;
                let actionFatality = {isPlayer: true, text:`Les has pegado al mounstruo por ${damageSpattack_ToMonster}%
                con tu ataque especial, has matado al mounstruo !!!!`}
                this.registerActionsInLog(actionFatality)
                
                
            }else { 
                this.monsterAttack();
            let event = {isPlayer: true, text:`Lanzas Ataque Especial, le has pegado al mounstruo por ${damageSpattack_ToMonster}% `}
            this.registerActionsInLog(event);
            }
            this.checkWinner();
        
            
          
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
         //   debugger;

        },resetHealth() {
            this.playerHealth = 0;
            this.monsterHealth = 0;

        },

        endMatch: function () {
        
        this.actionsLog = [];
        this.gameInPlay = false;
        this.resetHealth();
        
     
        
        
       
        },

        monsterAttack: function () {

            let damageToPlayer = this.calculateDamage(this.rangeMonsterAttack);
            this.playerHealth-=damageToPlayer
            if(this.playerHealth <= 0){
                let actionFatalityMonster = {isPlayer: false, text:`el mounstruo te ha pegado por ${damageToPlayer}
                , el mounstruo te ha matado !!!`}
                this.registerActionsInLog(actionFatalityMonster)
                this.playerHealth = 0;
                
                
                
                
                
            }else{
            let actionToLog = {isPlayer: false, text: `El mounstruo te ha pegado por ${damageToPlayer}% `}
            this.registerActionsInLog(actionToLog)
                }
            this.checkWinner();
        },

        calculateDamage: function (range) {
            let damage = Math.floor((Math.random() * range[1]) + range[0]);
            return damage;
         
        },
        checkWinner: function () {
            if(this.playerHealth <= 0){
                if(confirm('El ganador es el Mounstruo,jugar de nuevo? ')){
                    this.startMatch();
                }else{

                    this.endMatch();
                }
               
                
            }else if(this.monsterHealth <= 0){
                if(confirm(`El ganador es el Jugador, jugar otras vez ? `)){
                    this.startMatch()
                }else{

                    this.endMatch();
                }
                
            }
            
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