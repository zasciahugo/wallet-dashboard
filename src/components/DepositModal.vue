<template>
    <transition name="fade">
        <div v-if="showDeposit"
            class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <transition name="scale">
                <div
                    class="bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 z-50 text-gray-100 border border-gray-700">
                    <h2 class="text-xl font-semibold mb-4">Deposit Funds</h2>

                    <form @submit.prevent="submitDeposit">
                        <!-- Amount -->
                        <div class="mb-4">
                            <label class="text-sm font-medium block mb-1 text-gray-300">Amount</label>
                            <input type="number" v-model.number="amount" placeholder="Amount"
                                class="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <!-- Method -->
                        <div class="mb-4">
                            <label class="text-sm font-medium block mb-1 text-gray-300">Payment Method</label>
                            <select v-model="method"
                                class="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option disabled value="">Select method</option>
                                <option value="card">Card</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="crypto">Crypto</option>
                            </select>
                        </div>

                        <!-- Status -->
                        <p v-if="status" :class="status === 'Success' ? 'text-green-400' : 'text-red-400'"
                            class="text-sm mb-4">
                            {{ status }}
                        </p>

                        <!-- Buttons -->
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="$emit('close')" :disabled="isLoading"
                                class="px-4 py-2 rounded text-sm border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 transition">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isLoading"
                                class="px-4 py-2 rounded text-sm bg-indigo-600 text-white hover:bg-indigo-700 flex items-center transition">
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

defineProps({ showDeposit: Boolean })
defineEmits(['close'])

const amount = ref(null)
const method = ref('')
const status = ref('')
const isLoading = ref(false)

const submitDeposit = () => {
    status.value = ''
    if (!amount.value || !method.value) {
        status.value = 'Please fill in all fields.'
        return
    }

    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        const success = Math.random() > 0.2
        status.value = success ? 'Success' : 'Something went wrong.'
        if (success) {
            setTimeout(() => {
                status.value = ''
                amount.value = null
                method.value = ''
                emit('close')
            }, 1000)
        }
    }, 1000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

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