const pvCalculator = Vue.createApp({
  data() {
    return {
      energyBackFromGrid: 0.8,
      energyReserveRatio: 1.4,
      energyYearPerKw: 955,
      pvBill: {
        monthlyBill: 300,
        energyPrice: 0.64,
        operators: [
          { name: 'PGE', energyPrice: 0.64 },
          { name: 'Enea', energyPrice: 0.59 },
          { name: 'Energa', energyPrice: 0.67 },
          { name: 'Tauron', energyPrice: 0.60 },
          { name: 'Innogy', energyPrice: 0.58 },
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
          { on: 'dachówke ceramiczną', cost: 1.05 },
          { on: 'blachodachówkę', cost: 1 },
          { on: 'płytę betonową', cost: 0.9 },
          { on: 'gont dachowy', cost: 0.95 },
          { on: 'inny materiał', cost: 1.1 },
        ],
        orientationSunProfit: 0.95,
        installationOrientation: [
          { direction: 'Wschód (E)', sunProfit: 0.6 },
          { direction: 'Zachód (W)', sunProfit: 0.6 },
          { direction: 'Południe (S)', sunProfit: 0.95 },
          { direction: 'Południowy Wschód (SE)', sunProfit: 0.8 },
          { direction: 'Południowy Zachód (SW)', sunProfit: 0.9 },
          { direction: 'Północ (N)', sunProfit: 0.4 },
          { direction: 'Północny Wschód (NE)', sunProfit: 0.5 },
          { direction: 'Północny Zachód (NW)', sunProfit: 0.5 },
        ],
        installationPerformance: 0.95,
        installationTilt: [
          { percent: '15%', performance: 0.85 },
          { percent: '30%', performance: 0.95 },
          { percent: '45%', performance: 0.9 },
          { percent: '60%', performance: 0.7 },
          { percent: '75%', performance: 0.6 },
        ],
      },
      pvInstallation: {
        invertersPower: [0.1,0.3,0.8,1.2,2,3.2,4,5,6,8,10,12,15,20,25,30,40,50,60,80],
        pvModule: { power: 330, height: 1.665, width: 1.005, costPerKw: 3600 },
        pvModules: [
          { power: 280, height: 1.650, width: 0.992, costPerKw: 3450 },
          { power: 330, height: 1.665, width: 1.005, costPerKw: 3600 },
          { power: 365, height: 1.825, width: 1.005, costPerKw: 3790 },
          { power: 390, height: 1.990, width: 1.005, costPerKw: 4050 },
          { power: 440, height: 2.115, width: 1.052, costPerKw: 4130 },
          { power: 480, height: 2.115, width: 1.052, costPerKw: 4250 },
        ],
        subsidies: [
          { active: false, name: 'Z dotacją Mój prąd', discount: 5150 },
          { active: false, name: 'Z dotacją Czyste powietrze', discount: 4950 },
        ]
      }
    }
  },
  computed: {
    yearlyBill() {
      return this.pvBill.monthlyBill * 12;
    },
    installationPower() {
      return ((this.energyConsumption(12) * (this.energyBackFromGrid * this.energyReserveRatio)) / 1000).toFixed();
    },
    inverterPower() {
      return this.pvInstallation.invertersPower.filter((power) => power <= (this.installationPower)).pop();
    },
    numberOfModules() {
      return Math.ceil((this.installationPower * 1000) / this.pvInstallation.pvModule.power);
    },
    installationArea() {
      return (this.pvInstallation.pvModule.height * (this.pvInstallation.pvModule.width * this.numberOfModules)).toFixed(2);
    },
    yearProduction() {
      return (this.installationPower * this.energyYearPerKw * (this.pvParameters.orientationSunProfit * this.pvParameters.installationPerformance)).toFixed();
    },
    installationCost() {
      return ((this.installationPower * this.pvInstallation.pvModule.costPerKw * this.pvParameters.mountedCost) * ((this.pvParameters.installationTax / 100) + 1)).toFixed();
    },
    installationCostAfterGrant() {
      return this.installationCost - this.pvInstallation.subsidies.filter(grant => grant.active).reduce((discounts, grant) => discounts + grant.discount, 0);
    },
    yearlyPvBill() {
      const bill = ((this.energyConsumption(12) - this.yearProduction) * this.pvBill.energyPrice).toFixed(2);
      return (bill > 0) ? bill : 0;
    }
  },
  methods: {
    energyConsumption(months) {
      return Math.round((this.pvBill.monthlyBill / this.pvBill.energyPrice ) * months);
    }
  }
});

pvCalculator.mount('#pv-calculator');
