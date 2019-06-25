import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      countries: [],
      totalPop: 0,
      country: {},
      neighbours: [],
      favourites: []
    },
    mounted() {
      this.fetchCountries();
    },
    computed: {
    },
    methods: {
      fetchCountries: function () {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => {data.forEach(country => this.countries.push({
          name: country.name,
          population: country.population,
          flag: country.flag,
          borders: country.borders,
          alpha3Code: country.alpha3Code
        })); console.log(data);});
        this.calculateTotalPopulation();
      },
      calculateTotalPopulation: function () {
        this.totalPop = this.countries.reduce((total, country) => total + country.population, 0);
      },
      getNeighbours: function () {
        this.neighbours = this.country.borders.map(border => this.countries.find(country => country.alpha3Code === border));
      },
      showInfo: function (index) {
        this.country = this.countries[index];
        this.getNeighbours();
      },
      addToFavourite: function (index) {
        this.favourites.push(this.countries[index]);
      },
    }
  })
})
