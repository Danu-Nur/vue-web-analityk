<template>
    <div>
        <div class="flex flex-wrap justify-end gap-4 mb-4">
            <div class="flex items-center w-full justify-between space-x-2">
                <input v-model="search" type="text" placeholder="Search..."
                    class="border border-gray-300 card-new rounded-md py-1.5 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs" />
                <div class="relative">
                    <button @click="toggleDropdown" title="Export File"
                        class="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <i class="bi bi-file-earmark-arrow-down text-xl"></i>
                    </button>
                    <div v-if="isDropdownOpen"
                        class="absolute z-20 w-32 bg-white border right-0 py-2 border-gray-200 rounded-md shadow-lg overflow-hidden">
                        <ul class="space-y-1">
                            <li v-for="button in exportButtonList" :key="button.action">
                                <button @click="button.handler"
                                    class="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-2">
                                    <i class="bi" :class="button.icon"></i>
                                    {{ button.label }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto rounded-md">
            <table class="w-full border-collapse table-auto text-xs text-gray-800">
                <thead class="border-b border-gray-300 bg-gray-100 text-gray-600 font-semibold select-none">
                    <tr>
                        <th v-for="(header, index) in headers" :key="header.value" :class="[
                            index === headers.length - 1 && header.text === '24h Visitors' ? 'text-center' : 'text-left',
                            'text-nowrap px-3 py-2 cursor-pointer'
                        ]" @click="header.sortable !== false && handleSort(header.value)">
                            {{ header.text }}
                            <span v-if="sortBy === header.value" class="ml-1">
                                <i :class="sortOrder === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="row in paginatedRows" :key="generateRowKey(row)"
                        class="hover:bg-gray-50 border-b border-gray-200">
                        <td v-for="header in headers" :key="header.value" class="text-nowrap py-2 px-3 text-gray-700"
                            :class="header.class">
                            <template v-if="header.value === 'visitorperhours' && row[header.value]">
                                <Suspense>
                                    <template #default>
                                        <LineChart
                                            :title="`Page Views per Hour for ${row.plaza || 'Unknown'} (${row.date || 'N/A'})`"
                                            :categories="getChartCategories(row.visitorperhours)"
                                            :seriesData="getChartSeriesData(row.visitorperhours)" />
                                    </template>
                                    <template #fallback>
                                        <div>Loading chart...</div>
                                    </template>
                                </Suspense>
                            </template>
                            <template v-else>
                                {{ row[header.value] }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <footer class="mt-3 flex items-center justify-between text-xs text-gray-600 select-none">
            <div>
                Showing {{ startIndex }} to {{ endIndex }} of {{ filteredRows.length }} row(s).
            </div>
            <div class="flex items-center space-x-4 text-xs">
                <div class="flex items-center space-x-1 text-gray-900">
                    <button aria-label="First page" :disabled="currentPage === 1" @click="currentPage = 1"
                        class="rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                        type="button">
                        <i class="bi bi-chevron-double-left"></i>
                    </button>
                    <button aria-label="Previous page" :disabled="currentPage === 1" @click="currentPage--"
                        class="rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                        type="button">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <button aria-label="Next page" :disabled="currentPage === totalPages" @click="currentPage++"
                        class="rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                        type="button">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                    <button aria-label="Last page" :disabled="currentPage === totalPages"
                        @click="currentPage = totalPages"
                        class="rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                        type="button">
                        <i class="bi bi-chevron-double-right"></i>
                    </button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';

// --- PROPS ---
const props = defineProps({
    headers: {
        type: Array,
        required: true,
        validator: (headers) => headers.every((h) => 'text' in h && 'value' in h),
    },
    items: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        default: 'Data Table',
    },
});

// --- ASYNC COMPONENTS ---
const LineChart = defineAsyncComponent(() =>
    import('../../components/apexchart/MiniLineChart.vue') // Pastikan path ini benar
);

// --- STATE MANAGEMENT ---
const search = ref('');
const sortBy = ref('');
const sortOrder = ref('asc');
const pageSize = ref(10);
const currentPage = ref(1);
const isDropdownOpen = ref(false);

// --- COMPUTED PROPERTIES ---

// 1. Memproses data mentah (misal: mengubah 'visitorperhours' menjadi angka untuk sorting)
const processedRows = computed(() => {
    return props.items.map(item => {
        const processedItem = { ...item };
        for (const header of props.headers) {
            const key = header.value;
            let value = item[key];

            if (key === 'visitorperhours') {
                // Untuk keperluan sorting, kita bisa gunakan panjang array sebagai nilai
                processedItem['visitorperhours_count'] = Array.isArray(value) ? value.length : 0;
            }

            // Terapkan formatter jika ada, untuk tampilan
            processedItem[key] = header.formatter ? header.formatter(value) : value;
        }
        return processedItem;
    });
});

