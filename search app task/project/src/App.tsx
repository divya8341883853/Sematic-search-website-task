import React, { useState } from 'react';
import { Search, Globe, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';

interface SearchResult {
  id: string;
  content: string;
  matchPercentage: number;
  path: string;
  htmlContent: string;
  startIndex: number;
  endIndex: number;
}

interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: SearchResult[];
  hasSearched: boolean;
}

function App() {
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    hasSearched: false
  });
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !query) {
      setSearchState(prev => ({
        ...prev,
        error: 'Please provide both URL and search query'
      }));
      return;
    }

    setSearchState({
      isLoading: true,
      error: null,
      results: [],
      hasSearched: false
    });

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for demonstration
      const mockResults: SearchResult[] = [
        {
          id: '1',
          content: 'Digital Robotics for your Company 2.0 - Deploy automations powered by AI, Big Data, Web Crawling and Natural Language.',
          matchPercentage: 95,
          path: '/home',
          htmlContent: `<div class="hero-section">
  <h1>Digital Robotics for your Company 2.0</h1>
  <p>Deploy automations powered by AI, Big Data, Web Crawling and Natural Language.</p>
  <button class="cta-button">Get Started</button>
</div>`,
          startIndex: 0,
          endIndex: 500
        },
        {
          id: '2',
          content: 'AI-powered automation tools for enterprise. Streamline your workflow with intelligent solutions.',
          matchPercentage: 78,
          path: '/products',
          htmlContent: `<section class="products-section">
  <h2>AI-powered automation tools for enterprise</h2>
  <p>Streamline your workflow with intelligent solutions.</p>
  <div class="product-grid">
    <div class="product-card">Enterprise AI</div>
    <div class="product-card">Smart Automation</div>
  </div>
</section>`,
          startIndex: 500,
          endIndex: 1000
        },
        {
          id: '3',
          content: 'Transform your business with cutting-edge AI technology. Our platform provides comprehensive automation solutions.',
          matchPercentage: 72,
          path: '/solutions',
          htmlContent: `<div class="solutions-container">
  <h3>Transform your business with cutting-edge AI technology</h3>
  <p>Our platform provides comprehensive automation solutions.</p>
  <ul>
    <li>Machine Learning Integration</li>
    <li>Process Automation</li>
    <li>Data Analytics</li>
  </ul>
</div>`,
          startIndex: 1000,
          endIndex: 1500
        },
        {
          id: '4',
          content: 'Machine learning algorithms and artificial intelligence solutions for modern businesses. Enhance productivity with smart automation.',
          matchPercentage: 68,
          path: '/services/ai',
          htmlContent: `<article class="service-detail">
  <h2>Machine learning algorithms and artificial intelligence solutions</h2>
  <p>Enhance productivity with smart automation for modern businesses.</p>
  <div class="features-list">
    <span class="feature">Neural Networks</span>
    <span class="feature">Deep Learning</span>
  </div>
</article>`,
          startIndex: 1500,
          endIndex: 2000
        },
        {
          id: '5',
          content: 'Advanced data processing and analytics platform. Leverage big data insights to drive business intelligence and decision making.',
          matchPercentage: 65,
          path: '/analytics',
          htmlContent: `<section class="analytics-dashboard">
  <h3>Advanced data processing and analytics platform</h3>
  <p>Leverage big data insights to drive business intelligence.</p>
  <div class="metrics-grid">
    <div class="metric">Real-time Processing</div>
    <div class="metric">Predictive Analytics</div>
  </div>
</section>`,
          startIndex: 2000,
          endIndex: 2500
        },
        {
          id: '6',
          content: 'Natural language processing capabilities for content analysis. Extract meaningful insights from unstructured text data.',
          matchPercentage: 62,
          path: '/nlp',
          htmlContent: `<div class="nlp-section">
  <h4>Natural language processing capabilities</h4>
  <p>Extract meaningful insights from unstructured text data for content analysis.</p>
  <ul class="capabilities">
    <li>Sentiment Analysis</li>
    <li>Entity Recognition</li>
    <li>Text Classification</li>
  </ul>
</div>`,
          startIndex: 2500,
          endIndex: 3000
        },
        {
          id: '7',
          content: 'Web crawling and data extraction services. Automated collection of web data for business intelligence and market research.',
          matchPercentage: 59,
          path: '/crawling',
          htmlContent: `<section class="crawling-services">
  <h3>Web crawling and data extraction services</h3>
  <p>Automated collection of web data for business intelligence and market research.</p>
  <div class="service-features">
    <div class="feature-card">Scalable Crawling</div>
    <div class="feature-card">Data Validation</div>
  </div>
</section>`,
          startIndex: 3000,
          endIndex: 3500
        },
        {
          id: '8',
          content: 'Enterprise integration solutions for seamless workflow automation. Connect your existing systems with AI-powered tools.',
          matchPercentage: 56,
          path: '/integration',
          htmlContent: `<div class="integration-hub">
  <h2>Enterprise integration solutions</h2>
  <p>Connect your existing systems with AI-powered tools for seamless workflow automation.</p>
  <div class="integration-options">
    <span class="option">API Integration</span>
    <span class="option">Database Sync</span>
    <span class="option">Cloud Services</span>
  </div>
</div>`,
          startIndex: 3500,
          endIndex: 4000
        },
        {
          id: '9',
          content: 'Custom AI model development and training services. Build tailored machine learning solutions for your specific business needs.',
          matchPercentage: 53,
          path: '/custom-ai',
          htmlContent: `<article class="custom-ai-services">
  <h3>Custom AI model development and training services</h3>
  <p>Build tailored machine learning solutions for your specific business needs.</p>
  <div class="development-process">
    <div class="step">Data Preparation</div>
    <div class="step">Model Training</div>
    <div class="step">Deployment</div>
  </div>
</article>`,
          startIndex: 4000,
          endIndex: 4500
        },
        {
          id: '10',
          content: 'Cloud-based AI infrastructure and deployment solutions. Scale your artificial intelligence applications with enterprise-grade reliability.',
          matchPercentage: 50,
          path: '/cloud-ai',
          htmlContent: `<section class="cloud-infrastructure">
  <h4>Cloud-based AI infrastructure and deployment solutions</h4>
  <p>Scale your artificial intelligence applications with enterprise-grade reliability.</p>
  <div class="infrastructure-benefits">
    <ul>
      <li>Auto-scaling</li>
      <li>High Availability</li>
      <li>Security Compliance</li>
    </ul>
  </div>
</section>`,
          startIndex: 4500,
          endIndex: 5000
        }
      ];

      setSearchState({
        isLoading: false,
        error: null,
        results: mockResults,
        hasSearched: true
      });
    } catch (error) {
      setSearchState({
        isLoading: false,
        error: 'Failed to search. Please try again.',
        results: [],
        hasSearched: true
      });
    }
  };

  const toggleExpanded = (resultId: string) => {
    setExpandedResults(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resultId)) {
        newSet.delete(resultId);
      } else {
        newSet.add(resultId);
      }
      return newSet;
    });
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 75) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Website Content Search
            </h1>
            <p className="text-gray-600 text-lg">
              Search through website content with precision
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Query Input */}
            <div className="space-y-2">
              <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                Search Query
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your search query"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={searchState.isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {searchState.isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {searchState.error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800 font-medium">{searchState.error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {searchState.hasSearched && !searchState.isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <div className="text-sm text-gray-600">
                {searchState.results.length} results found
              </div>
            </div>

            {searchState.results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">
                  No results found for your search query.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchState.results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-gray-900 text-lg leading-relaxed mb-3">
                            {result.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Globe className="h-4 w-4 mr-1" />
                              Path: {result.path}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(result.matchPercentage)}`}>
                            {result.matchPercentage}% match
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <button
                          onClick={() => toggleExpanded(result.id)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {expandedResults.has(result.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              <span>Hide HTML</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              <span>View HTML</span>
                            </>
                          )}
                        </button>

                        {expandedResults.has(result.id) && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                              <code>{result.htmlContent}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;