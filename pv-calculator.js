const pvCalculator = Vue.createApp({
  data() {
    return {
      energyBackFromGrid: 0.8,
      energyReserveRatio: 1.4,
      pvBill: {
        monthlyBill: 300,
        energyPrice: 0.64,
        operators: [
          { name: 'PGE', energyPrice: '0.64' },
          { name: 'Enea', energyPrice: '0.59' },
          { name: 'Energa', energyPrice: '0.67' },
          { name: 'Tauron', energyPrice: '0.60' },
          { name: 'Innogy', energyPrice: '0.58' },
        ]
      },
      pvParameters: {
        installationTax: 8,
        installationPlace: [
          { place: 'budynek mieszkalny', tax: 8 },
          { place: 'garaż poza domem', tax: 23 },
          { place: 'inny budynek', tax: 23 },
          { place: 'konstrukcja na gruncie', tax: 23 },
        ],
        mountedCost: 1,
        installatioMounted: [
          { on: 'dachówke ceramiczną', cost: 1.1 },
          { on: 'blachodachówkę', cost: 1 },
          { on: 'płytę betonową', cost: 0.8 },
          { on: 'gont dachowy', cost: 0.9 },
          { on: 'inny materiał', cost: 1.2 },
        ],
        orientationSunProfit: 1,
        installationOrientation: [
          { direction: 'Wschód (E)', sunProfit: 0.7 },
          { direction: 'Zachód (W)', sunProfit: 0.7 },
          { direction: 'Południe (S)', sunProfit: 1 },
          { direction: 'Południowy Wschód (SE)', sunProfit: 0.8 },
          { direction: 'Południowy Zachód (SW)', sunProfit: 0.9 },
          { direction: 'Północ (N)', sunProfit: 0.5 },
          { direction: 'Północny Wschód (NE)', sunProfit: 0.6 },
          { direction: 'Północny Zachód (NW)', sunProfit: 0.6 },
        ],
        installationPerformance: 1,
        installationTilt: [
          { percent: '15%', performance: 0.7 },
          { percent: '30%', performance: 1 },
          { percent: '45%', performance: 0.9 },
          { percent: '60%', performance: 0.8 },
          { percent: '75%', performance: 0.6 },
        ],
      },
      pvInstallation: {
        invertersPower: [0.3,1.2,2,3.2,4,5,6,8,10,12,15,20,25,30,40,50,60,80],
        pvModule: { power: 335, height: 0.34, width: 0.98 },
        pvModules: [
          { power: 280, height: 0.34, width: 0.98 },
          { power: 335, height: 0.34, width: 0.98 },
          { power: 350, height: 0.34, width: 0.98 },
          { power: 380, height: 0.34, width: 0.98 },
          { power: 425, height: 0.34, width: 0.98 },
        ]
      }
    }
  },
  computed: {
    yearlyBill() {
      return this.pvBill.monthlyBill * 12;
    },
    installationPower() {
      return ((this.energyConsumption(12) * (this.energyBackFromGrid * this.energyReserveRatio)) / 1000).toFixed(3);
    },
    inverterPower() {
      return this.pvInstallation.invertersPower.filter((power) => power <= (this.installationPower)).pop();
    },
    numberOfModules() {
      return Math.ceil((this.installationPower * 1000) / this.pvInstallation.pvModule.power);
    },
    installationArea() {
      return (this.pvInstallation.pvModule.height * (this.pvInstallation.pvModule.width * this.numberOfModules)).toFixed(2);
    }
  },
  methods: {
    energyConsumption(months) {
      return Math.round((this.pvBill.monthlyBill / this.pvBill.energyPrice ) * months);
    }
  }
});

pvCalculator.mount('#pv-calculator');
