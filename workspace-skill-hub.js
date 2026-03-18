const CHIP_GROUPS = [
  {
    title: "Technical Skills",
    chips: [
      "Technical Skills",
      "SQL",
      "Spreadsheets (MS Excel, Google Sheets)",
      "Statistical Programming (R, Python, SAS)",
      "Data Visualization (Tableau, PowerBI, Qlik, D3.js)",
      "Database Management (MySQL, PostgreSQL, SQL Server)"
    ]
  },
  {
    title: "Machine Learning",
    chips: [
      "Machine Learning",
      "Linear Regression",
      "Logistic Regression",
      "SVM",
      "Decision Tree",
      "Random Forest",
      "K-means",
      "K-nearest Neighbor"
    ]
  },
  {
    title: "Soft Skills",
    chips: [
      "Soft Skills",
      "Communication",
      "Collaboration",
      "Critical Thinking",
      "Creativity"
    ]
  }
];

const CHIP_DISPLAY_LABELS = {
  "Technical Skills": "Technical",
  "Spreadsheets (MS Excel, Google Sheets)": "Spreadsheets",
  "Statistical Programming (R, Python, SAS)": "Stat Programming",
  "Data Visualization (Tableau, PowerBI, Qlik, D3.js)": "Data Viz",
  "Database Management (MySQL, PostgreSQL, SQL Server)": "DB Management",
  "Linear Regression": "Linear Reg",
  "Logistic Regression": "Logistic Reg",
  "K-nearest Neighbor": "KNN"
};

const CHIP_HOVER_LABELS = {
  SVM: "Support Vector Machine",
  "K-nearest Neighbor": "K-nearest Neighbor"
};

const ROOT_DISPLAY_LABELS = {
  project_Wild: "Project Wild",
  project_Trade: "Project Trade",
  Salary_vs_Pnts: "Salary vs Points",
  Database: "Database",
  Statistics: "Statistics",
  Code: "Code",
  Tableau: "Tableau",
  Creative_thinking: "Creative Thinking",
  Concessions: "Concessions",
  Hold: "Hold"
};

const PAGE_SIZE = 100;

const GITHUB_CODE_BASE_URL = "https://github.com/hbrose-bida/Code/blob/main/";
const AZURE_FILE_BASE_URL = "https://hbrbida.blob.core.windows.net/class-files/";
const OFFICE_WEB_VIEWER_PREFIX = "https://view.officeapps.live.com/op/view.aspx?src=";
const OFFICE_VIEWABLE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);
const GROUP_TAGS = new Set(["Technical Skills", "Machine Learning", "Soft Skills"]);

const state = {
  search: "",
  ext: "all",
  sort: "path-asc",
  selectedTag: "",
  page: 1
};

