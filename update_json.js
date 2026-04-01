const fs = require('fs');

const data = JSON.parse(fs.readFileSync('dieta_petra.json', 'utf8'));

// Update colors and labels for existing grupos based on HTML
const grupoUpdates = {
  frutas: { label: 'Frutas', color: '#E8704A' },
  verduras: { label: 'Verduras', color: '#52B788' },
  cereales: { label: 'Cereales', color: '#D4951A' },
  leguminosas: { label: 'Leguminosas', color: '#9C7A52' },
  aoa_mbag: { label: 'Proteína · muy bajo en grasa', color: '#E07070' },
  aoa_bag: { label: 'Proteína · bajo en grasa', color: '#C9697A' },
  aoa_mag: { label: 'Proteína · moderado en grasa', color: '#9B72CF' },
  grasas_sin_proteina: { label: 'Grasas sin proteína', color: '#C8A020' },
  lacteos_semidescremados: { label: 'Lácteos semidescremados', color: '#5B9EC9' },
  grasas_con_proteina: { label: 'Grasas con proteína', color: '#FFCC02' }
};

for (const [key, val] of Object.entries(grupoUpdates)) {
  if (data.grupos[key]) {
    data.grupos[key].label = val.label;
    data.grupos[key].color = val.color;
  }
}

// Ensure emojis on meals
const mealUpdates = {
  desayuno: { emoji: '🌅', label: 'Desayuno' },
  colacion_1: { emoji: '🍎', label: 'Colación 1' },
  comida: { emoji: '🍽️', label: 'Comida' },
  colacion_2: { emoji: '🥝', label: 'Colación 2' },
  cena: { emoji: '🌙', label: 'Cena' }
};

for (const [key, val] of Object.entries(mealUpdates)) {
  if (data.distribucion_comidas[key]) {
    data.distribucion_comidas[key].emoji = val.emoji;
    data.distribucion_comidas[key].label = val.label;
    // ensure each meal has its own "id" inside to match index.html pattern
    data.distribucion_comidas[key].id = key;
  }
}

fs.writeFileSync('dieta_petra.json', JSON.stringify(data, null, 2));
