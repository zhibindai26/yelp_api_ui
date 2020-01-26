var app = new Vue({
  el: '#app',
  data: {
    apiUrl: 'https://o1cs6oqfgb.execute-api.us-east-2.amazonaws.com/prod/business',
    apiKey: '',
    yelpKey: '',
    query: '',
    zip: '',
    selected: '',
    yelpData: null
  },
  methods: {
    getBusinesses: function () {
      const url = `${this.apiUrl}?yelp_key=${this.yelpKey}&query=${this.query}&zip=${this.zip}&radius=${this.selected}`;

      fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": this.apiKey
        }
      })
      .then(response => response.json())
      .then(data => {
        this.yelpData = data.body;
        console.log(this.yelpData);
      })
    }
  }
})
