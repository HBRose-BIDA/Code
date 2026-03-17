/*
Template-style data feed:
1) This page does not scan local folders.
2) Rows come only from ARTIFACT_FEED below.
3) Open links are built from one Azure blob base URL plus each file name.
*/

// All files are expected under this single Azure blob container/path.
const AZURE_FILE_BASE_URL = "https://hbrbida.blob.core.windows.net/class-files/";

const OFFICE_WEB_VIEWER_PREFIX = "https://view.officeapps.live.com/op/view.aspx?src=";

const OFFICE_VIEWABLE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);

const ARTIFACT_FEED = [
  {
    file: "1_Tableau Why and How.pptx",
    code: "Supplemental",
    artifact: "Tableau Why and How",
    purpose: "Introduces Tableau as a business intelligence tool, explaining why visual analytics matters and how core workflows operate.",
    methods: "Tool orientation, visual analytics rationale, and feature overview"
  },
  {
    file: "Agenda loads wk2.pptx",
    code: "Supplemental",
    artifact: "Week 2 Agenda",
    purpose: "Outlines the Week 2 session plan including Tableau workspace navigation, data connections, and hands-on exercises.",
    methods: "Session planning, topic sequencing, and workbook connection walkthrough"
  },
  {
    file: "Doing the analysis.docx",
    code: "Supplemental",
    artifact: "Doing the Analysis",
    purpose: "Guides the process of building visualizations in Tableau and interpreting exploratory analysis outputs to surface meaningful patterns.",
    methods: "Visual exploration, chart type selection, and insight documentation"
  },
  {
    file: "Forecast Build.docx",
    code: "Supplemental",
    artifact: "Forecast Build",
    purpose: "Provides step-by-step instructions for configuring Tableau's built-in forecasting capability on time-series data.",
    methods: "Time-series forecasting setup, trend projection, and confidence interval interpretation"
  },
  {
    file: "Instructions W5.A5.docx",
    code: "Supplemental",
    artifact: "W5 A5 Instructions",
    purpose: "Details the Week 5 Assignment 5 requirements, including required views, dashboard construction steps, and submission guidelines.",
    methods: "Dashboard construction, mark type selection, and KPI visualization"
  },
  {
    file: "W7.A1 - Communicating Findings.docx",
    code: "Supplemental",
    artifact: "Communicating Findings",
    purpose: "Provides guidance on presenting Tableau analytics to a business audience, emphasizing clarity, annotation, and executive summary framing.",
    methods: "Storytelling with data, chart annotation, and executive summary framing"
  }
];

const MISSING_PURPOSE = "Pending: add purpose in ARTIFACT_FEED.";
const MISSING_METHODS = "Pending: add methods and techniques in ARTIFACT_FEED.";

function splitCodeValue(code) {
  if (!/^\d{2}_\d{2}$/.test(code)) {
    return Number.MAX_SAFE_INTEGER;
  }

  const [major, minor] = code.split("_");
  return Number(major) * 100 + Number(minor);
}

function splitFileName(file) {
  const lastDot = file.lastIndexOf(".");
  if (lastDot < 0) {
    return { ext: "file", extUpper: "FILE" };
  }

  const ext = file.slice(lastDot + 1).toLowerCase();
  return {
    ext,
    extUpper: ext.toUpperCase()
  };
}

function buildAzureUrl(fileName) {
  const base = (AZURE_FILE_BASE_URL || "").trim();
  if (!base || base.includes("<")) {
    return "";
  }

  const filePart = encodeURIComponent(fileName).replace(/%2F/g, "/");
  const queryIndex = base.indexOf("?");

  if (queryIndex >= 0) {
    const pathPart = base.slice(0, queryIndex);
    const queryPart = base.slice(queryIndex + 1);
    const normalizedPath = pathPart.endsWith("/") ? pathPart : pathPart + "/";
    return normalizedPath + filePart + "?" + queryPart;
  }

  const normalizedBase = base.endsWith("/") ? base : base + "/";
  return normalizedBase + filePart;
}

function resolveOpenUrl(fileName) {
  const rawAzureUrl = buildAzureUrl(fileName);
  if (!rawAzureUrl) {
    return "";
  }

  if (OFFICE_VIEWABLE_EXTENSIONS.has(splitFileName(fileName).ext)) {
    return OFFICE_WEB_VIEWER_PREFIX + encodeURIComponent(rawAzureUrl);
  }

  return rawAzureUrl;
}

