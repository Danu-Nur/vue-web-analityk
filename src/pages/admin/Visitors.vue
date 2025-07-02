<script setup>
import { defineAsyncComponent } from 'vue';
import DashboardAdminLayout from '../../layouts/DashboardAdminLayout.vue';
import SkeletonMaps from '../../components/skeleton/SkeletonMaps.vue';
const MapChoroplethAsyn = defineAsyncComponent(() =>
    import('../../components/maps/MapChoropleth.vue'));
</script>
<template>
    <DashboardAdminLayout>
        <div class="max-w-screen max-h-screen">
            <!-- <MapVisitors /> -->
            <Suspense>
                <template #default>
                    <MapChoroplethAsyn />
                </template>
                <template #fallback>
                    <SkeletonMaps />
                </template>
            </Suspense>
        </div>
    </DashboardAdminLayout>
</template>