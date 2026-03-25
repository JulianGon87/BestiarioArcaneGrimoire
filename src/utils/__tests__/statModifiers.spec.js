import { describe, it, expect } from 'vitest'
import { getModifier, getFormattedModifier } from '../../utils/statModifiers.js'

describe('statModifiers.js', () => {
  // === getModifier() ===
  describe('getModifier()', () => {
    it('devuelve 4 para un score de 18 (Fuerza máxima base)', () => {
      expect(getModifier(18)).toBe(4)
    })

    it('devuelve -1 para un score de 8 (debilidad menor)', () => {
      expect(getModifier(8)).toBe(-1)
    })

    it('devuelve 0 para un score de 10 (valor neutro)', () => {
      expect(getModifier(10)).toBe(0)
    })

    it('devuelve 0 para un score de 11 (valor neutro)', () => {
      expect(getModifier(11)).toBe(0)
    })

    it('devuelve -5 para un score de 1 (mínimo absoluto D&D)', () => {
      expect(getModifier(1)).toBe(-5)
    })

    it('devuelve 10 para un score de 30 (máximo absoluto D&D)', () => {
      expect(getModifier(30)).toBe(10)
    })

    it('devuelve 0 si el score no es un número válido', () => {
      expect(getModifier('fuego')).toBe(0)
      expect(getModifier(NaN)).toBe(0)
      expect(getModifier(undefined)).toBe(0)
    })
  })

  // === getFormattedModifier() ===
  describe('getFormattedModifier()', () => {
    it('añade el signo + para modificadores positivos', () => {
      expect(getFormattedModifier(18)).toBe('+4')
    })

    it('el signo - ya está incluido en modificadores negativos', () => {
      expect(getFormattedModifier(8)).toBe('-1')
    })

    it('formatea el cero con signo positivo', () => {
      expect(getFormattedModifier(10)).toBe('+0')
    })
  })
})
