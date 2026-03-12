<template>
  <div class="flex h-screen items-center justify-center p-4 lg:p-10">
    <!-- The Book Container -->
    <div class="relative w-full max-w-7xl h-[85vh] flex shadow-2xl rounded-r-3xl rounded-l-lg overflow-hidden border-8 border-secondary/60 bg-secondary">
      
      <!-- Spine / Sidebar -->
      <aside 
        class="bg-gradient-to-r from-stone-900 to-stone-800 text-stone-300 flex flex-col border-r-4 border-stone-950 shadow-inner z-30 transition-[width] duration-500 ease-in-out relative"
        :class="[isSidebarOpen ? 'w-64' : 'w-12']"
      >
        <!-- Toggle Button -->
        <button 
          @click="toggleSidebar"
          class="absolute -right-10 top-4 bg-secondary text-primary p-2 rounded-r-md shadow-md border-y border-r border-accent/50 hover:bg-secondary/90 hover:text-accent transition-colors z-40 focus:outline-none"
          title="Toggle Grimoire Spine"
        >
          <i class="fas" :class="isSidebarOpen ? 'fa-chevron-left' : 'fa-book-open'"></i>
        </button>

        <div class="overflow-hidden flex flex-col h-full whitespace-nowrap">
          <div class="p-6 text-center border-b border-stone-700/50 min-w-[16rem]">
            <div class="text-4xl text-accent mb-2 transition-transform duration-500" :class="{ 'scale-0': !isSidebarOpen }">✦</div>
            <h2 class="font-display text-2xl tracking-wider text-accent transition-opacity duration-300" :class="{ 'opacity-0': !isSidebarOpen }">Grimorio</h2>
          </div>
          
          <nav class="flex-1 py-8 px-2 space-y-4 w-full">
            <router-link 
              to="/dashboard" 
              class="flex items-center gap-4 px-3 py-3 rounded hover:bg-white/5 hover:text-accent transition-all duration-300 border border-transparent hover:border-accent/20 group overflow-hidden"
              active-class="text-accent bg-white/10 border-accent/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <div class="w-8 flex justify-center shrink-0">
                <i class="fas fa-dungeon text-xl group-hover:scale-110 transition-transform"></i>
              </div>
              <span class="text-lg tracking-wide transition-opacity duration-300" :class="{ 'opacity-0': !isSidebarOpen }">Inicio</span>
            </router-link>
            
            <router-link 
              to="/bestiario" 
              class="flex items-center gap-4 px-3 py-3 rounded hover:bg-white/5 hover:text-accent transition-all duration-300 border border-transparent hover:border-accent/20 group overflow-hidden"
              active-class="text-accent bg-white/10 border-accent/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <div class="w-8 flex justify-center shrink-0">
                <i class="fas fa-dragon text-xl group-hover:scale-110 transition-transform"></i>
              </div>
              <span class="text-lg tracking-wide transition-opacity duration-300" :class="{ 'opacity-0': !isSidebarOpen }">Bestiario</span>
            </router-link>
          </nav>
          
        </div>
      </aside>

      <!-- Pages / Main Content -->
      <main class="flex-1 bg-primary relative overflow-hidden flex flex-col w-full">
        <!-- Paper Texture Overlay -->
        <div class="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
        
        <!-- Binding Shadow (Left side) -->
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-20 transition-[width] duration-500" :class="{ 'w-4': !isSidebarOpen }"></div>
        
        <!-- Content Area -->
        <div class="relative z-10 h-full p-2 transition-all duration-500">
           <div class="h-full border border-secondary/10 m-2 rounded-sm p-2 overflow-y-auto scrollbar-hide">
             <router-view v-slot="{ Component }">
               <transition name="fade" mode="out-in">
                 <component :is="Component" />
               </transition>
             </router-view>
           </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { version } from '../../package.json'

const isSidebarOpen = ref(true)
const appVersion = ref(version)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

