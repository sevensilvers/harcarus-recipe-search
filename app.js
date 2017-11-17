new Vue({
  el: '#app',
  data: {
    search: '',
    help: "We'll help you find the recipe you enter here!",
    originalHelp: "We'll help you find the recipe you enter here!",
    recipes: []
  },
  watch: {
    search: function(val, oldVal) {
      //console.log('new: %s, old: %s', val, oldVal)
      this.help = 'Waiting for you to stop typing...'
      this.getRecipe()
    }
  },
  methods: {
    getRecipe: _.debounce(function() {
      var vm = this
      vm.help = 'Searching the recipes of ' + vm.search + '...'
      axios.get('https://api.edamam.com/search', {
        params: {
          q: this.search,
          app_id: '9bd7092e',
          app_key: '20c7446ff767e0d38a9f305a531c6975'
        }
      }).then(function(results) {
        vm.help = vm.originalHelp
        vm.recipes = results.data.hits
      })
    }, 500)
  }
})
