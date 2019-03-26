<template>
  <div id="articleList">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="title">Bookmarked articles</h1>

          <h2 class="article_count">
            <span class="article_count__number">{{ articleCount }}</span>
            items
          </h2>
        </div>
      </div>
      
      <Article />

      <section v-if="errored" class="alert alert-danger">
        <p>{{ errorMessage }}</p>
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Article from './Article.vue'

  export default {
    name: 'articleList',
    data() {
      return {
        errored: false,
        errorMessage: ""
      }
    },
    components: {
      Article
    },
    methods: {
      getArticles: function() {
        axios.get('https://api.matcha-jp.com/article?lang_id=2&article_ids=7034%2C7189%2C6847%2C6310%2C3704&token=dda737af9ab38bf56c527c277248b622')
        .then(response => {
          let mappingResultsData = [];

          response.data.data.map(function(line) {
            const dataArray = {
              id: line.article_id,
              title: line.title,
              image: line.image,
              region: line.region.child.name
            };

            mappingResultsData.push(dataArray);
          });

          this.$store.commit('changeArticlesData', mappingResultsData)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
          this.errorMessage = "We're sorry, we're not able to retrieve this information at the moment, please try again later."
        });
      },
    },
    computed: {
        articleCount() {
          const data = this.$store.state.articleData

          return Object.keys(data).length
        }
    },
    mounted () {
      this.getArticles()
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 1.5rem;
    border-bottom: 1px solid $gray;
    text-align: center;
    padding: 10px 0;
  }

  .article_count {
    font-size: 1.3rem;
    color: $black;
    margin-right: 5px;
    margin-bottom: 10px;
    margin: 5px 0 13px 0;

    &__number {
      color: $green;
      font-size: 1.8rem;
    }
  }
</style>