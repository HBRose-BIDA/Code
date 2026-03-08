const artifacts = [
    {
        "stepNumber":  1,
        "stepToken":  "01",
        "fileName":  "01_Opportunity Statement.docx",
        "artifactPurpose":  "Defines project problem and opportunity",
        "methodsAndTechniques":  "Introduces the NHL roster and salary-cap challenge, explains why subjective scouting is insufficient, and frames the core opportunity for a data-driven two-for-one replacement model.",
        "fileType":  "docx",
        "stage":  "Framing and Requirements",
        "openUrl":  "./01_Opportunity%20Statement.docx"
    },
    {
        "stepNumber":  2,
        "stepToken":  "02",
        "fileName":  "02_Audience.docx",
        "artifactPurpose":  "Profiles stakeholders and decision makers",
        "methodsAndTechniques":  "Describes primary users such as coaches, scouts, and general managers, and clarifies what each audience needs from the model to support hockey and payroll decisions.",
        "fileType":  "docx",
        "stage":  "Framing and Requirements",
        "openUrl":  "./02_Audience.docx"
    },
    {
        "stepNumber":  3,
        "stepToken":  "03",
        "fileName":  "03_Data_Requirements.docx",
        "artifactPurpose":  "Specifies data inputs and governance needs",
        "methodsAndTechniques":  "Outlines required data sources, scope, and synchronization expectations, including performance and salary information needed to keep KPI-to-cost comparisons accurate and reliable.",
        "fileType":  "docx",
        "stage":  "Framing and Requirements",
        "openUrl":  "./03_Data_Requirements.docx"
    },
    {
        "stepNumber":  4,
        "stepToken":  "04",
        "fileName":  "04_Risk_and_Constraints.docx",
        "artifactPurpose":  "Documents technical and operational risks",
        "methodsAndTechniques":  "Covers dependencies, failure points, and constraints such as source changes, tool fragility, and continuity concerns, with mitigation ideas for maintaining model usability.",
        "fileType":  "docx",
        "stage":  "Framing and Requirements",
        "openUrl":  "./04_Risk_and_Constraints.docx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05a",
        "fileName":  "05a_NHL_Trade_Replacement_Model_Design.docx",
        "artifactPurpose":  "Explains model design concept",
        "methodsAndTechniques":  "Describes the conceptual design for comparing players and features, including intended audience usage and framing for turning trade questions into measurable analysis.",
        "fileType":  "docx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05a_NHL_Trade_Replacement_Model_Design.docx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05b",
        "fileName":  "05b_NHL_Trade_Model_Input_Mapping.docx",
        "artifactPurpose":  "Maps model inputs and metric weights",
        "methodsAndTechniques":  "Defines the weighted input structure used by scouts and management, explaining how configurable KPI importance supports nuanced player evaluation and trade fit analysis.",
        "fileType":  "docx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05b_NHL_Trade_Model_Input_Mapping.docx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_05_trade_model_iter1.twbx",
        "artifactPurpose":  "First trade model iteration workbook",
        "methodsAndTechniques":  "Initial integrated Tableau build with player selection, salary, team constraints, and weighted performance components used to evaluate candidate replacement scenarios.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_05_trade_model_iter1.twbx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_06_trade_model_iter2.twbx",
        "artifactPurpose":  "Second trade model iteration workbook",
        "methodsAndTechniques":  "Expanded iteration adding richer in/out comparison views, cross-tabs, and cap-bound controls to improve practical side-by-side trade assessment workflows.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_06_trade_model_iter2.twbx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_07_trade_model_iter3.twbx",
        "artifactPurpose":  "Third trade model iteration workbook",
        "methodsAndTechniques":  "Refined comparison model focused on inbound and outbound player analysis with weighting logic and salary context, representing a more mature trade-evaluation interface.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_07_trade_model_iter3.twbx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_08_exploration_week3.twbx",
        "artifactPurpose":  "Week 3 exploratory weighting workbook",
        "methodsAndTechniques":  "Exploratory Tableau build centered on early weighting experiments and dashboard prototypes used to test and tune KPI weighting behavior.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_08_exploration_week3.twbx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_09_exploration_week4.twbx",
        "artifactPurpose":  "Week 4 exploratory cap and weighting workbook",
        "methodsAndTechniques":  "Follow-on exploratory workbook extending weighting experiments into salary-cap-oriented views to validate practical decision support signals.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_09_exploration_week4.twbx"
    },
    {
        "stepNumber":  5,
        "stepToken":  "05d",
        "fileName":  "05d_05_MODEL_BUILD_10_weighted_model.twbx",
        "artifactPurpose":  "Baseline weighted model prototype",
        "methodsAndTechniques":  "Early weighted prototype containing core metric weight calculations and foundational logic used as a base for later exploration and iterative model builds.",
        "fileType":  "twbx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./05d_05_MODEL_BUILD_10_weighted_model.twbx"
    },
    {
        "stepNumber":  6,
        "stepToken":  "06A",
        "fileName":  "06A_Hockey_Model_ETL_and_Build_Guide.docx",
        "artifactPurpose":  "Provides ETL and build instructions",
        "methodsAndTechniques":  "Step-by-step implementation guide for installing, extracting, transforming, cleaning, loading, and building the model pipeline, including referenced code sections and appendices.",
        "fileType":  "docx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./06A_Hockey_Model_ETL_and_Build_Guide.docx"
    },
    {
        "stepNumber":  6,
        "stepToken":  "06B",
        "fileName":  "06B_Hockey_Model_Analysis_Demo_Presentation.pptx",
        "artifactPurpose":  "Demonstrates model analysis usage",
        "methodsAndTechniques":  "Presentation that walks through running comparative analyses, interpreting outputs, and understanding salary and performance patterns in the NHL player evaluation context.",
        "fileType":  "pptx",
        "stage":  "Model Build and ETL",
        "openUrl":  "./06B_Hockey_Model_Analysis_Demo_Presentation.pptx"
    },
    {
        "stepNumber":  7,
        "stepToken":  "07A",
        "fileName":  "07A_VISUALS_04_Trends_and_Forecasting_Design_Notes.docx",
        "artifactPurpose":  "Notes on trends and forecasting visuals",
        "methodsAndTechniques":  "Design notes describing trend and forecast additions made for coursework context, including rationale for extending the original analysis with time-based perspectives.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./07A_VISUALS_04_Trends_and_Forecasting_Design_Notes.docx"
    },
    {
        "stepNumber":  7,
        "stepToken":  "07B",
        "fileName":  "07B_VISUALS_05_Analysis_Framework_and_KPI_Logic.docx",
        "artifactPurpose":  "Defines analysis framework and KPI logic",
        "methodsAndTechniques":  "Documents conceptual framework for interactive data visualization and KPI interpretation, with audience-aware guidance for hockey decision scenarios.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./07B_VISUALS_05_Analysis_Framework_and_KPI_Logic.docx"
    },
    {
        "stepNumber":  7,
        "stepToken":  "07C",
        "fileName":  "07C_VISUALS_06_Complete_Analysis_and_Tableau_Model_Documentation.docx",
        "artifactPurpose":  "Comprehensive analysis and model documentation",
        "methodsAndTechniques":  "Narrative documentation of project evolution, data selection, tooling setup, and end-to-end Tableau model construction, capturing methodology and implementation context.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./07C_VISUALS_06_Complete_Analysis_and_Tableau_Model_Documentation.docx"
    },
    {
        "stepNumber":  7,
        "stepToken":  "07D",
        "fileName":  "07D_VISUALS_07_Final_Analysis_Retrospective_and_Lessons_Learned.docx",
        "artifactPurpose":  "Retrospective on project outcomes",
        "methodsAndTechniques":  "Summarizes final analysis reflections, lessons learned, and process improvements, especially around ETL choices and tooling practices for future iterations.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./07D_VISUALS_07_Final_Analysis_Retrospective_and_Lessons_Learned.docx"
    },
    {
        "stepNumber":  8,
        "stepToken":  "08A",
        "fileName":  "08A_RECOMMEND_01_Trade_Recommendation_Final_Report.docx",
        "artifactPurpose":  "Final recommendation report",
        "methodsAndTechniques":  "Consolidates findings and recommendations from the full project, connecting analysis outputs to decision-ready guidance for player trade and replacement strategy.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./08A_RECOMMEND_01_Trade_Recommendation_Final_Report.docx"
    },
    {
        "stepNumber":  8,
        "stepToken":  "08B",
        "fileName":  "08B_RECOMMEND_02_Background_and_Operating_Context.docx",
        "artifactPurpose":  "Operating context and usage background",
        "methodsAndTechniques":  "Provides user-facing orientation, operational assumptions, and application context for running the Tableau solution within organizational decision processes.",
        "fileType":  "docx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./08B_RECOMMEND_02_Background_and_Operating_Context.docx"
    },
    {
        "stepNumber":  8,
        "stepToken":  "08C",
        "fileName":  "08C_RECOMMEND_03_Recommendation_Summary_Presentation.pptx",
        "artifactPurpose":  "Recommendation summary presentation",
        "methodsAndTechniques":  "Slide-based summary of project process, model development milestones, and recommendation highlights intended for stakeholder communication and review.",
        "fileType":  "pptx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./08C_RECOMMEND_03_Recommendation_Summary_Presentation.pptx"
    },
    {
        "stepNumber":  8,
        "stepToken":  "08D",
        "fileName":  "08D_RECOMMEND_04_Recommendation_Training_and_Facilitator_Guide.pptx",
        "artifactPurpose":  "Training and facilitation guide",
        "methodsAndTechniques":  "Instructional deck for operating the player comparison solution, including training-oriented explanations for end users and facilitators.",
        "fileType":  "pptx",
        "stage":  "Visuals and Recommendation",
        "openUrl":  "./08D_RECOMMEND_04_Recommendation_Training_and_Facilitator_Guide.pptx"
    },
    {
        "stepNumber":  10,
        "stepToken":  "10",
        "fileName":  "10_FINAL_01_final_model_improvement_plan.docx",
        "artifactPurpose":  "Final model improvement plan",
        "methodsAndTechniques":  "Post-project improvement document that defines what better model performance means and outlines actionable enhancement priorities for clarity and predictive usefulness.",
        "fileType":  "docx",
        "stage":  "Finalization",
        "openUrl":  "./10_FINAL_01_final_model_improvement_plan.docx"
    }
];

