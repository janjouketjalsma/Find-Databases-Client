<template>
    <div class="FindDatabases">
        <b-container>
            <!-- Title -->
            <h1>Find Databases</h1>

            <!-- Logo -->
            <img src="../assets/logo.png">

            <!-- Title search box -->
            <title-search @searchStringUpdated="handleSearchString($event)"/>

            <!-- Alphanumeric buttons -->
            <b-row no-gutters class="bg-primary mb-3">
                <b-button @click="searchProperties.startsWith = null"  variant="primary text-white" >
                    All
                </b-button>
                <b-col v-for="alpha in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')">
                    <b-button @click="searchProperties.startsWith = alpha" variant="primary text-white" >
                        {{alpha}}
                    </b-button>
                </b-col>
            </b-row>

            <b-row>
                <!-- Categories facet -->
                <b-col cols="3">
                    <h2>Categories</h2>
                    <b-list-group>
                        <b-list-group-item @click="searchProperties.category = category.name" :key="category.name" v-for="category of categories">{{category.name}}</b-list-group-item>
                    </b-list-group>
                </b-col>

                <!-- Result container -->
                <b-col>

                    <b-row>
                        <!-- Breadcrumbs -->
                        <b-col>
                            <h4>
                                <!-- @todo show currently selected category (+ subcategory) here -->
                                    Browse
                            </h4>
                        </b-col>

                        <!-- Database type filter -->
                        <b-col>
                            <b-form-select v-model="searchProperties.type" class="mb-3" size="sm">
                                <option :value="null">Please select an option</option>
                                <option :value="type.name" v-for="type in types">{{type.name}}</option>
                            </b-form-select>
                        </b-col>
                    </b-row>

                    <!-- Separator -->
                    <hr class="mt-1">

                    <!-- @todo show active filters here (except for category) -->

                    <!-- Database results -->
                    <b-list-group v-if="databases && databases.length">
                        <b-list-group-item v-for="database of databases">
                            {{database.title}}
                        </b-list-group-item>
                    </b-list-group>

                    <ul v-if="errors && errors.length">
                        <li v-for="error of errors">
                            {{error.message}}
                        </li>
                    </ul>
                </b-col>
            </b-row>
        </b-container>

    </div>

</template>

<script>
import axios from 'axios'
import TitleSearch from '@/components/TitleSearch'
import clean from 'lodash-clean'

function getData () {
  console.log("getting data");
  let config = {};
  config.params = clean(this.searchProperties)
  axios.get(`https://databases.library.leiden.edu/api/v1/databases?format=json&getfacets=all`, config)
    .then(response => {
      let responseData = response.data
      // JSON responses are automatically parsed.
      if (responseData.databases) {
        this.databases = responseData.databases
      }

      if (responseData.facets) {
        if (responseData.facets.categories) {
          this.categories = response.data.facets.categories
        }
        if (responseData.facets.keywords) {
          this.keywords = response.data.facets.keywords
        }
        if (responseData.facets.types) {
          this.types = response.data.facets.types
        }
      }
    })
    .catch(e => {
      this.errors.push(e)
    })
}

export default {
  name: 'FindDatabases',
  components: {TitleSearch},
  data () {
    return {
      databases: [],
      categories: [],
      keywords: [],
      types: [],
      errors: [],
      searchProperties: {
        contains: null,
        startsWith: null,
        type: null,
        category: null,
        subcategory: null
      }
    }
  },
  created: getData,
  methods: {
    handleSearchString: function (e) {
      this.searchProperties.contains = e
    }
  },
  watch: {
    searchProperties: {
      handler: getData,
      deep: true
    }
  },
  component: TitleSearch
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>