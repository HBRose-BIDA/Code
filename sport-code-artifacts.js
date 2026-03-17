const TOPIC_ORDER = [
  "Python",
  "Pandas",
  "NumPy",
  "ETL and Data Pipelines",
  "Data Quality",
  "Statistical Analysis",
  "Machine Learning",
  "Data Visualization",
  "API Integration",
  "Web Scraping",
  "SQL",
  "SAS"
];

const GITHUB_USERNAME = "HBRose-BIDA";
const GITHUB_REPO = "Code";
const GITHUB_BLOB_BASE = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/blob/main/`;

const ARTIFACTS = [
  {
    fileName: "Attendance.ipynb",
    fileType: "ipynb",
    primaryTopic: "Statistical Analysis",
    skills: ["Python", "Pandas", "Statistical Analysis", "Data Visualization"],
    title: "Attendance Trend Analysis Notebook",
    purpose: "Analyzes attendance patterns and trend behavior to support planning and operational decisions.",
    notes: "Builds attendance summaries, compares grouped periods, and produces notebook visuals for trend review."
  },
  {
    fileName: "Dump JSON.py",
    fileType: "py",
    primaryTopic: "API Integration",
    skills: ["Python", "API Integration", "ETL and Data Pipelines"],
    title: "NHL API JSON Export Utility",
    purpose: "Retrieves NHL team data and stores structured JSON extracts for downstream analytics.",
    notes: "Executes API calls and serializes response payloads into reusable source files."
  },
  {
    fileName: "FinalExamVersion1 - answers -Part 2-checkpoint.ipynb",
    fileType: "ipynb",
    primaryTopic: "Data Quality",
    skills: ["Python", "Pandas", "Data Quality", "Statistical Analysis", "Data Visualization"],
    title: "End-to-End Data Analysis Assessment Notebook",
    purpose: "Demonstrates a full workflow from ingestion and cleaning through transformation and analysis output.",
    notes: "Covers missing-value handling, feature preparation, and notebook-based analysis checkpoints."
  },
  {
    fileName: "GroupByPivotPlotMerge.ipynb",
    fileType: "ipynb",
    primaryTopic: "Pandas",
    skills: ["Python", "Pandas", "ETL and Data Pipelines", "Data Visualization"],
    title: "Grouping, Pivot, and Merge Analytics Notebook",
    purpose: "Builds summary views and comparative tables for decision-support style reporting.",
    notes: "Applies group-by aggregation, pivot logic, dataset merging, and charted summaries in one workflow."
  },
  {
    fileName: "NHL API teams.py",
    fileType: "py",
    primaryTopic: "API Integration",
    skills: ["Python", "API Integration", "ETL and Data Pipelines"],
    title: "NHL Team Reference API Extract",
    purpose: "Pulls current NHL team reference data for repeatable integration into analytics pipelines.",
    notes: "Parses API responses and structures team reference records for downstream use."
  },
  {
    fileName: "Pull the Game details working xy.py",
    fileType: "py",
    primaryTopic: "ETL and Data Pipelines",
    skills: ["Python", "API Integration", "ETL and Data Pipelines", "Statistical Analysis"],
    title: "NHL Game Event Coordinate Extractor",
    purpose: "Extracts game-event details with x/y coordinates for spatial and performance analysis.",
    notes: "Transforms nested game payloads into coordinate-focused records suitable for analysis."
  },
  {
    fileName: "RdJSON.py",
    fileType: "py",
    primaryTopic: "ETL and Data Pipelines",
    skills: ["Python", "API Integration", "ETL and Data Pipelines"],
    title: "JSON Reader and Normalization Utility",
    purpose: "Reads JSON sources and normalizes fields for consistent downstream processing.",
    notes: "Standardizes raw JSON structures into predictable analysis-ready records."
  },
  {
    fileName: "Scrape.ipynb",
    fileType: "ipynb",
    primaryTopic: "Web Scraping",
    skills: ["Python", "Web Scraping", "ETL and Data Pipelines", "API Integration"],
    title: "Historical NHL Data Scraping Notebook",
    purpose: "Collects historical game data across date ranges for longitudinal analytics.",
    notes: "Runs date-based extraction cycles and captures structured outputs for repeatable analysis."
  },
  {
    fileName: "scrapebetwndates.py",
    fileType: "py",
    primaryTopic: "Web Scraping",
    skills: ["Python", "Web Scraping", "ETL and Data Pipelines"],
    title: "Date-Range Scraping Pipeline",
    purpose: "Automates data collection between configured start and end dates.",
    notes: "Executes interval-driven extraction to produce consistent batch records over time windows."
  },
  {
    fileName: "WithPLR.py",
    fileType: "py",
    primaryTopic: "Machine Learning",
    skills: ["Python", "Machine Learning", "Statistical Analysis"],
    title: "Polynomial and Logistic Regression Workflow",
    purpose: "Builds regression models to evaluate relationships and predictive behavior in sports data.",
    notes: "Implements regression model workflow with result interpretation and model-oriented outputs."
  }
];

const state = {
  search: "",
  fileType: "all",
  topic: "all",
  sort: "title-asc"
};

const ui = {
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  topicFilter: document.getElementById("topicFilter"),
  sortOrder: document.getElementById("sortOrder"),
  topicChips: document.getElementById("topicChips"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
  shownCount: document.getElementById("shownCount"),
  totalCount: document.getElementById("totalCount")
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function openUrl(fileName) {
  return GITHUB_BLOB_BASE + encodeURIComponent(fileName);
}

function availableTopics() {
  const present = new Set();

  ARTIFACTS.forEach((row) => {
    if (TOPIC_ORDER.includes(row.primaryTopic)) {
      present.add(row.primaryTopic);
    }

    row.skills.forEach((skill) => {
      if (TOPIC_ORDER.includes(skill)) {
        present.add(skill);
      }
    });
  });

  return TOPIC_ORDER.filter((topic) => present.has(topic));
}

function populateTopicFilter() {
  const topicList = availableTopics();

  ui.topicFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Topics";
  ui.topicFilter.appendChild(allOption);

  topicList.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    ui.topicFilter.appendChild(option);
  });

  if (state.topic !== "all" && !topicList.includes(state.topic)) {
    state.topic = "all";
  }

  ui.topicFilter.value = state.topic;
}

function buildTopicChips() {
  const topicList = availableTopics();

  if (state.topic !== "all" && !topicList.includes(state.topic)) {
    state.topic = "all";
    ui.topicFilter.value = "all";
  }

  const chipTopics = ["All Topics", ...topicList];

  ui.topicChips.innerHTML = chipTopics
    .map((topic) => {
      const value = topic === "All Topics" ? "all" : topic;
      const active = value === state.topic ? "active" : "";
      return `<button type=\"button\" class=\"topic-chip ${active}\" data-topic=\"${escapeHtml(value)}\">${escapeHtml(topic)}</button>`;
    })
    .join("");

  Array.from(ui.topicChips.querySelectorAll(".topic-chip")).forEach((chip) => {
    chip.addEventListener("click", () => {
      state.topic = chip.dataset.topic || "all";
      ui.topicFilter.value = state.topic;
      render();
    });
  });
}