const ui = {
  searchInput: document.getElementById("searchInput"),
  extFilter: document.getElementById("extFilter"),
  sortOrder: document.getElementById("sortOrder"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn"),
  shownCount: document.getElementById("shownCount"),
  totalCount: document.getElementById("totalCount"),
  selectedTagCount: document.getElementById("selectedTagCount"),
  chipBoard: document.getElementById("chipBoard"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
  pageLabel: document.getElementById("pageLabel"),
  prevPageBtn: document.getElementById("prevPageBtn"),
  nextPageBtn: document.getElementById("nextPageBtn")
};

const rawData = Array.isArray(window.WORKSPACE_ARTIFACTS) ? window.WORKSPACE_ARTIFACTS : [];

function encodePathSegments(pathValue) {
  return String(pathValue)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildAzureBlobUrl(fileName) {
  const base = AZURE_FILE_BASE_URL.endsWith("/") ? AZURE_FILE_BASE_URL : `${AZURE_FILE_BASE_URL}/`;
  return `${base}${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
}

function resolveOpenUrl(item) {
  if (item.root === "Code") {
    return `${GITHUB_CODE_BASE_URL}${encodePathSegments(item.relativePath)}`;
  }

  const blobUrl = buildAzureBlobUrl(item.fileName);
  if (OFFICE_VIEWABLE_EXTENSIONS.has(String(item.extension || "").toLowerCase())) {
    return `${OFFICE_WEB_VIEWER_PREFIX}${encodeURIComponent(blobUrl)}`;
  }

  return blobUrl;
}

function specificTags(tags) {
  const nonGroup = tags.filter((tag) => !GROUP_TAGS.has(tag));
  return nonGroup.length ? nonGroup : tags;
}

function cleanArtifactTitle(fileName) {
  return String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\bBIA\d{3,4}\b/gi, " ")
    .replace(/^\d+(?:\s+\d+)*\s+/, "")
    .replace(/^W\d+\s+/, "")
    .replace(/\b(?:rev|version|copy|turnin)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rootLabel(root) {
  return ROOT_DISPLAY_LABELS[root] || String(root || "").replace(/_/g, " ").trim();
}

function isGenericArtifactTitle(title) {
  if (!title) {
    return true;
  }

  return /^(question\s*\d+[a-z]?|q\d+[a-z]?|part\s*\d+|assignment|notes?|new microsoft word document|document|answers?)$/i.test(title)
    || title.length < 7;
}

function focusTagsForPurpose(tags) {
  return specificTags(tags).slice(0, 2);
}

function fallbackSubject(item, tags, title) {
  const project = rootLabel(item.root);
  const focusTags = focusTagsForPurpose(tags);

  if (/^question\s*\d+/i.test(title)) {
    return `${title} for ${project}`;
  }

  if (focusTags.length === 0) {
    return `${project} project work`;
  }

  if (focusTags.length === 1) {
    return `${project} work related to ${focusTags[0]}`;
  }

  return `${project} work related to ${focusTags[0]} and ${focusTags[1]}`;
}

function choosePurposeVerb(item, title) {
  const ext = String(item.extension || "").toLowerCase();
  const lowerTitle = String(title || "").toLowerCase();

  if (["ppt", "pptx"].includes(ext)) {
    return "Presents";
  }

  if (["twb", "twbx", "pbix", "qvf", "qvw"].includes(ext)) {
    return "Visualizes";
  }

  if (["xlsx", "xls", "csv", "tsv", "ods"].includes(ext)) {
    if (/forecast|projection|budget|tracking|tracker|inventory|schedule/i.test(lowerTitle)) {
      return "Tracks";
    }

    return "Organizes";
  }

  if (["py", "ipynb", "r", "sas", "js"].includes(ext)) {
    return "Implements";
  }

  if (/summary|overview|report|executive/i.test(lowerTitle)) {
    return "Summarizes";
  }

  if (/guide|instruction|steps|how to/i.test(lowerTitle)) {
    return "Guides";
  }

  if (/analysis|assessment|evaluation|critique|study/i.test(lowerTitle)) {
    return "Analyzes";
  }

  if (/log|notes|journal|record/i.test(lowerTitle)) {
    return "Documents";
  }

  return "Documents";
}

function buildPurposeText(item, tags) {
  const cleanedTitle = cleanArtifactTitle(item.fileName);
  const subject = isGenericArtifactTitle(cleanedTitle)
    ? fallbackSubject(item, tags, cleanedTitle)
    : cleanedTitle;
  const verb = choosePurposeVerb(item, cleanedTitle);
  const ext = String(item.extension || "").toLowerCase();

  if (verb === "Organizes") {
    return `Organizes data and calculations for ${subject}.`;
  }

  if (verb === "Tracks") {
    return `Tracks data and metrics for ${subject}.`;
  }

  if (verb === "Implements") {
    return `Implements code for ${subject}.`;
  }

  if (verb === "Visualizes") {
    return `Visualizes ${subject}.`;
  }

  if (verb === "Presents") {
    return `Presents ${subject}.`;
  }

  if (verb === "Guides") {
    return `Guides work on ${subject}.`;
  }

  if (verb === "Summarizes") {
    return `Summarizes ${subject}.`;
  }

  if (verb === "Analyzes") {
    return `Analyzes ${subject}.`;
  }

  if (["doc", "docx", "pdf", "md", "rtf", "txt", "html"].includes(ext)) {
    return `Documents ${subject}.`;
  }

  return `Documents ${subject}.`;
}

function buildMethodsText(tags) {
  const methods = specificTags(tags);
  return methods.join(" | ");
}

const data = rawData.map((item) => {
  const tags = Array.isArray(item.tags) && item.tags.length
    ? item.tags
    : ["Critical Thinking", "Soft Skills"];
  const purposeText = buildPurposeText(item, tags);
  const methodsText = buildMethodsText(tags);
  const searchText = [
    purposeText,
    methodsText,
    tags.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return {
    ...item,
    openUrl: resolveOpenUrl(item),
    purposeText,
    methodsText,
    tags,
    searchText
  };
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function populateSelect(selectEl, values, allLabel) {
  const options = [`<option value="all">${allLabel}</option>`];
  values.forEach((value) => {
    options.push(`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
  });
  selectEl.innerHTML = options.join("");
}

function displayChipLabel(tag) {
  return CHIP_DISPLAY_LABELS[tag] || tag;
}

function chipHoverLabel(tag) {
  return CHIP_HOVER_LABELS[tag] || "";
}

function buildChipBoard() {
  const groupsHtml = CHIP_GROUPS.map((group) => {
    const chipsHtml = group.chips
      .map((chipTag, index) => {
        const chipClass = index === 0 ? "chip group-chip" : "chip";
        const hover = chipHoverLabel(chipTag);
        const titleAttr = hover ? ` title="${escapeHtml(hover)}"` : "";
        return `<button type="button" class="${chipClass}" data-chip="${escapeHtml(chipTag)}"${titleAttr}>${escapeHtml(displayChipLabel(chipTag))}</button>`;
      })
      .join("");

    return `
      <section class="chip-group" aria-label="${escapeHtml(group.title)} chips">
        <h3>${escapeHtml(group.title)}</h3>
        <div class="chip-row">${chipsHtml}</div>
      </section>
    `;
  }).join("");

  ui.chipBoard.innerHTML = groupsHtml;

  ui.chipBoard.querySelectorAll("[data-chip]").forEach((button) => {
    button.addEventListener("click", () => {
      const chip = button.getAttribute("data-chip");
      if (!chip) {
        return;
      }

      state.selectedTag = state.selectedTag === chip ? "" : chip;

      state.page = 1;
      render();
    });
  });
}

function syncChipState() {
  ui.chipBoard.querySelectorAll("[data-chip]").forEach((button) => {
    const chip = button.getAttribute("data-chip") || "";
    button.classList.toggle("active", state.selectedTag === chip);
  });
}

function matchesTagFilter(row) {
  if (!state.selectedTag) {
    return true;
  }

  return row.tags.includes(state.selectedTag);
}

function sortRows(rows) {
  const sorted = rows.slice();

  sorted.sort((a, b) => {
    if (state.sort === "name-asc") {
      return a.fileName.localeCompare(b.fileName);
    }
    if (state.sort === "name-desc") {
      return b.fileName.localeCompare(a.fileName);
    }
    if (state.sort === "path-desc") {
      return b.relativePath.localeCompare(a.relativePath);
    }
    return a.relativePath.localeCompare(b.relativePath);
  });

  return sorted;
}

function filteredRows() {
  const query = state.search;

  const rows = data.filter((row) => {
    const searchMatch = !query || row.searchText.includes(query);
    const extMatch = state.ext === "all" || row.extension === state.ext;
    const tagMatch = matchesTagFilter(row);
    return searchMatch && extMatch && tagMatch;
  });

  return sortRows(rows);
}

function rowHtml(row, displayNumber, animationIndex) {
  return `
    <tr style="--row-delay:${animationIndex * 18}ms">
      <td>
        <span class="row-number">${displayNumber}</span>
        <p class="file-meta">${escapeHtml(String(row.extension || "file").toUpperCase())} | ${escapeHtml(row.root)}</p>
      </td>
      <td>
        <p class="artifact-purpose">${escapeHtml(row.purposeText)}</p>
      </td>
      <td>${escapeHtml(row.methodsText)}</td>
      <td><a class="open-link" href="${row.openUrl}" target="_blank" rel="noopener noreferrer">Open</a></td>
    </tr>
  `;
}

function updatePagination(totalRows) {
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
  if (state.page > totalPages) {
    state.page = totalPages;
  }

  ui.prevPageBtn.disabled = state.page <= 1;
  ui.nextPageBtn.disabled = state.page >= totalPages;
  ui.pageLabel.textContent = `Page ${state.page} of ${totalPages}`;

  return totalPages;
}

function render() {
  const rows = filteredRows();
  const totalRows = rows.length;
  updatePagination(totalRows);

  const start = (state.page - 1) * PAGE_SIZE;
  const pagedRows = rows.slice(start, start + PAGE_SIZE);

  ui.tableBody.innerHTML = pagedRows
    .map((row, index) => rowHtml(row, start + index + 1, index))
    .join("");

  ui.emptyState.hidden = totalRows !== 0;
  ui.shownCount.textContent = `${totalRows} shown`;
  ui.totalCount.textContent = `${data.length} total`;
  ui.selectedTagCount.textContent = state.selectedTag ? "1 tag selected" : "0 tags selected";

  syncChipState();
}

function clearFilters() {
  state.search = "";
  state.ext = "all";
  state.sort = "path-asc";
  state.selectedTag = "";
  state.page = 1;

  ui.searchInput.value = "";
  ui.extFilter.value = "all";
  ui.sortOrder.value = "path-asc";
}

function bindEvents() {
  ui.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  ui.extFilter.addEventListener("change", (event) => {
    state.ext = event.target.value;
    state.page = 1;
    render();
  });

  ui.sortOrder.addEventListener("change", (event) => {
    state.sort = event.target.value;
    state.page = 1;
    render();
  });

  ui.clearFiltersBtn.addEventListener("click", () => {
    clearFilters();
    render();
  });

  ui.prevPageBtn.addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      render();
    }
  });

  ui.nextPageBtn.addEventListener("click", () => {
    state.page += 1;
    render();
  });
}

function init() {
  const extensions = uniqueSorted(data.map((item) => item.extension));

  populateSelect(ui.extFilter, extensions, "All types");

  buildChipBoard();
  bindEvents();
  render();
}

init();