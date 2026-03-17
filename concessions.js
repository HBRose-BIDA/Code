const AZURE_FILE_BASE_URL = "https://hbrbida.blob.core.windows.net/class-files/";

const OFFICE_WEB_VIEWER_PREFIX = "https://view.officeapps.live.com/op/view.aspx?src=";

const OFFICE_VIEWABLE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);

const ARTIFACT_FEED = [
  {
    stepNumber: 1,
    fileName: "Concessions 11-13.docx",
    artifactPurpose: "Concessions Strategic Recommendation Meeting Notes. Summarizes the 2011 to 2013 concessions review, outsourcing recommendation, risks, and cross-functional follow-up assignments needed for a vendor decision.",
    methodsAndTechniques: "Stakeholder analysis, strategic recommendation, operational scoping, and action planning",
    fileType: "docx",
    focus: "Strategy and Recommendation"
  },
  {
    stepNumber: 2,
    fileName: "Concessions 11-13.pptx",
    artifactPurpose: "Concessions Analysis Presentation. Presents assignment goals, income breakdowns, seasonal patterns, storage considerations, and follow-up decisions for the concessions review.",
    methodsAndTechniques: "Executive presentation, trend analysis, revenue review, and follow-up planning",
    fileType: "pptx",
    focus: "Strategy and Recommendation"
  },
  {
    stepNumber: 3,
    fileName: "Dashboard Data File_Hjalmaar.xlsx",
    artifactPurpose: "Concessions Dashboard Data File. Structures product, category, temperature, and monthly sales fields so dashboards can compare concession performance across years and item groups.",
    methodsAndTechniques: "Dataset design, dimensional categorization, monthly sales aggregation, and dashboard source preparation",
    fileType: "xlsx",
    focus: "Data and Dashboard Design"
  },
  {
    stepNumber: 4,
    fileName: "Building the Model.docx",
    artifactPurpose: "Concessions Sales Projection Model Plan. Documents a Python-based approach for aggregating historical SKU sales and projecting future demand while working around missing years in the dataset.",
    methodsAndTechniques: "Python scripting, growth-rate forecasting, Excel output design, and projection logic",
    fileType: "docx",
    focus: "Forecasting and Optimization"
  },
  {
    stepNumber: 5,
    fileName: "Cheese Sauce Optimization Model_Hjalmaar.xlsx",
    artifactPurpose: "Concessions Supply Optimization Model. Uses a Solver-style workbook to minimize purchasing cost under quantity and supply constraints for a product-mix planning scenario.",
    methodsAndTechniques: "Excel Solver, linear programming, constrained optimization, and cost minimization",
    fileType: "xlsx",
    focus: "Forecasting and Optimization"
  },
  {
    stepNumber: 6,
    fileName: "SummaryHR-2-28-2021.docx",
    artifactPurpose: "Jersey Sales Forecast Executive Summary. Extends the fan-revenue view beyond concessions by outlining profit, inventory, and fan-experience recommendations for jerseys and memorabilia.",
    methodsAndTechniques: "Executive summary writing, retail margin analysis, inventory planning, and fan engagement strategy",
    fileType: "docx",
    focus: "Strategy and Recommendation"
  },
  {
    stepNumber: 7,
    fileName: "Edit -2 MakingdataStickweek5 .docx",
    artifactPurpose: "Making Data Stick Communication Notes. Explains how to tailor visuals and narrative to audience needs so concession insights are easier to understand and act on.",
    methodsAndTechniques: "Data storytelling, audience analysis, visualization selection, and presentation design",
    fileType: "docx",
    focus: "Communication and Supporting Material"
  },
  {
    stepNumber: 8,
    fileName: "New Microsoft Word Document.docx",
    artifactPurpose: "Concessions Workbook Reference Stub. Captures a minimal reference pointing back to the Concessions 11-13 workbook artifact.",
    methodsAndTechniques: "Reference note capture and workbook identification",
    fileType: "docx",
    focus: "Communication and Supporting Material"
  }
];

const state = {
  search: "",
  type: "all",
  focus: "all",
  sort: "asc"
};

