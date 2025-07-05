<template>
    <ul>
        <li class="flex flex-col" v-for="apiky in apiKeys.items" :key="apiky.key">
            <h4 class="mb-2 text-gray-800 font-semibold">{{ apiky.domain }}</h4>
            <div class="relative mb-4">
                <pre class="bg-indigo-50 text-indigo-900 rounded-md p-4 font-mono text-sm overflow-auto">
                &lt;script src="https://cdn.example.com/analytics.js?key={{ encodeURIComponent(apiky.key) }}"&gt;&lt;/script&gt;
            </pre>
                <button class="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                    @click="copyToClipboard(apiky.key)" title="Copy to clipboard">
                    Copy
                </button>
            </div>
        </li>
    </ul>

</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    apiKeys: {
        type: Object,
        default: () => ({ items: [] }),
        validator: (apiKeys) => Array.isArray(apiKeys.items) && apiKeys.items.every(item => item.key && item.domain)
    }
})

const copyToClipboard = (key) => {
    const scriptTag = `<script src="https://cdn.example.com/analytics.js?key=${encodeURIComponent(key)}"></scr` + 'ipt>'
    navigator.clipboard.writeText(scriptTag)
        .then(() => alert('Script tag copied to clipboard!'))
        .catch(() => alert('Failed to copy script tag.'))
}
</script>