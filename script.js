// Modular, scalable portfolio JS for Marsvpial (Carol Condeço)
// Assumes projects are in /projetos/PROJECT_NAME/{desc/images}

const PROJECTS_DIR = 'projetos';
const GRID_COLS = 3;

// Global cache for project names, descriptions, and images
let projectCache = [];

// Utility: fetch project folders
async function getProjectFolders() {
  // Load project names from JSON file
  const resp = await fetch('projects.json');
  if (!resp.ok) throw new Error('Could not load projects.json');
  return await resp.json();
}

// Utility: fetch images for a project
async function getProjectImages(project) {
  // Load images mapping from JSON file (cache in memory for performance)
  if (!getProjectImages.cache) {
    const resp = await fetch('images.json');
    if (!resp.ok) throw new Error('Could not load images.json');
    getProjectImages.cache = await resp.json();
  }
  return getProjectImages.cache[project] || [];
}

// Utility: fetch project description
async function getProjectDesc(project) {
  const path = `${PROJECTS_DIR}/${project}/desc/descProj.txt`;
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error('Not found');
    return await resp.text();
  } catch {
    return 'No description available.';
  }
}

// Build project cache
async function buildProjectCache() {
  const projects = await getProjectFolders();
  projectCache = await Promise.all(projects.map(async (project) => {
    const desc = await getProjectDesc(project);
    const images = await getProjectImages(project);
    return { name: project, description: desc, images };
  }));
}

// Main: render grid
async function renderProjectsGrid() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  const projects = await getProjectFolders();
  let posInGrid = 1;
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const images = await getProjectImages(project);
    if (!images.length) continue;
    // Project name row
    const nameDiv = document.createElement('div');
    nameDiv.className = 'project-name';
    nameDiv.textContent = project;
    grid.appendChild(nameDiv);
    // Project row (3 columns)
    const row = document.createElement('div');
    row.className = 'project-row';
    row.dataset.project = project;
    row.dataset.posInGrid = posInGrid; // Store posInGrid for later
    // Place first image in posInGrid (1-3)
    for (let col = 1; col <= GRID_COLS; col++) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'project-col';
      if (col === posInGrid) {
        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = `${PROJECTS_DIR}/${project}/images/${images[0]}`;
        img.alt = `${project} image`;
        img.dataset.project = project;
        img.dataset.index = 0;
        imgDiv.appendChild(img);
      }
      row.appendChild(imgDiv);
    }
    grid.appendChild(row);
    // Insert deadzone after each project row except the last
    if (i < projects.length - 1) {
      const deadzone = document.createElement('div');
      deadzone.className = 'deadzone';
      deadzone.style.gridColumn = '1 / span 3';
      deadzone.style.height = '32px';
      deadzone.style.width = '100%';
      deadzone.style.background = 'transparent';
      grid.appendChild(deadzone);
    }
    posInGrid = posInGrid % 3 + 1;
  }
  addRowHoverHandlers();
  addImageHoverHandlers();
  addDeadzoneHandlers();
}

function renderProjectsGridSync() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  let posInGrid = 1;
  for (let i = 0; i < projectCache.length; i++) {
    const { name, images } = projectCache[i];
    if (!images.length) continue;
    // Project name row
    const nameDiv = document.createElement('div');
    nameDiv.className = 'project-name';
    nameDiv.textContent = name;
    grid.appendChild(nameDiv);
    // Project row (3 columns)
    const row = document.createElement('div');
    row.className = 'project-row';
    row.dataset.project = name;
    row.dataset.posInGrid = posInGrid; // Store posInGrid for later
    // Place first image in posInGrid (1-3)
    for (let col = 1; col <= GRID_COLS; col++) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'project-col';
      if (col === posInGrid) {
        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = `${PROJECTS_DIR}/${name}/images/${images[0]}`;
        img.alt = `${name} image`;
        img.dataset.project = name;
        img.dataset.index = 0;
        imgDiv.appendChild(img);
      }
      row.appendChild(imgDiv);
    }
    grid.appendChild(row);
    // Insert deadzone after each project row except the last
    if (i < projectCache.length - 1) {
      const deadzone = document.createElement('div');
      deadzone.className = 'deadzone';
      deadzone.style.gridColumn = '1 / span 3';
      deadzone.style.height = '32px';
      deadzone.style.width = '100%';
      deadzone.style.background = 'transparent';
      grid.appendChild(deadzone);
    }
    posInGrid = posInGrid % 3 + 1;
  }
  addRowHoverHandlers();
  addImageHoverHandlers();
  addDeadzoneHandlers();
}

