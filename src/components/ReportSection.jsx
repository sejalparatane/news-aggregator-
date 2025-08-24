import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomBtn from "./CustomBtn";
import { ChevronDown, ChevronUp, AlertCircle, Shield, FileText, Globe, Eye } from "lucide-react";
import { generateFakeNewsReport } from "@/model/fndModel";

const ReportSection = ({ newsData }) => {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    textual: true,
    source: true,
    overall: true,
  });

  const handleGenerateReport = async () => {
    if (!newsData) {
      toast.error("Please provide complete news data");
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await generateFakeNewsReport(newsData);
      setReport(response.fake_news_report);
      toast.success("Report generated successfully!");
    } catch (err) {
      setError(err.message || "Failed to generate report");
      toast.error("Error generating report");
      console.error("Report generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderList = (items, renderItem) => (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 mt-1 mr-2 w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="text-gray-700">{renderItem(item)}</div>
        </li>
      ))}
    </ul>
  );

  // New UI components
  const SectionCard = ({ children, title, icon, sectionKey }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex justify-between items-center p-5 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-6 h-6 text-purple-600" />
        ) : (
          <ChevronDown className="w-6 h-6 text-purple-600" />
        )}
      </button>
      
      {expandedSections[sectionKey] && (
        <div className="p-5 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );

  const InfoCard = ({ title, children, className = "" }) => (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );

  const ScoreBadge = ({ score, label }) => {
    // Convert 0-1 score to percentage for display
    const percentage = Math.round(score * 100);
    const getColor = () => {
      if (percentage >= 80) return "bg-green-100 text-green-800";
      if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
      return "bg-red-100 text-red-800";
    };

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColor()}`}>
        <span>{label}: {percentage}%</span>
      </div>
    );
  };

  const ScoreBar = ({ score }) => {
    // Convert 0-1 score to percentage for bar width
    const percentage = Math.round(score * 100);
    let colorClass = "bg-red-500";
    
    if (percentage >= 80) colorClass = "bg-green-500";
    else if (percentage >= 60) colorClass = "bg-yellow-500";
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
            Fake News Detection Report
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-powered analysis to verify news credibility and detect misinformation
          </p>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-12">
          <CustomBtn
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-3 px-8 text-white font-bold rounded-full shadow-lg 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                       active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Generate AI Report
              </span>
            )}
          </CustomBtn>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start max-w-3xl mx-auto">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Analysis Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Report Display */}
        {report && (
          <div className="space-y-6">
            {/* Overall Assessment */}
            <SectionCard 
              title="Overall Assessment" 
              icon={<Eye className="w-6 h-6 text-purple-600" />} 
              sectionKey="overall"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <InfoCard title="Credibility Score" className="text-center">
                  <div className="text-3xl font-bold text-purple-600 my-2">
                    {Math.round(report.overall_assessment.credibility_score * 100)}%
                  </div>
                  <ScoreBar score={report.overall_assessment.credibility_score} />
                </InfoCard>
                
                <InfoCard title="Classification">
                  <ScoreBadge 
                    score={report.overall_assessment.credibility_score} 
                    label={report.overall_assessment.credibility_score >= 0.7 ? "Likely Real" : "Likely Fake"} 
                  />
                </InfoCard>
                
                <InfoCard title="Recommendation">
                  <p className="font-medium">{report.overall_assessment.recommendation}</p>
                </InfoCard>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">Summary</h3>
                <p>{report.overall_assessment.summary}</p>
              </div>
            </SectionCard>

            {/* Textual Analysis */}
            <SectionCard 
              title="Textual & Linguistic Analysis" 
              icon={<FileText className="w-6 h-6 text-purple-600" />} 
              sectionKey="textual"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard title="Sentiment Analysis">
                  <p><strong>Tone:</strong> {report.textual_linguistic_analysis.sentiment_analysis.tone}</p>
                  <p><strong>Emotional Score:</strong> {report.textual_linguistic_analysis.sentiment_analysis.emotional_score.toFixed(2)}</p>
                  <p className="mt-2"><strong>Assessment:</strong> {report.textual_linguistic_analysis.sentiment_analysis.assessment}</p>
                </InfoCard>
                
                <InfoCard title="Writing Quality">
                  <p><strong>Complexity:</strong> {report.textual_linguistic_analysis.writing_style_readability.vocabulary_complexity}</p>
                  <p><strong>Grammar Errors:</strong> {report.textual_linguistic_analysis.writing_style_readability.grammar_spelling.error_count}</p>
                  <p><strong>Readability:</strong> {report.textual_linguistic_analysis.writing_style_readability.readability_score.toFixed(1)}</p>
                </InfoCard>
                
                <InfoCard title="Clickbait Detection">
                  <p><strong>Is Clickbait:</strong> {report.textual_linguistic_analysis.clickbait_detection.is_clickbait ? "Yes" : "No"}</p>
                  <p className="mt-2"><strong>Assessment:</strong> {report.textual_linguistic_analysis.clickbait_detection.assessment}</p>
                </InfoCard>
                
                <InfoCard title="Semantic Consistency">
                  <p><strong>Consistent:</strong> {report.textual_linguistic_analysis.semantic_consistency.is_consistent ? "Yes" : "No"}</p>
                  <p className="mt-2"><strong>Assessment:</strong> {report.textual_linguistic_analysis.semantic_consistency.assessment}</p>
                </InfoCard>
              </div>
              
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard title="Named Entities">
                  {report.textual_linguistic_analysis.named_entity_recognition.entities.length > 0 ? (
                    renderList(report.textual_linguistic_analysis.named_entity_recognition.entities, (entity) => (
                      <div>
                        <p><strong>{entity.entity}</strong> ({entity.type})</p>
                        <p className="text-sm">Status: {entity.verification_status}</p>
                      </div>
                    ))
                  ) : (
                    <p>No entities detected</p>
                  )}
                </InfoCard>
                
                <InfoCard title="Source Citations">
                  {report.textual_linguistic_analysis.source_citation_analysis.sources_cited.length > 0 ? (
                    renderList(report.textual_linguistic_analysis.source_citation_analysis.sources_cited, (source) => (
                      <div>
                        <p><strong>{source.source}</strong></p>
                        <p className="text-sm">Credibility: {source.credibility}</p>
                      </div>
                    ))
                  ) : (
                    <p>No sources cited</p>
                  )}
                </InfoCard>
              </div>
            </SectionCard>

            {/* Source Analysis */}
            <SectionCard 
              title="Source & Contextual Analysis" 
              icon={<Globe className="w-6 h-6 text-purple-600" />} 
              sectionKey="source"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard title="Source Credibility">
                  <p><strong>Publisher:</strong> {report.source_contextual_analysis.source_credibility.publisher}</p>
                  <p><strong>Reputation:</strong> {report.source_contextual_analysis.source_credibility.reputation_score}</p>
                </InfoCard>
                
                <InfoCard title="Author Credibility">
                  <p><strong>Author:</strong> {report.source_contextual_analysis.author_credibility.author_name}</p>
                  <p><strong>Verified:</strong> {report.source_contextual_analysis.author_credibility.is_verified ? "Yes" : "No"}</p>
                </InfoCard>
                
                <InfoCard title="Cross-Referencing">
                  <p><strong>Matching Sources:</strong> {report.source_contextual_analysis.cross_referencing.matching_sources.length}</p>
                  <p className="mt-2"><strong>Assessment:</strong> {report.source_contextual_analysis.cross_referencing.assessment}</p>
                </InfoCard>
                
                <InfoCard title="Fact-Checking">
                  <p><strong>Fact-Checks:</strong> {report.source_contextual_analysis.fact_checking.fact_check_results.length}</p>
                  <p className="mt-2"><strong>Disinformation:</strong> {report.source_contextual_analysis.fact_checking.disinformation_campaign.is_linked ? "Detected" : "Not Detected"}</p>
                </InfoCard>
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSection;