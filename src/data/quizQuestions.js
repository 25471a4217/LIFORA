// Comprehensive Question Bank organized by topics and skills

export const QUIZ_TOPIC_METADATA = {
  'Full Stack Development': { icon: '💻', tag: 'Core Tech', color: '#5d8bff' },
  'Prompt Engineering': { icon: '🤖', tag: 'AI Skill', color: '#b46fff' },
  'Quantum Computing': { icon: '⚛️', tag: 'Next-Gen', color: '#76f5ff' },
  'AI & Machine Learning': { icon: '🧠', tag: 'AI Skill', color: '#ff6b9d' },
  'AI & ML': { icon: '🧠', tag: 'AI Skill', color: '#ff6b9d' },
  'Data Science': { icon: '📊', tag: 'Tech', color: '#4facfe' },
  'Cyber Security': { icon: '🛡️', tag: 'Tech', color: '#00f2fe' },
  'Cloud & DevOps': { icon: '☁️', tag: 'Core Tech', color: '#38ef7d' },
  'Mobile App Development': { icon: '📱', tag: 'Tech', color: '#f7971e' },
  'UI/UX Design': { icon: '🎨', tag: 'Design', color: '#f6d365' },
  'Blockchain': { icon: '⛓️', tag: 'Next-Gen', color: '#ffd200' },
  'Competitive Exams': { icon: '📝', tag: 'Academics', color: '#ff758c' },
  'Fitness & Health': { icon: '🏋️', tag: 'Lifestyle', color: '#2af598' },
  'Finance & Investing': { icon: '💰', tag: 'Lifestyle', color: '#00e676' },
  'Entrepreneurship': { icon: '🚀', tag: 'Business', color: '#f89820' },
  'Personal Growth': { icon: '🌱', tag: 'Lifestyle', color: '#a8ff78' },
  'Communication': { icon: '🗣️', tag: 'Business', color: '#68d8d6' },
  'LLM & Agentic AI': { icon: '⚡', tag: 'AI Skill', color: '#c471ed' },
  'Generative AI & RAG': { icon: '✨', tag: 'AI Skill', color: '#f107a3' },
  'Frontend & React': { icon: '⚛️', tag: 'Core Tech', color: '#61dafb' },
  'Backend & Microservices': { icon: '⚙️', tag: 'Core Tech', color: '#11998e' },
  'System Architecture': { icon: '📐', tag: 'Engineering', color: '#fc6076' },
  'Database & SQL/NoSQL': { icon: '🗄️', tag: 'Core Tech', color: '#3f51b5' },
  'API Design & GraphQL': { icon: '🔌', tag: 'Core Tech', color: '#e535ab' },
  'Data Engineering & ETL': { icon: '🔀', tag: 'Tech', color: '#00b4db' },
  'Embedded Systems & IoT': { icon: '🔌', tag: 'Next-Gen', color: '#10ac84' },
  'Robotics & Automation': { icon: '🤖', tag: 'Next-Gen', color: '#ee5253' },
  'AR/VR & Spatial Computing': { icon: '🥽', tag: 'Next-Gen', color: '#9b59b6' },
  'Game Development': { icon: '🎮', tag: 'Tech', color: '#e056fd' },
  'Ethical Hacking': { icon: '🔓', tag: 'Security', color: '#eb4d4b' },
  'Deep Learning & Vision': { icon: '👁️', tag: 'AI Skill', color: '#6c5ce7' },
  'NLP & Language Models': { icon: '💬', tag: 'AI Skill', color: '#a29bfe' },
  'Product Management': { icon: '📋', tag: 'Management', color: '#fdcb6e' },
  'Digital Marketing & Growth': { icon: '📈', tag: 'Business', color: '#e17055' },
  'Public Speaking': { icon: '🎙️', tag: 'Leadership', color: '#d63031' },
  'Time Management': { icon: '⏳', tag: 'Mindset', color: '#0984e3' },
  'Executive Leadership': { icon: '👑', tag: 'Leadership', color: '#fab1a0' },
  'Python': { icon: '🐍', tag: 'Coding', color: '#306998' },
  'Java': { icon: '☕', tag: 'Coding', color: '#f89820' },
  'Data Structures': { icon: '🧱', tag: 'Core CS', color: '#54a0ff' },
};

