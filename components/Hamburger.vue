<template>
  <div :class='{ invert: invert && !hamburgerOpen }'>
    <div class="hamburger z-30" @click="hamburgerOpen = !hamburgerOpen" :class="hamburgerOpen ? 'hamburger--is-open' : ''">
      <div class="hamburger__item hamburger__item--first"></div>
      <div class="hamburger__item hamburger__item--middle"></div>
      <div class="hamburger__item hamburger__item--last"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hamburgerOpen: false
    }
  },
  props: ['invert'],
  watch: {
    '$route' (to, from) {
      this.hamburgerOpen = false
    },
    hamburgerOpen () {
      // console.log(this.hamburgerOpen)
      this.$nuxt.$emit('menu-open', this.hamburgerOpen)
    }
  },
  mounted () {
    // this.$nuxt.$on('menu-close', () => {
    //   this.hamburgerOpen = false
    // })
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/responsive.sass'

+sm
  .hamburger
    transform: scale(0.66)
</style>

<style lang="scss" scoped>
/* $md: 768px; */

$height: 30px;
/* $heightMobile: 20px; */
$color: black;
.invert {
  transition: 300ms filter ease;
  filter: invert(100);
}
.hamburger {
  height: $height;
  width: calc($height * 1.178571429);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    cursor: pointer;
  }
  
  &__item {
    height: calc($height * 0.142857143);
    width: 100%;
    background: $color;
    transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
opacity 300ms linear;
    
    &--first {
      .hamburger--is-open & {
        transform: translate(0, calc($height * 0.428571429)) rotate(45deg);
      }
    }
    
    &--middle {
      .hamburger--is-open & {
        transform: rotateY(90deg);
        transform-origin: center center;
      }
    }
    
    &--last {
      .hamburger--is-open & {
        transform: translate(0, calc($height * 0.428571429 * -1)) rotate(-45deg);
      }
    }
  }
}
</style>