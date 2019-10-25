
<template>
  <div class="post-page">
    <PostList :posts = "loadedPosts"/>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
