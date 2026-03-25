/**
 * Calcula el modificador numérico base atado a un valor de característica.
 * Sigue la regla central del d20: (valor - 10) / 2 [redondeando siempre hacia abajo].
 *
 * Ej: 
 * - Un score de 18 devuelve 4 (+4).
 * - Un score de 8 devuelve -1.
 * 
 * @param {number} score 
 * @returns {number} Modificador matemático crudo
 */
export function getModifier(score) {
  if (typeof score !== 'number' || isNaN(score)) return 0;
  return Math.floor((score - 10) / 2);
}

/**
 * Recibe un score numérico y opcionalmente formatea su devolución como "String".
 * Útil para la UI, añadiendo el símbolo '+' por defecto en números positivos.
 * 
 * Ej: getFormattedModifier(18) => "+4"
 * 
 * @param {number} score 
 * @returns {string} 
 */
export function getFormattedModifier(score) {
  const mod = getModifier(score);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
