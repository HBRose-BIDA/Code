const artifacts = [
  {
    Number: 1,
    FileName: "01_Problem_Statement_and_Research_Questions.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F01_Problem_Statement_and_Research_Questions.docx",
    FunctionInBIDAProject: "Problem framing and research question definition",
    BIDAToolsAndTechniquesDemonstrated: "Problem statement framework; research question design; stakeholder analysis",
  },
  {
    Number: 2,
    FileName: "02_Project_Charter_Objectives_Scope_and_Hypothesis.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F02_Project_Charter_Objectives_Scope_and_Hypothesis.docx",
    FunctionInBIDAProject: "Project chartering, scope definition, and hypothesis setup",
    BIDAToolsAndTechniquesDemonstrated: "Project charter; scope management; hypothesis formulation",
  },
  {
    Number: 3,
    FileName: "03_Background_Context_and_Analytical_Landscape.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F03_Background_Context_and_Analytical_Landscape.docx",
    FunctionInBIDAProject: "Context building and analytical landscape review",
    BIDAToolsAndTechniquesDemonstrated: "Background research; contextual analysis; domain framing",
  },
  {
    Number: 4,
    FileName: "04_Results_Analysis_and_Findings.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F04_Results_Analysis_and_Findings.docx",
    FunctionInBIDAProject: "Results analysis and insight generation",
    BIDAToolsAndTechniquesDemonstrated: "Comparative analysis; findings synthesis; interpretation",
  },
  {
    Number: 5,
    FileName: "05_Project_Reflection_Challenges_and_Lessons_Learned.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F05_Project_Reflection_Challenges_and_Lessons_Learned.docx",
    FunctionInBIDAProject: "Project retrospective and continuous improvement",
    BIDAToolsAndTechniquesDemonstrated: "Lessons learned; root-cause reflection; process improvement",
  },
  {
    Number: 6,
    FileName: "06_Project_Status_and_Key_Conclusions.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F06_Project_Status_and_Key_Conclusions.docx",
    FunctionInBIDAProject: "Status reporting and conclusion consolidation",
    BIDAToolsAndTechniquesDemonstrated: "Status dashboarding; executive summary; conclusion writing",
  },
  {
    Number: 7,
    FileName: "07_Normalized_Salary_Cap_and_Record_Dataset.xlsx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F07_Normalized_Salary_Cap_and_Record_Dataset.xlsx",
    FunctionInBIDAProject: "Data preparation and normalization stage",
    BIDAToolsAndTechniquesDemonstrated: "Data cleaning; normalization; feature standardization in Excel",
  },
  {
    Number: 8,
    FileName: "08_Analysis_Framing_Presentation.pptx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F08_Analysis_Framing_Presentation.pptx",
    FunctionInBIDAProject: "Analytical framing and stakeholder communication",
    BIDAToolsAndTechniquesDemonstrated: "Slide storytelling; analysis framing; communication design",
  },
  {
    Number: 9,
    FileName: "09_Analytics_Presentation_Outline_and_Speaker_Notes.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F09_Analytics_Presentation_Outline_and_Speaker_Notes.docx",
    FunctionInBIDAProject: "Presentation planning and narrative design",
    BIDAToolsAndTechniquesDemonstrated: "Outline development; speaker notes; narrative flow design",
  },
  {
    Number: 10,
    FileName: "10_Strategy_Framework_Balanced_Scorecard.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F10_Strategy_Framework_Balanced_Scorecard.docx",
    FunctionInBIDAProject: "Strategy alignment and KPI framework definition",
    BIDAToolsAndTechniquesDemonstrated: "Balanced Scorecard; KPI mapping; strategic objective linkage",
  },
  {
    Number: 11,
    FileName: "11_Statistical_Analysis_Exploration_Correlation_and_Regression.xlsx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F11_Statistical_Analysis_Exploration_Correlation_and_Regression.xlsx",
    FunctionInBIDAProject: "Statistical exploration and model diagnostics",
    BIDAToolsAndTechniquesDemonstrated: "Correlation analysis; regression analysis; exploratory statistics in Excel",
  },
  {
    Number: 12,
    FileName: "12_Model_Build_Log_Data_Summaries_and_Weighting_Framework.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F12_Model_Build_Log_Data_Summaries_and_Weighting_Framework.docx",
    FunctionInBIDAProject: "Model build documentation and weighting logic",
    BIDAToolsAndTechniquesDemonstrated: "Model logging; data summarization; weighting framework design",
  },
  {
    Number: 13,
    FileName: "13_Tableau_Workbook_Build_Process_Slides.pptx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F13_Tableau_Workbook_Build_Process_Slides.pptx",
    FunctionInBIDAProject: "Visualization development workflow documentation",
    BIDAToolsAndTechniquesDemonstrated: "Tableau workbook process; dashboard build sequencing; visual design workflow",
  },
  {
    Number: 14,
    FileName: "14_Visualization_Results_Interpretation_and_Code_Appendix.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F14_Visualization_Results_Interpretation_and_Code_Appendix.docx",
    FunctionInBIDAProject: "Visualization interpretation and technical appendix",
    BIDAToolsAndTechniquesDemonstrated: "Data visualization interpretation; code appendix documentation; result annotation",
  },
  {
    Number: 15,
    FileName: "15_Salary_vs_Points_Statistical_Analysis_Presentation.pptx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F15_Salary_vs_Points_Statistical_Analysis_Presentation.pptx",
    FunctionInBIDAProject: "Formal presentation of statistical analysis outcomes",
    BIDAToolsAndTechniquesDemonstrated: "Presentation synthesis; result communication; decision-support storytelling",
  },
  {
    Number: 16,
    FileName: "16_Statistical_Analysis_Working_Paper_Salary_and_Team_Performance.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F16_Statistical_Analysis_Working_Paper_Salary_and_Team_Performance.docx",
    FunctionInBIDAProject: "Detailed analytical working paper development",
    BIDAToolsAndTechniquesDemonstrated: "Working paper structure; statistical write-up; evidence-backed argumentation",
  },
  {
    Number: 17,
    FileName: "17_Analytical_Process_Status_and_Decision_Log.docx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F17_Analytical_Process_Status_and_Decision_Log.docx",
    FunctionInBIDAProject: "Process governance and decision tracking",
    BIDAToolsAndTechniquesDemonstrated: "Decision log; process checkpoints; analytical governance",
  },
  {
    Number: 18,
    FileName: "18_Analytics_Executive_Presentation_and_Recommendations.pptx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F18_Analytics_Executive_Presentation_and_Recommendations.pptx",
    FunctionInBIDAProject: "Executive recommendation communication",
    BIDAToolsAndTechniquesDemonstrated: "Executive presentation; recommendation framing; action planning",
  },
  {
    Number: 19,
    FileName: "19_Analytics_Executive_Briefing_and_Insights.pptx",
    URL: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fhbrbida.blob.core.windows.net%2Fclass-files%2F19_Analytics_Executive_Briefing_and_Insights.pptx",
    FunctionInBIDAProject: "Executive briefing and insight distillation",
    BIDAToolsAndTechniquesDemonstrated: "Briefing design; key insight prioritization; strategic communication",
  },
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
  visibleCount: document.getElementById("visibleCount"),
  totalCount: document.getElementById("totalCount"),
  typeBreakdown: document.getElementById("typeBreakdown"),
};

