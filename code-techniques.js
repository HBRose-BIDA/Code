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

const BUSINESS_PURPOSE_BY_TOPIC = {
  "Python": "Implements reusable Python workflows that support analysis, data preparation, and automation tasks.",
  "Pandas": "Uses structured DataFrame operations to prepare, transform, and summarize tabular data for analysis.",
  "NumPy": "Applies numerical array operations for efficient calculations and vectorized analytical processing.",
  "ETL and Data Pipelines": "Builds extract-transform-load workflows that move source data into analysis-ready forms.",
  "Data Quality": "Detects and resolves data issues such as outliers, missing values, and duplicate records.",
  "Statistical Analysis": "Evaluates relationships, distributions, and trends to support evidence-based decisions.",
  "Machine Learning": "Implements predictive modeling and model assessment techniques for pattern discovery and forecasting.",
  "Data Visualization": "Communicates insights through charts, plots, and visual summaries for faster interpretation.",
  "API Integration": "Retrieves and integrates external data sources through API calls and JSON processing.",
  "Web Scraping": "Collects web-based data programmatically for structured downstream analysis.",
  "SQL": "Queries relational data sources using SQL-oriented retrieval and transformation operations.",
  "SAS": "Connects Python workflows with SAS environments and SAS datasets for enterprise analytics interoperability."
};

