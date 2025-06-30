
# 🌐 Web Analytics Dashboard - Project Structure & UI Components

Vue 3 + Tailwind CSS + Vite + Pinia + ApexCharts

---

## 📁 Project Structure

```
project-root/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css
│   │   ├── images/
│   │   └── fonts/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Alert.vue
│   │   │   ├── Button.vue
│   │   │   ├── Carousel.vue
│   │   │   ├── Dropdown.vue
│   │   │   ├── Modal.vue
│   │   │   ├── Input.vue
│   │   │   ├── MetricCard.vue
│   │   │   ├── DataTable.vue
│   │   │   ├── ApexChart.vue
│   │   │   ├── GeoMap.vue
│   │   │   ├── CodeBlock.vue
│   │   │   └── Breadcrumb.vue
│   │   ├── layout/
│   │   │   ├── Sidebar.vue
│   │   │   ├── Header.vue
│   │   │   └── MainLayout.vue
│   │   ├── dashboard/
│   │   │   ├── MetricSection.vue
│   │   │   ├── PageviewsChart.vue
│   │   │   ├── TopPagesTable.vue
│   │   │   └── DevicePieChart.vue
│   │   ├── visitors/
│   │   │   ├── LiveUsersTable.vue
│   │   │   ├── SessionsTable.vue
│   │   │   └── DeviceBreakdown.vue
│   │   ├── behavior/
│   │   │   ├── ClickEventsTable.vue
│   │   │   └── ScrollDepthChart.vue
│   │   ├── conversions/
│   │   │   ├── FunnelsTable.vue
│   │   │   └── FunnelStepsChart.vue
│   │   ├── diagnostics/
│   │   │   ├── ErrorsTable.vue
│   │   │   └── BotVsHumanChart.vue
│   │   ├── settings/
│   │   │   ├── ApiKeysTable.vue
│   │   │   └── IntegrationSnippet.vue
│   │   ├── billing/
│   │   │   ├── PlanOverview.vue
│   │   │   └── BillingHistoryTable.vue
│   │   ├── affiliate/
│   │   │   ├── ReferralSummary.vue
│   │   │   └── EarningsChart.vue
│   ├── views/
│   │   ├── landing/
│   │   │   ├── Home.vue
│   │   │   └── Features.vue
│   │   ├── admin/
│   │   │   ├── Dashboard.vue
│   │   │   ├── Visitors.vue
│   │   │   ├── Behavior.vue
│   │   │   ├── Conversions.vue
│   │   │   ├── Diagnostics.vue
│   │   │   ├── Settings.vue
│   │   │   ├── Billing.vue
│   │   │   └── Affiliate.vue
│   │   ├── user/
│   │   │   ├── Profile.vue
│   │   │   └── Settings.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── data/
│   │   ├── dummyData.js
│   │   └── constants.js
│   ├── utils/
│   │   ├── chartConfig.js
│   │   └── formatters.js
│   ├── App.vue
│   └── main.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧩 New Reusable UI Components

All components are **designed for high reusability**, built with **Tailwind CSS**, **glassmorphism aesthetic**, and **props flexibility**.

| Component        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `Alert.vue`      | Notification messages (success, error, info, warning)  |
| `Button.vue`     | Flexible button variants (primary, secondary, outline) |
| `Carousel.vue`   | Auto-slide content such as testimonials or banners     |
| `Dropdown.vue`   | Menus for sorting, filtering, time range selection     |
| `Modal.vue`      | Reusable modal with slot support                       |
| `Input.vue`      | Text inputs, copyable fields (API key, referral code)  |
| `MetricCard.vue` | KPIs display like Visitors, Pageviews                  |
| `DataTable.vue`  | Paginated/sortable table for any data display          |
| `ApexChart.vue`  | Line, bar, pie charts via ApexCharts                   |
| `GeoMap.vue`     | Placeholder for geolocation tracking                   |
| `CodeBlock.vue`  | Display formatted code snippets                        |
| `Breadcrumb.vue` | Navigation trail across dashboard                      |

---

## 💡 Sample: `Alert.vue`

```vue
<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  message: String,
  dismissable: Boolean,
});
</script>

<template>
  <div
    class="glass-effect p-4 rounded-xl flex items-center gap-3"
    :class="variantClasses[variant]"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
         :d="iconPaths[variant]" viewBox="0 0 24 24"></svg>
    <span class="text-sm">{{ message }}</span>
    <button v-if="dismissable" class="ml-auto text-sm underline">Dismiss</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      variantClasses: {
        success: 'bg-green-500/20 text-green-300',
        error: 'bg-red-500/20 text-red-300',
        warning: 'bg-yellow-500/20 text-yellow-300',
        info: 'bg-blue-500/20 text-blue-300',
      },
      iconPaths: {
        success: 'M9 12l2 2 4-4...',
        error: 'M10 14l2-2...',
        warning: 'M12 9v2...',
        info: 'M13 16h-1v-4h1...',
      },
    };
  },
};
</script>

<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
```

---

## 📝 Notes

- The structure supports **landing**, **admin**, **user**, and **affiliate** sections.
- Modular component design for easier maintenance and scalability.
- UI follows modern UX trends: responsive, accessible, minimal, elegant.

---

## 📦 Tech Stack

- **Vue 3** (Composition API)
- **Tailwind CSS** (with custom config)
- **Pinia** (state management)
- **ApexCharts** (visual analytics)
- **Vite** (lightning-fast dev server)