export const TOPIC_QUESTIONS = {
  'Full Stack Development': [
    {
      id: 'fs-1',
      topic: 'Full Stack Development',
      text: 'Which architectural style structures an application as a collection of loosely coupled services?',
      options: ['Monolithic Architecture', 'Microservices Architecture', 'Serverless Functions Only', 'MVC Pattern'],
      answer: 1,
      explanation: 'Microservices architecture decomposes applications into small, independently deployable services.',
      difficulty: 'Intermediate'
    },
    {
      id: 'fs-2',
      topic: 'Full Stack Development',
      text: 'What HTTP status code is returned when a client makes an unauthorized request requiring authentication?',
      options: ['200 OK', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
      answer: 1,
      explanation: '401 Unauthorized indicates that the request lacks valid authentication credentials for the target resource.',
      difficulty: 'Beginner'
    },
    {
      id: 'fs-3',
      topic: 'Full Stack Development',
      text: 'In React, what hook is primarily used to perform side effects such as data fetching or subscriptions?',
      options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
      answer: 2,
      explanation: 'useEffect handles component lifecycle side-effects like API data fetching and DOM mutations.',
      difficulty: 'Beginner'
    },
    {
      id: 'fs-4',
      topic: 'Full Stack Development',
      text: 'Which mechanism is best suited for bi-directional, real-time communication between client and server?',
      options: ['HTTP Polling', 'WebSockets', 'Server-Sent Events (SSE)', 'DNS Prefetch'],
      answer: 1,
      explanation: 'WebSockets establish a persistent, full-duplex TCP connection for real-time data exchange.',
      difficulty: 'Intermediate'
    },
    {
      id: 'fs-5',
      topic: 'Full Stack Development',
      text: 'What does CORS stand for in web security?',
      options: ['Cross-Origin Resource Sharing', 'Client Optimized Request Standard', 'Centralized Object Routing System', 'Cryptographic Online Relay Server'],
      answer: 0,
      explanation: 'CORS (Cross-Origin Resource Sharing) is an HTTP-header based security mechanism enabling controlled resource access across domains.',
      difficulty: 'Intermediate'
    }
  ],

  'Prompt Engineering': [
    {
      id: 'pe-1',
      topic: 'Prompt Engineering',
      text: 'What prompting technique encourages the LLM to explain its step-by-step reasoning before providing the final answer?',
      options: ['Zero-Shot Prompting', 'Chain-of-Thought (CoT) Prompting', 'Prefix Tuning', 'Greedy Decoding'],
      answer: 1,
      explanation: 'Chain-of-Thought (CoT) asks the model to break down problems into intermediate reasoning steps.',
      difficulty: 'Beginner'
    },
    {
      id: 'pe-2',
      topic: 'Prompt Engineering',
      text: 'What role in modern chat completion APIs provides top-level behavioral rules and persona boundaries to the LLM?',
      options: ['User message', 'System prompt / Developer message', 'Assistant response', 'Tool result'],
      answer: 1,
      explanation: 'The system prompt sets the foundational instructions, constraints, and tone of the model.',
      difficulty: 'Beginner'
    },
    {
      id: 'pe-3',
      topic: 'Prompt Engineering',
      text: 'What parameter controls the randomness and creativity of LLM response generation?',
      options: ['Top-K', 'Temperature', 'Context Window', 'Max Tokens'],
      answer: 1,
      explanation: 'Temperature scales output probability distributions; lower values make outputs more deterministic, higher values increase variety.',
      difficulty: 'Intermediate'
    },
    {
      id: 'pe-4',
      topic: 'Prompt Engineering',
      text: 'Which technique provides 2 to 5 demonstrations of input-output pairs inside the prompt to guide the model?',
      options: ['Zero-Shot', 'Few-Shot Prompting', 'Fine-Tuning', 'Quantization'],
      answer: 1,
      explanation: 'Few-shot prompting shows exemplary input/output pairs in-context without retraining model weights.',
      difficulty: 'Beginner'
    },
    {
      id: 'pe-5',
      topic: 'Prompt Engineering',
      text: 'What vulnerability occurs when user input maliciously overrides system instructions in a prompt?',
      options: ['Hallucination', 'Prompt Injection', 'Model Drift', 'Token Exhaustion'],
      answer: 1,
      explanation: 'Prompt Injection happens when untrusted user input alters the intended instructions of the LLM system.',
      difficulty: 'Intermediate'
    }
  ],

  'Quantum Computing': [
    {
      id: 'qc-1',
      topic: 'Quantum Computing',
      text: 'What fundamental quantum principle allows a qubit to exist in a linear combination of |0⟩ and |1⟩ states simultaneously?',
      options: ['Superposition', 'Quantum Decoherence', 'Pauli Exclusion', 'Quantum Tunneling'],
      answer: 0,
      explanation: 'Superposition allows qubits to represent weighted linear combinations of both base computational states.',
      difficulty: 'Beginner'
    },
    {
      id: 'qc-2',
      topic: 'Quantum Computing',
      text: 'Which quantum gate creates an equal superposition state from a pure |0⟩ state?',
      options: ['Pauli-X Gate', 'Hadamard (H) Gate', 'CNOT Gate', 'Phase (S) Gate'],
      answer: 1,
      explanation: 'The Hadamard gate transforms basis states (|0⟩, |1⟩) into symmetric superposition states.',
      difficulty: 'Intermediate'
    },
    {
      id: 'qc-3',
      topic: 'Quantum Computing',
      text: 'Which quantum algorithm provides quadratic speedup for searching unsorted databases?',
      options: ["Shor's Algorithm", "Grover's Algorithm", 'Deutsch-Jozsa Algorithm', 'VQE'],
      answer: 1,
      explanation: "Grover's algorithm searches an unsorted database of N items in O(√N) time compared to classical O(N).",
      difficulty: 'Intermediate'
    },
    {
      id: 'qc-4',
      topic: 'Quantum Computing',
      text: 'What phenomenon causes entangled qubits to have correlated states regardless of physical distance?',
      options: ['Quantum Entanglement', 'Thermal Radiation', 'Spectral Shift', 'Wave Collapsing Delay'],
      answer: 0,
      explanation: 'Quantum entanglement ties qubit states together such that measuring one instantly dictates the state of the other.',
      difficulty: 'Beginner'
    },
    {
      id: 'qc-5',
      topic: 'Quantum Computing',
      text: 'What does NISQ stand for in modern quantum hardware terminology?',
      options: ['Noisy Intermediate-Scale Quantum', 'Networked Integrated Supercomputer Quantum', 'Non-Iterative Scalable Qubits', 'Numerical Intelligent Standard Qubit'],
      answer: 0,
      explanation: 'NISQ (Noisy Intermediate-Scale Quantum) refers to current quantum processors with 50-1000 noisy qubits without full fault tolerance.',
      difficulty: 'Advanced'
    }
  ],

  'AI & Machine Learning': [
    {
      id: 'ai-1',
      topic: 'AI & Machine Learning',
      text: 'Which optimization algorithm iteratively adjusts weights in neural networks to minimize the loss function?',
      options: ['Gradient Descent', 'K-Means', 'Apriori', 'Binary Search'],
      answer: 0,
      explanation: 'Gradient Descent updates parameters in the opposite direction of the gradient of the loss function.',
      difficulty: 'Beginner'
    },
    {
      id: 'ai-2',
      topic: 'AI & Machine Learning',
      text: 'What problem occurs when a machine learning model performs exceptionally on training data but poorly on unseen test data?',
      options: ['Underfitting', 'Overfitting', 'High Bias', 'Dimensionality Collapse'],
      answer: 1,
      explanation: 'Overfitting happens when a model learns noise in the training set rather than generalizing the underlying distribution.',
      difficulty: 'Beginner'
    },
    {
      id: 'ai-3',
      topic: 'AI & Machine Learning',
      text: 'What key architectural innovation made the Transformer model superior to RNNs for sequential processing?',
      options: ['Self-Attention Mechanism', 'Convolutional Kernels', 'Markov Decision Processes', 'Hebbian Learning'],
      answer: 0,
      explanation: 'Self-Attention allows models to weigh relationships between all tokens in parallel rather than sequential recurrence.',
      difficulty: 'Intermediate'
    },
    {
      id: 'ai-4',
      topic: 'AI & Machine Learning',
      text: 'Which metric measures the fraction of relevant instances among the retrieved instances?',
      options: ['Recall', 'Precision', 'F1-Score', 'ROC-AUC'],
      answer: 1,
      explanation: 'Precision is the ratio of True Positives to all Positive predictions (TP / (TP + FP)).',
      difficulty: 'Intermediate'
    },
    {
      id: 'ai-5',
      topic: 'AI & Machine Learning',
      text: 'Which activation function is most widely used in hidden layers of modern deep neural networks to avoid vanishing gradient problems?',
      options: ['Sigmoid', 'ReLU (Rectified Linear Unit)', 'Tanh', 'Linear'],
      answer: 1,
      explanation: 'ReLU (max(0, x)) preserves gradient flow for positive activations and is computationally efficient.',
      difficulty: 'Beginner'
    }
  ],

  'LLM & Agentic AI': [
    {
      id: 'llm-1',
      topic: 'LLM & Agentic AI',
      text: 'In agentic workflows, what design pattern enables an LLM to take actions, observe results, and reason dynamically?',
      options: ['ReAct (Reason + Act)', 'Waterfall Execution', 'MapReduce', 'Static Lookup'],
      answer: 0,
      explanation: 'The ReAct pattern interleaves reasoning traces and task-specific actions to interact with external environments.',
      difficulty: 'Intermediate'
    },
    {
      id: 'llm-2',
      topic: 'LLM & Agentic AI',
      text: 'What capability allows LLMs to interact with external APIs, databases, or calculators during generation?',
      options: ['Tool / Function Calling', 'Weight Decay', 'Batch Normalization', 'Token Merging'],
      answer: 0,
      explanation: 'Function/Tool calling allows models to emit structured JSON schemas to invoke tools and incorporate their results.',
      difficulty: 'Beginner'
    },
    {
      id: 'llm-3',
      topic: 'LLM & Agentic AI',
      text: 'Which component in an autonomous agent maintains past conversation history and task context over time?',
      options: ['Memory System (Short & Long Term)', 'Loss Function', 'Tokenizer', 'Learning Rate Scheduler'],
      answer: 0,
      explanation: 'Agent memory systems store state, reflections, and episodic records for continuous multi-step problem solving.',
      difficulty: 'Intermediate'
    },
    {
      id: 'llm-4',
      topic: 'LLM & Agentic AI',
      text: 'What is the primary benefit of multi-agent collaboration frameworks (e.g. CrewAI, AutoGen)?',
      options: ['Specialized roles and division of complex tasks', 'Lower API latency to zero', 'Eliminates need for any prompts', 'Replaces all databases'],
      answer: 0,
      explanation: 'Multi-agent frameworks divide complex problems among specialized personas (researcher, coder, reviewer) for higher accuracy.',
      difficulty: 'Intermediate'
    }
  ],

  'Generative AI & RAG': [
    {
      id: 'rag-1',
      topic: 'Generative AI & RAG',
      text: 'What does RAG stand for in modern AI architecture?',
      options: ['Retrieval-Augmented Generation', 'Recursive Auto-associative Gate', 'Random Access Gradient', 'Reinforcement Action Generator'],
      answer: 0,
      explanation: 'Retrieval-Augmented Generation enhances LLM prompts with factual data fetched from external knowledge stores.',
      difficulty: 'Beginner'
    },
    {
      id: 'rag-2',
      topic: 'Generative AI & RAG',
      text: 'Which type of database is optimized for similarity searches using high-dimensional embedding vectors?',
      options: ['Vector Database (e.g. Pinecone, Chroma, Milvus)', 'Relational Database (SQL)', 'Key-Value Cache (Redis)', 'Graph Database (Neo4j) only'],
      answer: 0,
      explanation: 'Vector databases index dense vector embeddings to perform ultra-fast cosine similarity or approximate nearest neighbor searches.',
      difficulty: 'Beginner'
    },
    {
      id: 'rag-3',
      topic: 'Generative AI & RAG',
      text: 'What process breaks large documents into smaller semantically meaningful pieces before generating embeddings for RAG?',
      options: ['Chunking', 'Token Quantization', 'Gradient Clipping', 'Pruning'],
      answer: 0,
      explanation: 'Chunking divides long texts into manageable context segments to fit retriever precision and context window constraints.',
      difficulty: 'Intermediate'
    },
    {
      id: 'rag-4',
      topic: 'Generative AI & RAG',
      text: 'Which metric measures the degree of similarity between two vector embeddings by calculating the angle between them?',
      options: ['Cosine Similarity', 'Hamming Distance', 'L1 Manhattan Norm', 'Kolmogorov Complexity'],
      answer: 0,
      explanation: 'Cosine similarity computes the dot product divided by magnitude product, measuring vector direction correlation.',
      difficulty: 'Intermediate'
    }
  ],

  'Cyber Security': [
    {
      id: 'cs-1',
      topic: 'Cyber Security',
      text: 'What security model operates on the principle of "never trust, always verify"?',
      options: ['Zero Trust Architecture', 'Perimeter Defense', 'Demilitarized Zone (DMZ)', 'Open Access Protocol'],
      answer: 0,
      explanation: 'Zero Trust requires continuous authentication, authorization, and validation of all users and devices.',
      difficulty: 'Beginner'
    },
    {
      id: 'cs-2',
      topic: 'Cyber Security',
      text: 'Which cyber attack involves overwhelming a server with malicious flood traffic to make it unavailable to legitimate users?',
      options: ['DDoS (Distributed Denial of Service)', 'SQL Injection', 'Cross-Site Scripting (XSS)', 'Phishing'],
      answer: 0,
      explanation: 'DDoS uses distributed botnets to flood network bandwidth and system resources.',
      difficulty: 'Beginner'
    },
    {
      id: 'cs-3',
      topic: 'Cyber Security',
      text: 'What is the primary method to safely store user passwords in a database?',
      options: ['Salted Cryptographic Hashing (e.g. bcrypt, Argon2)', 'Base64 Encoding', 'Symmetric Encryption with hardcoded key', 'Plaintext with access restrictions'],
      answer: 0,
      explanation: 'Irreversible cryptographic hashes with unique salts protect against rainbow table attacks and credential theft.',
      difficulty: 'Intermediate'
    },
    {
      id: 'cs-4',
      topic: 'Cyber Security',
      text: 'What type of vulnerability allows attackers to execute arbitrary SQL commands on a backend database via untrusted input?',
      options: ['SQL Injection (SQLi)', 'Cross-Site Request Forgery (CSRF)', 'Man-in-the-Middle (MitM)', 'Buffer Overflow'],
      answer: 0,
      explanation: 'SQL Injection exploits unparameterized queries to manipulate or extract database contents.',
      difficulty: 'Beginner'
    }
  ],

  'Cloud & DevOps': [
    {
      id: 'cdo-1',
      topic: 'Cloud & DevOps',
      text: 'Which containerization tool packages code and its dependencies together into lightweight, portable units?',
      options: ['Docker', 'Vagrant', 'Jenkins', 'Webpack'],
      answer: 0,
      explanation: 'Docker encapsulates applications and runtime environments into standardized container images.',
      difficulty: 'Beginner'
    },
    {
      id: 'cdo-2',
      topic: 'Cloud & DevOps',
      text: 'What is the leading open-source system for automating container deployment, scaling, and management?',
      options: ['Kubernetes (K8s)', 'Terraform', 'Ansible', 'Nginx'],
      answer: 0,
      explanation: 'Kubernetes provides automated container orchestration, load balancing, and self-healing cluster management.',
      difficulty: 'Intermediate'
    },
    {
      id: 'cdo-3',
      topic: 'Cloud & DevOps',
      text: 'What does the CI/CD acronym stand for in DevOps methodology?',
      options: ['Continuous Integration / Continuous Deployment (or Delivery)', 'Cloud Infrastructure / Cloud Data', 'Centralized Installation / Continuous Debugging', 'Code Inspection / Customer Delivery'],
      answer: 0,
      explanation: 'CI/CD automates code testing, building, and automated deployment pipelines.',
      difficulty: 'Beginner'
    },
    {
      id: 'cdo-4',
      topic: 'Cloud & DevOps',
      text: 'Which concept describes managing servers and networks through code files rather than manual configuration?',
      options: ['Infrastructure as Code (IaC)', 'Monolithic Scripting', 'Virtual Memory Paging', 'Microservices Registry'],
      answer: 0,
      explanation: 'IaC (tools like Terraform, CloudFormation) defines and provisions cloud infrastructure through declarative configuration files.',
      difficulty: 'Intermediate'
    }
  ],

  'Data Science': [
    {
      id: 'ds-1',
      topic: 'Data Science',
      text: 'Which Python library is the industry standard for fast tabular data manipulation and DataFrame analysis?',
      options: ['Pandas', 'Requests', 'Flask', 'Pygame'],
      answer: 0,
      explanation: 'Pandas provides powerful DataFrames for cleaning, filtering, aggregating, and transforming structured data.',
      difficulty: 'Beginner'
    },
    {
      id: 'ds-2',
      topic: 'Data Science',
      text: 'What is the process of converting raw categorical data into numerical features for machine learning models?',
      options: ['Feature Encoding (e.g. One-Hot Encoding)', 'Gradient Boosting', 'Cross-Validation', 'Data Scraping'],
      answer: 0,
      explanation: 'One-hot or label encoding converts categorical string values into numerical vectors suitable for mathematical models.',
      difficulty: 'Beginner'
    },
    {
      id: 'ds-3',
      topic: 'Data Science',
      text: 'What statistical measure indicates the spread of numbers around the mean in a distribution?',
      options: ['Standard Deviation', 'Median', 'Mode', 'Skewness'],
      answer: 0,
      explanation: 'Standard deviation quantifies the dispersion and variance of dataset values relative to their average.',
      difficulty: 'Beginner'
    },
    {
      id: 'ds-4',
      topic: 'Data Science',
      text: 'Which visualization plot is most useful for identifying data outliers and quartiles?',
      options: ['Box Plot (Whisker Plot)', 'Line Chart', 'Pie Chart', 'Radar Chart'],
      answer: 0,
      explanation: 'Box plots display median, interquartile ranges (IQR), and outliers clearly.',
      difficulty: 'Intermediate'
    }
  ],

  'Frontend & React': [
    {
      id: 'fr-1',
      topic: 'Frontend & React',
      text: 'What virtual mechanism does React use to optimize DOM updates by comparing UI state trees?',
      options: ['Virtual DOM Reconciliation (Fiber)', 'Direct DOM Replacement', 'Shadow DOM Isolation', 'Service Worker Cache'],
      answer: 0,
      explanation: 'React compares Virtual DOM snapshots via diffing algorithms and only patches modified real DOM nodes.',
      difficulty: 'Beginner'
    },
    {
      id: 'fr-2',
      topic: 'Frontend & React',
      text: 'What hook should you use to memoize the result of an expensive calculation in a React component?',
      options: ['useMemo', 'useCallback', 'useRef', 'useLayoutEffect'],
      answer: 0,
      explanation: 'useMemo caches computation results between renders unless specified dependencies change.',
      difficulty: 'Intermediate'
    },
    {
      id: 'fr-3',
      topic: 'Frontend & React',
      text: 'In CSS Grid, which property specifies the number and sizing of column tracks?',
      options: ['grid-template-columns', 'grid-auto-flow', 'justify-items', 'grid-gap-row'],
      answer: 0,
      explanation: 'grid-template-columns defines the layout and proportions of columns in a CSS grid container.',
      difficulty: 'Beginner'
    },
    {
      id: 'fr-4',
      topic: 'Frontend & React',
      text: 'What HTML5 attribute is crucial for web accessibility screen readers to describe non-text images?',
      options: ['alt attribute', 'title attribute', 'src attribute', 'data-role attribute'],
      answer: 0,
      explanation: 'The alt attribute provides alternative text descriptions for accessibility and SEO.',
      difficulty: 'Beginner'
    }
  ],

  'Backend & Microservices': [
    {
      id: 'bm-1',
      topic: 'Backend & Microservices',
      text: 'Which communication protocol uses Protocol Buffers for high-speed, binary microservice RPC calls?',
      options: ['gRPC', 'SOAP XML', 'REST JSON', 'WebDAV'],
      answer: 0,
      explanation: 'gRPC utilizes HTTP/2 and compact binary serialization (Protobuf) for high-performance service-to-service calls.',
      difficulty: 'Intermediate'
    },
    {
      id: 'bm-2',
      topic: 'Backend & Microservices',
      text: 'What pattern prevents cascading service failures in microservices by temporarily halting calls to a failing dependency?',
      options: ['Circuit Breaker Pattern', 'Singleton Pattern', 'Proxy Pattern', 'Builder Pattern'],
      answer: 0,
      explanation: 'The Circuit Breaker pattern trips when error thresholds are exceeded, avoiding system resource exhaustion.',
      difficulty: 'Intermediate'
    },
    {
      id: 'bm-3',
      topic: 'Backend & Microservices',
      text: 'Which message broker is widely used for high-throughput, distributed event-streaming architectures?',
      options: ['Apache Kafka', 'Memcached', 'SQLite', 'CouchDB'],
      answer: 0,
      explanation: 'Apache Kafka provides partitioned, fault-tolerant event streams capable of processing millions of events per second.',
      difficulty: 'Intermediate'
    }
  ],

  'System Architecture': [
    {
      id: 'sa-1',
      topic: 'System Architecture',
      text: 'According to the CAP theorem in distributed systems, which combination CANNOT be guaranteed simultaneously during network partition?',
      options: ['Consistency AND Availability', 'Latency AND Throughput', 'Security AND Portability', 'Caching AND Sharding'],
      answer: 0,
      explanation: 'The CAP theorem proves that in the presence of a network partition (P), a system must trade off between Consistency (C) and Availability (A).',
      difficulty: 'Advanced'
    },
    {
      id: 'sa-2',
      topic: 'System Architecture',
      text: 'What horizontal scaling technique partitions database rows across multiple independent database servers?',
      options: ['Database Sharding', 'Database Indexing', 'Normalization', 'Connection Pooling'],
      answer: 0,
      explanation: 'Sharding splits large datasets horizontally across separate nodes using a partition key.',
      difficulty: 'Intermediate'
    },
    {
      id: 'sa-3',
      topic: 'System Architecture',
      text: 'What caching eviction strategy discards the least recently accessed items first when memory capacity is full?',
      options: ['LRU (Least Recently Used)', 'FIFO', 'Random Drop', 'LIFO'],
      answer: 0,
      explanation: 'LRU tracks access timestamps and evicts elements that have not been read or written for the longest duration.',
      difficulty: 'Beginner'
    }
  ],

  'Database & SQL/NoSQL': [
    {
      id: 'db-1',
      topic: 'Database & SQL/NoSQL',
      text: 'What does the ACID acronym guarantee in relational database transactions?',
      options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Integrity, Distribution', 'Asynchronous, Clustered, Indexed, Dynamic', 'Authentication, Cryptography, Identity, Delegation'],
      answer: 0,
      explanation: 'ACID properties ensure reliable and fault-tolerant database transactions.',
      difficulty: 'Beginner'
    },
    {
      id: 'db-2',
      topic: 'Database & SQL/NoSQL',
      text: 'Which SQL clause is used to filter aggregated group results rather than individual rows?',
      options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
      answer: 0,
      explanation: 'HAVING filters results after aggregation functions (e.g. COUNT, AVG), while WHERE filters individual rows prior to aggregation.',
      difficulty: 'Intermediate'
    },
    {
      id: 'db-3',
      topic: 'Database & SQL/NoSQL',
      text: 'What type of database is MongoDB classified as?',
      options: ['Document Store (NoSQL)', 'Relational DB (RDBMS)', 'Columnar DB', 'Graph DB'],
      answer: 0,
      explanation: 'MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like BSON documents.',
      difficulty: 'Beginner'
    }
  ],

  'Entrepreneurship': [
    {
      id: 'ent-1',
      topic: 'Entrepreneurship',
      text: 'What is an MVP in lean startup methodology?',
      options: ['Minimum Viable Product', 'Most Valuable Professional', 'Maximum Velocity Protocol', 'Market Validation Process'],
      answer: 0,
      explanation: 'An MVP is the simplest version of a product that allows a team to gather maximum validated customer learning with least effort.',
      difficulty: 'Beginner'
    },
    {
      id: 'ent-2',
      topic: 'Entrepreneurship',
      text: 'What metric represents the cost required to acquire one paying customer?',
      options: ['CAC (Customer Acquisition Cost)', 'LTV (Lifetime Value)', 'ARR (Annual Recurring Revenue)', 'Churn Rate'],
      answer: 0,
      explanation: 'CAC divides total sales and marketing expenses by the number of new customers acquired in a given period.',
      difficulty: 'Beginner'
    },
    {
      id: 'ent-3',
      topic: 'Entrepreneurship',
      text: 'When a startup adjusts its business model or core product based on customer feedback, what is this called?',
      options: ['Pivot', 'Liquidation', 'Bootstrapping', 'Dilution'],
      answer: 0,
      explanation: 'A pivot is a structured course correction designed to test a new fundamental hypothesis about the product and market.',
      difficulty: 'Beginner'
    },
    {
      id: 'ent-4',
      topic: 'Entrepreneurship',
      text: 'What term describes funding a company entirely using personal savings and early revenues without outside venture capital?',
      options: ['Bootstrapping', 'Series A round', 'Angel Syndicate', 'IPO'],
      answer: 0,
      explanation: 'Bootstrapping means growing a business organically using retained earnings and founders’ resources.',
      difficulty: 'Beginner'
    }
  ],

  'UI/UX Design': [
    {
      id: 'ui-1',
      topic: 'UI/UX Design',
      text: 'What law in UX states that the time required to rapidly move to a target area is a function of target distance and width?',
      options: ["Fitts's Law", "Hick's Law", "Miller's Law", "Jakob's Law"],
      answer: 0,
      explanation: "Fitts's Law emphasizes making important touch targets large and easily reachable.",
      difficulty: 'Intermediate'
    },
    {
      id: 'ui-2',
      topic: 'UI/UX Design',
      text: 'What design practice ensures interfaces are usable by people with disabilities including visual, motor, or cognitive impairments?',
      options: ['Accessibility (a11y)', 'Responsive Design', 'Skeuomorphism', 'Micro-interactions'],
      answer: 0,
      explanation: 'Accessibility ensures compliance with WCAG standards for inclusive user experiences.',
      difficulty: 'Beginner'
    },
    {
      id: 'ui-3',
      topic: 'UI/UX Design',
      text: 'What term describes low-fidelity structural blueprints of web pages used before visual styling?',
      options: ['Wireframes', 'High-fidelity Mockups', 'Prototypes', 'Design Tokens'],
      answer: 0,
      explanation: 'Wireframes lay out structure, content hierarchy, and functionality without distractions from colors or typography.',
      difficulty: 'Beginner'
    }
  ],

  'Blockchain': [
    {
      id: 'bc-1',
      topic: 'Blockchain',
      text: 'What consensus mechanism in Ethereum validates transactions through validators locking native cryptocurrency?',
      options: ['Proof of Stake (PoS)', 'Proof of Work (PoW)', 'Proof of Authority (PoA)', 'Delegated Byzantine Fault Tolerance'],
      answer: 0,
      explanation: 'Proof of Stake selects block validators proportionally to their economic stake rather than computational hashing.',
      difficulty: 'Intermediate'
    },
    {
      id: 'bc-2',
      topic: 'Blockchain',
      text: 'What are self-executing contracts with terms written directly into code on a blockchain called?',
      options: ['Smart Contracts', 'Multi-signature Wallets', 'Oracles', 'Decentralized Exchanges'],
      answer: 0,
      explanation: 'Smart contracts execute automatically when predefined cryptographic conditions are met.',
      difficulty: 'Beginner'
    }
  ],

  'Communication': [
    {
      id: 'comm-1',
      topic: 'Communication',
      text: 'Which communication habit is most vital for conflict resolution and high-performing engineering teams?',
      options: ['Active listening and empathetic validation', 'Dominating technical arguments', 'Avoiding feedback completely', 'Communicating solely via text'],
      answer: 0,
      explanation: 'Active listening builds psychological safety, mutual clarity, and constructive problem solving.',
      difficulty: 'Beginner'
    },
    {
      id: 'comm-2',
      topic: 'Communication',
      text: 'What structure helps articulate technical proposals clearly: Context, Problem, Solution, Impact?',
      options: ['Executive Summary Framework', 'Circular Reasoning', 'Ad-hoc brainstorming', 'Silent Architecture'],
      answer: 0,
      explanation: 'Structured storytelling ensures stakeholders rapidly grasp the context, tradeoffs, and expected outcomes.',
      difficulty: 'Beginner'
    }
  ],

  'Mobile App Development': [
    {
      id: 'mob-1',
      topic: 'Mobile App Development',
      text: 'What cross-platform mobile framework developed by Google uses the Dart programming language?',
      options: ['Flutter', 'React Native', 'SwiftUI', 'Jetpack Compose'],
      answer: 0,
      explanation: 'Flutter uses Dart and renders UI with its own high-performance Skia/Impeller graphics engine.',
      difficulty: 'Beginner'
    },
    {
      id: 'mob-2',
      topic: 'Mobile App Development',
      text: 'What is the primary declarative UI framework for native iOS app development?',
      options: ['SwiftUI', 'UIKit (Storyboards)', 'Flutter', 'Cordova'],
      answer: 0,
      explanation: 'SwiftUI is Apple’s modern declarative framework for building user interfaces across iOS and macOS.',
      difficulty: 'Beginner'
    }
  ],

  'Data Structures': [
    {
      id: 'dsa-1',
      topic: 'Data Structures',
      text: 'Which data structure follows the First-In, First-Out (FIFO) access order?',
      options: ['Stack', 'Queue', 'Binary Heap', 'Graph'],
      answer: 1,
      explanation: 'A Queue enforces FIFO order where elements are inserted at the rear and removed from the front.',
      difficulty: 'Beginner'
    },
    {
      id: 'dsa-2',
      topic: 'Data Structures',
      text: 'What is the average time complexity of searching in a balanced Binary Search Tree (BST)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answer: 1,
      explanation: 'Each comparison in a balanced BST halves the remaining search space, giving logarithmic O(log N) time.',
      difficulty: 'Beginner'
    },
    {
      id: 'dsa-3',
      topic: 'Data Structures',
      text: 'Which algorithm is best suited for finding the shortest path in a weighted graph with non-negative weights?',
      options: ["Dijkstra's Algorithm", 'Depth-First Search (DFS)', 'Bubble Sort', "Kruskal's Algorithm"],
      answer: 0,
      explanation: "Dijkstra's algorithm finds minimum path costs from a source node using a priority queue.",
      difficulty: 'Intermediate'
    }
  ]
};

// Fallback generic tech questions if a topic is not explicitly defined in the map
const DEFAULT_FALLBACK_QUESTIONS = [
  {
    id: 'gen-1',
    topic: 'Core Tech & Problem Solving',
    text: 'What is the primary goal of writing clean, modular code in software engineering?',
    options: ['Maintainability and readability', 'Increasing file size', 'Making code harder to refactor', 'Slowing down test execution'],
    answer: 0,
    explanation: 'Modular clean code allows teams to maintain, debug, and scale systems reliably.',
    difficulty: 'Beginner'
  },
  {
    id: 'gen-2',
    topic: 'Core Tech & Problem Solving',
    text: 'Which version control system is universally used for tracking code revisions and collaboration?',
    options: ['Git', 'FTP', 'Docker', 'Vite'],
    answer: 0,
    explanation: 'Git is the distributed version control system standard across global development teams.',
    difficulty: 'Beginner'
  },
  {
    id: 'gen-3',
    topic: 'Core Tech & Problem Solving',
    text: 'What principle states that software entities should be open for extension but closed for modification?',
    options: ['Open-Closed Principle (SOLID)', 'DRY Principle', 'KISS Principle', 'YAGNI'],
    answer: 0,
    explanation: 'The Open-Closed Principle allows systems to add new functionality without altering tested existing code.',
    difficulty: 'Intermediate'
  }
];

/**
 * Fuzzy match helper to find questions for any topic name
 */
export function getQuestionsForTopic(topicName, count = 5) {
  if (!topicName) return DEFAULT_FALLBACK_QUESTIONS.slice(0, count);

  const cleanTarget = topicName.trim().toLowerCase();

  // Exact match
  const exactKey = Object.keys(TOPIC_QUESTIONS).find(k => k.toLowerCase() === cleanTarget);
  if (exactKey) {
    return TOPIC_QUESTIONS[exactKey].slice(0, count);
  }

  // Substring match
  const partialKey = Object.keys(TOPIC_QUESTIONS).find(k => 
    cleanTarget.includes(k.toLowerCase()) || k.toLowerCase().includes(cleanTarget)
  );
  if (partialKey) {
    return TOPIC_QUESTIONS[partialKey].slice(0, count);
  }

  // Alias maps
  if (cleanTarget.includes('react') || cleanTarget.includes('frontend')) {
    return TOPIC_QUESTIONS['Frontend & React'] || TOPIC_QUESTIONS['Full Stack Development'];
  }
  if (cleanTarget.includes('ai') || cleanTarget.includes('machine learning') || cleanTarget.includes('deep learning')) {
    return TOPIC_QUESTIONS['AI & Machine Learning'];
  }
  if (cleanTarget.includes('prompt') || cleanTarget.includes('agent') || cleanTarget.includes('llm')) {
    return TOPIC_QUESTIONS['Prompt Engineering'];
  }
  if (cleanTarget.includes('quantum')) {
    return TOPIC_QUESTIONS['Quantum Computing'];
  }
  if (cleanTarget.includes('startup') || cleanTarget.includes('business')) {
    return TOPIC_QUESTIONS['Entrepreneurship'];
  }
  if (cleanTarget.includes('security') || cleanTarget.includes('hack')) {
    return TOPIC_QUESTIONS['Cyber Security'];
  }
  if (cleanTarget.includes('cloud') || cleanTarget.includes('devops')) {
    return TOPIC_QUESTIONS['Cloud & DevOps'];
  }

  return DEFAULT_FALLBACK_QUESTIONS.slice(0, count);
}

/**
 * Get a balanced mixed quiz curated across all user selected topics
 */
export function getQuestionsForUserTopics(topics = [], totalCount = 5) {
  if (!topics || topics.length === 0) {
    return getQuestionsForTopic('Full Stack Development', totalCount);
  }

  let aggregated = [];
  topics.forEach(t => {
    const list = getQuestionsForTopic(t, 3);
    aggregated = aggregated.concat(list);
  });

  // Remove duplicates by id
  const seen = new Set();
  const unique = [];
  for (const q of aggregated) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      unique.push(q);
    }
  }

  if (unique.length < totalCount) {
    DEFAULT_FALLBACK_QUESTIONS.forEach(q => {
      if (!seen.has(q.id) && unique.length < totalCount) {
        seen.add(q.id);
        unique.push(q);
      }
    });
  }

  return unique.slice(0, totalCount);
}

/**
 * Get display title for a quiz based on active topic
 */
export function getQuizTitle(topicName) {
  if (!topicName || topicName === 'all' || topicName === 'All Topics') {
    return 'Selected Focus Areas Mastery';
  }
  return `${topicName} Challenge`;
}

/**
 * Get topic icon and metadata
 */
export function getTopicInfo(topicName) {
  if (!topicName || topicName === 'all') {
    return { icon: '🌟', tag: 'Curated Mix', color: '#76f5ff' };
  }
  const matched = QUIZ_TOPIC_METADATA[topicName];
  if (matched) return matched;

  // Search partial
  const partial = Object.keys(QUIZ_TOPIC_METADATA).find(k => 
    topicName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(topicName.toLowerCase())
  );
  if (partial) return QUIZ_TOPIC_METADATA[partial];

  return { icon: '🎯', tag: 'Topic Skill', color: '#5d8bff' };
}
