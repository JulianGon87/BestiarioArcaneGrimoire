import { ref, computed } from 'vue';

const allMonsters = ref([]);
const searchQuery = ref('');
const selectedType = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const nextUrl = ref(null);
const prevUrl = ref(null);
const totalCount = ref(0);

export function useMonsters() {
    const setMonsters = (apiData) => {
        totalCount.value = apiData.count || 0;
        nextUrl.value = apiData.next || null;
        prevUrl.value = apiData.previous || null;
        totalPages.value = Math.ceil((apiData.count || 0) / 50) || 1;

        allMonsters.value = (apiData.results || []).map(m => ({
            id: m.slug,
            name: m.name,
            type: m.type,
            hp: m.hit_points,
            ac: m.armor_class,
            cr: m.challenge_rating,
            image: "https://placehold.co/400x300/1a1a1a/1a1a1a",
            description: m.desc || "Descripción no disponible en las arcanas."
        }));
    };

    const findMonsterById = (id) => {
        return allMonsters.value.find(m => String(m.id) === String(id));
    };

    const filteredMonsters = computed(() => {
        return allMonsters.value.filter(monster => {
            // El searchTerm ahora viaja al server. Filtramos localmente el tipo:
            const matchesType = selectedType.value === '' || monster.type === selectedType.value;
            return matchesType;
        });
    });

    return {
        allMonsters,
        searchQuery,
        selectedType,
        currentPage,
        totalPages,
        nextUrl,
        prevUrl,
        totalCount,
        filteredMonsters,
        findMonsterById,
        setMonsters
    };
}
