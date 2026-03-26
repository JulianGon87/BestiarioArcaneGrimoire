<template>
  <div class="w-full flex justify-center py-4">
    <div ref="chartContainer" class="w-full max-w-lg overflow-hidden relative"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const chartContainer = ref(null)

const stats = [
  { stat: 'Fuerza', value: 18 },
  { stat: 'Destreza', value: 14 },
  { stat: 'Inteligencia', value: 8 }
]

onMounted(() => {
  if (!chartContainer.value) return

  const margin = { top: 20, right: 20, bottom: 40, left: 40 }
  const width = chartContainer.value.clientWidth - margin.left - margin.right || 400
  const height = 300 - margin.top - margin.bottom

  d3.select(chartContainer.value).selectAll('*').remove()

  const svg = d3.select(chartContainer.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const x = d3.scaleBand()
    .domain(stats.map(d => d.stat))
    .range([0, width])
    .padding(0.3)

  const y = d3.scaleLinear()
    .domain([0, 20]) 
    .range([height, 0])

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .attr('color', '#a8a29e') 
    .selectAll('text')
    .attr('class', 'font-display text-base')

  svg.append('g')
    .call(d3.axisLeft(y).ticks(5))
    .attr('color', '#a8a29e') 

  svg.selectAll('.bar')
    .data(stats)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.stat))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', '#b45309') 
    .attr('rx', 4) 
})

</script>