const state = {
  search: "",
  type: "all",
  phase: "all",
  sort: "asc",
};

const ui = {
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  phaseFilter: document.getElementById("phaseFilter"),
  sortOrder: document.getElementById("sortOrder"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const dataset = artifacts
  .map((item) => ({
    stepNumber: item.stepNumber,
    stepToken: item.stepToken,
    fileName: item.fileName,
    artifactPurpose: item.artifactPurpose,
    methodsAndTechniques: item.methodsAndTechniques,
    fileType: item.fileType,
    stage: item.stage,
    openUrl: item.openUrl,
    searchText: `${item.fileName} ${item.artifactPurpose} ${item.methodsAndTechniques} ${item.fileType} ${item.stage}`.toLowerCase(),
  }))
  .sort((a, b) => {
    if (a.stepNumber !== b.stepNumber) {
      return a.stepNumber - b.stepNumber;
    }
    return a.fileName.localeCompare(b.fileName);
  });

function filteredRows() {
  const rows = dataset.filter((row) => {
    const searchMatch = !state.search || row.searchText.includes(state.search);
    const typeMatch = state.type === "all" || row.fileType === state.type;
    const phaseMatch = state.phase === "all" || row.stage === state.phase;
    return searchMatch && typeMatch && phaseMatch;
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
    <tr>
      <td>
        <span class="number-badge">${index + 1}</span>
        <p class="file-meta">${escapeHtml(row.fileType.toUpperCase())} | ${escapeHtml(row.stage)}</p>
      </td>
      <td>
        <p class="file-name">${escapeHtml(row.fileName)}</p>
      </td>
      <td>${escapeHtml(row.artifactPurpose)}</td>
      <td>${escapeHtml(row.methodsAndTechniques)}</td>
      <td>
        <a class="view-link" href="${row.openUrl}" target="_blank" rel="noopener noreferrer">Open</a>
      </td>
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
  ui.tableBody.innerHTML = rows.map((row, idx) => rowHtml(row, idx)).join("");
}

function wireEvents() {
  ui.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  ui.typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    render();
  });

  ui.phaseFilter.addEventListener("change", (event) => {
    state.phase = event.target.value;
    render();
  });

  ui.sortOrder.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });
}

wireEvents();
render();
