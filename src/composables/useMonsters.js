import { ref, computed } from 'vue';
import { monsters } from '../data/monsters.js';

const allMonsters = ref(monsters);
const searchQuery = ref('');
const selectedType = ref('');

export function useMonsters() {
    const findMonsterById = (id) => {
        return allMonsters.value.find(m => m.id === Number(id));
    };

    const filteredMonsters = computed(() => {
        return allMonsters.value.filter(monster => {
            const matchesSearch = monster.name.toLowerCase().includes(searchQuery.value.toLowerCase());
            const matchesType = selectedType.value === '' || monster.type === selectedType.value;
            return matchesSearch && matchesType;
        });
    });

    return {
        allMonsters,
        searchQuery,
        selectedType,
        filteredMonsters,
        findMonsterById
    };
}
