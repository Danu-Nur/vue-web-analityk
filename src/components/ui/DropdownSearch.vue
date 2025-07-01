<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const personalAccount = ref({ id: 1, name: 'Anisa Ken', initials: 'AK', color: 'from-purple-500 to-pink-500' });

const teams = ref([
    { id: 2, name: 'Army Mvc.', initials: 'AI', color: 'from-blue-500 to-green-500'},
    { id: 3, name: 'Monsters Un Mvc.', initials: 'MI', color: 'from-pink-500 to-blue-500' },
    { id: 4, name: 'Sam Carter', initials: 'SC', color: 'from-yellow-500 to-green-500' },
    { id: 5, name: 'John Doe', initials: 'JD', color: 'from-blue-500 to-yellow-500' },
    { id: 6, name: 'Emma Smith', initials: 'ES', color: 'from-red-300 to-pink-600' },
    
]);

const allOptions = computed(() => [personalAccount.value, ...teams.value]);

const searchQuery = ref('');
const isOpen = ref(false);
const selected = ref(personalAccount.value);

const dropdownRef = ref(null);
const buttonRef = ref(null);

const filteredTeams = computed(() =>
    teams.value.filter(team =>
        team.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

function toggleDropdown() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) searchQuery.value = '';
}

function selectOption(option) {
    selected.value = option;
    isOpen.value = false;
}

function handleClickOutside(event) {
    if (
        !dropdownRef.value?.contains(event.target) &&
        !buttonRef.value?.contains(event.target)
    ) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="relative w-screen xl:w-full xl:max-w-xs me-0 md:me-4">
        <!-- Trigger Button -->
        <button ref="buttonRef" @click="toggleDropdown"
            class="w-[200px] px-3 py-1.5 flex items-center justify-between text-sm font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none">
            <div class="flex items-center space-x-2 truncate">
                <div
                    :class="['w-6 h-6 rounded-full bg-gradient-to-tr text-xs',selected.color,'text-white flex items-center justify-center']">
                    {{ selected.initials }}</div>
                <span class="truncate">{{ selected.name }}</span>
            </div>
            <i class="bi bi-chevron-expand text-gray-500"></i>
        </button>

        <!-- Dropdown -->
        <div v-if="isOpen" ref="dropdownRef"
            class="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg text-sm overflow-hidden">
            <!-- Search -->
            <div class="relative p-2 border-b border-gray-200">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="bi bi-search text-gray-500"></i>
                </div>
                <input v-model="searchQuery" type="text" placeholder="Search team..."
                    class="w-full px-3 py-1.5 text-sm" />
            </div>

            <!-- Personal Account -->
            <div>
                <div class="px-3 pt-3 text-xs text-gray-500 uppercase">Personal Account</div>
                <div class="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    @click="selectOption(personalAccount)">
                    <div class="flex items-center space-x-2">
                        <div class="w-6 h-6 rounded-full text-xs bg-gray-500 text-white flex items-center justify-center">{{ personalAccount.initials }}</div>
                        <span>{{ personalAccount.name }}</span>
                    </div>
                    <svg v-if="selected.id === personalAccount.id" class="w-4 h-4 text-blue-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            <!-- Teams -->
            <div v-if="filteredTeams.length">
                <div class="px-3 pt-3 text-xs text-gray-500 uppercase">Teams</div>
                <div v-for="team in filteredTeams" :key="team.id"
                    class="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    @click="selectOption(team)">
                    <div class="flex items-center space-x-2">
                        <div class="w-6 h-6 rounded-full bg-gray-400 text-xs text-white flex items-center justify-center">{{ team.initials }}</div>
                        <span>{{ team.name }}</span>
                    </div>
                    <svg v-if="selected.id === team.id" class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            <!-- Create Team -->
            <div
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-t border-gray-200 text-blue-600 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Team</span>
            </div>
        </div>
    </div>
</template>
