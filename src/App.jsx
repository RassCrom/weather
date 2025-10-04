import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, BarChart3 } from 'lucide-react';

// Data structure for questions
const questions = [
  {
    id: 1,
    data: [
      { time: '00:00', temp: -2.1, humidity: 85, pressure: 1013 },
      { time: '04:00', temp: -3.5, humidity: 88, pressure: 1012 },
      { time: '08:00', temp: -1.8, humidity: 82, pressure: 1014 },
      { time: '12:00', temp: 2.3, humidity: 75, pressure: 1015 },
      { time: '16:00', temp: 3.1, humidity: 71, pressure: 1016 },
      { time: '20:00', temp: 0.5, humidity: 79, pressure: 1015 }
    ],
    points: [
      { id: 'A', lat: 47.42, lng: 13.68, name: 'Station Alpha', elevation: '1850m' },
      { id: 'B', lat: 47.45, lng: 13.71, name: 'Station Beta', elevation: '2100m' },
      { id: 'C', lat: 47.40, lng: 13.65, name: 'Station Gamma', elevation: '1650m' }
    ]
  },
  {
    id: 2,
    data: [
      { time: '00:00', temp: 5.2, humidity: 72, pressure: 1018 },
      { time: '04:00', temp: 3.8, humidity: 76, pressure: 1017 },
      { time: '08:00', temp: 6.1, humidity: 68, pressure: 1019 },
      { time: '12:00', temp: 11.5, humidity: 58, pressure: 1020 },
      { time: '16:00', temp: 13.2, humidity: 54, pressure: 1021 },
      { time: '20:00', temp: 8.7, humidity: 64, pressure: 1020 }
    ],
    points: [
      { id: 'D', lat: 47.38, lng: 13.72, name: 'Station Delta', elevation: '980m' },
      { id: 'E', lat: 47.41, lng: 13.69, name: 'Station Epsilon', elevation: '1120m' },
      { id: 'F', lat: 47.36, lng: 13.74, name: 'Station Zeta', elevation: '850m' }
    ]
  },
  {
    id: 3,
    data: [
      { time: '00:00', temp: -8.3, humidity: 91, pressure: 1008 },
      { time: '04:00', temp: -9.1, humidity: 93, pressure: 1007 },
      { time: '08:00', temp: -7.5, humidity: 89, pressure: 1009 },
      { time: '12:00', temp: -4.2, humidity: 84, pressure: 1010 },
      { time: '16:00', temp: -3.1, humidity: 81, pressure: 1011 },
      { time: '20:00', temp: -6.8, humidity: 87, pressure: 1010 }
    ],
    points: [
      { id: 'G', lat: 47.46, lng: 13.61, name: 'Station Eta', elevation: '2700m' },
      { id: 'H', lat: 47.48, lng: 13.64, name: 'Station Theta', elevation: '2850m' },
      { id: 'I', lat: 47.44, lng: 13.58, name: 'Station Iota', elevation: '2550m' }
    ]
  },
  {
    id: 4,
    data: [
      { time: '00:00', temp: 1.2, humidity: 78, pressure: 1015 },
      { time: '04:00', temp: 0.3, humidity: 82, pressure: 1014 },
      { time: '08:00', temp: 2.8, humidity: 74, pressure: 1016 },
      { time: '12:00', temp: 7.4, humidity: 65, pressure: 1017 },
      { time: '16:00', temp: 8.9, humidity: 61, pressure: 1018 },
      { time: '20:00', temp: 4.5, humidity: 71, pressure: 1017 }
    ],
    points: [
      { id: 'J', lat: 47.39, lng: 13.66, name: 'Station Kappa', elevation: '1420m' },
      { id: 'K', lat: 47.42, lng: 13.63, name: 'Station Lambda', elevation: '1580m' },
      { id: 'L', lat: 47.37, lng: 13.68, name: 'Station Mu', elevation: '1290m' }
    ]
  },
  {
    id: 5,
    data: [
      { time: '00:00', temp: -5.7, humidity: 87, pressure: 1011 },
      { time: '04:00', temp: -6.8, humidity: 90, pressure: 1010 },
      { time: '08:00', temp: -4.2, humidity: 84, pressure: 1012 },
      { time: '12:00', temp: -0.8, humidity: 77, pressure: 1013 },
      { time: '16:00', temp: 0.5, humidity: 73, pressure: 1014 },
      { time: '20:00', temp: -3.1, humidity: 81, pressure: 1013 }
    ],
    points: [
      { id: 'M', lat: 47.43, lng: 13.70, name: 'Station Nu', elevation: '2150m' },
      { id: 'N', lat: 47.45, lng: 13.67, name: 'Station Xi', elevation: '2280m' },
      { id: 'O', lat: 47.41, lng: 13.73, name: 'Station Omicron', elevation: '2020m' }
    ]
  },
  {
    id: 6,
    data: [
      { time: '00:00', temp: -4.5, humidity: 86, pressure: 1012 },
      { time: '04:00', temp: -5.3, humidity: 89, pressure: 1011 },
      { time: '08:00', temp: -3.7, humidity: 83, pressure: 1013 },
      { time: '12:00', temp: -0.2, humidity: 76, pressure: 1014 },
      { time: '16:00', temp: 1.1, humidity: 72, pressure: 1015 },
      { time: '20:00', temp: -2.4, humidity: 80, pressure: 1014 }
    ],
    points: [
      { id: 'P', lat: 47.44, lng: 13.65, name: 'Station Pi', elevation: '2050m' },
      { id: 'Q', lat: 47.46, lng: 13.68, name: 'Station Rho', elevation: '2180m' },
      { id: 'R', lat: 47.42, lng: 13.71, name: 'Station Sigma', elevation: '1920m' }
    ]
  }
];

