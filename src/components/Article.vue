<template>
    <div id="article">
        <transition-group name="list" tag="article" mode="out-in" class="row">
            <div class="col-6" v-for="article in articles" :key="article.id">
                <article class="article_item">
                    <div class="article_item__image_wrapper">
                        <picture>
                            <source media="(min-width: 768px)" :srcset="article.image.large">
                            <img :src="article.image.small" :alt="article.title"  class="article_item__picture img-fluid">
                        </picture>
         
                        <button @click="removeBookmark(article.id)" class="article_item__bookmark_button"><font-awesome-icon icon="star" /></button>
                    </div>

                    <h3 class="article_item__title">
                        {{ article.title }}
                    </h3>

                    <h4 class="article_item__subtitle">
                        {{ article.region }}
                    </h4>
                </article>
            </div>
        </transition-group >
    </div>
 </template>

<script>
    export default {
    name: 'Article',
    data() {
        return {
        articlesList: "test"
        }
    },
    methods: {
        removeBookmark (id) {
            this.$swal({
                title: "Delete bookmark?",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
            }).then(response => {
                if(response.value) {
                    const articles = this.$store.state.articleData
                    const removeObjectById = articles.filter(x => x.id === id);

                    articles.splice(removeObjectById, 1);
                    this.$store.commit('changeArticlesData', articles)
                }
            })
        }
    },
    computed: {
        articles () {
        return this.$store.state.articleData
        }
    }
    }
</script>

<style lang="scss" scoped>
    .article_item {
        text-align: center;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &__image_wrapper {
            position: relative;
            display: inline-block;
            margin-bottom: 10px;
        }

        &__bookmark_button {
            background: none;
            border: 0;
            color: $green;
            position: absolute;
            bottom: 5px;
            right: 5px;
            background: $white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
        }

        &__title {
            text-align: left;
            font-size: 1.1rem;
            margin-top: auto;

            @media screen and (min-width: 768px) {
                font-size: 1.5rem;
            }
        }

        &__subtitle {
            text-align: left;
            font-size: 1rem;
            color: $gray;
            margin-bottom: 40px;
        }
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active, 
    .list-leave-active {
        transition: all 1s;
    }
    
    .list-enter, 
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
     }
</style>
