<template>
  <div class="h-full w-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
    <div class="bg-parchment-light border-4 border-secondary/60 p-12 rounded-xl shadow-2xl max-w-2xl relative overflow-hidden">
      <div class="absolute inset-0 bg-stone-900/5 pointer-events-none mix-blend-multiply"></div>
      
      <i class="fas fa-dungeon text-7xl text-stone-800 mb-6 drop-shadow-md"></i>
      
      <h1 class="font-display text-4xl mb-4 text-stone-800 tracking-wide text-balance">
        Te has perdido en el calabozo...
      </h1>
      
      <p class="font-body text-xl text-stone-600 mb-10 max-w-md mx-auto italic text-balance">
        La página que buscas ha sido devorada por una sombra o simplemente nunca fue escrita en este grimorio.
      </p>
      
      <router-link 
        to="/dashboard"
        class="inline-block px-8 py-3 bg-secondary text-primary font-display text-xl rounded shadow-lg hover:bg-secondary/90 hover:scale-105 transition-all text-shadow-sm"
      >
        Regresar al Inicio
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.text-balance {
  text-wrap: balance;
}
</style>
