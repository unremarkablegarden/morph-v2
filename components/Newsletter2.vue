<template lang='pug'>
#newsletter2.text-xs.lg-text-sm.lg-max-w-72
  .mailchimp.mt-8.lg-mt-20
    #mc_embed_signup
      form#mc-embedded-subscribe-form.validate(:action='mailchimp.action', method='post', name='mc-embedded-subscribe-form', novalidate, target='_blank')
        #mc_embed_signup_scroll
          div
            input#mce-EMAIL.required.email(name='EMAIL', type='email', placeholder='Enter your e-mail')
            input#mc-embedded-subscribe.button(name='subscribe', type='submit', value='Subscribe to our newsletter 💋').cursor-pointer
            
          #mce-responses.clear
            #mce-error-response.response(style='display: none;')
            #mce-success-response.response(style='display: none;')
          div(style='position: absolute; left: -5000px;', aria-hidden='true')
            input(tabindex='-1', :name='mailchimp.name', type='text')
          
</template>

<script>
export default {
  name: 'Newsletter2',
  data () {
    return {
      mailchimp: {
        action: 'https://film.us18.list-manage.com/subscribe/post?u=d8c8dfaa72758f5aac0f13c8e&id=b278b2e2a7&f_id=00e123e7f0',
        
      }
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
  color: black
  *
    font-family: 'f', sans-serif !important
    font-weight: normal
  #mc_embed_signup_scroll
    div
      display: flex
      flex-direction: column
    input
      padding: 0.5em
      min-width: 300px
      border: 2px black solid
      text-align: center
      background: transparent
      border-radius: 0
  #mc-embedded-subscribe
    margin-top: 0.5em
    color: white
    background: black !important
    border: 0
</style>