// 2. Menyaring data berdasarkan input pencarian
const filteredRows = computed(() => {
    if (!search.value) {
        return processedRows.value;
    }
    const searchTerm = search.value.toLowerCase();
    return processedRows.value.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchTerm)
        )
    );
});

// 3. Mengurutkan data yang sudah difilter
const sortedRows = computed(() => {
    let result = [...filteredRows.value];
    if (sortBy.value) {
        // Gunakan nilai '_count' khusus untuk sorting kolom chart
        const sortKey = sortBy.value === 'visitorperhours' ? 'visitorperhours_count' : sortBy.value;

        result.sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder.value === 'asc' ? valA - valB : valB - valA;
            }
            return sortOrder.value === 'asc'
                ? String(valA || '').localeCompare(String(valB || ''))
                : String(valB || '').localeCompare(String(valA || ''));
        });
    }
    return result;
});

// 4. Memotong data untuk paginasi
const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    // Reset ke halaman 1 jika halaman saat ini kosong setelah filter
    if (start >= sortedRows.value.length && currentPage.value > 1) {
        currentPage.value = 1;
    }
    return sortedRows.value.slice(start, end);
});


// --- PAGINATION COMPUTED PROPERTIES ---
const totalPages = computed(() => Math.ceil(filteredRows.value.length / pageSize.value));
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endIndex = computed(() => Math.min(currentPage.value * pageSize.value, filteredRows.value.length));


// --- METHODS ---

// Mengelola logika sorting
function handleSort(key) {
    if (sortBy.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = key;
        sortOrder.value = 'asc';
    }
    currentPage.value = 1; // Kembali ke halaman 1 saat sorting
}

// Mengelola dropdown ekspor
function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}

// Membuat kunci unik untuk setiap baris v-for
function generateRowKey(row) {
    return `${row.lane || ''}_${row.plaza || ''}_${row.date || ''}_${JSON.stringify(row.visitorperhours || [])}`;
}

// --- CHART HELPER METHODS ---
function getChartCategories(visitorperhours) {
    if (!Array.isArray(visitorperhours)) return [];
    const hours = visitorperhours
        .map(item => new Date(item.date).getHours())
        .filter((hour, index, self) => self.indexOf(hour) === index)
        .sort((a, b) => a - b);
    return hours.map(hour => `${String(hour).padStart(2, '0')}:00`);
}

function getChartSeriesData(visitorperhours) {
    if (!Array.isArray(visitorperhours)) return [];
    const hourCounts = visitorperhours.reduce((acc, item) => {
        const hour = new Date(item.date).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});
    const hours = Object.keys(hourCounts).map(Number).sort((a, b) => a - b);
    return hours.map(hour => hourCounts[hour] || 0);
}


// --- EXPORT METHODS ---

async function exportToCSV() {
    const { unparse } = await import('papaparse');
    const { saveAs } = await import('file-saver');
    const csv = unparse(filteredRows.value); // Ekspor data terfilter
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${props.title.toLowerCase().replace(/\s+/g, '-')}.csv`);
    isDropdownOpen.value = false;
}

async function exportToExcel() {
    const XLSX = await import('xlsx');
    const { saveAs } = await import('file-saver');
    const ws = XLSX.utils.json_to_sheet(filteredRows.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, props.title);
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${props.title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
    isDropdownOpen.value = false;
}

async function exportToPDF() {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF();
    autoTable(doc, {
        head: [props.headers.map(h => h.text)],
        body: filteredRows.value.map(row =>
            props.headers.map(header => row[header.value])
        ),
    });
    doc.save(`${props.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    isDropdownOpen.value = false;
}

function printTable() {
    const printWindow = window.open('', '_blank');
    const tableHtml = `
        <html>
          <head>
            <title>Print ${props.title}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; font-size: 14px; }
              th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
              th { background-color: #f9fafb; color: #4b5563; text-transform: uppercase; font-size: 12px; }
              tr:nth-child(even) { background-color: #f9fafb; }
              @media print { body { margin: 0; } table { page-break-inside: auto; } }
            </style>
          </head>
          <body>
            <h1>${props.title}</h1>
            <table>
              <thead><tr>${props.headers.map(h => `<th>${h.text}</th>`).join('')}</tr></thead>
              <tbody>
                ${filteredRows.value.map(row => `
                  <tr>
                    ${props.headers.map(header => `<td>${row[header.value] || ''}</td>`).join('')}
                  </tr>`).join('')}
              </tbody>
            </table>
          </body>
        </html>`;
    printWindow.document.write(tableHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    isDropdownOpen.value = false;
}

const exportButtonList = [
    { label: 'CSV', action: 'export-csv', icon: 'bi-filetype-csv', handler: exportToCSV },
    { label: 'Excel', action: 'export-excel', icon: 'bi-filetype-xlsx', handler: exportToExcel },
    { label: 'PDF', action: 'export-pdf', icon: 'bi-filetype-pdf', handler: exportToPDF },
    { label: 'Print', action: 'print', icon: 'bi-printer', handler: printTable },
];

</script>