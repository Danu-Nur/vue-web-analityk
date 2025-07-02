<template>
    <div class="skeleton-worldmap-container w-full h-full">
        <div class="skeleton-worldmap">
            <div class="continent continent-america"></div>
            <div class="continent continent-europe"></div>
            <div class="continent continent-africa"></div>
            <div class="continent continent-asia"></div>
            <div class="continent continent-australia"></div>
        </div>
    </div>
</template>

<script setup>
// No script needed for static skeleton
</script>

<style scoped>
.skeleton-worldmap-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    background-color: #f3f4f6;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
}

.skeleton-worldmap {
    position: relative;
    width: 80%;
    height: 80%;
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    border-radius: 10px;
}

/* Represent each continent as abstracted blurred block */
.continent {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

/* Rough positioning of continents */
.continent-america {
    top: 20%;
    left: 10%;
    width: 18%;
    height: 28%;
}

.continent-europe {
    top: 15%;
    left: 50%;
    width: 10%;
    height: 15%;
}

.continent-africa {
    top: 35%;
    left: 52%;
    width: 14%;
    height: 25%;
}

.continent-asia {
    top: 20%;
    left: 65%;
    width: 25%;
    height: 35%;
}

.continent-australia {
    top: 65%;
    left: 80%;
    width: 10%;
    height: 12%;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>