// Row hover: show all images, fade others, change bg
function addRowHoverHandlers() {
  const rows = document.querySelectorAll('.project-row');
  const names = document.querySelectorAll('.project-name');
  let lastDescIdx = null;
  rows.forEach((row, rowIdx) => {
    row.addEventListener('mouseenter', async () => {
      document.body.classList.add('bg-dark');
      // Grayscale all images not from this project
      rows.forEach(r => {
        if (r !== row) {
          r.querySelectorAll('.project-image').forEach(img => {
            img.classList.add('grayscale');
          });
        } else {
          r.querySelectorAll('.project-image').forEach(img => {
            img.classList.remove('grayscale');
          });
        }
      });
      // Show all images for this project
      const project = row.dataset.project;
      const images = await getProjectImages(project);
      row.querySelectorAll('.project-col').forEach((col, i) => {
        col.innerHTML = '';
        if (images[i]) {
          const img = document.createElement('img');
          img.className = 'project-image';
          img.src = `${PROJECTS_DIR}/${project}/images/${images[i]}`;
          img.alt = `${project} image ${i+1}`;
          img.dataset.project = project;
          img.dataset.index = i;
          col.appendChild(img);
        }
      });
      addImageHoverHandlers();
      // Replace next project name with description using cache
      if (lastDescIdx !== null && names[lastDescIdx]) {
        names[lastDescIdx].textContent = projectCache[lastDescIdx].name;
        names[lastDescIdx].classList.remove('desc-as-title');
      }
      const nextName = names[rowIdx + 1];
      if (nextName && projectCache[rowIdx]) {
        nextName.textContent = projectCache[rowIdx].description;
        nextName.classList.add('desc-as-title');
        lastDescIdx = rowIdx + 1;
      }
    });
    row.addEventListener('mouseleave', () => {
      resetGridState();
    });
  });
}

function addImageHoverHandlers() {
  const images = document.querySelectorAll('.project-image');
  images.forEach(img => {
    img.addEventListener('mouseenter', async (e) => {
      const project = img.dataset.project;
      const desc = await getProjectDesc(project);
      // Removed description overlay logic
    });
    img.addEventListener('mouseleave', () => {
      // Removed description overlay logic
    });
  });
}

function addDeadzoneHandlers() {
  document.querySelectorAll('.deadzone').forEach(dz => {
    dz.addEventListener('mouseenter', () => {
      // Restore all project names from cache
      const names = document.querySelectorAll('.project-name');
      names.forEach((name, idx) => {
        name.textContent = projectCache[idx] ? projectCache[idx].name : '';
        name.classList.remove('desc-as-title');
      });
      resetGridState();
    });
  });
}

function resetGridState() {
  document.body.classList.remove('bg-dark');
  // Restore all images to color and one per row using cache
  const rows = document.querySelectorAll('.project-row');
  const names = document.querySelectorAll('.project-name');
  rows.forEach((row, rowIdx) => {
    row.querySelectorAll('.project-image').forEach(img => {
      img.classList.remove('grayscale');
    });
    // Restore only first image in correct column using cache
    const { images } = projectCache[rowIdx];
    const posInGrid = parseInt(row.dataset.posInGrid, 10);
    row.querySelectorAll('.project-col').forEach((col, i) => {
      col.innerHTML = '';
      if (i + 1 === posInGrid && images[0]) {
        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = `${PROJECTS_DIR}/${row.dataset.project}/images/${images[0]}`;
        img.alt = `${row.dataset.project} image`;
        img.dataset.project = row.dataset.project;
        img.dataset.index = 0;
        col.appendChild(img);
      }
    });
    addImageHoverHandlers();
  });
  // Restore all project names
  names.forEach((name, idx) => {
    name.textContent = projectCache[idx] ? projectCache[idx].name : '';
    name.classList.remove('desc-as-title');
  });
}

// On load
window.addEventListener('DOMContentLoaded', async () => {
  await buildProjectCache();
  renderProjectsGrid();
});
