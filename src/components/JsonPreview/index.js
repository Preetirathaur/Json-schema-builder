import React from 'react';
import './styles.css';


function JsonPreview({ schema }) {
  const formattedJson = JSON.stringify(schema, null, 2);

  return (
    <div className="json-preview">
      <h3>JSON Output</h3>
      <div className="json-content">
        <pre className="json-code">
          {formattedJson}
        </pre>
      </div>
    </div>
  );
}

export default JsonPreview;