const ui = {
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  focusFilter: document.getElementById("focusFilter"),
  sortOrder: document.getElementById("sortOrder"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
  shownCount: document.getElementById("shownCount"),
  totalCount: document.getElementById("totalCount"),
  chips: Array.from(document.querySelectorAll(".chip"))
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildAzureUrl(fileName) {
  const normalizedBase = AZURE_FILE_BASE_URL.endsWith("/") ? AZURE_FILE_BASE_URL : AZURE_FILE_BASE_URL + "/";
  return normalizedBase + encodeURIComponent(fileName).replace(/%2F/g, "/");
}

function resolveOpenUrl(fileName) {
  const azureUrl = buildAzureUrl(fileName);
  const ext = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";

  if (OFFICE_VIEWABLE_EXTENSIONS.has(ext)) {
    return OFFICE_WEB_VIEWER_PREFIX + encodeURIComponent(azureUrl);
  }

  return azureUrl;
}

const dataset = ARTIFACT_FEED.map((item) => ({
  ...item,
  openUrl: resolveOpenUrl(item.fileName),
  searchText: [item.artifactPurpose, item.methodsAndTechniques, item.fileName, item.fileType, item.focus]
    .join(" ")
    .toLowerCase()
}));

function matchesSearch(row, query) {
  if (!query) {
    return true;
  }

  const orTerms = query
    .split("|")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);

  if (orTerms.length > 1) {
    return orTerms.some((term) => row.searchText.includes(term));
  }

  return row.searchText.includes(query);
}

function filteredRows() {
  const rows = dataset.filter((row) => {
    const searchMatch = matchesSearch(row, state.search);
    const typeMatch = state.type === "all" || row.fileType === state.type;
    const focusMatch = state.focus === "all" || row.focus === state.focus;
    return searchMatch && typeMatch && focusMatch;
  });

  rows.sort((a, b) => {
    const direction = state.sort === "asc" ? 1 : -1;

    if (a.stepNumber !== b.stepNumber) {
      return (a.stepNumber - b.stepNumber) * direction;
    }

    return a.fileName.localeCompare(b.fileName) * direction;
  });

  return rows;
}

function rowHtml(row, index) {
  return `
    <tr style="--row-delay:${index * 22}ms">
      <td>
        <span class="number-badge">${index + 1}</span>
        <p class="file-meta">${escapeHtml(row.fileType.toUpperCase())} | ${escapeHtml(row.focus)}</p>
      </td>
      <td>
        <div class="artifact-title">${escapeHtml(row.fileName.replace(/\.[^.]+$/, ""))}</div>
        <p class="artifact-purpose">${escapeHtml(row.artifactPurpose)}</p>
      </td>
      <td>${escapeHtml(row.methodsAndTechniques)}</td>
      <td><a class="open-link" href="${row.openUrl}" target="_blank" rel="noopener noreferrer">Open</a></td>
    </tr>
  `;
}

function syncChips() {
  const normalizedSearch = state.search.trim().toLowerCase();

  ui.chips.forEach((chip) => {
    const chipQuery = (chip.dataset.query || "").trim().toLowerCase();
    const active = chipQuery ? chipQuery === normalizedSearch : normalizedSearch.length === 0;
    chip.classList.toggle("active", active);
  });
}

function render() {
  const rows = filteredRows();

  ui.tableBody.innerHTML = rows.map((row, index) => rowHtml(row, index)).join("");
  ui.emptyState.hidden = rows.length !== 0;
  ui.shownCount.textContent = `${rows.length} shown`;
  ui.totalCount.textContent = `${dataset.length} total`;
  syncChips();
}

ui.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  render();
});

ui.typeFilter.addEventListener("change", (event) => {
  state.type = event.target.value;
  render();
});

ui.focusFilter.addEventListener("change", (event) => {
  state.focus = event.target.value;
  render();
});

ui.sortOrder.addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

ui.chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.dataset.query || "";
    ui.searchInput.value = query;
    state.search = query.trim().toLowerCase();
    render();
  });
});

render();