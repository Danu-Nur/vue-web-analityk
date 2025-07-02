<template>
    <TableHeader v-model:search="search" v-model:page-size="pageSize" @export-csv="exportToCSV"
        @export-excel="exportToExcel" @export-pdf="exportToPDF" @print="printTable" />
    <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <DataTable :headers="headers" :rows="paginatedRows" :sort-by="sortBy" :sort-order="sortOrder"
            @sort="handleSort" />
    </div>
    <TableFooter :total-entries="filteredRows.length" :page-size="pageSize" :current-page="currentPage"
        @update:page-size="updatePageSize($event)" @update:current-page="currentPage = $event" />
</template>

<script setup>
import { ref, computed } from 'vue';
import TableHeader from './TableHeader.vue';
import DataTable from './DataTableBody.vue';
import TableFooter from './TableFooter.vue';

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

const search = ref('');
const sortBy = ref('');
const sortOrder = ref('asc');
const pageSize = ref(10);
const currentPage = ref(1);

const filteredRows = computed(() => {
    let result = [...props.items];
    if (search.value) {
        result = result.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(search.value.toLowerCase())
            )
        );
    }
    if (sortBy.value) {
        result.sort((a, b) => {
            const valA = sortBy.value === 'visitorperhours' ? a[sortBy.value]?.length || 0 : a[sortBy.value];
            const valB = sortBy.value === 'visitorperhours' ? b[sortBy.value]?.length || 0 : b[sortBy.value];
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

const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredRows.value.slice(start, end);
});

function updatePageSize(newPageSize) {
    pageSize.value = newPageSize;
    currentPage.value = 1; // Reset to first page when pageSize changes
}

function handleSort({ key, order }) {
    sortBy.value = key;
    sortOrder.value = order;
    currentPage.value = 1; // Reset to first page when sorting
}

// Export CSV
async function exportToCSV() {
    const { unparse } = await import('papaparse');
    const { saveAs } = await import('file-saver');
    const csv = unparse(filteredRows.value.map(row => ({
        ...row,
        visitorperhours: row.visitorperhours ? row.visitorperhours.length : 0,
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${props.title.toLowerCase().replace(/\s+/g, '-')}.csv`);
}

// Export Excel
async function exportToExcel() {
    const XLSX = await import('xlsx');
    const { saveAs } = await import('file-saver');
    const ws = XLSX.utils.json_to_sheet(filteredRows.value.map(row => ({
        ...row,
        visitorperhours: row.visitorperhours ? row.visitorperhours.length : 0,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, props.title);
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${props.title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
}

// Export PDF
async function exportToPDF() {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    Ascending
    const doc = new jsPDF();
    autoTable(doc, {
        head: [props.headers.map((header) => header.text)],
        body: filteredRows.value.map((row) =>
            props.headers.map((header) => {
                const value = row[header.value];
                return header.formatter ? header.formatter(value) : value;
            })
        ),
    });
    doc.save(`${props.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

// Print Table
function printTable() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
    <html>
      <head>
        <title>Print ${props.title}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; font-size: 14px; }
          th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
          th { background-color: #f9fafb; color: #4b5563; text-transform: uppercase; font-size: 12px; }
          tr:nth-child(even) { background-color: #f9fafb; }
          .text-red-500 { color: #ef4444; }
          .text-green-600 { color: #16a34a; }
          @media print {
            body { margin: 0; }
            table { page-break-inside: auto; }
          }
        </style>
      </head>
      <body>
        <h1>${props.title}</h1>
        <table>
          <thead>
            <tr>
              ${props.headers.map((header) => `<th>${header.text}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${filteredRows.value
            .map(
                (row) => `
                  <tr>
                    ${props.headers
                        .map((header) => {
                            const value = header.value === 'visitorperhours' ? (row[header.value]?.length || 0) : row[header.value];
                            const formattedValue = header.formatter ? header.formatter(value) : value;
                            return `<td class="${header.class || ''}">${formattedValue}</td>`;
                        })
                        .join('')}
                  </tr>
                `
            )
            .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
</script>