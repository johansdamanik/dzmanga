<template>
  <button class="w-full h-12 bg-violet-300 mb-3 rounded-lg font-semibold" @click.prevent="handleDonate">DONATE ❤️</button>
</template>

<script>
import { mapActions } from 'pinia';
import { useMangaStore } from '../stores/manga';

export default {
  name: 'Donation',
  computed: {
    userEmail() {
      return localStorage.userEmail;
    },
  },
  methods: {
    ...mapActions(useMangaStore, ['donationPayment']),
    async handleDonate() {
      try {
        if (!localStorage.userEmail) throw { name: 'Login First' };
        Swal.fire({
          title: 'DONATE TO DZMANGA ❤️',
          html:
            '<label for="user-email" class="block text-gray-700 font-bold mb-2">Your email:</label>' +
            `<label for="user-email" class="block text-gray-700 font-semibold mb-3">${this.userEmail}</label>` +
            '<label for="user-donation" class="block text-gray-700 font-bold mb-2">Donation amount:</label>' +
            '<input type="number" id="user-donation" class="border rounded px-3 py-2" placeholder="Enter donation amout">',
          showCancelButton: true,
          confirmButtonText: 'Add',
          confirmButtonColor: 'bg-violet-400 hover:bg-violet-300',
          cancelButtonText: 'Cancel',
          focusConfirm: false,
          preConfirm: () => {
            const userEmail = this.userEmail;
            const donationAmount = document.getElementById('user-donation').value;
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!donationAmount) {
              Swal.showValidationMessage(`Please insert donation amount.`);
            } else if (donationAmount < 50000) {
              Swal.showValidationMessage(`We're sorry, the minimum donation is 50000. Our team has been living on instant noodles for weeks. We are BEGGING you.😉`);
            } else {
              return { userEmail: userEmail, donationAmount: donationAmount };
            }
          },
        }).then((result) => {
          if (result.value) {
            const email = result.value.userEmail;
            const donationAmount = result.value.donationAmount;
            this.donationPayment(email, donationAmount);
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Please sign in through chat box first.',
          timer: 2000,
          width: 600,
        });
      }
    },
  },
};
</script>

<style></style>
