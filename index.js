var app = new Vue({
  el: '#app',
  data: {
    apiUrl: 'https://o1cs6oqfgb.execute-api.us-east-2.amazonaws.com/prod/business',
    apiKey: '',
    yelpKey: '',
    query: '',
    zip: '',
    selected: ''
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
        this.jsonToCSV(data.body);
      })

    },

    jsonToCSV: function(apiJson) {
      var today = new Date().toISOString().slice(0, 10)
      var csvName = `${this.query}_${this.zip}_${today}.csv`;

      const dataObject = apiJson.map(row => ({
        name: row.name,
        url: row.url,
        categories: row.categories.map(category => category.title),
        rating: row.rating,
        review_count: row.review_count,
        display_phone: row.display_phone,
        address: row.Address1
      }));

      const objToCSV = function(data) {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        for (const row of data) { 
          const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
          });
         csvRows.push(values.join(',')); 
        }
        const output = csvRows.join('\n');
        return output;
      }

      const download = function(data, filename) {
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      const csvData = objToCSV(dataObject);
      download(csvData, csvName);
    }
  }
})

