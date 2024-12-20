import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [apiKey, setApiKey] = useState('');
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');

    const fetchTeams = async () => {
        try {
            const response = await axios.get('https://api.ninox.com/v1/teams', {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            setTeams(response.data);
            setError('');
        } catch (err) {
            setError('Invalid API key or network error.');
        }
    };

    return (
        <div className="container">
            <h1>Ninox API Integration</h1>
            <input
                type="password"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <button onClick={fetchTeams}>Fetch Teams</button>
            {error && <p>{error}</p>}
            {teams.length > 0 && (
                <select>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default App;
