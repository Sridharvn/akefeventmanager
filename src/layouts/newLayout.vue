<template>
  <q-layout view="hHh lpR fFf">
    <div class="logo">
      <q-img src="./../assets/AKEF-LOGO-BLACK-SQR.png" ratio="1"></q-img>
    </div>
    <q-page-container style="background-color:background">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <!-- <q-toolbar>
        <q-toolbar-title> -->
      <div id="footerText">Cybernet Developers</div>
      <!-- </q-toolbar-title>
      </q-toolbar> -->
    </q-footer>

  </q-layout>
</template>
<style lang="scss" scoped>
.q-img {
  height: 60px;
  width: 200px;
  // background-color: white;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background;
}

#footerText {
  text-align: center;
  font-size: 12px;
  color: $textcoloralternate;
  background-color: $dark;
}
</style>