function extension(fileName) {
  const idx = fileName.lastIndexOf(".");
  if (idx === -1) {
    return "unknown";
  }
  return fileName.slice(idx + 1).toLowerCase();
}

function stageForNumber(number) {
  if (number <= 6) {
    return "Define and Frame";
  }
  if (number <= 12) {
    return "Analyze and Model";
  }
  return "Communicate and Decide";
}

const dataset = artifacts
  .map((item) => {
    const fileType = extension(item.FileName);
    const stage = stageForNumber(item.Number);

    return {
      number: item.Number,
      fileName: item.FileName,
      url: item.URL,
      functionText: item.FunctionInBIDAProject,
      techniques: item.BIDAToolsAndTechniquesDemonstrated,
      fileType,
      stage,
      searchText: `${item.FileName} ${item.FunctionInBIDAProject} ${item.BIDAToolsAndTechniquesDemonstrated}`.toLowerCase(),
    };
  })
  .sort((a, b) => a.number - b.number);

function updateStats() {
  const docCount = dataset.filter((row) => row.fileType === "docx").length;
  const xlsxCount = dataset.filter((row) => row.fileType === "xlsx").length;
  const pptxCount = dataset.filter((row) => row.fileType === "pptx").length;

  ui.totalCount.textContent = String(dataset.length);
  ui.typeBreakdown.textContent = `${docCount} / ${xlsxCount} / ${pptxCount}`;
}

function filteredRows() {
  const rows = dataset.filter((row) => {
    const searchMatch = !state.search || row.searchText.includes(state.search);
    const typeMatch = state.type === "all" || row.fileType === state.type;
    const stageMatch = state.phase === "all" || row.stage === state.phase;
    return searchMatch && typeMatch && stageMatch;
  });

  rows.sort((a, b) => (state.sort === "asc" ? a.number - b.number : b.number - a.number));
  return rows;
}

function rowHtml(row) {
  return `
    <tr>
      <td><span class="number-badge">${row.number}</span></td>
      <td>
        <p class="file-name">${row.fileName}</p>
        <p class="meta-line">${row.fileType.toUpperCase()} | ${row.stage}</p>
      </td>
      <td>${row.functionText}</td>
      <td>${row.techniques}</td>
      <td><a class="view-link" href="${row.url}" target="_blank" rel="noopener noreferrer">Open</a></td>
    </tr>
  `;
}

function render() {
  const rows = filteredRows();

  if (rows.length === 0) {
    ui.tableBody.innerHTML = "";
    ui.emptyState.hidden = false;
  } else {
    ui.emptyState.hidden = true;
    ui.tableBody.innerHTML = rows.map((row) => rowHtml(row)).join("");
  }

  ui.visibleCount.textContent = String(rows.length);
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

updateStats();
wireEvents();
render();
