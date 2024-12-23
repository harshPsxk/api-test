import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [apiKey, setApiKey] = useState('asdkjhaskdh');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const [databases, setDatabases] = useState([]);
    const [selectedDatabase, setSelectedDatabase] = useState(null);


    console.log('??? changes in apiKey', apiKey);
    console.log('??? changes in selectedTeam', selectedTeam);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('https://api.ninox.com/v1/teams', {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            setTeams([...response.data]);
            return (response.data);
        } catch (err) {
            console.log(err)
        }
    };
    const fetchDatabases = async () => {
        if (!selectedTeam) {
            setError("Please select a team before fetching databases.");
            return;
        }
        try {
            const response = await axios.get(
                `https://api.ninox.com/v1/teams/${selectedTeam}/databases`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setDatabases(response.data);
        } catch (err) {
            console.log(err)
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
            <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                disabled={teams.length === 0}
            >
                <option id={null} value={null}>Select team</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>

            <button onClick={fetchDatabases}>Fetch databases</button>
            <select
                value={selectedDatabase || ""}
                onChange={(e) => setSelectedDatabase(e.target.value)}
                disabled={databases.length === 0}
            >
                <option value="">Select Database</option>
                {databases.map((database) => (
                    <option key={database.id} value={database.id}>
                        {database.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default App;


