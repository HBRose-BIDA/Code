const artifacts = [
  {
    stepNumber: 1,
    fileName: "fetch_training_data.py",
    role: "Extracts historical NHL game results and team standings from the NHL API for the configured date range. Writes one record per game per team.",
    batch: "Training Batch",
    fileType: "py",
    openUrl:
      "https://github.com/HBRose-BIDA/Code/blob/main/fetch_training_data.py",
  },
  {
    stepNumber: 2,
    fileName: "train_model.py",
    role: "Reads the training dataset, engineers team performance features, trains an XGBoost binary classifier, and serializes the model to JSON.",
    batch: "Training Batch",
    fileType: "py",
    openUrl: "https://github.com/HBRose-BIDA/Code/blob/main/train_model.py",
  },
  {
    stepNumber: 3,
    fileName: "fetch_schedule.py",
    role: "Pulls scheduled NHL games for the configured target date from the NHL API and writes them to today_games.json.",
    batch: "Prediction Batch",
    fileType: "py",
    openUrl: "https://github.com/HBRose-BIDA/Code/blob/main/fetch_schedule.py",
  },
  {
    stepNumber: 4,
    fileName: "generate_predictions.py",
    role: "Loads the trained model and today's schedule, builds feature vectors for each matchup, and appends predicted winners with confidence scores to the log.",
    batch: "Prediction Batch",
    fileType: "py",
    openUrl:
      "https://github.com/HBRose-BIDA/Code/blob/main/generate_predictions.py",
  },
  {
    stepNumber: 5,
    fileName: "config.json",
    role: "Centralizes all pipeline settings: training date range, NHL API base URL, schedule target date, and file DSNs for all inputs and outputs.",
    batch: "Data File",
    fileType: "json",
    openUrl: "https://github.com/HBRose-BIDA/Code/blob/main/config.json",
  },
  {
    stepNumber: 6,
    fileName: "master_training_data.json",
    role: "Created by step 1. Per-game team performance snapshots (standings, goals, recent form) used as the feature set for model training. Not in the repo — generated locally when you run fetch_training_data.py.",
    batch: "Data File",
    fileType: "json",
    openUrl: null,
  },
  {
    stepNumber: 7,
    fileName: "nhl_win_predictor.json",
    role: "Created by step 2. Serialized XGBoost model read by generate_predictions.py at score time. Not in the repo — generated locally when you run train_model.py.",
    batch: "Data File",
    fileType: "json",
    openUrl: null,
  },
  {
    stepNumber: 8,
    fileName: "today_games.json",
    role: "Created by step 3. Scheduled games for the target date including team abbreviations and game identifiers. Not in the repo — generated locally when you run fetch_schedule.py.",
    batch: "Data File",
    fileType: "json",
    openUrl: null,
  },
  {
    stepNumber: 9,
    fileName: "model_predictions_log.csv",
    role: "Created by step 4. Append-only audit log of every prediction run: timestamp, game date, matchup, predicted winner, and confidence (0–1). Not in the repo — generated locally when you run generate_predictions.py.",
    batch: "Data File",
    fileType: "csv",
    openUrl: null,
  },
  {
    stepNumber: 10,
    fileName: "RUNBOOK.md",
    role: "Operational guide covering standard run procedures, scheduling model, config change guide, troubleshooting, and data contracts.",
    batch: "Documentation",
    fileType: "md",
    openUrl: "https://github.com/HBRose-BIDA/Code/blob/main/RUNBOOK.md",
  },
  {
    stepNumber: 11,
    fileName: "CONFIG_DOCUMENTATION.md",
    role: "Field-by-field reference for config.json: section descriptions, used-by mapping for each key, and a full pipeline flow diagram.",
    batch: "Documentation",
    fileType: "md",
    openUrl:
      "https://github.com/HBRose-BIDA/Code/blob/main/CONFIG_DOCUMENTATION.md",
  },
  {
    stepNumber: 12,
    fileName: "Data_Dictionary.xlsx",
    role: "Data dictionary for the pipeline: field names, data types, descriptions, and source mappings for every field in master_training_data.json and the predictions log.",
    batch: "Documentation",
    fileType: "xlsx",
    openUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FHBRose-BIDA%2FCode%2Fmain%2FData_Dictionary.xlsx",
  },
];

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  search: "",
  batch: "all",
  type: "all",
  sort: "asc",
};

// ── UI refs ───────────────────────────────────────────────────────────────────

const ui = {
  searchInput: document.getElementById("searchInput"),
  batchFilter: document.getElementById("batchFilter"),
  typeFilter: document.getElementById("typeFilter"),
  sortOrder: document.getElementById("sortOrder"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badgeClass(batch) {
  if (batch === "Training Batch" || batch === "Prediction Batch") return "";
  if (batch === "Data File") return " is-data";
  return " is-doc";
}

// ── Dataset ───────────────────────────────────────────────────────────────────

const dataset = artifacts.map((item) => ({
  stepNumber: item.stepNumber,
  fileName: item.fileName,
  role: item.role,
  batch: item.batch,
  fileType: item.fileType,
  openUrl: item.openUrl,
  searchText:
    `${item.fileName} ${item.role} ${item.batch} ${item.fileType}`.toLowerCase(),
}));

// ── Filter + sort ─────────────────────────────────────────────────────────────

function filteredRows() {
  const rows = dataset.filter((row) => {
    const searchMatch =
      !state.search || row.searchText.includes(state.search);
    const batchMatch = state.batch === "all" || row.batch === state.batch;
    const typeMatch = state.type === "all" || row.fileType === state.type;
    return searchMatch && batchMatch && typeMatch;
  });

  rows.sort((a, b) => {
    const dir = state.sort === "asc" ? 1 : -1;
    return (a.stepNumber - b.stepNumber) * dir;
  });

  return rows;
}

// ── Render ────────────────────────────────────────────────────────────────────

function rowHtml(row) {
  const openCell = row.openUrl
    ? `<a class="view-link" href="${row.openUrl}" target="_blank" rel="noopener noreferrer">Open</a>`
    : `<span class="generated-tag">Generated on run</span>`;

  return `
    <tr>
      <td>
        <span class="step-badge${badgeClass(row.batch)}">${escapeHtml(String(row.stepNumber))}</span>
        <p class="file-type-tag">${escapeHtml(row.fileType.toUpperCase())}</p>
      </td>
      <td><code>${escapeHtml(row.fileName)}</code></td>
      <td>${escapeHtml(row.role)}</td>
      <td><span class="batch-tag">${escapeHtml(row.batch)}</span></td>
      <td>${openCell}</td>
    </tr>
  `;
}

function render() {
  const rows = filteredRows();

  if (rows.length === 0) {
    ui.tableBody.innerHTML = "";
    ui.emptyState.hidden = false;
    return;
  }

  ui.emptyState.hidden = true;
  ui.tableBody.innerHTML = rows.map(rowHtml).join("");
}

// ── Events ────────────────────────────────────────────────────────────────────

function wireEvents() {
  ui.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    render();
  });

  ui.batchFilter.addEventListener("change", (e) => {
    state.batch = e.target.value;
    render();
  });

  ui.typeFilter.addEventListener("change", (e) => {
    state.type = e.target.value;
    render();
  });

  ui.sortOrder.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
}

wireEvents();
render();
