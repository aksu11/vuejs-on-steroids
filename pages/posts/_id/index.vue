<template>
  <div class="single-post-page">
    <section class="post">
      <h1>{{loadedPost.title}}</h1>
      <div class="post-details">
        <div>Last updated {{loadedPost.updatedDate}}</div>
        <div class="written">Written by {{loadedPost.author}}</div>
      </div>
      <p class="post-content">{{loadedPost.content}}</p>
      <section class="post-feedback">
        <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@my-awesome-domain.com">feedback@my-awesome-domain.com</a></p>
      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData(context) {
    console.log(context.params.id)
    return axios.get( process.env.baseUrl + '/posts/' + context.params.id + '.json')
    .then(res => {
      return {loadedPost: res.data}
    })
    .catch(e => context.error(e))
  },
  head: {
    title: 'Blog post'
  }
}
</script>


<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-content {
  margin-top: 5px;
  margin-bottom: 20px;
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

.written {
  margin-left: 3em;
}

</style>
