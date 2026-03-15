/*
Template-style data feed:
1) This page does not scan local folders.
2) Rows come only from ARTIFACT_FEED below.
3) Open links are built from one Azure blob base URL plus each file name.
*/

const AZURE_FILE_BASE_URL = "https://hbrbida.blob.core.windows.net/class-files/";

const OFFICE_WEB_VIEWER_PREFIX = "https://view.officeapps.live.com/op/view.aspx?src=";

const OFFICE_VIEWABLE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);

const DEFAULT_PURPOSE = "Statistics artifact used in the project workflow to support technique selection, validation, and interpretation.";
const DEFAULT_METHODS = "Statistical analysis, model review, and evidence documentation.";

function titleFromFileName(fileName) {
  const withoutExt = fileName.replace(/\.[^.]+$/, "");
  const cleaned = withoutExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "Statistics Artifact";
}

function codeFromFileName(fileName) {
  const numericMatch = fileName.match(/^(\d{2}_\d{2})__/);
  if (numericMatch) {
    return numericMatch[1];
  }

  const weekMatch = fileName.match(/^(wk\d+)/i);
  if (weekMatch) {
    return weekMatch[1].toUpperCase();
  }

  return "STAT";
}

function methodsFromFileName(fileName) {
  const name = fileName.toLowerCase();

  if (name.includes("logistic")) {
    return "Logistic regression, model interpretation, and classification reasoning.";
  }

  if (name.includes("regression")) {
    return "Regression analysis, coefficient interpretation, and model validation.";
  }

  if (name.includes("cluster") || name.includes("k-means")) {
    return "Clustering methods, segmentation analysis, and centroid interpretation.";
  }

  if (name.includes("forecast") || name.includes("prediction")) {
    return "Forecasting techniques, time-indexed analysis, and predictive review.";
  }

  if (name.includes("summary") || name.includes("descriptive") || name.includes("outlier") || name.includes("norm prob")) {
    return "Descriptive statistics, distribution checks, and data quality profiling.";
  }

  if (name.includes("analytics") || name.includes("analysis")) {
    return "Statistical analysis techniques, evidence synthesis, and interpretation.";
  }

  return DEFAULT_METHODS;
}

const ARTIFACT_FILES = [
  "99_02__Reference_SAS_LabProjects_Summary__Tech_DescriptiveStatistics.docx",
  "Analysis W6 A1.docx",
  "Data Plus YTD Query.xlsx",
  "data-ex-2-1 (Rocket Prop).xls",
  "dup.xlsx",
  "executive-summary.docx",
  "FinalExamVersion1 - answers - trunc.html",
  "FinalTeam Sales PredictionsHJ.xlsx",
  "Grocery Store.xlsx",
  "Introduction-to-Linear-Regression-Analysis-Elizabeth-Peck-Geoffrey-Vining-etc..pdf",
  "K-Means Clustering-results.html",
  "Norm Prob Salaries.rtf",
  "Notes for Regresson.docx",
  "Outliers List.xlsx",
  "Outliers.xlsx",
  "Outliers_AVG.xlsx",
  "Propellent.xlsx",
  "Regression using excel mannually.xlsx",
  "Regression_1.pptx",
  "Summary Statistics-results.html.docx",
  "Summary Statistics-results.rtf",
  "Technology's Impact on Predictive Analytics.docx",
  "Training_Data_Regression - Rev 3.xlsx",
  "Using Predictive Analytics.docx",
  "W6.A1 - Analyzing Productivity, Sunk Cost, Replacement and Efficiency Effects.docx",
  "Week_4_Forecasting_Assignment_Data_HR.xlsx",
  "WK2 Grocery Store rev 2.docx",
  "WK4 A1 Written - Logistic Regression and Data.docx",
  "WK6  A1 Cluster Model.docx"
];

const ARTIFACT_FEED = ARTIFACT_FILES.map((file, index) => ({
  order: index + 1,
  code: codeFromFileName(file),
  file,
  artifact: titleFromFileName(file),
  purpose: DEFAULT_PURPOSE,
  methods: methodsFromFileName(file)
}));

const MISSING_PURPOSE = "Pending: add purpose in ARTIFACT_FEED.";
const MISSING_METHODS = "Pending: add methods and techniques in ARTIFACT_FEED.";

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

  return {
    order: Number(item.order) || Number.MAX_SAFE_INTEGER,
    file,
    ext,
    extUpper,
    code: (item.code || "Reference").trim(),
    artifact: (item.artifact || "Pending artifact title").trim(),
    purpose: (item.purpose || MISSING_PURPOSE).trim(),
    methods: (item.methods || MISSING_METHODS).trim(),
    openUrl: resolveOpenUrl(file)
  };
}

function buildRows(records, tableBody) {
  tableBody.innerHTML = "";

  records.forEach((record, index) => {
    const row = document.createElement("tr");
    row.style.setProperty("--row-delay", String(index * 20) + "ms");

    const lineCell = document.createElement("td");
    lineCell.textContent = String(index + 1);

    const artifactPurposeCell = document.createElement("td");

    const artifactName = document.createElement("div");
    artifactName.className = "artifact-name";
    artifactName.textContent = record.artifact;

    const artifactPurpose = document.createElement("div");
    artifactPurpose.className = "artifact-purpose";
    artifactPurpose.textContent = record.purpose;

    const artifactCode = document.createElement("div");
    artifactCode.className = "artifact-code";
    artifactCode.textContent = record.code + " | " + record.extUpper;

    artifactPurposeCell.appendChild(artifactName);
    artifactPurposeCell.appendChild(artifactPurpose);
    artifactPurposeCell.appendChild(artifactCode);

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
  if (a.order !== b.order) {
    return a.order - b.order;
  }

  return a.file.localeCompare(b.file);
}

const EXCLUDED_WEBSITE_FILES = new Set([
  "statistics-artifacts.html",
  "statistics-artifacts.css",
  "statistics-artifacts.js"
]);

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
  .filter((record) => record.file.length > 0 && !EXCLUDED_WEBSITE_FILES.has(record.file.toLowerCase()))
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
