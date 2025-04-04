<template>
    <!-- Backdrop Transition -->
    <transition name="fade">
        <div v-if="showWithdraw"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <!-- Modal Content Transition -->
            <transition name="scale">
                <div v-if="showWithdraw"
                    class="bg-gray-800 border border-gray-700 rounded p-6 w-full max-w-lg mx-auto shadow-xl text-gray-100">
                    <h2 class="text-xl font-semibold mb-6">Withdraw Funds</h2>

                    <form @submit.prevent="submitWithdraw">
                        <!-- Amount Input -->
                        <div class="mb-4">
                            <label class="block text-sm text-gray-300 font-medium mb-1">Amount</label>
                            <input type="number" v-model.number="amount" placeholder="Amount"
                                class="w-full bg-gray-900 text-white rounded border border-gray-700 px-2.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <!-- Payout Method -->
                        <div class="mb-4">
                            <label class="block text-sm text-gray-300 font-medium mb-1">Payout Method</label>
                            <select v-model="method"
                                class="w-full bg-gray-900 text-white rounded border border-gray-700 px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option disabled value="">Select Method</option>
                                <option value="card">Card</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="crypto">Crypto</option>
                            </select>
                        </div>

                        <!-- Status Message -->
                        <p v-if="status" :class="status === 'Success' ? 'text-green-400' : 'text-red-400'"
                            class="text-left text-sm mb-4">
                            {{ status }}
                        </p>

                        <!-- Action Buttons -->
                        <div class="mt-6 flex justify-end gap-3">
                            <button type="button" @click="$emit('close')" :disabled="isLoading"
                                class="px-6 py-2.5 rounded border border-gray-600 bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Cancel
                            </button>

                            <button type="submit" :disabled="isLoading"
                                class="flex items-center px-6 py-2.5 rounded border border-indigo-600 bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">
                                <svg v-if="isLoading" class="animate-spin h-4 w-4 mr-2"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                {{ isLoading ? "Processing..." : "Confirm" }}
                            </button>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ showWithdraw: Boolean })
defineEmits(['close'])

const amount = ref(null)
const method = ref('')
const isLoading = ref(false)
const status = ref('')

const submitWithdraw = () => {
    status.value = ''
    if (!amount.value || !method.value) {
        status.value = 'Please fill in all fields.'
        return
    }

    isLoading.value = true

    setTimeout(() => {
        isLoading.value = false
        const success = Math.random() > 0.2
        status.value = success ? 'Success' : 'Something went wrong. Try again.'
        if (success) {
            setTimeout(() => {
                status.value = ''
                amount.value = null
                method.value = ''
                emit('close')
            }, 1500)
        }
    }, 1000)
}
</script>

<style scoped>
/* Backdrop fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Modal scale+fade transition */
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>