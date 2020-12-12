const pvCalculator = Vue.createApp({
  data() {
    return {
      pvBill: {
        monthlyBill: 300,
        energyPrice: 0,
        operators: [
          { name: 'PGE', energyPrice: '0.64' },
          { name: 'Enea', energyPrice: '0.59' },
          { name: 'Energa', energyPrice: '0.67' },
          { name: 'Tauron', energyPrice: '0.60' },
          { name: 'Innogy', energyPrice: '0.58' },
        ]
      }
    }
  },
  methods: {
    calculation() {
      console.log('CALCULATION');
    }
  }
});

pvCalculator.mount('#pv-calculator');
