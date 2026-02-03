export default function DataFlowVisualization() {
  return (
    <div>
      <h2 className="section-header">Data Flow</h2>
      <p className="section-subtitle">
        How I approach data engineering challenges
      </p>

      {/* Data Flow Container */}
      <div className="data-flow-container">
        {/* Data Flow Items - animated */}
        <div className="absolute left-0 top-6">
          <div
            className="data-flow-item"
            style={{ width: '30%', animationDelay: '0s' }}
          ></div>
        </div>
        <div className="absolute left-1/3 top-12">
          <div
            className="data-flow-item"
            style={{ width: '30%', animationDelay: '0.5s' }}
          ></div>
        </div>
        <div className="absolute left-2/3 top-6">
          <div
            className="data-flow-item"
            style={{ width: '30%', animationDelay: '1s' }}
          ></div>
        </div>

        {/* Data Flow Stages */}
        <div className="absolute inset-0 flex items-center justify-between px-8 py-8">
          <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="text-sm font-semibold text-primary-400">Ingest</div>
            <div className="text-xs text-gray-500 mt-1">Extract Data</div>
          </div>
          <div className="hidden md:block text-gray-600">→</div>
          <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="text-sm font-semibold text-primary-400">Process</div>
            <div className="text-xs text-gray-500 mt-1">Transform & Clean</div>
          </div>
          <div className="hidden md:block text-gray-600">→</div>
          <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="text-sm font-semibold text-primary-400">Analyze</div>
            <div className="text-xs text-gray-500 mt-1">Derive Insights</div>
          </div>
        </div>
      </div>

      {/* Data Pipeline Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass-card">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <span className="text-primary-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="text-h4 text-white mb-2">Data Quality First</h4>
              <p className="text-gray-400 text-sm">
                Ensuring data accuracy and consistency at every stage
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <span className="text-primary-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="text-h4 text-white mb-2">Scalable Design</h4>
              <p className="text-gray-400 text-sm">
                Building systems that grow with your data needs
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <span className="text-primary-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="text-h4 text-white mb-2">Actionable Insights</h4>
              <p className="text-gray-400 text-sm">
                Transforming data into business decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}