<template lang='pug'>
#newsletter2.text-sm
  //- .close
    img(src='https://morph.film/app/uploads/2020/06/close.png')
  .mailchimp.mt-20
    #mc_embed_signup
      form#mc-embedded-subscribe-form.validate(action='https://film.us18.list-manage.com/subscribe/post?u=d8c8dfaa72758f5aac0f13c8e&id=f2f3fbdc57', method='post', name='mc-embedded-subscribe-form', novalidate, target='_blank')
        #mc_embed_signup_scroll
          div
            input#mce-EMAIL.required.email(name='EMAIL', type='email', placeholder='E-mail').mb-1
            input#mc-embedded-subscribe.button(name='subscribe', type='submit', value='Subscribe to newsletter').cursor-pointer
            
            //- input#mc-embedded-close.button(name='close', type='button', value='Close', @click='hideIt').bg-white.cursor-pointer
            
          #mce-responses.clear
            #mce-error-response.response(style='display: none;')
            #mce-success-response.response(style='display: none;')
          div(style='position: absolute; left: -5000px;', aria-hidden='true')
            input(tabindex='-1', name='b_d8c8dfaa72758f5aac0f13c8e_f2f3fbdc57', type='text')
          
</template>

<script>
export default {
  name: 'Newsletter2',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang='sass'>
#newsletter2
  padding: 0
  margin: 0
  max-width: 300px
  // background: white
  // border: 3px black solid
  // display: inline-block
  // padding: 2em 1em 1.1em
  // position: fixed
  // z-index: 50
  // top: 150vh
  // left: 50vw
  // +touch
    // top: 127vh
  // transform: translate(-50%, -50%)
  color: black
  // transition: all 700ms ease
  // .close
  //   float: right
  //   position: relative
  //   // top: -30px
  //   right: -28px
  //   top: 2px
  //   cursor: pointer
  //   img
  //     width: 20px
  //     height: auto
  *
    font-family: 'f', sans-serif !important
    font-weight: normal
  // &.open
  //   top: 50vh
  #mc_embed_signup_scroll
    div
      display: flex
      flex-direction: column
    input
      padding: 0.5em
      min-width: 300px
      border: 2px black solid
      // +touch
        // min-width: 250px
      text-align: center
  #mc-embedded-subscribe
    margin-top: 0.5em
    color: white
    background: black
    border: 0
</style>