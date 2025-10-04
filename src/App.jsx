import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, Thermometer, Droplets, Gauge } from 'lucide-react';

// Data structure for questions
const questions = [
  {
    id: 1,
    data: [
      { time: '0', temp: 2.334, humidity: 89.98, pressure: 887.62 },
      { time: '1', temp: 2.426, humidity: 91.92, pressure: 887.62 },
      { time: '2', temp: 2.502, humidity: 87.88, pressure: 887.6 },
      { time: '3', temp: 2.456, humidity: 89.88, pressure: 887.62 },
      { time: '4', temp: 2.344, humidity: 88.72, pressure: 887.66 },
      { time: '5', temp: 2.506, humidity: 85.48, pressure: 887.58 }
    ],
    points: [
      { id: 'A', lat: 47.316709, lng: 13.683588, name: 'Station Alpha', elevation: '1850m' },
      { id: 'B', lat: 47.316709, lng: 13.683588, name: 'Station Beta', elevation: '2100m' },
      { id: 'C', lat: 47.316709, lng: 13.683588, name: 'Station Gamma', elevation: '1650m' }
    ],
    correctAnswer: 'Annastollen'
  },
  {
    id: 2,
    data: [
      { time: '0', temp: 0.05, humidity: 90.95, pressure: 821 },
      { time: '1', temp: -0.085, humidity: 91.225, pressure: 821.025 },
      { time: '2', temp: -0.1425, humidity: 91.65, pressure: 821.025 },
      { time: '3', temp: -0.4125, humidity: 92.05, pressure: 821.075 },
      { time: '4', temp: -0.495, humidity: 93.25, pressure: 821.1 },
      { time: '5', temp: 2.375, humidity: 93.625, pressure: 820.875 }
    ],
    points: [
      { id: 'D', lat: 47.360013, lng: 13.639175, name: 'Station Delta', elevation: '980m' },
      { id: 'E', lat: 47.360008, lng: 13.639228, name: 'Station Epsilon', elevation: '1120m' },
      { id: 'F', lat: 47.36, lng: 13.74, name: 'Station Zeta', elevation: '850m' }
    ],
    correctAnswer: 'HochWurzen Hütte'
  },
  {
    id: 3,
    data: [ 
      { time: '0', temp: 5.476, humidity: 76.51, pressure: 884.74 },
      { time: '1', temp: 4.2675, humidity: 83.025, pressure: 884.8 },
      { time: '2', temp: 3.9925, humidity: 82.825, pressure: 884.725 },
      { time: '3', temp: 3.8575, humidity: 81.775, pressure: 884.725 },
      { time: '4', temp: 3.83, humidity: 82.525, pressure: 884.7 },
      { time: '5', temp: 3.86, humidity: 82.575, pressure: 884.7 }
    ],
    points: [
      { id: 'G', lat: 47.46, lng: 13.61, name: 'Station Eta', elevation: '2700m' },
      { id: 'H', lat: 47.48, lng: 13.64, name: 'Station Theta', elevation: '2850m' },
      { id: 'I', lat: 47.44, lng: 13.58, name: 'Station Iota', elevation: '2550m' }
    ],
    correctAnswer: 'Aparthotel'
  },
  {
    id: 4,
    data: [
      { time: '0', temp: -4.3075, humidity: 46.1, pressure: 735.675 },
      { time: '1', temp: -5.265, humidity: 49.9, pressure: 735.625 },
      { time: '2', temp: -5.33, humidity: 49.05, pressure: 735.375 },
      { time: '3', temp: -1.4575, humidity: 45.45, pressure: 735.65 },
      { time: '4', temp: -0.0425, humidity: 42.825, pressure: 735.725 },
      { time: '5', temp: -2.17, humidity: 44.525, pressure: 735.65 }
    ],
    points: [
      { id: 'J', lat: 47.39, lng: 13.66, name: 'Station Kappa', elevation: '1420m' },
      { id: 'K', lat: 47.42, lng: 13.63, name: 'Station Lambda', elevation: '1580m' },
      { id: 'L', lat: 47.37, lng: 13.68, name: 'Station Mu', elevation: '1290m' }
    ],
    correctAnswer: 'Dachstein (Panorama View)'
  },
  {
    id: 5,
    data: [
      { time: '0', temp: -4.995, humidity: 51.125, pressure: 731.575 },
      { time: '1', temp: -5.765, humidity: 54.475, pressure: 731.575 },
      { time: '2', temp: -5.685, humidity: 56.85, pressure: 731.6 },
      { time: '3', temp: -5.535, humidity: 55.225, pressure: 731.575 },
      { time: '4', temp: -5.5025, humidity: 56.55, pressure: 731.575 },
      { time: '5', temp: -5.645, humidity: 58, pressure: 731.575 }
    ],
    points: [
      { id: 'M', lat: 47.43, lng: 13.70, name: 'Station Nu', elevation: '2150m' },
      { id: 'N', lat: 47.45, lng: 13.67, name: 'Station Xi', elevation: '2280m' },
      { id: 'O', lat: 47.41, lng: 13.73, name: 'Station Omicron', elevation: '2020m' }
    ],
    correctAnswer: 'Seethaler Hütte'
  },
  {
    id: 6,
    data: [
      { time: '0', temp: 5.485, humidity: 33.225, pressure: 743.05 },
      { time: '1', temp: 2.9, humidity: 33.9, pressure: 744.35 },
      { time: '2', temp: -3.4975, humidity: 43.1, pressure: 744.7 },
      { time: '3', temp: -6.0725, humidity: 48.675, pressure: 744.925 },
      { time: '4', temp: -6.6925, humidity: 51.275, pressure: 745.025 },
      { time: '5', temp: -3.81, humidity: 47.6, pressure: 744.95 }
    ],
    points: [
      { id: 'P', lat: 47.44, lng: 13.65, name: 'Station Pi', elevation: '2050m' },
      { id: 'Q', lat: 47.46, lng: 13.68, name: 'Station Rho', elevation: '2180m' },
      { id: 'R', lat: 47.42, lng: 13.71, name: 'Station Sigma', elevation: '1920m' }
    ],
    correctAnswer: 'Dachstein Path'
  }
];

