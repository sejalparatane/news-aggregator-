function ChatMessage({ response }) {
  return (
    <div>
      <p>{response.text_response}</p>
      {response.response_type === "analysis" && response.fake_news_report && (
        <div>
          <h3>Fake News Analysis</h3>
          <details>
            <summary>Textual Linguistic Analysis</summary>
            <pre>{JSON.stringify(response.fake_news_report.textual_linguistic_analysis, null, 2)}</pre>
          </details>
          <details>
            <summary>Source Contextual Analysis</summary>
            <pre>{JSON.stringify(response.fake_news_report.source_contextual_analysis, null, 2)}</pre>
          </details>
          <details>
            <summary>Overall Assessment</summary>
            <pre>{JSON.stringify(response.fake_news_report.overall_assessment, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}