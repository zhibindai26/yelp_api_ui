var app = new Vue({
  el: '#app',
  data: {
    api_key: '',
    yelp_key: '',
    query: '',
    zip: '',
    selected: ''
  },
  methods: {
    processForm: function () {
      console.log({ api_key: this.api_key, yelp_key: this.yelp_key, query: this.query, zip: this.zip, selected: this.selected });
    }
  }
})