const answerOptions = [
  { id: 1, name: 'Annastollen', description: 'Historic mining tunnel location' },
  { id: 2, name: 'HochWurzen Hütte', description: 'Mountain refuge at high altitude' },
  { id: 3, name: 'Aparthotel', description: 'Comfortable valley accommodation' },
  { id: 4, name: 'Dachstein (Panorama View)', description: 'Spectacular mountain vista point' },
  { id: 5, name: 'Seethaler Hütte', description: 'Alpine mountain hut' },
  { id: 6, name: 'Austrian Hütte', description: 'Traditional Austrian lodge' },
  { id: 7, name: 'Dachstein Path', description: 'Scenic mountain trail route' }
];

const MetricChart = ({ data, metric, color, unit, label }) => {
  const chartData = data.map(d => ({
    time: d.time,
    value: d[metric]
  }));

  const minValue = Math.min(...chartData.map(d => d.value));
  const maxValue = Math.max(...chartData.map(d => d.value));
  const avgValue = (chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(2);

  return (
    <div className="metric-chart">
      <div className="metric-stats">
        <div className="stat-item">
          <span className="stat-label">Min</span>
          <span className="stat-value">{minValue.toFixed(2)} {unit}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg</span>
          <span className="stat-value">{avgValue} {unit}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Max</span>
          <span className="stat-value">{maxValue.toFixed(2)} {unit}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="time" 
            stroke="#888" 
            label={{ value: 'Time', position: 'insideBottom', offset: -5, fill: '#888' }}
          />
          <YAxis 
            stroke="#888"
            domain={['auto', 'auto']}
            label={{ value: label, angle: -90, position: 'insideLeft', fill: '#888' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [`${value.toFixed(2)} ${unit}`, label]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const WeatherCharts = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  
  const metrics = {
    temperature: { 
      key: 'temp', 
      color: '#ef4444', 
      unit: '°C',
      label: 'Temperature (°C)',
      icon: Thermometer,
      bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))'
    },
    humidity: { 
      key: 'humidity', 
      color: '#3b82f6', 
      unit: '%',
      label: 'Humidity (%)',
      icon: Droplets,
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))'
    },
    pressure: { 
      key: 'pressure', 
      color: '#10b981', 
      unit: 'hPa',
      label: 'Pressure (hPa)',
      icon: Gauge,
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
    }
  };

  const currentMetric = metrics[selectedMetric];
  const Icon = currentMetric.icon;
  
  return (
    <div className="weather-charts">
      <div className="metric-selector">
        {Object.entries(metrics).map(([key, metric]) => {
          const MetricIcon = metric.icon;
          return (
            <button
              key={key}
              className={`metric-tab ${selectedMetric === key ? 'active' : ''}`}
              onClick={() => setSelectedMetric(key)}
              style={{
                borderColor: selectedMetric === key ? metric.color : '#333'
              }}
            >
              <MetricIcon size={20} />
              <span>{metric.label}</span>
            </button>
          );
        })}
      </div>
      
      <div 
        className="chart-display"
        style={{ background: currentMetric.bgGradient }}
      >
        <div className="chart-header">
          <Icon size={24} color={currentMetric.color} />
          <h3 style={{ color: currentMetric.color }}>{currentMetric.label}</h3>
        </div>
        <MetricChart 
          data={data}
          metric={currentMetric.key}
          color={currentMetric.color}
          unit={currentMetric.unit}
          label={currentMetric.label}
        />
      </div>
    </div>
  );
};

