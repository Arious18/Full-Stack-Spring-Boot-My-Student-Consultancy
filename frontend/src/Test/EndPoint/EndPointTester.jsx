import React, { useState } from 'react';
import axios from 'axios';

function EndpointTester() {
    const [results, setResults] = useState({});
    const [testing, setTesting] = useState(false);

    const baseUrl = 'http://localhost:8080';

    const endpoints = [
        '/universities',
        '/api/universities',
        '/universities/test',
        '/api/universities/test',
        '/countries',
        '/api/countries',
        '/api/health',
        '/api/test'
    ];

    const testEndpoint = async (endpoint) => {
        try {
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                timeout: 5000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return {
                status: response.status,
                success: true,
                data: Array.isArray(response.data) ? `Array with ${response.data.length} items` : typeof response.data,
                message: 'Success'
            };
        } catch (error) {
            return {
                status: error.response?.status || 'No Response',
                success: false,
                message: error.response?.statusText || error.message,
                data: null
            };
        }
    };

    const testAllEndpoints = async () => {
        setTesting(true);
        setResults({});

        for (const endpoint of endpoints) {
            console.log(`Testing ${endpoint}...`);
            const result = await testEndpoint(endpoint);
            setResults(prev => ({
                ...prev,
                [endpoint]: result
            }));
        }

        setTesting(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Backend Endpoint Tester</h2>
            <p>This component tests various endpoints to see which ones are available.</p>

            <button
                onClick={testAllEndpoints}
                disabled={testing}
                style={{
                    padding: '10px 20px',
                    backgroundColor: testing ? '#ccc' : '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: testing ? 'not-allowed' : 'pointer',
                    marginBottom: '20px'
                }}
            >
                {testing ? 'Testing...' : 'Test All Endpoints'}
            </button>

            <div style={{ display: 'grid', gap: '10px' }}>
                {endpoints.map(endpoint => {
                    const result = results[endpoint];
                    return (
                        <div
                            key={endpoint}
                            style={{
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                backgroundColor: result ? (result.success ? '#d4edda' : '#f8d7da') : '#f8f9fa'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {baseUrl}{endpoint}
                            </div>
                            {result && (
                                <div>
                                    <div>Status: {result.status}</div>
                                    <div>Success: {result.success ? '✅' : '❌'}</div>
                                    <div>Message: {result.message}</div>
                                    {result.data && <div>Data: {result.data}</div>}
                                </div>
                            )}
                            {testing && !result && (
                                <div style={{ color: '#666' }}>Testing...</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {Object.keys(results).length > 0 && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
                    <h3>Summary</h3>
                    <div>
                        Working endpoints: {Object.values(results).filter(r => r.success).length}
                    </div>
                    <div>
                        Failed endpoints: {Object.values(results).filter(r => !r.success).length}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EndpointTester;