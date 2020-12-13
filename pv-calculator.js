const pvCalculator = Vue.createApp({
  data() {
    return {
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
      }
    }
  },
  computed: {
    yearlyBill() {
      return this.pvBill.monthlyBill * 12;
    } 
  },
  methods: {
    energyConsumption(months) {
      return Math.round((this.pvBill.monthlyBill / this.pvBill.energyPrice) * months);
    },
  }
});

pvCalculator.mount('#pv-calculator');