const results = [
  { id: 1, name: 'Annastollen', description: 'Historic mining tunnel location' },
  { id: 2, name: 'HochWurzen Hütte', description: 'Mountain refuge at high altitude' },
  { id: 3, name: 'Aparthotel', description: 'Comfortable valley accommodation' },
  { id: 4, name: 'Dachstein (Panorama View)', description: 'Spectacular mountain vista point' },
  { id: 5, name: 'Seethaler Hütte', description: 'Alpine mountain hut' },
  { id: 6, name: 'Austrian Hütte', description: 'Traditional Austrian lodge' },
  { id: 7, name: 'Dachstein Path', description: 'Scenic mountain trail route' }
];

const WeatherChart = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#ef4444" name="Temperature (°C)" strokeWidth={2} />
          <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" strokeWidth={2} />
          <Line type="monotone" dataKey="pressure" stroke="#10b981" name="Pressure (hPa)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Map Component
const MapView = ({ points }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  const centerLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
  const centerLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
  
  return (
    <div className="map-container">
      <svg width="100%" height="300" viewBox="0 0 400 300" style={{ background: '#0a0a0a' }}>
        {points.map((point) => {
          const x = ((point.lng - centerLng + 0.1) / 0.2) * 400;
          const y = ((-point.lat + centerLat + 0.1) / 0.2) * 300;
          
          return (
            <g key={point.id}>
              <circle
                cx={x}
                cy={y}
                r="8"
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
                fontSize="12"
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
          <p>Elevation: {selectedPoint.elevation}</p>
          <p>ID: {selectedPoint.id}</p>
        </div>
      )}
    </div>
  );
};

// Main App
export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowMap(false);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    const sum = answers.reduce((acc, val) => acc + val, 0);
    const index = sum % results.length;
    return results[index];
  };

  if (finished) {
    const result = calculateResult();
    return (
      <div className="app">
        <div className="container">
          <div className="result-card">
            <h1>Your Result</h1>
            <div className="result-content">
              <h2>{result.name}</h2>
              <p>{result.description}</p>
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
              Start Again
            </button>
          </div>
        </div>
        <style>{`
          .app {
            min-height: 100vh;
            background: #0a0a0a;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: clamp(15px, 5vw, 20px);
          }
          .result-card {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: clamp(20px, 8vw, 40px);
            text-align: center;
            margin-top: clamp(20px, 10vh, 60px);
          }
          .result-content {
            margin: clamp(20px, 6vh, 40px) 0;
          }
          .result-content h2 {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            margin-bottom: 20px;
            color: #ef4444;
            word-wrap: break-word;
          }
          .result-content p {
            font-size: clamp(1rem, 3vw, 1.2rem);
            color: #888;
          }
          .btn-primary {
            background: #ef4444;
            color: #fff;
            border: none;
            padding: 12px 32px;
            border-radius: 6px;
            font-size: clamp(14px, 3vw, 16px);
            cursor: pointer;
            transition: background 0.2s;
            touch-action: manipulation;
            min-height: 44px;
          }
          .btn-primary:hover {
            background: #dc2626;
          }
        `}</style>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Question {question.id}</h1>
          <button 
            className="btn-toggle"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? <BarChart3 size={20} /> : <MapPin size={20} />}
          </button>
        </div>

        <div className="content">
          {showMap ? (
            <MapView points={question.points} />
          ) : (
            <WeatherChart data={question.data} />
          )}
        </div>

        <div className="answers">
          {results.map((result) => (
            <button
              key={result.id}
              className="answer-btn"
              onClick={() => handleAnswer(result.id)}
            >
              {result.name}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .app {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: env(safe-area-inset-top) env(safe-area-inset-right) calc(40px + env(safe-area-inset-bottom)) env(safe-area-inset-left);
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: clamp(15px, 5vw, 20px);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: clamp(20px, 5vh, 30px);
          gap: 15px;
        }
        .header h1 {
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 300;
          margin: 0;
        }
        .btn-toggle {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background 0.2s;
          flex-shrink: 0;
          touch-action: manipulation;
          min-width: 44px;
          min-height: 44px;
        }
        .btn-toggle:hover {
          background: #2a2a2a;
        }
        .content {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: clamp(10px, 3vw, 20px);
          margin-bottom: clamp(20px, 4vh, 30px);
          overflow-x: auto;
        }
        .chart-container {
          width: 100%;
          min-height: 250px;
        }
        .map-container {
          position: relative;
          min-height: 250px;
        }
        .point-info {
          background: #0a0a0a;
          border: 1px solid #ef4444;
          border-radius: 6px;
          padding: 15px;
          margin-top: 15px;
        }
        .point-info h4 {
          margin: 0 0 8px 0;
          color: #ef4444;
          font-size: clamp(14px, 3vw, 16px);
        }
        .point-info p {
          margin: 4px 0;
          color: #888;
          font-size: clamp(12px, 2.5vw, 14px);
        }
        .answers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
          gap: clamp(10px, 2vw, 12px);
        }
        .answer-btn {
          background: #1a1a1a;
          border: 1px solid #333;
          color: #fff;
          padding: 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: clamp(14px, 3vw, 15px);
          transition: all 0.2s;
          touch-action: manipulation;
          min-height: 44px;
          word-wrap: break-word;
        }
        .answer-btn:hover {
          background: #2a2a2a;
          border-color: #ef4444;
        }
        @media (max-width: 480px) {
          .answers {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}