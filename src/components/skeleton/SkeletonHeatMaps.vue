<template>
    <div class="skeleton-worldmap-container">
        <div class="skeleton-worldmap">
            <div class="continent animate-pulse continent-america"></div>
            <div class="continent animate-pulse continent-europe"></div>
            <div class="continent animate-pulse continent-africa"></div>
            <div class="continent animate-pulse continent-asia"></div>
            <div class="continent animate-pulse continent-australia"></div>
            <div class="island animate-pulse island-indonesia"></div>
            <div class="island animate-pulse island-philippines"></div>
            <div class="island animate-pulse island-singapore"></div>
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
    height: 100%;
    width: 100%;
    /* max-width: 600px; */
    margin: auto;
    background-color: #f3f4f6;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.skeleton-worldmap {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    /* animation: shimmer 1.5s infinite linear; */
    border-radius: 8px;
}

/* Representasi benua dan pulau dengan bentuk persegi panjang membulat */
.continent,
.island {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Posisi dan ukuran benua disesuaikan dengan peta dunia (fokus Asia Tenggara) */
.continent-america {
    top: 20%;
    left: 5%;
    width: 20%;
    height: 30%;
}

.continent-europe {
    top: 10%;
    left: 40%;
    width: 15%;
    height: 20%;
}

.continent-africa {
    top: 35%;
    left: 45%;
    width: 18%;
    height: 25%;
}

.continent-asia {
    top: 15%;
    left: 60%;
    width: 30%;
    height: 40%;
}

.continent-australia {
    top: 60%;
    left: 75%;
    width: 12%;
    height: 15%;
}

/* Representasi pulau-pulau kecil untuk negara Asia Tenggara */
.island-indonesia {
    top: 50%;
    left: 65%;
    width: 15%;
    height: 10%;
}

.island-philippines {
    top: 35%;
    left: 80%;
    width: 8%;
    height: 12%;
}

.island-singapore {
    top: 55%;
    left: 70%;
    width: 3%;
    height: 3%;
}

</style>