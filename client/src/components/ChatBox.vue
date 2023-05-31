<template>
  <div class="text-sm text-gray-900 dark:text-gray-100">
    <div class="rounded-t-lg bg-white p-2 dark:bg-neutral-800 flex justify-between items-center">
      <h1><strong>CHAT BOX</strong></h1>
      <div v-if="isLogin" class="login bg-red-400 hover:bg-red-500 rounded-lg p-1 px-2">
        <button class="text-white hover:text-white" @click="signOut">Sign Out</button>
      </div>
      <button v-else class="bg-green-400 hover:bg-green-600 rounded-lg p-1 px-2" @click="signIn">Sign in</button>
    </div>

    <div class="chat-box h-80 overflow-y-scroll bg-white dark:bg-neutral-800 my-1 py-2 scrollbar-thumb-violet-400 scrollbar-thin scrollbar-rounded-md" style="max-height: 60vh" ref="messageContainer">
      <div class="">
        <div class="m-2">
          <div v-for="{ id, text, userPhotoURL, userName, userId } in messages" :key="id">
            <div class="message my-2">
              <span class="text-xs" v-if="userId !== user?.uid">{{ userName }}</span>
              <div class="flex" :class="userId === user?.uid ? 'flex-row-reverse' : ''">
                <img :src="userPhotoURL" alt="" class="h-6 w-6 rounded-full m-1" referrerpolicy="no-referrer" />
                <div class="text w-3/4 rounded-lg p-1" :class="userId === user?.uid ? 'bg-violet-400' : 'bg-gray-200 dark:bg-neutral-600'">{{ text }}</div>
              </div>
              <div ref="bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <form @submit.prevent="send" class="flex items-center justify-between">
        <input :disabled="!isLogin" v-model="message" :placeholder="!isLogin ? 'Sign in to chat' : 'Message'" required class="flex-grow dark:bg-neutral-800 dark:text-gray-100 rounded-bl-lg px-2 py-1 mr-1 border dark:border-neutral-800" />
        <button type="submit" class="bg-violet-400 text-white px-4 h-7 rounded-br-lg flex items-center">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-auto w-4">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import { useAuth, useChat } from '@/firebase';

export default {
  watch: {
    messages: {
      handler(messages) {
        this.$nextTick(() => {
          const container = this.$el.querySelector('.chat-box');
          container.scrollTop = container.scrollHeight - container.clientHeight;
        });
      },
      deep: true,
    },
  },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth();
    const { messages, sendMessage } = useChat();

    const message = ref('');
    const send = () => {
      sendMessage(message.value);
      message.value = '';
    };

    return { user, isLogin, messages, message, send, signOut, signIn };
  },
};
</script>
