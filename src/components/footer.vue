<template>
  <div class="footer menuText">
    <div class="footCon" v-bind:style="{ fontSize: ($mq == 'sm') ? '16px' : '18px' }">
      © OLIVER HICKMAN MUSIC {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<style>
.footer {
  grid-row: footer;
  background-color: #b3b4b4;
  display: inline-grid;
  height: 42px;
  margin-top: -6px;
}
.footCon {
  align-self: center;
  justify-self: center;
}
</style>