const MapView = ({ points }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  const centerLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
  const centerLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
  
  return (
    <div className="map-container">
      <div className="map-header">
        <MapPin size={24} color="#ef4444" />
        <h3 style={{ color: '#ef4444' }}>Station Locations</h3>
      </div>
      <svg width="100%" height="300" viewBox="0 0 400 280" style={{ background: '#0a0a0a', borderRadius: '8px' }}>
        {points.map((point) => {
          const x = ((point.lng - centerLng + 0.1) / 0.2) * 400;
          const y = ((-point.lat + centerLat + 0.1) / 0.2) * 280;
          
          return (
            <g key={point.id}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="#ef4444"
                stroke="#fff"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPoint(selectedPoint?.id === point.id ? null : point)}
              />
              <text
                x={x}
                y={y - 15}
                fill="#fff"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                style={{ pointerEvents: 'none' }}
              >
                {point.id}
              </text>
            </g>
          );
        })}
      </svg>
      {selectedPoint && (
        <div className="point-info">
          <h4>{selectedPoint.name}</h4>
          <div className="point-details">
            <p><strong>Elevation:</strong> {selectedPoint.elevation}</p>
            <p><strong>Station ID:</strong> {selectedPoint.id}</p>
            <p><strong>Coordinates:</strong> {selectedPoint.lat.toFixed(4)}°N, {selectedPoint.lng.toFixed(4)}°E</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { 
      question: currentQuestion + 1, 
      answer: answer,
      correct: answer === questions[currentQuestion].correctAnswer 
    }];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowMap(false);
    } else {
      setFinished(true);
    }
  };

  const calculateScore = () => {
    return answers.filter(a => a.correct).length;
  };

  if (finished) {
    const score = calculateScore();
    return (
      <div className="app">
        <div className="container finished-container">
          <div className="result-card">
            <h1>Quiz Complete!</h1>
            <div className="score-display">
              <div className="score-number">{score}/{questions.length}</div>
              <p className="score-text">Correct Answers</p>
            </div>
            <div className="answers-review">
              <h3>Your Answers:</h3>
              {answers.map((answer, idx) => (
                <div key={idx} className={`answer-review ${answer.correct ? 'correct' : 'incorrect'}`}>
                  <span>Question {answer.question}:</span>
                  <span>{answer.answer}</span>
                  <span className="answer-status">{answer.correct ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
            <button 
              className="btn-primary"
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setFinished(false);
                setShowMap(false);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
        <style>{`
          .app {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 20px;
          }
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .finished-container {
            max-width: 600px;
          }
          .result-card {
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid #333;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            margin-top: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          }
          .result-card h1 {
            font-size: 2.5rem;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #ef4444, #f87171);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .score-display {
            margin: 30px 0;
            padding: 30px;
            background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
            border-radius: 10px;
            border: 1px solid #444;
          }
          .score-number {
            font-size: 4rem;
            font-weight: bold;
            color: #ef4444;
            margin-bottom: 10px;
          }
          .score-text {
            font-size: 1.2rem;
            color: #888;
          }
          .answers-review {
            margin: 30px 0;
            text-align: left;
          }
          .answers-review h3 {
            margin-bottom: 20px;
            color: #fff;
          }
          .answer-review {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            margin-bottom: 10px;
            background: #1e1e1e;
            border-radius: 6px;
            border-left: 3px solid transparent;
          }
          .answer-review.correct {
            border-left-color: #10b981;
          }
          .answer-review.incorrect {
            border-left-color: #ef4444;
          }
          .answer-status {
            font-weight: bold;
            font-size: 1.2rem;
          }
          .answer-review.correct .answer-status {
            color: #10b981;
          }
          .answer-review.incorrect .answer-status {
            color: #ef4444;
          }
          .btn-primary {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #fff;
            border: none;
            padding: 14px 40px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 20px;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          }
          @media (max-width: 640px) {
            .result-card {
              padding: 25px;
            }
            .result-card h1 {
              font-size: 2rem;
            }
            .score-number {
              font-size: 3rem;
            }
            .answer-review {
              font-size: 14px;
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
            .answer-status {
              align-self: flex-end;
            }
          }
        `}</style>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="app">
      <div className="container">
        <div className="quiz-wrapper">
          <div className="header">
            <div className="question-info">
              <h1>Question {question.id} of {questions.length}</h1>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>
            <button 
              className="btn-toggle"
              onClick={() => setShowMap(!showMap)}
              aria-label={showMap ? 'Show Charts' : 'Show Map'}
            >
              <MapPin size={20} />
              <span>{showMap ? 'View Charts' : 'View Map'}</span>
            </button>
          </div>

          <div className="content">
            {showMap ? (
              <MapView points={question.points} />
            ) : (
              <WeatherCharts data={question.data} />
            )}
          </div>

          <div className="answers-grid">
            {answerOptions.map((option) => (
              <button
                key={option.id}
                className="answer-btn"
                onClick={() => handleAnswer(option.name)}
              >
                <span className="answer-name">{option.name}</span>
                <span className="answer-desc">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 20px;
        }
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .quiz-wrapper {
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          gap: 20px;
        }
        .question-info {
          flex: 1;
        }
        .question-info h1 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 15px 0;
          background: linear-gradient(135deg, #fff, #ddd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #2a2a2a;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ef4444, #f87171);
          transition: width 0.3s ease;
        }
        .btn-toggle {
          background: linear-gradient(135deg, #2a2a2a, #333);
          border: 1px solid #444;
          color: #fff;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s;
          font-size: 15px;
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .btn-toggle:hover {
          background: linear-gradient(135deg, #333, #3a3a3a);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }
        .content {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          min-height: 450px;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .weather-charts {
          height: 100%;
        }
        
        .metric-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .metric-tab {
          flex: 1;
          min-width: 150px;
          background: #0f0f0f;
          border: 2px solid #333;
          color: #fff;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }
        
        .metric-tab:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
        }
        
        .metric-tab.active {
          background: #1e1e1e;
          border-width: 2px;
        }
        
        .chart-display {
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #333;
        }
        
        .chart-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }
        
        .chart-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .metric-chart {
          width: 100%;
        }
        
        .metric-stats {
          display: flex;
          justify-content: space-around;
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        
        .stat-label {
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stat-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
        }
        
        .map-container {
          height: 100%;
        }
        
        .map-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }
        
        .map-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .point-info {
          background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
          border: 1px solid #ef4444;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }
        
        .point-info h4 {
          margin: 0 0 12px 0;
          color: #ef4444;
          font-size: 1.2rem;
        }
        
        .point-details p {
          margin: 8px 0;
          color: #aaa;
          font-size: 0.95rem;
        }
        
        .point-details strong {
          color: #fff;
          margin-right: 5px;
        }
        
        .answers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .answer-btn {
          background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
          border: 1px solid #444;
          color: #fff;
          padding: 18px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .answer-btn:hover {
          background: linear-gradient(135deg, #2a2a2a, #333);
          border-color: #ef4444;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.25);
        }
        
        .answer-name {
          font-weight: 600;
          margin-bottom: 5px;
          font-size: 1rem;
        }
        
        .answer-desc {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.3;
        }
        
        @media (max-width: 1024px) {
          .container {
            max-width: 100%;
          }
          .quiz-wrapper {
            padding: 25px;
          }
          .answers-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        
        @media (max-width: 640px) {
          .app {
            padding: 10px;
          }
          .quiz-wrapper {
            padding: 20px;
            border-radius: 12px;
          }
          .header {
            flex-direction: column;
            gap: 15px;
          }
          .question-info h1 {
            font-size: 1.5rem;
          }
          .btn-toggle {
            width: 100%;
            justify-content: center;
            padding: 10px 16px;
          }
          .content {
            padding: 15px;
            min-height: 400px;
          }
          .metric-selector {
            flex-direction: column;
          }
          .metric-tab {
            min-width: 100%;
          }
          .metric-stats {
            flex-direction: column;
            gap: 10px;
          }
          .answers-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .answer-btn {
            padding: 15px;
          }
          .point-info {
            padding: 15px;
          }
          .point-info h4 {
            font-size: 1rem;
          }
          .point-details p {
            font-size: 0.9rem;
          }
        }
        
        @media (min-width: 1440px) {
          .container {
            max-width: 1400px;
          }
          .answers-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}