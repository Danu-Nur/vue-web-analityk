
# 🌐 Web Analytics Dashboard - Project Structure & UI Components

Vue 3 + Tailwind CSS + Vite + Pinia + ApexCharts

---

## 📁 Project Structure

```
project-root/
├── public/
│   ├── favicon.ico                 # Favicon for the app
│   └── index.html                  # Main HTML entry point
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css        # Custom Tailwind styles
│   │   ├── images/                 # Static images (e.g., logos, icons)
│   │   └── fonts/                  # Custom fonts (e.g., Inter, DM Sans)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Alert.vue           # Reusable alert (success, error, warning, info)
│   │   │   ├── Button.vue          # Reusable button with variants (primary, secondary, outline)
│   │   │   ├── Carousel.vue        # Reusable carousel for images/cards
│   │   │   ├── Dropdown.vue        # Reusable dropdown menu for filters
│   │   │   ├── Modal.vue           # Reusable modal for popups
│   │   │   ├── Input.vue           # Reusable input field (text, copyable)
│   │   │   ├── MetricCard.vue      # Reusable metric card (e.g., Pageviews, Visitors)
│   │   │   ├── DataTable.vue       # Reusable table with sorting/pagination
│   │   │   ├── ApexChart.vue       # Wrapper for ApexCharts (line, pie, bar, Sankey)
│   │   │   ├── GeoMap.vue          # Geo map component (placeholder for map library)
│   │   │   ├── CodeBlock.vue       # Reusable code snippet display
│   │   │   └── Breadcrumb.vue      # Session journey breadcrumbs
│   │   ├── layout/
│   │   │   ├── Header.vue          # Generic header with slots for logo, nav, actions
│   │   │   ├── Sidebar.vue         # Generic sidebar with configurable menu items
│   │   │   ├── Footer.vue          # Generic footer with slots for content, links
│   │   │   ├── MainLayout.vue      # Layout for admin/user dashboards with sidebar
│   │   │   ├── LandingLayout.vue   # Layout for landing pages without sidebar
│   │   │   └── MinimalLayout.vue   # Minimal layout for simple pages (e.g., user settings)
│   │   ├── dashboard/
│   │   │   ├── MetricSection.vue   # Metric cards section
│   │   │   ├── PageviewsChart.vue  # Line chart for pageviews
│   │   │   ├── TopPagesTable.vue   # Top pages table
│   │   │   ├── DevicePieChart.vue  # Device breakdown pie chart
│   │   │   ├── GeoMapSection.vue   # Geo map for visitor distribution
│   │   │   ├── ReferrerTable.vue   # Referrer/UTM source table
│   │   │   ├── EntryExitPages.vue  # Entry/exit pages table
│   │   │   └── HourlyTrafficChart.vue # Hourly traffic bar chart
│   │   ├── visitors/
│   │   │   ├── LiveUsersTable.vue  # Live users table
│   │   │   ├── SessionsTable.vue   # Sessions table
│   │   │   ├── DeviceBreakdown.vue # Device table + pie chart
│   │   │   ├── TimezoneLanguageTable.vue # Timezone and language table
│   │   │   ├── GeoMapClustering.vue # Geo map with visitor clustering
│   │   │   └── SessionReplay.vue   # Session replay preview/breadcrumbs
│   │   ├── behavior/
│   │   │   ├── ClickEventsTable.vue # Click events table
│   │   │   ├── ScrollDepthChart.vue # Scroll depth distribution chart
│   │   │   ├── TopClickedChart.vue # Top clicked elements bar chart
│   │   │   ├── HeatmapPreview.vue  # Heatmap preview area
│   │   │   ├── CustomEventsTable.vue # Custom events table
│   │   │   └── EventTimeline.vue   # Event timeline per session
│   │   ├── conversions/
│   │   │   ├── FunnelsTable.vue    # Funnels table
│   │   │   ├── FunnelStepsChart.vue # Funnel steps Sankey chart
│   │   │   ├── CompletedFunnels.vue # Completed funnels list
│   │   │   ├── ConversionRate.vue  # Conversion rate per device/region
│   │   │   └── PathToConversion.vue # Path to conversion visualization
│   │   ├── diagnostics/
│   │   │   ├── ErrorsTable.vue     # Client errors table
│   │   │   ├── BotDetectionTable.vue # Bot detection table
│   │   │   ├── BotVsHumanChart.vue # Bot vs human traffic line chart
│   │   │   ├── PageLoadSummary.vue # Page load speed summary
│   │   │   └── JSErrorRateChart.vue # JS error rate pie chart
│   │   ├── settings/
│   │   │   ├── ApiKeysTable.vue    # API keys table
│   │   │   ├── AllowedDomainsTable.vue # Allowed domains table
│   │   │   ├── IntegrationSnippet.vue # Integration code snippet
│   │   │   ├── DataRetention.vue   # Data retention policy
│   │   │   └── PrivacySettings.vue # Privacy settings/cookie consent
│   │   ├── billing/
│   │   │   ├── PlanOverview.vue    # Current plan overview
│   │   │   ├── UsageSummary.vue    # Usage summary (event count, limits)
│   │   │   ├── BillingHistoryTable.vue # Billing history table
│   │   │   ├── UpgradeCta.vue      # Upgrade CTA card
│   │   │   └── PlanComparison.vue  # Plan comparison table
│   │   ├── affiliate/
│   │   │   ├── ReferralSummary.vue # Referral summary cards
│   │   │   ├── ReferredUsersTable.vue # Referred users table
│   │   │   ├── EarningsChart.vue   # Earnings chart for referrals
│   │   │   ├── PayoutHistoryTable.vue # Payout history table
│   │   │   └── AffiliateGuide.vue  # Affiliate program guide card
│   ├── views/
│   │   ├── landing/
│   │   │   ├── Home.vue            # Landing page for marketing
│   │   │   ├── Features.vue        # Features page
│   │   │   └── Pricing.vue         # Pricing page for marketing
│   │   ├── dashboards/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.vue   # Admin dashboard with full analytics
│   │   │   │   ├── Visitors.vue    # Admin visitors section
│   │   │   │   ├── Behavior.vue    # Admin behavior section
│   │   │   │   ├── Conversions.vue # Admin conversions section
│   │   │   │   ├── Diagnostics.vue # Admin diagnostics section
│   │   │   │   ├── Settings.vue    # Admin settings & API section
│   │   │   │   ├── Billing.vue     # Admin billing & plan section
│   │   │   │   └── Affiliate.vue   # Admin affiliate/partnership section
│   │   │   ├── user/
│   │   │   │   ├── Dashboard.vue   # User dashboard with profile stats
│   │   │   │   ├── Profile.vue     # User profile page
│   │   │   │   └── Settings.vue    # User-specific settings
│   │   │   ├── guest/
│   │   │   │   ├── Dashboard.vue   # Guest dashboard with public stats
│   │   │   │   ├── Login.vue       # Guest login page
│   │   │   │   └── Signup.vue      # Guest signup page
│   ├── router/
│   │   └── index.js               # Vue Router configuration with role-based guards
│   ├── store/
│   │   ├── modules/
│   │   │   ├── auth.js            # Authentication state (user role, login status)
│   │   │   ├── admin.js           # Admin dashboard state (metrics, charts)
│   │   │   ├── user.js            # User dashboard state (profile, settings)
│   │   │   └── guest.js           # Guest dashboard state (public data)
│   │   └── index.js               # Pinia store entry point
│   ├── data/
│   │   ├── dummyData/
│   │   │   ├── admin.js           # Dummy data for admin dashboard
│   │   │   ├── user.js            # Dummy data for user dashboard
│   │   │   └── guest.js           # Dummy data for guest dashboard
│   │   └── constants/
│   │       ├── menuItemsAdmin.js  # Admin menu items and icons
│   │       ├── menuItemsUser.js   # User menu items
│   │       ├── menuItemsGuest.js  # Guest menu items
│   │       └── chartOptions.js    # Shared chart configuration options
│   ├── utils/
│   │   ├── chartConfig.js         # ApexCharts configuration helpers
│   │   ├── formatters.js          # Data formatters (e.g., time, percentage)
│   │   └── roleUtils.js           # Role-based utility functions
│   ├── App.vue                    # Root Vue component
│   └── main.js                    # Entry point for Vue app
├── tailwind.config.js             # Tailwind CSS configuration (glassmorphism utilities)
├── vite.config.js                 # Vite configuration for Vue
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
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