const GITHUB_USERNAME = "HBRose-BIDA";
const GITHUB_REPO = "Code";
const GITHUB_BLOB_BASE = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/blob/main/`;

const EMBEDDED_FEED = [
  {
    "filePath": "Change the correlation.py",
    "fileType": "py",
    "title": "Change the correlation",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "Statistical Analysis"
    ],
    "functionCount": 1,
    "functions": [
      "print_correlation"
    ]
  },
  {
    "filePath": "Chart values.py",
    "fileType": "py",
    "title": "Chart values",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "Statistical Analysis",
      "Data Visualization"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "ID outliers.py",
    "fileType": "py",
    "title": "ID outliers",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "Data Quality",
      "Statistical Analysis",
      "API Integration"
    ],
    "functionCount": 1,
    "functions": [
      "detect_outliers"
    ]
  },
  {
    "filePath": "import saspy, os.py",
    "fileType": "py",
    "title": "import saspy, os",
    "primaryTopic": "SAS",
    "topics": [
      "Python",
      "SAS"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "K-Mean Clustering.py",
    "fileType": "py",
    "title": "K Mean Clustering",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "Machine Learning",
      "Data Visualization"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Linear regression.py",
    "fileType": "py",
    "title": "Linear regression",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "Statistical Analysis",
      "Machine Learning"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Mode.py",
    "fileType": "py",
    "title": "Mode",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "Statistical Analysis"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "NumpyExtraCredit03082020 - Part 2.ipynb",
    "fileType": "ipynb",
    "title": "NumpyExtraCredit03082020   Part 2",
    "primaryTopic": "NumPy",
    "topics": [
      "Python",
      "NumPy",
      "ETL and Data Pipelines"
    ],
    "functionCount": 1,
    "functions": [
      "compute_estimated_AUC"
    ]
  },
  {
    "filePath": "NumpyExtraCredit03082020 - w_roll.ipynb",
    "fileType": "ipynb",
    "title": "NumpyExtraCredit03082020   w roll",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "NumPy",
      "ETL and Data Pipelines",
      "Statistical Analysis"
    ],
    "functionCount": 2,
    "functions": [
      "forecast",
      "compute_estimated_AUC"
    ]
  },
  {
    "filePath": "Outlier2.py",
    "fileType": "py",
    "title": "Outlier2",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "NumPy",
      "ETL and Data Pipelines",
      "Data Quality"
    ],
    "functionCount": 1,
    "functions": [
      "identify_outliers"
    ]
  },
  {
    "filePath": "PandasProblems_v2.ipynb",
    "fileType": "ipynb",
    "title": "PandasProblems v2",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "PandasSeriesDataFrames_v3.ipynb",
    "fileType": "ipynb",
    "title": "PandasSeriesDataFrames v3",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "NumPy",
      "ETL and Data Pipelines",
      "Data Quality"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "read sasfile.py",
    "fileType": "py",
    "title": "read sasfile",
    "primaryTopic": "SAS",
    "topics": [
      "Python",
      "SAS"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Reading Access.py",
    "fileType": "py",
    "title": "Reading Access",
    "primaryTopic": "SQL",
    "topics": [
      "Python",
      "SQL"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Rocket_3.py",
    "fileType": "py",
    "title": "Rocket 3",
    "primaryTopic": "NumPy",
    "topics": [
      "Python",
      "NumPy",
      "ETL and Data Pipelines",
      "Statistical Analysis",
      "Data Visualization"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "sascfg_personal.py",
    "fileType": "py",
    "title": "sascfg personal",
    "primaryTopic": "SAS",
    "topics": [
      "SAS"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Simple_2A.py",
    "fileType": "py",
    "title": "Simple 2A",
    "primaryTopic": "NumPy",
    "topics": [
      "Python",
      "NumPy",
      "Statistical Analysis",
      "Data Visualization"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "sklearncode.py",
    "fileType": "py",
    "title": "sklearncode",
    "primaryTopic": "NumPy",
    "topics": [
      "Python",
      "NumPy",
      "Machine Learning"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/Attendance.ipynb",
    "fileType": "ipynb",
    "title": "Attendance",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/Dump JSON.py",
    "fileType": "py",
    "title": "Dump JSON",
    "primaryTopic": "ETL and Data Pipelines",
    "topics": [
      "Python",
      "ETL and Data Pipelines",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/FinalExamVersion1 - answers -Part 2-checkpoint.ipynb",
    "fileType": "ipynb",
    "title": "FinalExamVersion1   answers  Part 2 checkpoint",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "Data Quality",
      "Data Visualization"
    ],
    "functionCount": 2,
    "functions": [
      "fill_age",
      "convert_sex_to_binary"
    ]
  },
  {
    "filePath": "Sport/GroupByPivotPlotMerge.ipynb",
    "fileType": "ipynb",
    "title": "GroupByPivotPlotMerge",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "NumPy",
      "ETL and Data Pipelines",
      "Data Quality",
      "Data Visualization"
    ],
    "functionCount": 1,
    "functions": [
      "top"
    ]
  },
  {
    "filePath": "Sport/NHL API teams.py",
    "fileType": "py",
    "title": "NHL API teams",
    "primaryTopic": "ETL and Data Pipelines",
    "topics": [
      "Python",
      "ETL and Data Pipelines",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/Pull the Game details working xy.py",
    "fileType": "py",
    "title": "Pull the Game details working xy",
    "primaryTopic": "API Integration",
    "topics": [
      "Python",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/RdJSON.py",
    "fileType": "py",
    "title": "RdJSON",
    "primaryTopic": "ETL and Data Pipelines",
    "topics": [
      "Python",
      "ETL and Data Pipelines",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/Scrape.ipynb",
    "fileType": "ipynb",
    "title": "Scrape",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "API Integration",
      "Web Scraping"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Sport/scrapebetwndates.py",
    "fileType": "py",
    "title": "scrapebetwndates",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "ETL and Data Pipelines",
      "API Integration",
      "Web Scraping"
    ],
    "functionCount": 1,
    "functions": [
      "scrape_nhl_data_for_date_range"
    ]
  },
  {
    "filePath": "Sport/WithPLR.py",
    "fileType": "py",
    "title": "WithPLR",
    "primaryTopic": "API Integration",
    "topics": [
      "Python",
      "API Integration"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Unique User ID.py",
    "fileType": "py",
    "title": "Unique User ID",
    "primaryTopic": "Pandas",
    "topics": [
      "Python",
      "Pandas",
      "Statistical Analysis"
    ],
    "functionCount": 0,
    "functions": []
  },
  {
    "filePath": "Weighted_Time_Series_Forecast.py",
    "fileType": "py",
    "title": "Weighted Time Series Forecast",
    "primaryTopic": "NumPy",
    "topics": [
      "Python",
      "NumPy",
      "Statistical Analysis"
    ],
    "functionCount": 1,
    "functions": [
      "forecast_values"
    ]
  }
];

const state = {
  search: "",
  fileType: "all",
  topic: "all",
  sort: "title-asc",
  records: []
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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function githubFileUrl(relativePath) {
  const encodedPath = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return GITHUB_BLOB_BASE + encodedPath;
}

function mapToRepoPath(pathValue) {
  const normalized = String(pathValue || "").replace(/\\/g, "/").replace(/^\.\//, "");

  // Local workspace has a Sport/ folder, while repo root stores these files directly.
  if (/^sport\//i.test(normalized)) {
    return normalized.replace(/^sport\//i, "");
  }

  return normalized;
}

function normalizeRecord(record) {
  const topics = Array.isArray(record.topics)
    ? record.topics.filter((topic) => TOPIC_ORDER.includes(topic))
    : [];

  const fallbackTopics = topics.length > 0 ? topics : ["Python"];
  const functions = Array.isArray(record.functions) ? record.functions : [];

  return {
    filePath: mapToRepoPath(record.filePath || ""),
    fileType: String(record.fileType || "file").toLowerCase(),
    title: String(record.title || record.filePath || "Code File"),
    primaryTopic: TOPIC_ORDER.includes(record.primaryTopic) ? record.primaryTopic : fallbackTopics[0],
    topics: fallbackTopics,
    functionCount: Number(record.functionCount) || 0,
    functions,
    openUrl: githubFileUrl(mapToRepoPath(record.filePath || ""))
  };
}

function businessPurpose(record) {
  return BUSINESS_PURPOSE_BY_TOPIC[record.primaryTopic]
    || "Supports analytics implementation through code-based data processing and evaluation.";
}

function skillList(record) {
  return Array.isArray(record.topics) && record.topics.length > 0
    ? record.topics
    : [record.primaryTopic || "Python"];
}

function detailedNotes(record) {
  const notes = [];

  notes.push(`Primary topic: ${record.primaryTopic}.`);

  if (record.functionCount > 0) {
    notes.push(`Functions identified: ${record.functionCount}.`);
  } else {
    notes.push("No explicit function definitions detected; this file may be script- or notebook-driven.");
  }

  if (record.functions.length > 0) {
    notes.push(`Function examples: ${record.functions.slice(0, 6).join(", ")}.`);
  }

  return notes.join(" ");
}

function populateTopicFilter() {
  TOPIC_ORDER.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    ui.topicFilter.appendChild(option);
  });
}

function buildTopicChips() {
  const chipTopics = ["All Topics", ...TOPIC_ORDER];

  ui.topicChips.innerHTML = chipTopics
    .map((topic) => {
      const topicValue = topic === "All Topics" ? "all" : topic;
      const activeClass = topicValue === state.topic ? "active" : "";
      return `<button type="button" class="topic-chip ${activeClass}" data-topic="${escapeHtml(topicValue)}">${escapeHtml(topic)}</button>`;
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

function matchesSearch(record) {
  if (!state.search) {
    return true;
  }

  const combined = [
    record.title,
    businessPurpose(record),
    skillList(record).join(" "),
    detailedNotes(record),
    record.filePath,
    record.functions.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return combined.includes(state.search);
}

function matchesType(record) {
  return state.fileType === "all" || record.fileType === state.fileType;
}

function matchesTopic(record) {
  return state.topic === "all" || record.topics.includes(state.topic);
}

function sortedRecords(records) {
  const rows = records.slice();

  rows.sort((a, b) => {
    if (state.sort === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    if (state.sort === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    if (state.sort === "functions-desc") {
      if (b.functionCount !== a.functionCount) {
        return b.functionCount - a.functionCount;
      }

      return a.title.localeCompare(b.title);
    }

    if (state.sort === "functions-asc") {
      if (a.functionCount !== b.functionCount) {
        return a.functionCount - b.functionCount;
      }

      return a.title.localeCompare(b.title);
    }

    return a.title.localeCompare(b.title);
  });

  return rows;
}

function topicBadgesHtml(record) {
  return skillList(record)
    .map((topic) => `<span class="topic-badge">${escapeHtml(topic)}</span>`)
    .join("");
}

function rowHtml(record, index) {
  return `
    <tr>
      <td><p class="file-title">${escapeHtml(record.title)}</p></td>
      <td><p class="file-meta">${escapeHtml(businessPurpose(record))}</p></td>
      <td>${topicBadgesHtml(record)}</td>
      <td><p class="function-line">${escapeHtml(detailedNotes(record))}</p></td>
      <td><a class="open-link" href="${record.openUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(record.title)}">Open</a></td>
    </tr>
  `;
}

function render() {
  const filtered = state.records
    .filter(matchesSearch)
    .filter(matchesType)
    .filter(matchesTopic);

  const sorted = sortedRecords(filtered);

  ui.shownCount.textContent = `${sorted.length} shown`;
  ui.totalCount.textContent = `${state.records.length} total`;

  if (sorted.length === 0) {
    ui.tableBody.innerHTML = "";
    ui.emptyState.hidden = false;
  } else {
    ui.emptyState.hidden = true;
    ui.tableBody.innerHTML = sorted.map((record, index) => rowHtml(record, index)).join("");
  }

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

async function loadFeedPayload() {
  if (Array.isArray(window.CODE_TECHNIQUES_FEED) && window.CODE_TECHNIQUES_FEED.length > 0) {
    return window.CODE_TECHNIQUES_FEED;
  }

  if (Array.isArray(EMBEDDED_FEED) && EMBEDDED_FEED.length > 0) {
    return EMBEDDED_FEED;
  }

  const candidateUrls = [
    "./code-techniques-feed.json?v=20260315a",
    "./code-techniques-feed.json"
  ];

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (_error) {
      // Continue to next candidate URL.
    }
  }

  throw new Error("Unable to load feed from embedded JS, window feed, or JSON file.");
}

async function init() {
  populateTopicFilter();
  wireEvents();

  try {
    const payload = await loadFeedPayload();
    state.records = payload.map(normalizeRecord).filter((record) => record.filePath.length > 0);
    render();
  } catch (error) {
    ui.tableBody.innerHTML = "";
    ui.emptyState.hidden = false;
    ui.emptyState.textContent = "Unable to load feed data. Check that code-techniques-feed.js or code-techniques-feed.json is present in this directory.";
    ui.shownCount.textContent = "0 shown";
    ui.totalCount.textContent = "0 total";
  }
}

init();

