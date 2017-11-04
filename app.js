var vm = new Vue({
  el: '#app',
  data: {
    players: [
      {
        name: 'Player 1',
        life: 100,
        turn: 'x',
        win: false,
        alive: true
      },
      {
        name: 'Monster',
        life: 100,
        turn: 'y',
        win: false,
        alive: true
      }
    ],
    typeAttack: {
      normal: 10,
      hard: 20
    },
    gameIsRunning: false,
    attackOnce: false,
    notifications: [],
    classObject: 'player-turn'
  },
  computed: {
    getPlayer: function () {
      return this.players[0];
    },
    getMonster: function () {
      return this.players[1];
    },
    getPlayerAttackFrom: function (turn) {
      this.players.find(player => player.turn === turn);
    }
  },
  methods: {
    startNewGame: function () {
      this.gameIsRunning = true;
      this.players.map(player => {
        player.life = 100
        player.win = false;
        player.alive = true;
      })
      this.notifications = [];
    },
    attack: function (typeAttack, turn) {
      this.playerAttackFrom = this.players.find(player => player.turn === turn);
      let playerAttackTo = this.players.find(player => player.turn !== turn);
      playerAttackTo.life -= typeAttack;
      if (this.playerAttackFrom !== 'x') {
        this.classObject = 'monster-turn'
      }
      this.damageTurnMessage(this.playerAttackFrom, playerAttackTo, typeAttack)
      if (playerAttackTo.life <= 0) {
        this.gameIsRunning = false;
        this.playerAttackFrom.win = true;
        alert(`${this.playerAttackFrom.name} won`);
      }
      if (!this.attackOnce && !this.playerAttackFrom.win) {
        this.ramdonMonsterAttack();
      }
      this.attackOnce = false;
    },
    isAlive: function (turn) {
      let checkPlayer = this.players.find(player => player.turn === turn);
      return checkPlayer.alive
    },
    ramdonMonsterAttack: function () {
      let ramdonTypeAttack = Object.keys(this.typeAttack)[Math.floor(Math.random() * Object.keys(this.typeAttack).length)];
      this.attackOnce = true;
      this.attack(this.typeAttack[ramdonTypeAttack], 'y');
    },
    heal: function () {
      let player = this.getPlayer;
      let heal = (player.life <= 90) ? player.life += 10 : player.life = 100
      return heal;
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    damageTurnMessage: function (from, to, damage) {
      return this.notifications.push(`${from.name} hits ${to.name} for ${damage}`)
    }
  }
})