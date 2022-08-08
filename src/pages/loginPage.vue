<template>
  <div id="bg" class="full-width column justify-center items-center content-center">
    <div class="full-width column justify-center items-center content-center">
      <!-- <q-input outlined v-model="Username" label="Username" />
      <br>
      <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="Password">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input> -->
      <br>
      <!-- Login Button -->
      <q-btn id="loginButton" @click="login">Login with Google</q-btn>
      <!-- Don't delete the below comment...used to call firebase login fn -->
      <!-- <q-btn id="loginButton" @click="login"> Login </q-btn> -->
    </div>
  </div>
</template>
<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from './../firebase';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { db, app } from '../firebase';

const router = useRouter()

const Username = ref('');
const password = ref('');
const isPwd = ref(true);
function login() {
  const auth = getAuth(app);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user);
      // ...
      router.push('/todos')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
onMounted(() => {
  const auth = getAuth();
  console.log(auth.currentUser);
  auth.onAuthStateChanged(user => {
    if (user) {
      router.push('/todos')
    }
  })
})
</script>
<style lang="scss" scoped>
#loginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
  text-align: center;
  cursor: pointer;
  width: 150px;
}

#bg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
  width: 95vw;
}

.q-input {
  width: 200px;
}
</style>
