import React from 'react';
import { useSchemaBuilder } from './hooks/useSchemaBuilder';
import FieldEditor from './components/FieldEditor';
import JsonPreview from './components/JsonPreview';
import TabNavigation from './components/TabNavigation';
import './App.css';

function App() {
  const {
    fields,
    activeTab,
    setActiveTab,
    addRootField,
    deleteField,
    updateFieldName,
    updateFieldType,
    updateFieldRequired,
    addNestedField,
    toggleExpanded,
    generateJsonSchema
  } = useSchemaBuilder();

  const jsonSchema = generateJsonSchema(fields);

  const handleSubmit = () => {
    console.log('Schema submitted:', jsonSchema);
    alert('Schema structure logged to console!');
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>JSON Schema Builder</h1>
        <p>Build dynamic JSON schemas with nested field support</p>
      </div>

      <div className="app-container">
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="app-content">
          {activeTab === 'builder' ? (
            <div className="builder-section">
              <div className="schema-builder">
                <h2>Schema Structure</h2>
                <FieldEditor
                  fields={fields}
                  onDeleteField={deleteField}
                  onUpdateFieldName={updateFieldName}
                  onUpdateFieldType={updateFieldType}
                  onUpdateFieldRequired={updateFieldRequired}
                  onAddNestedField={addNestedField}
                  onToggleExpanded={toggleExpanded}
                />
                
                <button 
                  className="btn btn-primary add-field-btn"
                  onClick={addRootField}
                >
                  + Add Field
                </button>

                <button 
                  className="btn btn-submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="json-full-view">
              <JsonPreview schema={jsonSchema} />
            </div>
          )}

          {activeTab === 'builder' && (
            <div className="preview-section">
              <JsonPreview schema={jsonSchema} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;