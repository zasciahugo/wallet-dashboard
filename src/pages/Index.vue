<template>
    <div class="p-6 space-y-8 text-gray-100 bg-gray-900">
        <!-- Wallet Card -->
        <section class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div
                class="bg-gray-800 backdrop-blur-sm border border-gray-700 rounded p-6 col-span-1 flex flex-col justify-between">
                <div class="flex items-center space-x-8 mb-6">
                    <div
                        class="flex items-center border border-indigo-500 justify-center w-16 h-16 rounded-full bg-indigo-950">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-8 h-8 text-indigo-400">
                            <path
                                d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                        </svg>
                    </div>

                    <div>
                        <p class="text-xs uppercase text-gray-400 font-medium tracking-wide mb-1">
                            Wallet Balance
                        </p>
                        <h1 class="text-4xl font-bold text-white">
                            {{ formatCurrency(wallet.balance, wallet.currency) }}
                        </h1>
                    </div>
                </div>

                <div class="flex gap-6">
                    <!-- Deposit Button -->
                    <button @click="showDeposit = true"
                        class="w-full px-6 py-2.5 rounded border border-indigo-600 bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300">
                        Deposit
                    </button>

                    <!-- Withdraw Button -->
                    <button @click="showWithdraw = true"
                        class="w-full px-6 py-2.5 rounded border border-gray-700 bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Withdraw
                    </button>
                </div>
            </div>
        </section>

        <!-- Transactions -->
        <section>
            <TransactionList />
        </section>
    </div>

    <DepositModal v-if="showDeposit" :showDeposit="showDeposit" @close="showDeposit = false" />
    <WithdrawModal v-if="showWithdraw" :showWithdraw="showWithdraw" @close="showWithdraw = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TransactionList from '@/components/TransactionList.vue'
import DepositModal from '@/components/DepositModal.vue'
import WithdrawModal from '@/components/WithdrawModal.vue'

const wallet = ref({
    balance: 0,
    currency: 'ZAR',
})

onMounted(async () => {
    try {
        const walletRes = await fetch('/api/wallet.json')
        wallet.value = await walletRes.json()
    } catch (e) {
        console.error('Error loading wallet:', e)
    }
})

const formatCurrency = (amount, currency) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency,
    }).format(amount)

const showDeposit = ref(false)
const showWithdraw = ref(false)
</script>