function normalizeRecord(item) {
  const file = (item.file || "").trim();
  const { ext, extUpper } = splitFileName(file);
  const code = (item.code || "Supplemental").trim();

  return {
    file,
    ext,
    extUpper,
    code,
    artifact: (item.artifact || "Pending artifact title").trim(),
    purpose: (item.purpose || MISSING_PURPOSE).trim(),
    methods: (item.methods || MISSING_METHODS).trim(),
    openUrl: resolveOpenUrl(file),
    sortValue: splitCodeValue(code)
  };
}

function buildRows(records, tableBody) {
  tableBody.innerHTML = "";

  records.forEach((record, index) => {
    const row = document.createElement("tr");
    row.style.setProperty("--row-delay", String(index * 24) + "ms");

    const lineCell = document.createElement("td");
    lineCell.textContent = String(index + 1);

    const artifactPurposeCell = document.createElement("td");
    artifactPurposeCell.innerHTML =
      '<div class="artifact-name">' + record.artifact + "</div>" +
      '<div class="artifact-purpose">' + record.purpose + "</div>";

    const methodsCell = document.createElement("td");
    methodsCell.textContent = record.methods;

    const openCell = document.createElement("td");
    if (record.openUrl) {
      const link = document.createElement("a");
      link.className = "file-link";
      link.href = record.openUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open";
      link.setAttribute("aria-label", "Open " + record.file);
      openCell.appendChild(link);
    } else {
      const missing = document.createElement("span");
      missing.className = "link-missing";
      missing.textContent = "Set URL";
      openCell.appendChild(missing);
    }

    row.appendChild(lineCell);
    row.appendChild(artifactPurposeCell);
    row.appendChild(methodsCell);
    row.appendChild(openCell);
    tableBody.appendChild(row);
  });
}

function filterBySearch(records, text) {
  const query = text.trim().toLowerCase();
  if (!query) {
    return records;
  }

  const orTerms = query
    .split("|")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);

  return records.filter((record) => {
    const combined = [record.artifact, record.purpose, record.methods, record.file, record.code]
      .join(" ")
      .toLowerCase();

    if (orTerms.length > 1) {
      return orTerms.some((term) => combined.includes(term));
    }

    return combined.includes(query);
  });
}

function filterByType(records, type) {
  if (!type || type === "all") {
    return records;
  }

  return records.filter((record) => record.ext === type);
}

function sortRecords(a, b) {
  if (a.sortValue !== b.sortValue) {
    return a.sortValue - b.sortValue;
  }

  return a.file.localeCompare(b.file);
}

const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const shownCount = document.getElementById("shownCount");
const totalCount = document.getElementById("totalCount");
const techniqueChips = Array.from(document.querySelectorAll(".technique-chip"));

function syncTechniqueChipState(searchText) {
  const normalizedSearch = (searchText || "").trim().toLowerCase();

  techniqueChips.forEach((chip) => {
    const chipQuery = (chip.dataset.searchQuery || "").trim().toLowerCase();
    const isClearChip = chip.classList.contains("clear-chip");
    const isActive = chipQuery
      ? chipQuery === normalizedSearch
      : isClearChip && normalizedSearch.length === 0;

    chip.classList.toggle("active", isActive);
  });
}

const allRecords = ARTIFACT_FEED
  .map(normalizeRecord)
  .filter((record) => record.file.length > 0)
  .sort(sortRecords);

function render() {
  const typed = filterByType(allRecords, typeFilter.value);
  const filtered = filterBySearch(typed, searchInput.value);
  const sorted = filtered.slice().sort(sortRecords);

  buildRows(sorted, tableBody);
  emptyState.hidden = sorted.length !== 0;
  shownCount.textContent = sorted.length + " shown";
  totalCount.textContent = allRecords.length + " total";
  syncTechniqueChipState(searchInput.value);
}

searchInput.addEventListener("input", render);
typeFilter.addEventListener("change", render);

techniqueChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    searchInput.value = (chip.dataset.searchQuery || "").trim();
    render();
  });
});

render();
