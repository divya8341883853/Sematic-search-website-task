# Website Content Search Application

A sophisticated single-page application (SPA) that allows users to search through website content with semantic precision. Users can input a website URL and search query to receive the top 10 most relevant HTML content chunks.



## 🚀 Features

- **Intuitive Search Interface**: Clean, modern UI for entering website URLs and search queries
- **Semantic Search**: Advanced content matching with relevance scoring
- **Top 10 Results**: Returns the most relevant content chunks ranked by match percentage
- **HTML Content Preview**: Expandable view of raw HTML content for each match
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Loading States**: Visual feedback during search operations
- **Error Handling**: Comprehensive error messages and validation

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend (Future Implementation)
- **Python** with FastAPI/Flask
- **BeautifulSoup4** for HTML parsing
- **Transformers** for tokenization
- **Vector Database** (Milvus/Weaviate/Pinecone)

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Git** for version control

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 1GB free space

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd website-content-search
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Frontend Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=Website Content Search Application

# Backend Configuration (for future implementation)
BACKEND_PORT=8000
VECTOR_DB_URL=localhost:19530
VECTOR_DB_COLLECTION=website_content
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Vector Database Configuration

### Option 1: Milvus (Recommended)

#### Installation with Docker

```bash
# Download Milvus standalone docker-compose file
wget https://github.com/milvus-io/milvus/releases/download/v2.3.0/milvus-standalone-docker-compose.yml -O docker-compose.yml

# Start Milvus
docker-compose up -d
```

#### Configuration

```python
# Backend configuration for Milvus
MILVUS_CONFIG = {
    "host": "localhost",
    "port": "19530",
    "collection_name": "website_content",
    "dimension": 768,  # For sentence-transformers/all-MiniLM-L6-v2
    "metric_type": "COSINE"
}
```

### Option 2: Weaviate

#### Installation with Docker

```bash
# Create docker-compose.yml for Weaviate
cat > docker-compose.yml << EOF
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:1.21.2
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai'
      CLUSTER_HOSTNAME: 'node1'
EOF

# Start Weaviate
docker-compose up -d
```

### Option 3: Pinecone (Cloud-based)

```bash
# Install Pinecone client
pip install pinecone-client

# Set environment variables
export PINECONE_API_KEY="your-api-key"
export PINECONE_ENVIRONMENT="your-environment"
```

## 🐍 Backend Setup (Future Implementation)

### 1. Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Backend Dependencies

Create `requirements.txt`:

```txt
fastapi==0.104.1
uvicorn==0.24.0
beautifulsoup4==4.12.2
requests==2.31.0
transformers==4.35.0
torch==2.1.0
sentence-transformers==2.2.2
pymilvus==2.3.1
weaviate-client==3.25.3
pinecone-client==2.2.4
python-multipart==0.0.6
python-dotenv==1.0.0
```

### 4. Start Backend Server

```bash
# Start FastAPI server
uvicorn main:app --reload --port 8000
```

## 🚀 Production Build

### Frontend Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Backend Deployment

```bash
# Install production dependencies
pip install gunicorn

# Start production server
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📁 Project Structure

```
website-content-search/
├── src/
│   ├── components/          # React components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── backend/                # Python backend (future)
│   ├── main.py             # FastAPI application
│   ├── models/             # Data models
│   ├── services/           # Business logic
│   └── utils/              # Backend utilities
├── public/                 # Static assets
├── docs/                   # Documentation
├── README.md               # This file
├── package.json            # Node.js dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🔍 API Endpoints (Future Implementation)

### Search Content
```http
POST /api/search
Content-Type: application/json

{
  "url": "https://example.com",
  "query": "artificial intelligence",
  "max_results": 10
}
```

### Response Format
```json
{
  "results": [
    {
      "id": "chunk_1",
      "content": "Content text...",
      "html_content": "<div>HTML content...</div>",
      "match_percentage": 95.5,
      "path": "/page-path",
      "start_index": 0,
      "end_index": 500
    }
  ],
  "total_results": 10,
  "processing_time": 1.23
}
```

## 🧪 Testing

### Frontend Tests

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

### Backend Tests

```bash
# Install testing dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Node Modules Issues**
   ```bash
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Vector Database Connection**
   ```bash
   # Check if Milvus is running
   docker ps | grep milvus
   
   # Restart Milvus
   docker-compose restart
   ```

### Performance Optimization

- **Chunking Strategy**: Optimize token limits based on content type
- **Caching**: Implement Redis for frequently searched content
- **Rate Limiting**: Add API rate limiting for production use
- **CDN**: Use CDN for static assets in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Milvus/Weaviate/Pinecone** for vector database solutions
- **Hugging Face** for transformer models

