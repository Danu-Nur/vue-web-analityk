<script setup>
import { defineAsyncComponent, ref } from 'vue';
// import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import ApiKeyDisplay from '../../components/ui/ApiKeyDisplay.vue';
import { apiKeys, embedScript, privacyOptions, retentionSettings } from '../../dummydata/pages6/dataPages6';
import SkeletonTable from '../../components/skeleton/SkeletonTable.vue';
const DataTable = defineAsyncComponent(() => import('../../components/datatables/DataTable.vue'))
const apikeyItems = ref(apiKeys)
</script>
<template>
    <!-- <DashboardAdminLayout> -->
        <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
            <!-- API Keys -->
            <section aria-labelledby="api-keys-title" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="api-keys-title">
                    <i class="fas fa-key text-gray-700">
                    </i>
                    API Keys
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 5 API keys -->
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col space-y-0.5 min-w-0">
                            <p class="font-semibold text-gray-900 truncate" title="Main Project Key">
                                Main Project Key
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="Domain: analytics.example.com">
                                Domain: analytics.example.com
                            </p>
                            <p class="text-xs text-gray-400 font-mono select-all truncate"
                                title="Key: 1234-abcd-5678-efgh">
                                Key: 1234-abcd-5678-efgh
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 select-none">
                                Active
                            </span>
                            <button aria-label="Copy API key 1234-abcd-5678-efgh" class="copy-btn"
                                data-copy="1234-abcd-5678-efgh" type="button">
                                <i class="far fa-copy">
                                </i>
                            </button>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col space-y-0.5 min-w-0">
                            <p class="font-semibold text-gray-900 truncate" title="Backup Key">
                                Backup Key
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="Domain: backup.example.com">
                                Domain: backup.example.com
                            </p>
                            <p class="text-xs text-gray-400 font-mono select-all truncate"
                                title="Key: 9876-wxyz-5432-lmno">
                                Key: 9876-wxyz-5432-lmno
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-700 select-none">
                                Inactive
                            </span>
                            <button aria-label="Copy API key 9876-wxyz-5432-lmno" class="copy-btn"
                                data-copy="9876-wxyz-5432-lmno" type="button">
                                <i class="far fa-copy">
                                </i>
                            </button>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col space-y-0.5 min-w-0">
                            <p class="font-semibold text-gray-900 truncate" title="Mobile App Key">
                                Mobile App Key
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="Domain: mobile.example.com">
                                Domain: mobile.example.com
                            </p>
                            <p class="text-xs text-gray-400 font-mono select-all truncate"
                                title="Key: 1122-aabb-3344-ccdd">
                                Key: 1122-aabb-3344-ccdd
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 select-none">
                                Active
                            </span>
                            <button aria-label="Copy API key 1122-aabb-3344-ccdd" class="copy-btn"
                                data-copy="1122-aabb-3344-ccdd" type="button">
                                <i class="far fa-copy">
                                </i>
                            </button>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col space-y-0.5 min-w-0">
                            <p class="font-semibold text-gray-900 truncate" title="Test Key">
                                Test Key
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="Domain: test.example.com">
                                Domain: test.example.com
                            </p>
                            <p class="text-xs text-gray-400 font-mono select-all truncate"
                                title="Key: 5566-7788-9900-aabb">
                                Key: 5566-7788-9900-aabb
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-700 select-none">
                                Inactive
                            </span>
                            <button aria-label="Copy API key 5566-7788-9900-aabb" class="copy-btn"
                                data-copy="5566-7788-9900-aabb" type="button">
                                <i class="far fa-copy">
                                </i>
                            </button>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col space-y-0.5 min-w-0">
                            <p class="font-semibold text-gray-900 truncate" title="Legacy Key">
                                Legacy Key
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="Domain: legacy.example.com">
                                Domain: legacy.example.com
                            </p>
                            <p class="text-xs text-gray-400 font-mono select-all truncate"
                                title="Key: 3344-5566-7788-9900">
                                Key: 3344-5566-7788-9900
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 select-none">
                                Active
                            </span>
                            <button aria-label="Copy API key 3344-5566-7788-9900" class="copy-btn"
                                data-copy="3344-5566-7788-9900" type="button">
                                <i class="far fa-copy">
                                </i>
                            </button>
                        </div>
                    </article>
                </div>
            </section>
            <!-- Client Projects -->
            <section aria-labelledby="client-projects-title"
                class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="client-projects-title">
                    <i class="fas fa-puzzle-piece text-gray-700">
                    </i>
                    Client Projects
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 5 client projects -->
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate" title="Acme Corp">
                                Acme Corp
                            </h3>
                            <span class="text-xs text-gray-500 font-mono truncate" title="Domain: acme.example.com">
                                acme.example.com
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Tracking Setup: Full">
                            Tracking Setup: Full
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate" title="Beta LLC">
                                Beta LLC
                            </h3>
                            <span class="text-xs text-gray-500 font-mono truncate" title="Domain: beta.example.com">
                                beta.example.com
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Tracking Setup: Partial">
                            Tracking Setup: Partial
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate" title="Gamma Inc">
                                Gamma Inc
                            </h3>
                            <span class="text-xs text-gray-500 font-mono truncate" title="Domain: gamma.example.com">
                                gamma.example.com
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Tracking Setup: Full">
                            Tracking Setup: Full
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate" title="Delta Partners">
                                Delta Partners
                            </h3>
                            <span class="text-xs text-gray-500 font-mono truncate" title="Domain: delta.example.com">
                                delta.example.com
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Tracking Setup: None">
                            Tracking Setup: None
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate" title="Epsilon Studio">
                                Epsilon Studio
                            </h3>
                            <span class="text-xs text-gray-500 font-mono truncate" title="Domain: epsilon.example.com">
                                epsilon.example.com
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Tracking Setup: Full">
                            Tracking Setup: Full
                        </p>
                    </article>
                </div>
            </section>
            <!-- Allowed Domains -->
            <section aria-labelledby="allowed-domains-title"
                class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="allowed-domains-title">
                    <i class="fas fa-globe-americas text-gray-700">
                    </i>
                    Allowed Domains
                </h2>
                <div class="flex flex-col gap-3 overflow-auto max-h-[420px] pr-1">
                    <!-- 10 allowed domains -->
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="analytics.example.com">
                        analytics.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="backup.example.com">
                        backup.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="mobile.example.com">
                        mobile.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="test.example.com">
                        test.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="legacy.example.com">
                        legacy.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="acme.example.com">
                        acme.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="beta.example.com">
                        beta.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="gamma.example.com">
                        gamma.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="delta.example.com">
                        delta.example.com
                    </span>
                    <span
                        class="inline-block rounded-full bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 select-all cursor-pointer"
                        title="epsilon.example.com">
                        epsilon.example.com
                    </span>
                </div>
            </section>
            <!-- Webhooks -->
            <section aria-labelledby="webhooks-title" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="webhooks-title">
                    <i class="fas fa-envelope-open-text text-gray-700">
                    </i>
                    Webhooks
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 5 webhooks -->
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col min-w-0 space-y-0.5">
                            <p class="font-semibold text-gray-900 truncate" title="User Signup Webhook">
                                User Signup Webhook
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="URL: https://hooks.example.com/signup">
                                https://hooks.example.com/signup
                            </p>
                            <p class="text-xs text-gray-400 truncate" title="Last Ping: 2024-06-10 14:22 UTC">
                                Last Ping: 2024-06-10 14:22 UTC
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label class="inline-flex relative items-center cursor-pointer">
                                <input aria-label="Enable User Signup Webhook" checked="" class="neumorph-toggle peer"
                                    type="checkbox" />
                            </label>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col min-w-0 space-y-0.5">
                            <p class="font-semibold text-gray-900 truncate" title="Purchase Completed Webhook">
                                Purchase Completed Webhook
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="URL: https://hooks.example.com/purchase">
                                https://hooks.example.com/purchase
                            </p>
                            <p class="text-xs text-gray-400 truncate" title="Last Ping: 2024-06-09 09:15 UTC">
                                Last Ping: 2024-06-09 09:15 UTC
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label class="inline-flex relative items-center cursor-pointer">
                                <input aria-label="Enable Purchase Completed Webhook" class="neumorph-toggle peer"
                                    type="checkbox" />
                            </label>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col min-w-0 space-y-0.5">
                            <p class="font-semibold text-gray-900 truncate" title="Error Reporting Webhook">
                                Error Reporting Webhook
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="URL: https://hooks.example.com/errors">
                                https://hooks.example.com/errors
                            </p>
                            <p class="text-xs text-gray-400 truncate" title="Last Ping: 2024-06-08 18:40 UTC">
                                Last Ping: 2024-06-08 18:40 UTC
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label class="inline-flex relative items-center cursor-pointer">
                                <input aria-label="Enable Error Reporting Webhook" checked=""
                                    class="neumorph-toggle peer" type="checkbox" />
                            </label>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col min-w-0 space-y-0.5">
                            <p class="font-semibold text-gray-900 truncate" title="New Funnel Trigger Webhook">
                                New Funnel Trigger Webhook
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="URL: https://hooks.example.com/funnel">
                                https://hooks.example.com/funnel
                            </p>
                            <p class="text-xs text-gray-400 truncate" title="Last Ping: 2024-06-07 12:00 UTC">
                                Last Ping: 2024-06-07 12:00 UTC
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label class="inline-flex relative items-center cursor-pointer">
                                <input aria-label="Enable New Funnel Trigger Webhook" class="neumorph-toggle peer"
                                    type="checkbox" />
                            </label>
                        </div>
                    </article>
                    <article
                        class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition">
                        <div class="flex flex-col min-w-0 space-y-0.5">
                            <p class="font-semibold text-gray-900 truncate" title="Bot Detection Alert Webhook">
                                Bot Detection Alert Webhook
                            </p>
                            <p class="text-xs text-gray-500 truncate" title="URL: https://hooks.example.com/bot-alert">
                                https://hooks.example.com/bot-alert
                            </p>
                            <p class="text-xs text-gray-400 truncate" title="Last Ping: 2024-06-06 22:30 UTC">
                                Last Ping: 2024-06-06 22:30 UTC
                            </p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <label class="inline-flex relative items-center cursor-pointer">
                                <input aria-label="Enable Bot Detection Alert Webhook" checked=""
                                    class="neumorph-toggle peer" type="checkbox" />
                            </label>
                        </div>
                    </article>
                </div>
            </section>
            <!-- Tracking Settings -->
            <section aria-labelledby="tracking-settings-title"
                class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="tracking-settings-title">
                    <i class="fas fa-cogs text-gray-700">
                    </i>
                    Tracking Settings
                </h2>
                <form class="flex flex-col gap-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Enable Custom Events
                            </p>
                            <p class="text-sm text-gray-600">
                                Track user-defined events on your site
                            </p>
                        </div>
                        <label class="inline-flex relative items-center cursor-pointer">
                            <input aria-label="Enable Custom Events" checked="" class="neumorph-toggle peer"
                                type="checkbox" />
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Enable Bot Detection
                            </p>
                            <p class="text-sm text-gray-600">
                                Filter out bot traffic from analytics
                            </p>
                        </div>
                        <label class="inline-flex relative items-center cursor-pointer">
                            <input aria-label="Enable Bot Detection" class="neumorph-toggle peer" type="checkbox" />
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Enable Funnels Tracking
                            </p>
                            <p class="text-sm text-gray-600">
                                Track user funnels and conversions
                            </p>
                        </div>
                        <label class="inline-flex relative items-center cursor-pointer">
                            <input aria-label="Enable Funnels Tracking" checked="" class="neumorph-toggle peer"
                                type="checkbox" />
                        </label>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">
                                Enable Real-time Tracking
                            </p>
                            <p class="text-sm text-gray-600">
                                See analytics data in real-time
                            </p>
                        </div>
                        <label class="inline-flex relative items-center cursor-pointer">
                            <input aria-label="Enable Real-time Tracking" checked="" class="neumorph-toggle peer"
                                type="checkbox" />
                        </label>
                    </div>
                </form>
            </section>
            <!-- Custom Events Config -->
            <section aria-labelledby="custom-events-title" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="custom-events-title">
                    <i class="fas fa-bolt text-gray-700">
                    </i>
                    Custom Events Config
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 7 custom events -->
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Button Click">
                                Button Click
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 select-none">
                                click
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: #signup-button">
                            Triggers: #signup-button
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Form Submit">
                                Form Submit
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-green-100 text-green-700 select-none">
                                submit
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: #contact-form">
                            Triggers: #contact-form
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Page View">
                                Page View
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 select-none">
                                view
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: /home">
                            Triggers: /home
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Video Play">
                                Video Play
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 select-none">
                                click
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: #video-player">
                            Triggers: #video-player
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Newsletter Signup">
                                Newsletter Signup
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-green-100 text-green-700 select-none">
                                submit
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: #newsletter-form">
                            Triggers: #newsletter-form
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Product Click">
                                Product Click
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 select-none">
                                click
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: .product-card">
                            Triggers: .product-card
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900 truncate" title="Checkout View">
                                Checkout View
                            </h3>
                            <span
                                class="inline-block rounded-full px-3 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 select-none">
                                view
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate" title="Triggers: /checkout">
                            Triggers: /checkout
                        </p>
                    </article>
                </div>
            </section>
            <!-- Funnels Setup -->
            <section aria-labelledby="funnels-setup-title" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="funnels-setup-title">
                    <i class="fas fa-chart-line text-gray-700">
                    </i>
                    Funnels Setup
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 4 funnels -->
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <h3 class="font-semibold text-gray-900 truncate" title="Signup Funnel">
                            Signup Funnel
                        </h3>
                        <p class="text-sm text-gray-600">
                            Steps: 4
                        </p>
                        <p class="text-sm text-gray-600">
                            Conversions: 1200
                        </p>
                        <button
                            class="mt-2 self-start rounded-full px-4 py-1 text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            data-wizard="signup-funnel" type="button">
                            Setup Wizard
                        </button>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <h3 class="font-semibold text-gray-900 truncate" title="Checkout Funnel">
                            Checkout Funnel
                        </h3>
                        <p class="text-sm text-gray-600">
                            Steps: 5
                        </p>
                        <p class="text-sm text-gray-600">
                            Conversions: 850
                        </p>
                        <button
                            class="mt-2 self-start rounded-full px-4 py-1 text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            data-wizard="checkout-funnel" type="button">
                            Setup Wizard
                        </button>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <h3 class="font-semibold text-gray-900 truncate" title="Purchase Funnel">
                            Purchase Funnel
                        </h3>
                        <p class="text-sm text-gray-600">
                            Steps: 3
                        </p>
                        <p class="text-sm text-gray-600">
                            Conversions: 670
                        </p>
                        <button
                            class="mt-2 self-start rounded-full px-4 py-1 text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            data-wizard="purchase-funnel" type="button">
                            Setup Wizard
                        </button>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <h3 class="font-semibold text-gray-900 truncate" title="Newsletter Funnel">
                            Newsletter Funnel
                        </h3>
                        <p class="text-sm text-gray-600">
                            Steps: 2
                        </p>
                        <p class="text-sm text-gray-600">
                            Conversions: 430
                        </p>
                        <button
                            class="mt-2 self-start rounded-full px-4 py-1 text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            data-wizard="newsletter-funnel" type="button">
                            Setup Wizard
                        </button>
                    </article>
                </div>
            </section>
            <!-- Bot Detection Rules -->
            <section aria-labelledby="bot-detection-title" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="text-lg font-semibold mb-4 flex items-center gap-2" id="bot-detection-title">
                    <i class="fas fa-user-secret text-gray-700">
                    </i>
                    Bot Detection Rules
                </h2>
                <div class="flex flex-col gap-4 overflow-auto max-h-[420px] pr-1">
                    <!-- 5 bot detection rules -->
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <p class="font-semibold text-gray-900 truncate" title="User-Agent contains 'bot'">
                            User-Agent contains
                            <code class="font-mono bg-gray-100 rounded px-1 py-0.5">
                                bot
                            </code>
                        </p>
                        <p class="text-sm text-gray-600">
                            Threshold: 5 requests/sec
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <p class="font-semibold text-gray-900 truncate" title="User-Agent contains 'spider'">
                            User-Agent contains
                            <code class="font-mono bg-gray-100 rounded px-1 py-0.5">
                                spider
                            </code>
                        </p>
                        <p class="text-sm text-gray-600">
                            Threshold: 3 requests/sec
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <p class="font-semibold text-gray-900 truncate" title="IP address in blacklist">
                            IP address in blacklist
                        </p>
                        <p class="text-sm text-gray-600">
                            Threshold: Immediate block
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <p class="font-semibold text-gray-900 truncate" title="User-Agent contains 'curl'">
                            User-Agent contains
                            <code class="font-mono bg-gray-100 rounded px-1 py-0.5">
                                curl
                            </code>
                        </p>
                        <p class="text-sm text-gray-600">
                            Threshold: 10 requests/sec
                        </p>
                    </article>
                    <article
                        class="bg-white rounded-2xl p-4 shadow-sm hover:ring-1 ring-gray-300 transition flex flex-col space-y-2">
                        <p class="font-semibold text-gray-900 truncate" title="User-Agent contains 'python-requests'">
                            User-Agent contains
                            <code class="font-mono bg-gray-100 rounded px-1 py-0.5">
                                python-requests
                            </code>
                        </p>
                        <p class="text-sm text-gray-600">
                            Threshold: 7 requests/sec
                        </p>
                    </article>
                </div>
            </section>
        </div>
        <!-- ============================================================================================================================================== -->
        <section aria-label="Main content" class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-max mb-6">

            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">API Keys</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="apiKeys.headers" :items="apiKeys.items" title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>

            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col h-full">
                <h2 class="font-semibold text-gray-900 mb-4">Integration Snippets</h2>
                <div class="grid grid-cols-1 gap-4 max-h-[450px] overflow-auto">
                    <ApiKeyDisplay :apiKeys="apikeyItems" />
                </div>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Data Retention Policy</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="retentionSettings.headers" :items="retentionSettings.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
            <article aria-label="Overview chart" class="border border-gray-200 rounded-lg p-4 flex flex-col">
                <h2 class="font-semibold text-gray-900 mb-4">Data Retention Policy</h2>
                <Suspense>
                    <template #default>
                        <DataTable :headers="privacyOptions.headers" :items="privacyOptions.items"
                            title="All Transactions" />
                    </template>
                    <template #fallback>
                        <SkeletonTable />
                    </template>
                </Suspense>
            </article>
        </section>
    <!-- </DashboardAdminLayout> -->
</template>