function matchesSearch(row) {
  if (!state.search) {
    return true;
  }

  const text = [row.title, row.purpose, row.skills.join(" "), row.notes, row.primaryTopic]
    .join(" ")
    .toLowerCase();

  return text.includes(state.search);
}

function matchesType(row) {
  return state.fileType === "all" || row.fileType === state.fileType;
}

function matchesTopic(row) {
  return state.topic === "all" || row.skills.includes(state.topic) || row.primaryTopic === state.topic;
}

function sortRows(rows) {
  const sorted = rows.slice();

  sorted.sort((a, b) => {
    if (state.sort === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    return a.title.localeCompare(b.title);
  });

  return sorted;
}

function skillTagsHtml(skills) {
  return skills.map((skill) => `<span class=\"skill-tag\">${escapeHtml(skill)}</span>`).join("");
}

function rowHtml(row) {
  return `
    <tr>
      <td><p class=\"artifact-title\">${escapeHtml(row.title)}</p></td>
      <td><p class=\"body-text\">${escapeHtml(row.purpose)}</p></td>
      <td>${skillTagsHtml(row.skills)}</td>
      <td><p class=\"body-text\">${escapeHtml(row.notes)}</p></td>
      <td><a class=\"open-link\" href=\"${openUrl(row.fileName)}\" target=\"_blank\" rel=\"noopener noreferrer\">Open</a></td>
    </tr>
  `;
}

function render() {
  const filtered = ARTIFACTS
    .filter(matchesSearch)
    .filter(matchesType)
    .filter(matchesTopic);

  const sorted = sortRows(filtered);

  ui.shownCount.textContent = `${sorted.length} shown`;
  ui.totalCount.textContent = `${ARTIFACTS.length} total`;

  if (sorted.length === 0) {
    ui.tableBody.innerHTML = "";
    ui.emptyState.hidden = false;
  } else {
    ui.emptyState.hidden = true;
    ui.tableBody.innerHTML = sorted.map((row) => rowHtml(row)).join("");
  }

  populateTopicFilter();
  buildTopicChips();
}

function wireEvents() {
  ui.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  ui.typeFilter.addEventListener("change", (event) => {
    state.fileType = event.target.value;
    render();
  });

  ui.topicFilter.addEventListener("change", (event) => {
    state.topic = event.target.value;
    render();
  });

  ui.sortOrder.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });
}

populateTopicFilter();
wireEvents();
render();
