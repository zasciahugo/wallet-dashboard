<template>
    <section class="bg-gray-800 border border-gray-700 rounded p-6 text-gray-100">
        <h2 class="text-lg font-semibold text-white mb-1">Recent Transactions</h2>
        <p class="text-sm text-gray-400 mb-4">Latest activity from your account</p>

        <!-- Scroll Wrapper for Mobile -->
        <div class="overflow-auto">
            <!-- Skeleton Loader -->
            <table v-if="isLoading" class="min-w-full text-sm animate-pulse divide-y divide-gray-700">
                <thead class="bg-gray-700">
                    <tr>
                        <th v-for="header in headers" :key="header.key"
                            class="px-4 py-3 text-left font-medium text-gray-400 uppercase tracking-wider text-xs">
                            {{ header.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="n in 5" :key="n">
                        <td v-for="i in headers.length" :key="i" class="px-4 py-3">
                            <div class="h-4 bg-gray-600 rounded-full w-3/4"></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Transactions Table -->
            <table v-else-if="transactions.length" class="min-w-full text-sm divide-y divide-gray-700">
                <thead class="bg-gray-700 text-gray-300 text-xs uppercase tracking-wide">
                    <tr>
                        <th v-for="header in headers" :key="header.key" @click="sortBy(header.key)"
                            class="px-4 py-3 text-left font-medium cursor-pointer select-none hover:text-white transition whitespace-nowrap">
                            <div class="flex items-center gap-1">
                                {{ header.label }}
                                <svg v-if="sortKey === header.key" xmlns="http://www.w3.org/2000/svg"
                                    class="w-3 h-3 text-gray-400" :class="sortedAsc ? 'rotate-0' : 'rotate-180'"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tx in sortedTransactions" :key="tx.id"
                        class="hover:bg-gray-700 transition duration-200 whitespace-nowrap">
                        <td class="px-4 py-3 font-mono text-sm text-gray-400">{{ tx.id }}</td>
                        <td class="px-4 py-3 text-sm text-gray-300">{{ formatDate(tx.date) }}</td>
                        <td class="px-4 py-3 capitalize text-sm text-gray-300">{{ tx.type }}</td>
                        <td class="px-4 py-3 font-medium text-white">{{ formatCurrency(tx.amount, tx.currency) }}</td>
                        <td class="px-4 py-3">
                            <span :class="[
                                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
                                tx.status === 'success'
                                    ? 'bg-green-900 text-green-400'
                                    : 'bg-red-900 text-red-400'
                            ]">
                                <svg v-if="tx.status === 'success'" xmlns="http://www.w3.org/2000/svg"
                                    class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.95a1 1 0 00-1.414-1.414L10 8.586 7.879 6.464a1 1 0 10-1.414 1.414L8.586 10l-2.121 2.121a1 1 0 101.414 1.414L10 11.414l2.121 2.121a1 1 0 001.414-1.414L11.414 10l2.122-2.121z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ tx.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Error State -->
        <div v-if="error" class="mt-6 text-red-400 text-sm border border-red-900 bg-red-950 p-3 rounded-md">
            {{ error }}
        </div>
    </section>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'

const transactions = ref([])
const isLoading = ref(true)
const error = ref(null)
const sortKey = ref('')
const sortedAsc = ref(true)

const headers = [
    { label: 'Transaction ID', key: 'id' },
    { label: 'Date', key: 'date' },
    { label: 'Type', key: 'type' },
    { label: 'Amount', key: 'amount' },
    { label: 'Status', key: 'status' },
]

onMounted(async () => {
    isLoading.value = true
    try {
        const response = await fetch('/api/transactions.json')
        if (!response.ok) throw new Error('Network response was not ok')
        transactions.value = await response.json()
    } catch (e) {
        console.error('Error loading transactions:', e)
        error.value = 'Failed to load transactions.'
    } finally {
        isLoading.value = false
    }
})

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortedAsc.value = !sortedAsc.value
    } else {
        sortKey.value = key
        sortedAsc.value = true
    }
}

const sortedTransactions = computed(() => {
    if (!sortKey.value) return transactions.value

    return [...transactions.value].sort((a, b) => {
        const aVal = a[sortKey.value]
        const bVal = b[sortKey.value]

        if (typeof aVal === 'string') {
            return sortedAsc.value
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal)
        }
        return sortedAsc.value ? aVal - bVal : bVal - aVal
    })
})

const formatCurrency = (amount, currency) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency,
    }).format(amount)

const formatDate = (iso) =>
    new Intl.DateTimeFormat('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso))
</script>