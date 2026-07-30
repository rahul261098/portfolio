import { Project, Skill, Certification } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'churn-predictor',
    title: 'Customer Churn Predictor & Retention Pipeline',
    category: 'ml',
    categoryLabel: 'Machine Learning',
    icon: 'fa-user-slash',
    description: 'End-to-end Machine Learning classification model built to predict customer churn probability, analyze risk indicators, and trigger proactive retention workflows.',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'Customer Churn', 'Imbalanced Data', 'SMOTE', 'EDA'],
    bullets: [
      'Developed supervised classification models (Random Forest, Logistic Regression) to detect customer attrition risk on telecom/subscription data.',
      'Applied SMOTE oversampling and threshold optimization to address class imbalance, reaching an 89% recall rate on churners.',
      'Engineered risk scoring logic calculating individual customer churn probability and recommending targeted retention strategies.'
    ],
    hasSimulator: true,
    simulatorType: 'churn',
    githubUrl: 'https://github.com/rahul261098/churn_predictor'
  },
  {
    id: 'ctc-prediction',
    title: 'Salary / CTC Prediction for New Hires',
    category: 'ml',
    categoryLabel: 'Machine Learning',
    icon: 'fa-dollar-sign',
    description: 'Predictive regression & decision tree pipeline estimating competitive market CTC for candidates based on experience, skill tier, education, and tier ranking.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Linear Regression', 'Random Forest', 'EDA'],
    bullets: [
      'Conducted extensive Exploratory Data Analysis (EDA) on employee salary records to isolate key compensation drivers.',
      'Developed and benchmarked multiple regression models (Linear, Ridge, Decision Tree, Random Forest) using 5-fold cross-validation.',
      'Engineered interaction features (Experience x Education Tier) that improved R² score to 0.88 and reduced MAE by 14%.'
    ],
    hasSimulator: true,
    simulatorType: 'ctc',
    githubUrl: 'https://github.com/rahul261098'
  },
  {
    id: 'bike-heaven',
    title: 'Bike Heaven Sales & Profitability Analysis',
    category: 'bi',
    categoryLabel: 'Business Intelligence',
    icon: 'fa-bicycle',
    description: 'Executive Tableau analytics dashboard surfacing regional sales performance, profit margins, and inventory turnover trends.',
    tags: ['Python', 'Tableau', 'MS Excel', 'Data Visualization', 'Sales Analytics'],
    bullets: [
      'Processed over 50,000 transaction records to identify seasonal revenue spikes and underperforming regional markets.',
      'Constructed interactive Tableau dashboards featuring dynamic parameters, LOD calculations, and region filters.',
      'Identified top 15% revenue-generating product lines, providing data-backed recommendations for inventory optimization.'
    ],
    hasSimulator: true,
    simulatorType: 'bike',
    githubUrl: 'https://github.com/rahul261098'
  },
  {
    id: 'ipl-auction',
    title: 'IPL Franchise Auction Strategy & Valuation',
    category: 'sql',
    categoryLabel: 'SQL & Analytics',
    icon: 'fa-cricket-bat-ball',
    description: 'Data-driven player valuation framework and squad optimization engine under strict purse limits for IPL cricket auctions.',
    tags: ['Python', 'SQL', 'Data Analytics', 'Optimization', 'Sports Analytics'],
    bullets: [
      'Aggregated ball-by-ball datasets across multiple IPL seasons using SQL window functions, CTEs, and complex joins.',
      'Computed custom metrics (Impact Factor, Clutch Strike Rate, Economy Rate under pressure) to tier player skill levels.',
      'Designed a purse-allocation algorithm optimizing squad balance across Batsmen, Bowlers, and All-rounders within a 100 Cr budget.'
    ],
    hasSimulator: true,
    simulatorType: 'ipl',
    githubUrl: 'https://github.com/rahul261098'
  },
  {
    id: 'wefit-analytics',
    title: 'WeFit Customer Retention & Cohort Analytics',
    category: 'excel',
    categoryLabel: 'CRM & Segmentation',
    icon: 'fa-users',
    description: 'Behavioral customer cohort segmentation and churn risk mapping for subscription fitness members.',
    tags: ['MS Excel', 'Customer Segmentation', 'RFM Analysis', 'Retention Marketing'],
    bullets: [
      'Segmented fitness subscribers into RFM (Recency, Frequency, Monetary) cohorts using advanced Excel formulas and Pivot tables.',
      'Mapped retention curves across user onboarding weeks to detect drop-off friction points.',
      'Proposed targeted re-engagement campaigns that projected an 18% improvement in customer lifetime value (LTV).'
    ],
    hasSimulator: true,
    simulatorType: 'wefit',
    githubUrl: 'https://github.com/rahul261098'
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    name: 'Python',
    category: 'core',
    icon: 'fa-brands fa-python',
    level: 92,
    description: 'Data wrangling, automation, modeling, and API integrations with Pandas, NumPy, and Scikit-Learn.',
    snippetTitle: 'Python Data Pipeline Example',
    snippet: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load and clean dataset
df = pd.read_csv('employee_salaries.csv')
df['exp_squared'] = df['years_experience'] ** 2
df.fillna({'skills_score': df['skills_score'].median()}, inplace=True)

# Features & target
X = df[['years_experience', 'exp_squared', 'education_tier', 'skills_score']]
y = df['ctc_lpa']

# Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
print(f"Model R² Score: {rf.score(X_test, y_test):.3f}")`
  },
  {
    name: 'Machine Learning',
    category: 'ml',
    icon: 'fa-solid fa-brain',
    level: 85,
    description: 'Supervised/Unsupervised learning, Feature Engineering, Regression, Random Forests, Clustering, and Evaluation metrics.',
    snippetTitle: 'Scikit-Learn ML Pipeline & Evaluation',
    snippet: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestRegressor(n_estimators=150, max_depth=10, random_state=42))
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, predictions))
r2 = r2_score(y_test, predictions)
print(f"RMSE: {rmse:.2f} LPA | R²: {r2:.3f}")`
  },
  {
    name: 'SQL & Databases',
    category: 'core',
    icon: 'fa-solid fa-database',
    level: 88,
    description: 'Complex CTEs, Window Functions, Joins, Aggregations, Subqueries, and Indexing in PostgreSQL & MySQL.',
    snippetTitle: 'SQL Player Performance Ranking CTE',
    snippet: `WITH PlayerStats AS (
  SELECT 
    player_id,
    player_name,
    role,
    SUM(runs_scored) AS total_runs,
    ROUND(AVG(strike_rate), 2) AS avg_sr,
    COUNT(CASE WHEN runs_scored >= 50 THEN 1 END) AS fifties
  FROM ipl_ball_by_ball
  WHERE season >= 2021
  GROUP BY player_id, player_name, role
),
RankedPlayers AS (
  SELECT *,
    DENSE_RANK() OVER (PARTITION BY role ORDER BY total_runs DESC, avg_sr DESC) AS role_rank
  FROM PlayerStats
)
SELECT * FROM RankedPlayers 
WHERE role_rank <= 5;`
  },
  {
    name: 'Tableau',
    category: 'bi',
    categoryLabel: 'BI & Reporting',
    icon: 'fa-solid fa-chart-bar',
    level: 88,
    description: 'Interactive Dashboard design, LOD Expressions (FIXED, INCLUDE), Parameters, Calculated Fields, and Storyboards.',
    snippetTitle: 'Tableau Calculated Field (LOD Expression)',
    snippet: `// Regional Sales Percentage of Total
SUM([Sales]) / SUM({ FIXED [Year] : SUM([Sales]) })

// Profit Margin Category Classifier
IF SUM([Profit]) / SUM([Sales]) > 0.25 THEN 'High Margin'
ELSEIF SUM([Profit]) / SUM([Sales]) >= 0.10 THEN 'Moderate Margin'
ELSE 'Low Margin / Loss'
END`
  },
  {
    name: 'MS Excel',
    category: 'tools',
    icon: 'fa-solid fa-file-excel',
    level: 90,
    description: 'Advanced Data Modeling, XLOOKUP, INDEX-MATCH, Nested IFs, Pivot Tables, Dynamic Charts, and Macros.',
    snippetTitle: 'Excel Advanced Formula Pattern',
    snippet: `=XLOOKUP(A2 & B2, EmployeeData[ID]&EmployeeData[Dept], EmployeeData[Salary], "Not Found")
=SUMIFS(Sales[Amount], Sales[Region], "West", Sales[Date], ">="&DATE(2024,1,1))`
  },
  {
    name: 'EDA & Statistics',
    category: 'ml',
    icon: 'fa-solid fa-magnifying-glass-chart',
    level: 90,
    description: 'Hypothesis testing, outlier detection (IQR, Z-Score), correlation matrices, distribution skewness analysis.',
    snippetTitle: 'Pandas EDA & Outlier Handling',
    snippet: `import seaborn as sns
import matplotlib.pyplot as plt

# Correlation Heatmap
plt.figure(figsize=(8,6))
sns.heatmap(df.corr(), annot=True, cmap='Blues', fmt='.2f')
plt.title('Feature Correlation Matrix')

# IQR Outlier Removal
Q1 = df['ctc_lpa'].quantile(0.25)
Q3 = df['ctc_lpa'].quantile(0.75)
IQR = Q3 - Q1
df_clean = df[(df['ctc_lpa'] >= Q1 - 1.5*IQR) & (df['ctc_lpa'] <= Q3 + 1.5*IQR)]`
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-ds',
    title: 'Data Science Specialization',
    issuer: 'Internshala Training',
    date: 'October 2024',
    icon: 'fa-solid fa-graduation-cap',
    skillsLearned: ['Python for Data Science', 'Exploratory Data Analysis', 'Statistical Inference', 'Predictive Modeling'],
    credentialId: 'DS-2024-RM-98'
  },
  {
    id: 'cert-ml',
    title: 'Machine Learning with Python',
    issuer: 'Internshala Training',
    date: 'September 2024',
    icon: 'fa-solid fa-brain',
    skillsLearned: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-Learn', 'Feature Engineering'],
    credentialId: 'ML-2024-RM-87'
  },
  {
    id: 'cert-tableau',
    title: 'Tableau for Data Visualization',
    issuer: 'Internshala Training',
    date: 'August 2024',
    icon: 'fa-solid fa-chart-line',
    skillsLearned: ['Dashboard Design', 'LOD Expressions', 'Calculated Fields', 'Storytelling'],
    credentialId: 'TB-2024-RM-76'
  },
  {
    id: 'cert-sql',
    title: 'SQL for Data Science',
    issuer: 'Internshala Training',
    date: 'July 2024',
    icon: 'fa-solid fa-database',
    skillsLearned: ['Relational Database Queries', 'CTEs & Subqueries', 'Joins & Aggregations', 'Window Functions'],
    credentialId: 'SQL-2024-RM-65'
  },
  {
    id: 'cert-excel',
    title: 'Excel for Data Analysis',
    issuer: 'Internshala Training',
    date: 'June 2024',
    icon: 'fa-solid fa-file-excel',
    skillsLearned: ['Pivot Tables & Charts', 'XLOOKUP & INDEX-MATCH', 'Data Modeling', 'Dashboards'],
    credentialId: 'XL-2024-RM-54'
  }
];
