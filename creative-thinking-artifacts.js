/*
Template-style data feed:
1) This page does not scan local folders.
2) Rows come only from ARTIFACT_FEED below.
3) Open links are built from one Azure blob base URL plus each file name.
*/

const AZURE_FILE_BASE_URL = "https://hbrbida.blob.core.windows.net/class-files/";

const OFFICE_WEB_VIEWER_PREFIX = "https://view.officeapps.live.com/op/view.aspx?src=";

const OFFICE_VIEWABLE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);

const ARTIFACT_FEED = [
  {
    order: 1,
    file: "99_03__Reference_HorizontalVerticalIntegration_TrueTemper__Tech_StrategyFrameworkAnalysis.docx",
    artifact: "True Temper Integration Analysis",
    purpose: "Profiles True Temper Sports to support horizontal and vertical integration analysis in the sporting goods market.",
    methods: "Company background review, strategy framework analysis, and integration reasoning"
  },
  {
    order: 2,
    file: "A TrendTracking_Approach.docx",
    artifact: "Trend Tracking Approach",
    purpose: "Establishes a practical frame for thinking about change before moving into detailed trend analysis work.",
    methods: "Foresight framing, change pattern analysis, and transition context review"
  },
  {
    order: 3,
    file: "Analytics chart.pptx",
    artifact: "Business Intelligence and Analytics Chart",
    purpose: "Introduces business intelligence, analytics, and data visualization as connected disciplines for decision support.",
    methods: "Concept framing, analytics overview, and visualization foundations"
  },
  {
    order: 4,
    file: "B Trend Analysis Process.docx",
    artifact: "Trend Insight Process",
    purpose: "Documents a reusable process for converting raw trends into executive-ready insights and deep-dive analysis.",
    methods: "Trend pool building, prioritization, insight synthesis, and executive framing"
  },
  {
    order: 5,
    file: "C Trend_Tracking Rel 3.xlsx",
    artifact: "Trend Tracking Matrix",
    purpose: "Tracks and prioritizes emerging trends with scoring fields for probability, time horizon, impact, expected return, and strategic fit.",
    methods: "Scoring model design, trend prioritization, and portfolio ranking"
  },
  {
    order: 6,
    file: "D Trend_Tracking_Spreadsheet_Explanation - Rel 2.docx",
    artifact: "Trend Tracking Model Explanation",
    purpose: "Explains how the trend tracking spreadsheet supports consistent, transparent leadership review of emerging shifts.",
    methods: "Leadership guidance, scoring framework explanation, and strategic foresight documentation"
  },
  {
    order: 7,
    file: "E Imagination Guide.docx",
    artifact: "Imagination Guide",
    purpose: "Provides a simple method for exploring trends and what-if scenarios to expand strategic possibilities.",
    methods: "Scenario imagination, possibility expansion, and example-based exploration"
  },
  {
    order: 8,
    file: "F Deeper_Dive_Instructions.docx",
    artifact: "Deeper Dive Instructions",
    purpose: "Explains how to use the deeper dive template to explore a trend or technology beyond surface-level analysis.",
    methods: "Guided discussion design, risk and opportunity exploration, and context framing"
  },
  {
    order: 9,
    file: "G Deeper Dive.docx",
    artifact: "Deep-Dive Trend Exploration Template",
    purpose: "Provides a structured template for documenting trend overview, possibilities, strategic considerations, and next steps.",
    methods: "Template-driven analysis, opportunity and risk assessment, and executive summary capture"
  },
  {
    order: 10,
    file: "H Imagination_Impact_Canvas_Instructions.docx",
    artifact: "Imagination Impact Canvas Instructions",
    purpose: "Guides the use of an impact canvas to map how a trend or scenario reshapes the business landscape.",
    methods: "Impact mapping, systems thinking, and scope definition for deeper analysis"
  },
  {
    order: 11,
    file: "H Trend_Opportunity_Framework.docx",
    artifact: "Trend-to-Opportunity Framework",
    purpose: "Shows how a focal trend can be transformed into structured insight and actionable business opportunities.",
    methods: "Trend selection, dataset rebuilding, framework application, and opportunity design"
  },
  {
    order: 12,
    file: "I Ideation_Scoring_Results.xlsx",
    artifact: "Ideation Scoring Results",
    purpose: "Ranks business ideas with weighted scoring criteria to identify the strongest opportunities for follow-up.",
    methods: "Weighted scoring, comparative evaluation, and prioritization"
  },
  {
    order: 13,
    file: "I Score Card.docx",
    artifact: "Ideation Prioritization Scorecard",
    purpose: "Defines a repeatable process for scoring ideas across profit potential, adoption likelihood, cost, data advantage, and competition.",
    methods: "Scoring rubric design, feasibility screening, and idea prioritization"
  },
  {
    order: 14,
    file: "Idea_Evaluation_Workflow 1.pptx",
    artifact: "Idea Evaluation Workflow",
    purpose: "Maps the workflow that links scoring documents and analysis steps to idea monetization decisions.",
    methods: "Workflow mapping, document linkage, and commercialization decision process"
  },
  {
    order: 15,
    file: "Master -Final 7 - HBnotes.pptx",
    artifact: "Graduate School Decision Presentation",
    purpose: "Evaluates whether graduate school is worthwhile by balancing cost, stress, timing, and school fit.",
    methods: "Decision framing, cost-benefit comparison, and audience-oriented presentation design"
  },
  {
    order: 16,
    file: "Maturity-Model-Mode.pdf",
    artifact: "Data Maturity Guide",
    purpose: "Provides a staged guide for diagnosing and improving data maturity on the path to data democracy.",
    methods: "Maturity model assessment, stage-based capability evaluation, and analytics governance review"
  },
  {
    order: 17,
    file: "MBA604 TEMPLATE FOR DOING A FIVE-FORCES ANALYSIS-1.docx",
    artifact: "Five Forces Analysis Template",
    purpose: "Supplies a structured template for evaluating industry rivalry, entry threats, substitutes, and bargaining power.",
    methods: "Porter's Five Forces, competitive structure analysis, and profitability assessment"
  },
  {
    order: 18,
    file: "Outside data.docx",
    artifact: "Outside Market Data Notes",
    purpose: "Compiles external market facts and royalty data to support broader case analysis and industry evaluation.",
    methods: "Outside-source research, market evidence gathering, and fact capture"
  },
  {
    order: 19,
    file: "storytelling-with-data-cole-nussbaumer-knaflic.pdf",
    artifact: "Storytelling with Data Reference",
    purpose: "Serves as a reference on how to communicate business insights more clearly through data visualization.",
    methods: "Storytelling with data, visual clarity principles, and presentation design guidance"
  },
  {
    order: 20,
    file: "The Business Analysis Core Concept Model.pptx",
    artifact: "Business Analysis Core Concept Model",
    purpose: "Explains the BACCM concepts used to connect change, need, solution, value, stakeholder, and context.",
    methods: "Business analysis framework instruction, concept mapping, and requirements thinking"
  },
  {
    order: 21,
    file: "Updating Data Visualizations_FINAL.docx",
    artifact: "Updating Data Visualizations",
    purpose: "Reviews alternative chart types for redesigning an existing chart so the message is clearer for the audience.",
    methods: "Chart redesign, comparative visualization critique, and audience-focused communication"
  },
  {
    order: 22,
    file: "W1.D2 - Analyzing the Importance of Infrastructure.docx",
    artifact: "Infrastructure Importance Analysis",
    purpose: "Analyzes how infrastructure investment in Norway could strengthen commerce and cross-region connectivity.",
    methods: "Infrastructure strategy analysis, economic impact reasoning, and regional connectivity evaluation"
  },
  {
    order: 23,
    file: "W2.A1 Milton Friedman's Views on Social Responsibility-turnin.docx",
    artifact: "Friedman Social Responsibility Analysis",
    purpose: "Examines Milton Friedman's view that governments, rather than firms, should address major social issues.",
    methods: "Argument analysis, economic theory interpretation, and policy reasoning"
  },
  {
    order: 24,
    file: "W3.A1 Oligopoly-Monopoly and Cable TV Version Final.docx",
    artifact: "Oligopoly and Monopoly Case Analysis",
    purpose: "Compares monopoly and oligopoly market structures using cable television as the working example.",
    methods: "Market structure analysis, competition comparison, and industry example evaluation"
  },
  {
    order: 25,
    file: "W3.D1 - Entry Barriers and Profitability.docx",
    artifact: "Entry Barriers and Profitability",
    purpose: "Evaluates how entry barriers influence profitability in the Japanese brewing industry example.",
    methods: "Industry case analysis, barrier assessment, and profitability reasoning"
  },
  {
    order: 26,
    file: "W4.A1 - Performing a Porter's Five Forces Analysis-Final-2.docx",
    artifact: "TaylorMade Five Forces Analysis",
    purpose: "Applies Porter's Five Forces to TaylorMade Golf to assess rivalry, entry threats, substitutes, and bargaining power.",
    methods: "Porter's Five Forces, golf equipment industry assessment, and competitive positioning"
  },
  {
    order: 27,
    file: "W4.A1 Business Rules Metric Model Assignment - Rev 2.docx",
    artifact: "Business Rules Metric Model",
    purpose: "Explains a transaction-error metric model for executives using quarterly performance thresholds and averages.",
    methods: "Threshold setting, statistical performance bands, and executive reporting design"
  },
  {
    order: 28,
    file: "W4.A1 Business Rules Metric Model Assignment.pdf",
    artifact: "Business Rules Metric Model PDF",
    purpose: "Presents the executive-facing version of the transaction-error performance assessment and threshold logic.",
    methods: "Statistical thresholding, performance evaluation, and business rules communication"
  },
  {
    order: 29,
    file: "W4.D1 - Applying Porter's Five Forces to an Industry.docx",
    artifact: "Applying Five Forces to an Industry",
    purpose: "Evaluates the golf industry and TaylorMade through a Five Forces lens focused on barriers, rivalry, and positioning.",
    methods: "Competitive forces assessment, industry structure analysis, and strategy discussion"
  },
  {
    order: 30,
    file: "W4.D2 - Forming a Value Net.docx",
    artifact: "TaylorMade Value Net",
    purpose: "Maps the supplier, customer, competitor, and complement relationships that shape TaylorMade's value network.",
    methods: "Value net mapping, ecosystem analysis, and value creation framework use"
  },
  {
    order: 31,
    file: "W5.A1 - Performing a Cost Comparison Analysis-final.docx",
    artifact: "Cost Comparison Analysis",
    purpose: "Summarizes how major cost drivers influence the outcomes shown in a firm cost comparison chart.",
    methods: "Cost driver analysis, comparative cost evaluation, and managerial economics reasoning"
  },
  {
    order: 32,
    file: "W5.D1 - Assessing a Firm's Value Creation.docx",
    artifact: "Firm Value Creation Assessment",
    purpose: "Assesses how TaylorMade creates value for customers and stakeholders through innovation and operating strengths.",
    methods: "Value creation analysis, firm capability assessment, and strategic reasoning"
  },
  {
    order: 33,
    file: "W5.D2 - Identifying a Firm's Strategic Focus.docx",
    artifact: "Firm Strategic Focus Analysis",
    purpose: "Identifies the main strategic priorities that shape TaylorMade's market approach and product development focus.",
    methods: "Strategic focus analysis, capability review, and market positioning evaluation"
  },
  {
    order: 34,
    file: "W7.A1 - Analyzing Costs of Reorganization-final.docx",
    artifact: "Reorganization Cost Analysis",
    purpose: "Evaluates when the costs of reorganizing a business unit are justified beyond a simple leadership change.",
    methods: "Organizational economics, restructuring cost analysis, and decision criteria review"
  },
  {
    order: 35,
    file: "W7.A1. From Concept to Reality .docx",
    artifact: "Business Analytics Team Design",
    purpose: "Describes the roles and structure needed to build a high-performing business analytics team.",
    methods: "Team design, analytics capability planning, and role definition"
  },
  {
    order: 36,
    file: "W8.A1 - Neustadt's Source of Presidential Power-Final.docx",
    artifact: "Presidential Power Analysis",
    purpose: "Analyzes Neustadt's argument about political power, persuasion, and the limits created by institutional layering.",
    methods: "Leadership theory analysis, argument evaluation, and governance reasoning"
  },
  {
    order: 37,
    file: "Week2Knowing Your Audience.docx",
    artifact: "Knowing Your Audience",
    purpose: "Explains why audience analysis is essential before building a presentation or communication plan.",
    methods: "Audience segmentation, communication planning, and message tailoring"
  },
  {
    order: 38,
    file: "What do I think.docx",
    artifact: "Presentation Reflection Notes",
    purpose: "Captures reflective notes on subject knowledge, audience needs, debt framing, and relatable messaging.",
    methods: "Reflective planning, audience empathy, and presentation framing"
  }
];

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
  const { ext } = splitFileName(file);

  return {
    order: Number(item.order) || Number.MAX_SAFE_INTEGER,
    file,
    ext,
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

    artifactPurposeCell.appendChild(artifactName);
    artifactPurposeCell.appendChild(artifactPurpose);

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
    const combined = [record.artifact, record.purpose, record.methods, record.file]
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