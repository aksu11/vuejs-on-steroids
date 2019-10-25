import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      setToken(state, token){
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context){
        try {
          const res = await axios.get( process.env.baseUrl + '/posts.json')
          const postsArray = []
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray);
        }
        catch (e) {
          return context.error(e);
        }
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost(vuexContext, post){
        const createdPost = {...post, updatedDate: new Date()}
        return axios.post( process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createdPost)
        .then(result => {
          vuexContext.commit('addPost', {...createdPost, id: result.data.name})
        })
        .catch(e => console.log(e))
      },
      editPost(vuexContext, editedPost){
        editedPost.updatedDate = new Date()
        return axios.put( process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
        .then(res => {
          vuexContext.commit('editPost', res.data)
          })
        .catch(e => console.log(e))
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey
        if(!authData.isLogin) {
          authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
        } 
        axios.post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(result => {
          vuexContext.commit('setToken', result.data.idToken)
          localStorage.setItem('token', result.data.idToken)
          localStorage.setItem('tokenExpiration', new Date().getTime() + result.data.expiresIn * 1000)
          Cookie.set('jwt', result.data.idToken)
          Cookie.set('expirationDate', new Date().getTime() + result.data.expiresIn * 1000)
          this.$router.push('/admin')
        })
        .catch(e => console.log(e))
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate

        if(req) {
          if(!req.headers.cookie) return
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if(!jwtCookie) return
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim()
            .startsWith('expirationDate=')).split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if(process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      // singlePost(state, id) {
      //   const post = state.loadedPosts.find(p => p.id == id)
      //   return post
      // },
      isAuthenticated(state){
        return state.token != null
      }
    }
  })
}

export default createStore