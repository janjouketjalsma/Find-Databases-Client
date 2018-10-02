<template>
    <div class="titleSearch">
        <b-row class="justify-content-md-center mb-2 mt-2">
            <b-col sm="auto">
                <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
            </b-col>
            <b-col col>
                <b-form-input type="text"
                              placeholder="Search databases by title"
                              :value="value"
                              @input="searchString = $event"
                ></b-form-input>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'TitleSearch',
  data: function () {
    return {
      searchString: ''
    }
  },
  props: ['value'],
  watch: {
    searchString: {
      handler: debounce(function (e) {
        this.$emit('input', this.searchString)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
