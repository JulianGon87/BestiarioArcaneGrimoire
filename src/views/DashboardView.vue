<template>
  <div class="h-full flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in overflow-y-auto scrollbar-hide">
    
    <!-- Fila Superior: Título (Fuera del grid) -->
    <div class="text-center w-full mb-2 md:mb-4">
      <h1 class="text-[35px] md:text-[58px] leading-none md:leading-tight text-secondary drop-shadow-sm break-words w-full">Arcane Grimoire</h1>
    </div>

    <!-- Contenido y columnas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl mx-auto items-center">
      
      <!-- Columna Izquierda: Texto y Botón -->
      <div class="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 md:pr-4">
        <p class="text-base md:text-2xl italic text-secondary/80 leading-relaxed text-balance">
          "Bienvenido, viajero. Estas páginas contienen el conocimiento prohibido de eras pasadas y el registro de las bestias que acechan en la oscuridad."
        </p>
        
        <router-link to="/bestiario" class="px-8 py-3 bg-secondary text-primary font-display text-xl rounded shadow-lg shadow-black/30 hover:bg-secondary/90 hover:scale-105 transition-all cursor-pointer border-2 border-accent inline-block">
          Adentrarse en el Bestiario
        </router-link>
      </div>

      <!-- Columna Derecha: Imagen -->
      <div class="w-full flex justify-center">
        <div class="w-[93%] md:w-[88%] lg:w-[83%] max-w-[31rem] rounded-xl shadow-2xl shadow-black/50 border-4 border-secondary/40 relative group overflow-hidden bg-stone-900 flex-shrink-0">
           <img src="/grimoire.png?v=2" alt="Arcane Grimoire Book" class="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
           <!-- Capa mágica oscura -->
           <div class="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Dashboard logic here
</script>

