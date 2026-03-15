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
    file: "02_01__ExecutiveRequirements_DataMartDesign__Lifecycle_RequirementsAnalysis.docx",
    code: "02_01",
    artifact: "Executive Requirements",
    purpose: "Defines stakeholder questions and executive reporting needs for an NHL executive data mart.",
    methods: "Stakeholder analysis, requirements elicitation, and KPI framing"
  },
  {
    file: "04_02__DataAcquisition_LogicalDataModel__Lifecycle_DataEngineeringDesign.pptx",
    code: "04_02",
    artifact: "Data Acquisition",
    purpose: "Outlines the logical database structure and source domains used to build the NHL warehouse.",
    methods: "Logical data modeling, source mapping, and stakeholder use-case alignment"
  },
  {
    file: "05_01__NHLWarehouse_EntityRelationshipSchema__Lifecycle_DataModeling.pptx",
    code: "05_01",
    artifact: "NHL Warehouse ER Schema",
    purpose: "Documents how game events, players, teams, and schedules relate in the warehouse schema.",
    methods: "Entity relationship modeling, cardinality mapping, and key linkage design"
  },
  {
    file: "05_02__NHLWarehouse_DataDictionary_MetadataModel__Lifecycle_AnalyticsEnablement.docx",
    code: "05_02",
    artifact: "NHL Warehouse Data Dictionary",
    purpose: "Describes warehouse entities and fields to support executive and coaching analytics.",
    methods: "Metadata modeling, data dictionary documentation, and analytic question mapping"
  },
  {
    file: "05_04__MetadataStandards_DataDictionaryGovernance__Lifecycle_DataGovernance.docx",
    code: "05_04",
    artifact: "Metadata Standards",
    purpose: "Defines governance-oriented metadata guidance for technical builders and business users.",
    methods: "Standards review, governance definition, and business glossary alignment"
  },
  {
    file: "10_01__DataWarehouse_TechnicalHandoff_UseCases__Lifecycle_TechnicalDocumentation.docx",
    code: "10_01",
    artifact: "Technical Handoff",
    purpose: "Provides handoff context, pilot use cases, and identified warehouse expansion needs.",
    methods: "Technical documentation, use-case collection, and gap analysis"
  },
  {
    file: "10_02__FinalArtifacts_DatabaseEvaluationNotes__Tech_DatabaseValidation.docx",
    code: "10_02",
    artifact: "Evaluation Notes",
    purpose: "Checks final database artifacts against project evaluation criteria and required tables.",
    methods: "Rubric-based validation, checklist audit, and schema evidence review"
  },
  {
    file: "10_03__DatabaseArtifacts_Evaluation_WorkingNotes__Lifecycle_DatabaseValidation.docx",
    code: "10_03",
    artifact: "Evaluation Working Notes",
    purpose: "Captures working validation notes used to verify and refine final database deliverables.",
    methods: "Iterative validation, issue tracking, and artifact readiness review"
  },
  {
    file: "I1-Bases-Warehouses-Lakes.pptx",
    code: "Supplemental",
    artifact: "Databases vs Warehouses vs Lakes",
    purpose: "Compares when operational databases, data warehouses, and data lakes should be used.",
    methods: "Conceptual architecture comparison and trade-off analysis"
  },
  {
    file: "Keys_BIA665.pptx",
    code: "Supplemental",
    artifact: "Data Integrity and Keys",
    purpose: "Explains how key strategy supports consistency, accuracy, and integrity in relational data.",
    methods: "Primary/foreign/composite key design and constraint planning"
  },
  {
    file: "MetadataQuickGuide.pdf",
    code: "Supplemental",
    artifact: "Metadata Quick Guide",
    purpose: "Provides a quick reference guide for metadata terminology and dictionary usage.",
    methods: "Reference checklist and metadata documentation guidance"
  },
  {
    file: "Normalization_Assignment_Data Answer.xlsx",
    code: "Supplemental",
    artifact: "Normalization Assignment Answer",
    purpose: "Presents a normalized answer dataset used to improve structure and reduce redundancy.",
    methods: "Normalization rules application and spreadsheet restructuring"
  },
  {
    file: "Question 3.docx",
    code: "Supplemental",
    artifact: "Question 3 Response",
    purpose: "Defines high-quality analytics data and the characteristics needed beyond simple accuracy.",
    methods: "Data quality dimension analysis and written evaluation"
  },
  {
    file: "Question 4.docx",
    code: "Supplemental",
    artifact: "Question 4 Response",
    purpose: "Evaluates the constraints and trade-offs of implementing a master data management system.",
    methods: "Pros and cons analysis and governance impact assessment"
  },
  {
    file: "Question 5.docx",
    code: "Supplemental",
    artifact: "Question 5 Response",
    purpose: "Explains distinct classification as a way to organize business data for clearer analysis.",
    methods: "Categorization framework design and overlap analysis"
  },
  {
    file: "Screen shots for W6 A 1.docx",
    code: "Supplemental",
    artifact: "W6 A1 Screenshots",
    purpose: "Records experimental screenshots and notes for assignment modeling attempts.",
    methods: "Visual evidence capture and parameter comparison notes"
  },
  {
    file: "SQL_Joins_BIA665.pptx",
    code: "Supplemental",
    artifact: "SQL Joins",
    purpose: "Demonstrates practical behavior of SQL join types across related tables.",
    methods: "Query examples, join comparison, and result interpretation"
  },
  {
    file: "Steps to the solution.docx",
    code: "Supplemental",
    artifact: "Solution Steps",
    purpose: "Provides a step-by-step workflow for solving notebook and data transformation questions.",
    methods: "Procedural walkthrough, pivoting, and DataFrame filtering"
  },
  {
    file: "TableRelationships_BIA665.pptx",
    code: "Supplemental",
    artifact: "Table Relationships",
    purpose: "Explains relational cardinality patterns and how table links should be structured.",
    methods: "Relationship mapping with one-to-one and one-to-many examples"
  },
  {
    file: "Updated_Transaction_Errors_Table.xlsx",
    code: "Supplemental",
    artifact: "Transaction Errors Table",
    purpose: "Tracks quarterly transaction errors with action thresholds and performance bands.",
    methods: "Trend tabulation, threshold classification, and KPI monitoring"
  },
  {
    file: "Utilities_Solution.xlsx",
    code: "Supplemental",
    artifact: "Utilities Solution",
    purpose: "Stores utility asset records linking poles, owners, and attached service lines.",
    methods: "Tabular data modeling and relationship mapping"
  },
  {
    file: "W3Schools Worksheet Answers.docx",
    code: "Supplemental",
    artifact: "W3Schools Worksheet Answers",
    purpose: "Documents SQL worksheet responses with both query statements and resulting answers.",
    methods: "SQL query practice, aggregation checks, and answer validation"
  },
  {
    file: "W7.Q1 Exam.docx",
    code: "Supplemental",
    artifact: "W7 Q1 Exam",
    purpose: "Compares OLAP and data mining roles in business decision support.",
    methods: "Conceptual technology comparison and analytical reasoning"
  },
  {
    file: "W7.Q2 Exam.docx",
    code: "Supplemental",
    artifact: "W7 Q2 Exam",
    purpose: "Explains indexing strategy and its effect on query performance in RDBMS workloads.",
    methods: "Index design discussion and performance impact analysis"
  },
  {
    file: "W7.Q3 Exam.docx",
    code: "Supplemental",
    artifact: "W7 Q3 Exam",
    purpose: "Describes data warehouse implementation complexity and where pilot methods fit.",
    methods: "Implementation planning and pilot strategy evaluation"
  },
  {
    file: "W7.Q4 Exam.docx",
    code: "Supplemental",
    artifact: "W7 Q4 Exam",
    purpose: "Argues for formal training to speed adoption of complex warehouse analytics workflows.",
    methods: "Capability planning and organizational change rationale"
  },
  {
    file: "Waterfowl_Complete.xlsx",
    code: "Supplemental",
    artifact: "Waterfowl Complete",
    purpose: "Contains complete field observations for waterfowl activity across sites and dates.",
    methods: "Observation data collection and tabular consolidation"
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